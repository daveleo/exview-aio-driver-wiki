"use strict";

const FORMULA_BASE = {
  C203: 0x5b,
  C21F: 0x77
};

const NUMERIC_CONTROL_MAP = {
  volume: { setCode: "C203", valueIndex: 38, checksumIndex: 39, hueMode: false },
  brightness: { setCode: "C21F", valueIndex: 38, checksumIndex: 39, hueMode: false },
  contrast: { setCode: "C217", valueIndex: 38, checksumIndex: 39, hueMode: false },
  hue: { setCode: "C262", valueIndex: 38, checksumIndex: 39, hueMode: true },
  saturation: { setCode: "C259", valueIndex: 38, checksumIndex: 39, hueMode: false },
  "red-gain": { setCode: "C223", valueIndex: 38, checksumIndex: 39, hueMode: false },
  "green-gain": { setCode: "C227", valueIndex: 38, checksumIndex: 39, hueMode: false },
  "blue-gain": { setCode: "C22B", valueIndex: 38, checksumIndex: 39, hueMode: false }
};

function normalizeCode(code) {
  const cleaned = String(code || "")
    .replace(/^0x/i, "")
    .replace(/[^0-9A-Fa-f]/g, "")
    .toUpperCase();
  return cleaned ? cleaned.slice(-4).padStart(4, "0") : "";
}

function parseHexBytes(input) {
  if (Array.isArray(input)) return input.slice();
  const tokens = String(input || "").match(/[0-9A-Fa-f]{2}/g) || [];
  return tokens.map(token => Number.parseInt(token, 16));
}

function bytesToHex(bytes) {
  return bytes.map(b => Number(b).toString(16).toUpperCase().padStart(2, "0")).join(" ");
}

function computeChecksum(bytes, commandCode, value) {
  const normalizedCode = normalizeCode(commandCode);
  if (normalizedCode && FORMULA_BASE[normalizedCode] != null && Number.isFinite(Number(value))) {
    return (FORMULA_BASE[normalizedCode] + Number(value)) & 0xff;
  }
  let sum = 0;
  for (let index = 8; index <= bytes.length - 2; index += 1) {
    sum = (sum + bytes[index]) & 0xff;
  }
  return sum;
}

function decodeReplyCode(packetBytes) {
  const bytes = parseHexBytes(packetBytes);
  const maxScan = Math.min(bytes.length - 3, 40);
  for (let index = 8; index <= maxScan; index += 1) {
    if (bytes[index] !== 0xd0) continue;
    const low = bytes[index + 1];
    const high = bytes[index + 2];
    if (low == null || high == null) return null;
    return `${high.toString(16).padStart(2, "0")}${low.toString(16).padStart(2, "0")}`.toUpperCase();
  }
  return null;
}

function extractTailPayload(packetBytes) {
  const bytes = parseHexBytes(packetBytes);
  if (bytes.length < 6) return null;
  const minIndex = Math.max(0, bytes.length - 96);
  for (let index = bytes.length - 4; index >= minIndex; index -= 1) {
    if (bytes[index] !== 0x00) continue;
    if (bytes[index + 2] !== 0x00) continue;
    const len = bytes[index + 1];
    const start = index + 3;
    const checksumIndex = start + len;
    if (checksumIndex !== bytes.length - 1) continue;
    return {
      markerIndex: index,
      length: len,
      data: bytes.slice(start, checksumIndex),
      checksum: bytes[bytes.length - 1]
    };
  }
  return null;
}

function parseStatus(dataBytes) {
  const data = parseHexBytes(dataBytes);
  if (data.length < 2) return null;
  return (data[0] | (data[1] << 8)) >>> 0;
}

function encodeHue(uiValue) {
  return clamp(Math.round(Number(uiValue) + 50), 0, 100);
}

function decodeHue(protoValue) {
  return Number(protoValue) - 50;
}

function buildNumericCommand(commandName, uiValue, templatePacket) {
  const key = String(commandName || "").toLowerCase();
  const spec = NUMERIC_CONTROL_MAP[key];
  if (!spec) {
    throw new Error(`Unknown numeric command: ${commandName}`);
  }

  const bytes = parseHexBytes(templatePacket);
  if (bytes.length <= spec.checksumIndex) {
    throw new Error(`Template packet too short for ${commandName}`);
  }

  const protoValue = spec.hueMode ? encodeHue(uiValue) : clamp(Math.round(Number(uiValue)), 0, 100);
  bytes[spec.valueIndex] = protoValue;
  const checksum = computeChecksum(bytes, spec.setCode, protoValue);
  bytes[spec.checksumIndex] = checksum;

  return {
    command: key,
    setCode: spec.setCode,
    uiValue: Number(uiValue),
    protoValue,
    checksum,
    bytes,
    hex: bytesToHex(bytes)
  };
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

module.exports = {
  FORMULA_BASE,
  NUMERIC_CONTROL_MAP,
  normalizeCode,
  parseHexBytes,
  bytesToHex,
  computeChecksum,
  decodeReplyCode,
  extractTailPayload,
  parseStatus,
  encodeHue,
  decodeHue,
  buildNumericCommand
};
