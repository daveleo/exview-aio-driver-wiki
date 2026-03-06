# Red Gain

## Purpose

Control and query red gain on eXview AIO panels.

## Ranges

- UI range: `0..100`
- Protocol value range: `0..100` (`0x00..0x64`)

## Encoding

- Encoding formula: `proto = clamp(round(ui), 0, 100)`
- Decoding formula: `ui = proto`

## Command Codes

- Set command code: `C223`
- Set reply code: `C224`
- Query command code: `C221`
- Query reply code: `C222`

## Checksum Rule

Default checksum: `sum(bytes[8..len-2]) & 0xFF`.

## Byte Indexes

- Value byte index: `38`
- Checksum index: `39`

## Set TX Example

```text
55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 23 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 01 00 00 7B
```

## Set RX Example

```text
55 55 55 55 55 55 55 C0 01 03 00 D1 01 D0 24 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 02 00 01 00 7E
```

## Query TX Example

```text
55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 21 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 00 00 78
```

## Query RX Example

```text
55 55 55 55 55 55 55 C0 01 03 00 D1 01 D0 22 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 01 00 46 C0
```

## Step-by-step

1. Clamp the UI value to `0..100`.
2. Encode using `proto = clamp(round(ui), 0, 100)`.
3. Insert encoded value at byte index `38`.
4. Compute checksum using default sum rule.
5. Send TX packet and parse ACK (status) or query value from RX tail payload.

