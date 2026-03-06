# Frame Structure

## Fixed Header Signature

Packets are expected to start with seven bytes of `0x55`:

```text
55 55 55 55 55 55 55
```

This rule is enforced in `device-certify.ts` (`isUdpLike`).

## Practical Frame Shape

The full packet can be viewed as:

```text
55 55 55 55 55 55 55 <protocol-body> <checksum>
```

Important body markers used by parser/build logic:

- `D0`: command code marker (used for code extraction)
- Tail payload pattern: `00 <len> 00 <data...> <checksum>`

## Indexing Convention

- Byte indexes are 0-based.
- The checksum algorithm starts summing from index `8`.
- Numeric set commands use value index `38` and checksum index `39` (from `NUMERIC_VALUE_INDEX_BY_SET`).
