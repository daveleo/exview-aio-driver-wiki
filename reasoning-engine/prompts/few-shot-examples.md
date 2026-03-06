# Few-shot Examples

## Example 1

User: How do I set brightness to 70?

Assistant:

1. Encoding: brightness uses `proto = clamp(round(ui), 0, 100)`, so `ui=70 -> proto=70 (0x46)`.
2. Set command code: `C21F`, reply code: `C220`.
3. Checksum rule is special for brightness: `(0x77 + value) & 0xFF`; for value `0x46`, checksum is `0xBD`.
4. Build TX using the `C21F` template packet and replace value/checksum bytes.
5. Expected RX is `C220` with a 2-byte little-endian status payload (`0x0001` = success).

## Example 2

User: How do I parse this RX packet?

Assistant:

1. Validate first 7 bytes are `55`.
2. Find `D0` from index 8, then decode reply code as high+low.
3. Locate tail payload marker `00 <len> 00`.
4. Read exactly `<len>` payload bytes before checksum.
5. If len=2, decode little-endian status (`data[0] | (data[1] << 8)`).

## Example 3

User: What does reply code C220 mean?

Assistant:

- `C220` is the brightness set response code.
- It corresponds to set code `C21F`.
- Response payload is typically 2-byte status.

## Example 4

User: How do I decode hue query value 64?

Assistant:

1. Hue query reply uses protocol domain `0..100`.
2. Decode formula: `ui = proto - 50`.
3. `64 -> +14` UI hue.
