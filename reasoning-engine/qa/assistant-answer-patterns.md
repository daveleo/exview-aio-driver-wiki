# Assistant Answer Patterns

Use this response structure for implementation questions.

## Pattern A: "How do I set X?"

1. Identify command code and encoded protocol value.
2. Provide TX packet (hex), preferably fully built.
3. Explain checksum mode (default vs formula-base).
4. Provide expected ACK RX pattern and status interpretation.
5. Optionally provide related query command for verification.

## Pattern B: "How do I query X?"

1. Provide query TX packet and query/reply codes.
2. Explain RX reply code decoding (`D0` marker method).
3. Explain tail payload extraction (`00 <len> 00 <data...> <chk>`).
4. Decode returned value/status to user-facing meaning.

## Pattern C: "How do I parse this RX packet?"

1. Validate `55 55 55 55 55 55 55` header.
2. Decode reply code from `D0`.
3. Locate tail payload marker and length.
4. If len=2, decode little-endian status.
5. If len=1, decode numeric value.
6. Mention checksum verification rule.

## Guardrails

- Do not invent bytes.
- Prefer exact packets from `data/commands.json` and `data/examples.json`.
- If command is ambiguous, show uncertainty and list candidates.
- Call out workbook inconsistencies when present (for example blue gain set code mismatch).
