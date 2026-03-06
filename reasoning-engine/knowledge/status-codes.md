# Status Codes

Known status code meanings extracted from `ACK_STATUS_MEANING` in `device-certify.ts`:

| Status (hex) | Meaning |
|---|---|
| `0x0001` | Success |
| `0x0002` | Failure: unspecified reason |
| `0x0003` | Failure: serial port not found |
| `0x0004` | Failure: no response |
| `0x8001` | Failure: busy |
| `0x8002` | Failure: occupied |

## Decode Formula

For 2-byte status payloads:

```text
status = data[0] | (data[1] << 8)
```

Example:

```text
data = 01 00 -> status = 0x0001
```

Machine-readable map: `rules/status-code-map.json`.
