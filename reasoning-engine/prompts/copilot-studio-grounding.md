# Copilot Studio Grounding Instructions

Use this repository as grounded knowledge for an eXview AIO protocol assistant.

## Recommended grounding priority

1. `rules/*.json` (deterministic reasoning first)
2. `data/commands.json`, `data/controls.json`, `data/examples.json`
3. `knowledge/*.md` and `controls/*.md`
4. `commands/*.md`, `examples/*.md`, `qa/*.md`

## Retrieval strategy

- For "set/query X" questions: retrieve `data/controls.json` + `commands/command-index.md`.
- For packet parsing questions: retrieve `knowledge/payload-parsing.md`, `knowledge/reply-code-decoding.md`, and `rules/packet-parsing-rules.json`.
- For checksum questions: retrieve `knowledge/checksum-rules.md` + `rules/packet-construction-rules.json`.
- For status meanings: retrieve `rules/status-code-map.json`.

## Assistant answer format

1. Exact code/hex answer
2. Formula and conversion explanation
3. Expected RX and parsing details
4. Caveats or known mismatches (if any)

## Hallucination control

- Require assistant to quote command/set/reply code from dataset files.
- If no exact match exists, assistant must say "not found in authoritative dataset."
