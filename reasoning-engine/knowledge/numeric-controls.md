# Numeric Controls Summary

This summary covers numeric controls that use protocol value byte range `0..100` (`0x00..0x64`).

| Control | Set Code | Query Code | UI Range | Protocol Range | Encoding | Checksum Mode |
|---|---|---|---|---|---|---|
| Volume | `C203` | `C201` | `0..100` | `0..100` | `proto = clamp(round(ui), 0, 100)` | Formula base `0x5B` |
| Brightness | `C21F` | `C21D` | `0..100` | `0..100` | `proto = clamp(round(ui), 0, 100)` | Formula base `0x77` |
| Contrast | `C217` | `C215` | `0..100` | `0..100` | `proto = clamp(round(ui), 0, 100)` | Default sum |
| Hue | `C262` | `C264` | `-50..50` | `0..100` | `proto = clamp(round(ui + 50), 0, 100)` | Default sum |
| Saturation | `C259` | `C257` | `0..100` | `0..100` | `proto = clamp(round(ui), 0, 100)` | Default sum |
| Red gain | `C223` | `C221` | `0..100` | `0..100` | `proto = clamp(round(ui), 0, 100)` | Default sum |
| Green gain | `C227` | `C225` | `0..100` | `0..100` | `proto = clamp(round(ui), 0, 100)` | Default sum |
| Blue gain | `C22B` (bytes) | `C229` | `0..100` | `0..100` | `proto = clamp(round(ui), 0, 100)` | Default sum |

## Hue Decoding

- Encoding: `proto = clamp(round(ui + 50), 0, 100)`
- Decoding: `ui = proto - 50`

## Workbook Inconsistency Note

Blue gain contains instruction-vs-byte code mismatch rows in workbook data.  
Use raw packet bytes and `set_code_derived` as authoritative when building/parsing packets.

See control-specific files in `controls/` and machine rules in `rules/numeric-encoding-rules.json`.
