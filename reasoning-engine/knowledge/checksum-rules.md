# Checksum Rules

## Default Rule (Most Commands)

From `computePdfChecksum` in `device-certify.ts`:

```text
checksum = (sum of bytes from index 8 to len-2) & 0xFF
```

Interpretation:

1. Ignore bytes `0..7` for summation.
2. Sum every byte from index `8` through the byte before checksum.
3. Keep only the low 8 bits (`& 0xFF`).
4. Write this value as final checksum byte.

## Special Formula-base Rules

Two numeric commands use formula-base checksums instead of default sum:

- Volume set (`C203`):  
  `checksum = (0x5B + value) & 0xFF`
- Brightness set (`C21F`):  
  `checksum = (0x77 + value) & 0xFF`

These exceptions are explicitly defined in `FORMULA_CHECKSUM_BASE` in `device-certify.ts`.

## AI Reasoning Guidance

When constructing TX:

1. Identify set code first.
2. If set code is in `FORMULA_CHECKSUM_BASE`, use formula-base checksum.
3. Otherwise use default sum rule.

Machine-readable source: `rules/packet-construction-rules.json`.
