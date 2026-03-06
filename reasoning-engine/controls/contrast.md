# Contrast

## Purpose

Control and query contrast on eXview AIO panels.

## Ranges

- UI range: `0..100`
- Protocol value range: `0..100` (`0x00..0x64`)

## Encoding

- Encoding formula: `proto = clamp(round(ui), 0, 100)`
- Decoding formula: `ui = proto`

## Command Codes

- Set command code: `C217`
- Set reply code: `C218`
- Query command code: `C215`
- Query reply code: `C216`

## Checksum Rule

Default checksum: `sum(bytes[8..len-2]) & 0xFF`.

## Byte Indexes

- Value byte index: `38`
- Checksum index: `39`

## Set TX Example

```text
55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 17 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 01 00 00 6F
```

## Set RX Example

```text
55 55 55 55 55 55 55 C0 01 03 00 D1 01 D0 18 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 02 00 01 00 72
```

## Query TX Example

```text
55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 15 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 00 00 6C
```

## Query RX Example

```text
55 55 55 55 55 55 55 C0 01 03 00 D1 01 D0 16 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 01 00 32 A0
```

## Step-by-step

1. Clamp the UI value to `0..100`.
2. Encode using `proto = clamp(round(ui), 0, 100)`.
3. Insert encoded value at byte index `38`.
4. Compute checksum using default sum rule.
5. Send TX packet and parse ACK (status) or query value from RX tail payload.

