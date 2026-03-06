# Failure Cases

Observed non-pass / no-reply examples from `truth.json`.

| Command Key | Set/Reply | Status | Transport | Meaning | TX | RX |
|---|---|---|---|---|---|---|
| 0xC003:sleep | C003 / C004 | SKIPPED | NO_REPLY | - | 55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 03 C0 00 00 FF FF FF FF FF FF  ... | - |
| 0xC003:wake-up | C003 / C004 | SKIPPED | NO_REPLY | - | 55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 03 C0 00 00 FF FF FF FF FF FF  ... | - |
| 0xC007:standby-power-off-state | C007 / C008 | SKIPPED | NO_REPLY | - | 55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 07 C0 00 00 FF FF FF FF FF FF  ... | - |
| 0xC009:power-on | C009 / C00A | SKIPPED | NO_REPLY | - | AA BB CC 01 00 00 01 DD EE FF | - |
| 0xC009:restart | C009 / C00A | SKIPPED | NO_REPLY | - | 55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 09 C0 00 00 FF FF FF FF FF FF  ... | - |
| 0xC020:row-116 | C020 / C021 | SKIPPED | NO_REPLY | - | 55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 20 C0 00 00 FF FF FF FF FF FF  ... | - |
| 0xC131:get-screen-monitoring-information | C131 / C132 | SKIPPED | NO_REPLY | - | 55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 31 C1 00 00 FF FF FF FF FF FF  ... | - |
| 0xC20D:query-current-aspect-ratio | C20D / C20E | SKIPPED | NO_REPLY | - | 55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 0D C2 00 00 FF FF FF FF FF FF  ... | - |
| 0xC20F:16-09 | C20F / C210 | SKIPPED | NO_REPLY | - | 55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 0F C2 00 00 FF FF FF FF FF FF  ... | - |
| 0xC20F:4-03 | C20F / C210 | SKIPPED | NO_REPLY | - | 55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 0F C2 00 00 FF FF FF FF FF FF  ... | - |
| 0xC20F:full-screen | C20F / C210 | SKIPPED | NO_REPLY | - | 55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 0F C2 00 00 FF FF FF FF FF FF  ... | - |
| 0xC20F:original | C20F / C210 | SKIPPED | NO_REPLY | - | 55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 0F C2 00 00 FF FF FF FF FF FF  ... | - |
| 0xC211:query-current-video-source | C211 / C212 | SKIPPED | NO_REPLY | No reply in split-screen mode (FW limitation) | 55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 11 C2 00 00 FF FF FF FF FF FF  ... | - |
