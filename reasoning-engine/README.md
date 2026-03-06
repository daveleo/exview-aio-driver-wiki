# eXview AIO Protocol Reasoning Engine

This repository is an AI-optimized knowledge and reasoning package for the eXview AIO hex control protocol.

It is designed for:

- Microsoft Copilot Studio
- GitHub Copilot / Cursor
- Azure AI / RAG pipelines
- Driver developers (C#, Python, Node.js)

## What This Repository Provides

1. **Protocol knowledge** (`knowledge/*.md`)
2. **Structured datasets** (`data/*.json`)
3. **Deterministic rules** (`rules/*.json`)
4. **Command and session references** (`commands/*.md`, `examples/*.md`)
5. **Grounding QA assets** (`qa/*`)
6. **Copyable helper code** (`code/js`, `code/python`, `code/csharp`)
7. **Prompt templates** (`prompts/*`)

## Authoritative Inputs

The build script parses these source-of-truth files:

- `eXview_AIO_Updated_Protocol.xlsx`
- `truth.json`
- `device-certify.ts`

## Rebuild Data and Rules

```bash
node scripts/build_reasoning_assets.mjs
```

This regenerates:

- `data/commands.json`
- `data/examples.json`
- `data/controls.json`
- `rules/packet-construction-rules.json`
- `rules/packet-parsing-rules.json`
- `rules/numeric-encoding-rules.json`
- `rules/status-code-map.json`
- `rules/reply-code-map.json`

## Copilot Studio / RAG Usage

Recommended ingestion order:

1. `rules/*.json`
2. `data/*.json`
3. `knowledge/*.md`
4. `controls/*.md`
5. `commands/*.md` and `examples/*.md`
6. `qa/*.md` and `qa/grounding-qa.jsonl`

Use `prompts/system-prompt.md` and `prompts/copilot-studio-grounding.md` as orchestration guidance.

## Deterministic Reasoning Workflow

For a user question such as "How do I set brightness to 70?":

1. Find control and code in `data/controls.json`.
2. Encode UI value using documented formula.
3. Use command template from `data/commands.json`.
4. Compute checksum with correct mode.
5. Return expected reply code and status decode details.

## Notes on Inconsistencies

Workbook instruction text may disagree with raw packet bytes in some rows.  
When inconsistent, trust raw packet bytes + derived code extraction first.
