# Hue

## Purpose

Control and query hue on eXview AIO panels.

## Ranges

- UI range: `-50..50`
- Protocol value range: `0..100` (`0x00..0x64`)

## Encoding

- Encoding formula: `proto = clamp(round(ui + 50), 0, 100)`
- Decoding formula: `ui = proto - 50`

## Command Codes

- Set command code: `C262`
- Set reply code: `C263`
- Query command code: `C264`
- Query reply code: `C265`

## Checksum Rule

Default checksum: `sum(bytes[8..len-2]) & 0xFF`.

## Byte Indexes

- Value byte index: `38`
- Checksum index: `39`

## Set TX Example

```text
55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 62 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 01 00 32 EC
```

## Set RX Example

```text
55 55 55 55 55 55 55 C0 01 03 00 D1 01 D0 63 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 02 00 01 00 BD
```

## Query TX Example

```text
55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 64 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 00 00 BB
```

## Query RX Example

```text
55 55 55 55 55 55 55 C0 01 03 00 D1 01 D0 65 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 01 00 64 21
```

## Hue Mapping Note

- UI `-50` maps to protocol `0` (`0x00`).
- UI `0` maps to protocol `50` (`0x32`).
- UI `+50` maps to protocol `100` (`0x64`).

## Step-by-step

1. Clamp the UI value to `-50..50`.
2. Encode using `proto = clamp(round(ui + 50), 0, 100)`.
3. Insert encoded value at byte index `38`.
4. Compute checksum using default sum rule.
5. Send TX packet and parse ACK (status) or query value from RX tail payload.

