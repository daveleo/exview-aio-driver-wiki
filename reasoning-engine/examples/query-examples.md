# Query Examples

Real query-command examples extracted from `truth.json`.

| Command Key | Set/Reply | Status | Transport | Value | Latency (ms) | TX | RX |
|---|---|---|---|---:|---:|---|---|
| 0xC005:query-whether-the-device-is-in-sleep-wake-mode | C005 / C006 | PASS | REPLY | - | 6 | 55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 05 C0 00 00 FF FF FF FF FF FF  ... | 55 55 55 55 55 55 55 C0 01 03 00 D1 01 D0 06 C0 00 00 FF FF FF FF FF FF  ... |
| 0xC005:query-whether-the-device-is-in-sleep-wake-mode:r109 | C005 / C006 | PASS | REPLY | - | 9 | 55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 05 C0 00 00 FF FF FF FF FF FF  ... | 55 55 55 55 55 55 55 C0 01 03 00 D1 01 D0 06 C0 00 00 FF FF FF FF FF FF  ... |
| 0xC20D:query-current-aspect-ratio | C20D / C20E | SKIPPED | NO_REPLY | - | - | 55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 0D C2 00 00 FF FF FF FF FF FF  ... | - |
| 0xC211:query-current-video-source | C211 / C212 | SKIPPED | NO_REPLY | - | - | 55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 11 C2 00 00 FF FF FF FF FF FF  ... | - |
| 0xC215:query-current-contrast | C215 / C216 | PASS | REPLY | 100 | 3 | 55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 15 C2 00 00 FF FF FF FF FF FF  ... | 55 55 55 55 55 55 55 C0 01 03 00 D1 01 D0 16 C2 00 00 FF FF FF FF FF FF  ... |
| 0xC21D:query-current-brightness-value | C21D / C21E | PASS | REPLY | 100 | 3 | 55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 1D C2 00 00 FF FF FF FF FF FF  ... | 55 55 55 55 55 55 55 C0 01 03 00 D1 01 D0 1E C2 00 00 FF FF FF FF FF FF  ... |
| 0xC221:query-current-red-gain-value | C221 / C222 | PASS | REPLY | 100 | 23 | 55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 21 C2 00 00 FF FF FF FF FF FF  ... | 55 55 55 55 55 55 55 C0 01 03 00 D1 01 D0 22 C2 00 00 FF FF FF FF FF FF  ... |
| 0xC257:query-current-saturation-value | C257 / C258 | PASS | REPLY | 100 | 15 | 55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 57 C2 00 00 FF FF FF FF FF FF  ... | 55 55 55 55 55 55 55 C0 01 03 00 D1 01 D0 58 C2 00 00 FF FF FF FF FF FF  ... |
| 0xC25B:query-the-current-hdmi-signal | C25B / C25C | PASS | REPLY | - | 30 | 55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 5B C2 00 00 FF FF FF FF FF FF  ... | 55 55 55 55 55 55 55 C0 01 03 00 D1 01 D0 5C C2 00 00 FF FF FF FF FF FF  ... |
| 0xC264:query-current-hue-value | C264 / C265 | PASS | REPLY | 100 | 15 | 55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 64 C2 00 00 FF FF FF FF FF FF  ... | 55 55 55 55 55 55 55 C0 01 03 00 D1 01 D0 65 C2 00 00 FF FF FF FF FF FF  ... |
| 0xC33D:query-cumulative-startup-time | C33D / C33E | PASS | REPLY | 185260 | 10 | 55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 3D C3 00 00 FF FF FF FF FF FF  ... | 55 55 55 55 55 55 55 C0 01 03 00 D1 01 D0 3E C3 00 00 FF FF FF FF FF FF  ... |
