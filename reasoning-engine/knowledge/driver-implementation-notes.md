# Driver Implementation Notes

## Minimal Deterministic Pipeline

1. Select command template (set/query) from `data/commands.json`.
2. For numeric set operations, encode user value with `rules/numeric-encoding-rules.json`.
3. Insert encoded value into value index (typically index `38`).
4. Compute checksum using:
   - formula-base for `C203`, `C21F`
   - default sum rule for all others
5. Send packet over UDP.
6. Parse RX:
   - validate 7-byte `0x55` header
   - decode reply code via `D0` marker
   - extract tail payload
   - decode status/value

## Retry Guidance

- Retry on transport no-reply (`NO_REPLY`) with bounded attempts.
- For status `0x8001` (busy), retry with delay/jitter.
- For `0x0004` (no response) returned by device, treat as logical failure and retry policy dependent.
- Avoid aggressive retry loops during power/mode transitions.

## Error Handling

- Distinguish transport errors (no packet) vs logical status errors (ACK failure).
- Include raw TX/RX hex in logs for diagnostics.
- Log decoded reply code and payload length.
- Log checksum mode used (default vs formula-base).

## Cross-language Helper Implementations

Use:

- `code/js/protocol.js`
- `code/python/protocol.py`
- `code/csharp/ProtocolHelpers.cs`

These helpers implement consistent packet construction and parsing rules.
