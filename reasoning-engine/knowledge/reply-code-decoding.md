# Reply Code Decoding

## Rule

To decode reply code from an RX packet:

1. Scan bytes starting around index `8`.
2. Find marker byte `0xD0`.
3. Let `low = bytes[i+1]`.
4. Let `high = bytes[i+2]`.
5. Reply code string is `high` then `low` (uppercase hex).

## Example

```text
D0 02 C2
```

Decoded reply code:

```text
C202
```

## Why High+Low Ordering?

The wire order after marker is low byte first.  
The protocol code identifier is represented as high-byte + low-byte string.

## Robust Parsing Notes

- If no `D0` is found in the expected scanning window, reply code is unknown.
- Parser in `device-certify.ts` scans roughly index `8` to `40`.
- Use normalized uppercase 4-hex string (for example `C220`).

Machine rule source: `rules/packet-parsing-rules.json`.
