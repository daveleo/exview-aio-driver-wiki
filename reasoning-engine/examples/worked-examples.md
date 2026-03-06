# Worked Examples

Deterministic packet-building examples using numeric control templates and checksum rules.

## Brightness UI=70

- Set code: `C21F`
- Encoded protocol value: `70` (0x46)
- Checksum: `0xBD` using formula base 0x77

TX packet:

```text
55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 1F C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 01 00 46 BD
```

Expected RX example:

```text
55 55 55 55 55 55 55 C0 01 03 00 D1 01 D0 20 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 02 00 01 00 7A
```

## Volume UI=25

- Set code: `C203`
- Encoded protocol value: `25` (0x19)
- Checksum: `0x74` using formula base 0x5B

TX packet:

```text
55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 03 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 01 00 19 74
```

Expected RX example:

```text
55 55 55 55 55 55 55 C0 01 03 00 D1 01 D0 04 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 02 00 01 00 5E
```

## Hue UI=-20

- Set code: `C262`
- Encoded protocol value: `30` (0x1E)
- Checksum: `0xD8` using default sum rule

TX packet:

```text
55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 62 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 01 00 1E D8
```

Expected RX example:

```text
55 55 55 55 55 55 55 C0 01 03 00 D1 01 D0 63 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 02 00 01 00 BD
```

## Red Gain UI=55

- Set code: `C223`
- Encoded protocol value: `55` (0x37)
- Checksum: `0xB2` using default sum rule

TX packet:

```text
55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 23 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 01 00 37 B2
```

Expected RX example:

```text
55 55 55 55 55 55 55 C0 01 03 00 D1 01 D0 24 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 02 00 01 00 7E
```

## Parsing a Query RX Value Example

Example tail: `00 01 00 64 DA`
- Length byte = `0x01` -> one data byte
- Data = `0x64` -> decimal 100
- Final byte `DA` is checksum byte

Example tail status: `00 02 00 01 00 7A`
- Data bytes = `01 00`
- Status = `0x0001` using little-endian: `data[0] | (data[1] << 8)`

