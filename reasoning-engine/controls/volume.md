# Volume

## Purpose

Control and query volume on eXview AIO panels.

## Ranges

- UI range: `0..100`
- Protocol value range: `0..100` (`0x00..0x64`)

## Encoding

- Encoding formula: `proto = clamp(round(ui), 0, 100)`
- Decoding formula: `ui = proto`

## Command Codes

- Set command code: `C203`
- Set reply code: `C204`
- Query command code: `C201`
- Query reply code: `C202`

## Checksum Rule

Formula-base checksum: `(0x5B + value) & 0xFF`

## Byte Indexes

- Value byte index: `38`
- Checksum index: `39`

## Set TX Example

```text
55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 03 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 01 00 00 5B
```

## Set RX Example

```text
55 55 55 55 55 55 55 C0 01 03 00 D1 01 D0 04 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 02 00 01 00 5E
```

## Query TX Example

```text
55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 01 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 00 00 58
```

## Query RX Example

```text
55 55 55 55 55 55 55 C0 01 03 00 D1 01 D0 02 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 01 00 14 6E
```

## Step-by-step

1. Clamp the UI value to `0..100`.
2. Encode using `proto = clamp(round(ui), 0, 100)`.
3. Insert encoded value at byte index `38`.
4. Compute checksum using formula-base rule.
5. Send TX packet and parse ACK (status) or query value from RX tail payload.

