# Blue Gain

## Purpose

Control and query blue gain on eXview AIO panels.

## Ranges

- UI range: `0..100`
- Protocol value range: `0..100` (`0x00..0x64`)

## Encoding

- Encoding formula: `proto = clamp(round(ui), 0, 100)`
- Decoding formula: `ui = proto`

## Command Codes

- Set command code: `C22B`
- Set reply code: `C22C`
- Query command code: `C229`
- Query reply code: `C22A`

## Checksum Rule

Default checksum: `sum(bytes[8..len-2]) & 0xFF`.

## Byte Indexes

- Value byte index: `38`
- Checksum index: `39`

## Set TX Example

```text
55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 2B C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 01 00 00 83
```

## Set RX Example

```text
55 55 55 55 55 55 55 C0 01 03 00 D1 01 D0 2C C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 02 00 01 00 86
```

## Query TX Example

```text
55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 29 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 00 00 80
```

## Query RX Example

```text
55 55 55 55 55 55 55 C0 01 03 00 D1 01 D0 2A C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 01 00 64 E6
```

## Step-by-step

1. Clamp the UI value to `0..100`.
2. Encode using `proto = clamp(round(ui), 0, 100)`.
3. Insert encoded value at byte index `38`.
4. Compute checksum using default sum rule.
5. Send TX packet and parse ACK (status) or query value from RX tail payload.


## Workbook Inconsistency Warning

This control has workbook instruction-vs-byte mismatches. Use raw TX/RX bytes as authoritative.

1. Source eXview AIO Main Protocol row 101: instruction set=C225 vs bytes set=C22B, instruction reply=C22C vs bytes reply=C22C.
2. Source eXview AIO Main Protocol row 102: instruction set=C225 vs bytes set=C22B, instruction reply=C22C vs bytes reply=C22C.
3. Source eXview AIO Main Protocol row 103: instruction set=C225 vs bytes set=C22B, instruction reply=C22C vs bytes reply=C22C.
4. Source eXview AIO Main Protocol row 104: instruction set=C225 vs bytes set=C22B, instruction reply=C22C vs bytes reply=C22C.
5. Source eXview AIO Main Protocol row 105: instruction set=C225 vs bytes set=C22B, instruction reply=C22C vs bytes reply=C22C.
