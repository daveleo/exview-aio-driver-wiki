# Saturation

## Purpose

Control and query saturation on eXview AIO panels.

## Ranges

- UI range: `0..100`
- Protocol value range: `0..100` (`0x00..0x64`)

## Encoding

- Encoding formula: `proto = clamp(round(ui), 0, 100)`
- Decoding formula: `ui = proto`

## Command Codes

- Set command code: `C259`
- Set reply code: `C25A`
- Query command code: `C257`
- Query reply code: `C258`

## Checksum Rule

Default checksum: `sum(bytes[8..len-2]) & 0xFF`.

## Byte Indexes

- Value byte index: `38`
- Checksum index: `39`

## Set TX Example

```text
55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 59 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 01 00 00 B1
```

## Set RX Example

```text
55 55 55 55 55 55 55 C0 01 03 00 D1 01 D0 5A C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 02 00 01 00 B4
```

## Query TX Example

```text
55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 57 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 00 00 AE
```

## Query RX Example

```text
55 55 55 55 55 55 55 C0 01 03 00 D1 01 D0 58 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 01 00 64 14
```

## Step-by-step

1. Clamp the UI value to `0..100`.
2. Encode using `proto = clamp(round(ui), 0, 100)`.
3. Insert encoded value at byte index `38`.
4. Compute checksum using default sum rule.
5. Send TX packet and parse ACK (status) or query value from RX tail payload.

