# Common Questions

## Q: How do I set volume to 50?

A:

1. Encode value: `proto=50` (`0x32`).
2. Use set code `C203`.
3. Volume checksum uses formula rule: `(0x5B + 0x32) & 0xFF = 0x8D`.
4. Build TX from volume template and replace value/checksum bytes.
5. Expect reply code `C204` and status payload (usually `0x0001` success).

## Q: How do I set brightness to 70?

A:

1. Encode value: `proto=70` (`0x46`).
2. Use set code `C21F`.
3. Brightness checksum uses formula rule: `(0x77 + 0x46) & 0xFF = 0xBD`.
4. Expect reply code `C220`.

## Q: How do I encode hue from UI value?

A:

- Encoding: `proto = clamp(round(ui + 50), 0, 100)`
- Decoding: `ui = proto - 50`
- Example: `ui=-20 -> proto=30 (0x1E)`

## Q: How do I parse a reply packet?

A:

1. Verify first 7 bytes are `0x55`.
2. Find `D0` marker from index 8.
3. Decode reply code from `high+low`.
4. Extract tail payload `00 <len> 00 <data...> <checksum>`.
5. Decode status/value from payload bytes.

## Q: What does reply code C220 mean?

A:

`C220` is the brightness set response code (for set command `C21F`).

## Q: How are status bytes decoded?

A:

Little-endian decode:

```text
status = data[0] | (data[1] << 8)
```

Example: `01 00 -> 0x0001` (Success).

## Q: Which status means busy?

A:

`0x8001` means `Failure: busy`.

## Q: Which commands use non-default checksum?

A:

- `C203` volume set: base `0x5B`
- `C21F` brightness set: base `0x77`

All other commands use default sum checksum rule.

## Q: How do I query current brightness?

A:

- Query TX code `C21D`
- Reply code `C21E`
- Value in 1-byte payload (`0x00..0x64`)

## Q: How do I query HDMI signal presence?

A:

- Query TX code `C25B`
- Reply code `C25C`
- Payload is 4 bytes:
  - Byte1 HDMI1
  - Byte2 HDMI2
  - Byte3 HDMI3
  - Byte4 HDMI4
  - `0x01` signal present, `0x00` no signal

## Q: What is the default checksum formula exactly?

A:

`(sum of packet bytes from index 8 to len-2) & 0xFF`

## Q: Should I trust instruction text or packet bytes if they differ?

A:

Trust packet bytes and derived codes first.  
Workbook has mismatch warnings (notably around blue gain rows).
