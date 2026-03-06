# eXview AIO Protocol Reasoning Overview

This repository is designed for AI retrieval and deterministic protocol reasoning.

Primary source files:

- `eXview_AIO_Updated_Protocol.xlsx`
- `truth.json`
- `device-certify.ts`

Primary generated datasets:

- `data/commands.json`: parsed workbook command rows
- `data/examples.json`: real TX/RX records from truth data
- `data/controls.json`: normalized numeric control rules and examples

Primary machine rules:

- `rules/packet-construction-rules.json`
- `rules/packet-parsing-rules.json`
- `rules/numeric-encoding-rules.json`
- `rules/status-code-map.json`
- `rules/reply-code-map.json`

AI answer strategy supported by this repository:

1. Find relevant command(s) in `commands.json`.
2. Apply numeric encoding rules if a user value is provided.
3. Build TX using template + checksum rule.
4. Parse RX using reply-code + tail-payload rules.
5. Explain status/value meaning with `status-code-map.json`.
