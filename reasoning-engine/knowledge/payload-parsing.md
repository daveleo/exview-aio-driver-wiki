# Payload Parsing

## Tail Payload Pattern

Replies are parsed from a tail structure:

```text
00 <len> 00 <data bytes> <checksum>
```

Where:

- `<len>` is payload byte count
- `<data bytes>` is exactly `<len>` bytes
- `<checksum>` is the final packet byte

## Example: One-byte Value Payload

```text
00 01 00 64 DA
```

Parse result:

- length = `0x01` -> 1 data byte
- data = `64` -> decimal `100`

## Example: Two-byte Status Payload

```text
00 02 00 01 00 7A
```

Parse result:

- length = `0x02`
- data = `01 00`
- status decode: `status = data[0] | (data[1] << 8)` = `0x0001`

## Little-endian Status Rule

Status payloads are little-endian:

```text
status = lowByte | (highByte << 8)
```

Known statuses are in:

- `knowledge/status-codes.md`
- `rules/status-code-map.json`
