using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;

namespace ExviewAioProtocol
{
    public static class ProtocolHelpers
    {
        private static readonly Dictionary<string, int> FormulaBase = new(StringComparer.OrdinalIgnoreCase)
        {
            ["C203"] = 0x5B,
            ["C21F"] = 0x77
        };

        public sealed class NumericSpec
        {
            public string SetCode { get; init; } = "";
            public int ValueIndex { get; init; }
            public int ChecksumIndex { get; init; }
            public bool HueMode { get; init; }
        }

        private static readonly Dictionary<string, NumericSpec> NumericControls = new(StringComparer.OrdinalIgnoreCase)
        {
            ["volume"] = new NumericSpec { SetCode = "C203", ValueIndex = 38, ChecksumIndex = 39, HueMode = false },
            ["brightness"] = new NumericSpec { SetCode = "C21F", ValueIndex = 38, ChecksumIndex = 39, HueMode = false },
            ["contrast"] = new NumericSpec { SetCode = "C217", ValueIndex = 38, ChecksumIndex = 39, HueMode = false },
            ["hue"] = new NumericSpec { SetCode = "C262", ValueIndex = 38, ChecksumIndex = 39, HueMode = true },
            ["saturation"] = new NumericSpec { SetCode = "C259", ValueIndex = 38, ChecksumIndex = 39, HueMode = false },
            ["red-gain"] = new NumericSpec { SetCode = "C223", ValueIndex = 38, ChecksumIndex = 39, HueMode = false },
            ["green-gain"] = new NumericSpec { SetCode = "C227", ValueIndex = 38, ChecksumIndex = 39, HueMode = false },
            ["blue-gain"] = new NumericSpec { SetCode = "C22B", ValueIndex = 38, ChecksumIndex = 39, HueMode = false }
        };

        public static string NormalizeCode(string? code)
        {
            if (string.IsNullOrWhiteSpace(code)) return string.Empty;
            var cleaned = new string(code.Replace("0x", "", StringComparison.OrdinalIgnoreCase)
                .Where(ch => Uri.IsHexDigit(ch))
                .ToArray())
                .ToUpperInvariant();
            if (cleaned.Length == 0) return string.Empty;
            if (cleaned.Length > 4) cleaned = cleaned[^4..];
            return cleaned.PadLeft(4, '0');
        }

        public static byte[] ParseHexBytes(string hex)
        {
            if (string.IsNullOrWhiteSpace(hex)) return Array.Empty<byte>();
            var tokens = System.Text.RegularExpressions.Regex.Matches(hex, "[0-9A-Fa-f]{2}")
                .Select(match => byte.Parse(match.Value, NumberStyles.HexNumber, CultureInfo.InvariantCulture))
                .ToArray();
            return tokens;
        }

        public static string BytesToHex(IEnumerable<byte> bytes)
        {
            return string.Join(" ", bytes.Select(b => b.ToString("X2", CultureInfo.InvariantCulture)));
        }

        public static byte ComputeChecksum(IReadOnlyList<byte> bytes, string? commandCode = null, int? value = null)
        {
            var normalized = NormalizeCode(commandCode);
            if (!string.IsNullOrEmpty(normalized) && FormulaBase.TryGetValue(normalized, out var baseValue) && value.HasValue)
            {
                return (byte)((baseValue + value.Value) & 0xFF);
            }

            var sum = 0;
            for (var index = 8; index <= bytes.Count - 2; index++)
            {
                sum = (sum + bytes[index]) & 0xFF;
            }
            return (byte)sum;
        }

        public static string? DecodeReplyCode(IReadOnlyList<byte> packet)
        {
            var maxScan = Math.Min(packet.Count - 3, 40);
            for (var index = 8; index <= maxScan; index++)
            {
                if (packet[index] != 0xD0) continue;
                var low = packet[index + 1];
                var high = packet[index + 2];
                return $"{high:X2}{low:X2}";
            }
            return null;
        }

        public static TailPayload? ExtractTailPayload(IReadOnlyList<byte> packet)
        {
            if (packet.Count < 6) return null;
            var minIndex = Math.Max(0, packet.Count - 96);
            for (var index = packet.Count - 4; index >= minIndex; index--)
            {
                if (packet[index] != 0x00) continue;
                if (packet[index + 2] != 0x00) continue;
                var len = packet[index + 1];
                var start = index + 3;
                var checksumIndex = start + len;
                if (checksumIndex != packet.Count - 1) continue;
                var data = packet.Skip(start).Take(len).ToArray();
                return new TailPayload(index, len, data, packet[^1]);
            }
            return null;
        }

        public static int? ParseStatus(IReadOnlyList<byte> dataBytes)
        {
            if (dataBytes.Count < 2) return null;
            return dataBytes[0] | (dataBytes[1] << 8);
        }

        public static int EncodeHue(double uiValue)
        {
            return Clamp((int)Math.Round(uiValue + 50.0), 0, 100);
        }

        public static int DecodeHue(int protoValue)
        {
            return protoValue - 50;
        }

        public static NumericBuildResult BuildNumericCommand(string commandName, double uiValue, IReadOnlyList<byte> templatePacket)
        {
            if (!NumericControls.TryGetValue(commandName, out var spec))
            {
                throw new ArgumentException($"Unknown numeric command: {commandName}", nameof(commandName));
            }

            var bytes = templatePacket.ToArray();
            if (bytes.Length <= spec.ChecksumIndex)
            {
                throw new ArgumentException($"Template packet too short for {commandName}", nameof(templatePacket));
            }

            var protoValue = spec.HueMode ? EncodeHue(uiValue) : Clamp((int)Math.Round(uiValue), 0, 100);
            bytes[spec.ValueIndex] = (byte)protoValue;
            var checksum = ComputeChecksum(bytes, spec.SetCode, protoValue);
            bytes[spec.ChecksumIndex] = checksum;

            return new NumericBuildResult(commandName, spec.SetCode, uiValue, protoValue, checksum, bytes, BytesToHex(bytes));
        }

        private static int Clamp(int value, int min, int max) => Math.Min(max, Math.Max(min, value));
    }

    public sealed record TailPayload(int MarkerIndex, int Length, byte[] Data, byte Checksum);

    public sealed record NumericBuildResult(
        string Command,
        string SetCode,
        double UiValue,
        int ProtoValue,
        byte Checksum,
        byte[] Bytes,
        string Hex);
}
