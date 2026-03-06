# Command Index

This file is optimized for retrieval. It provides one searchable row per parsed command row from workbook sheets `X Wall V3 Integrated Control Pr` and `Ark1`.

| Set Code | Reply Code | Function | Description | Payload Length | Numeric | Query-like | Source |
|---|---|---|---|---:|---|---|---|
| C001 | C002 | Request device status | Idle | 2 | no | yes | eXview AIO Main Protocol:2 |
| C001 | C002 | Request device status | Busy | 2 | no | yes | eXview AIO Main Protocol:3 |
| C001 | C002 | Request device status | Device Exception | 2 | no | yes | eXview AIO Main Protocol:4 |
| C003 | C004 | Power on/off | Sleep | 1 | no | no | eXview AIO Main Protocol:5 |
| C003 | C004 | Power on/off | Wake Up | 1 | no | no | eXview AIO Main Protocol:6 |
| C005 | C006 | Query screen status | Query whether the device is in sleep/wake mode | 1 | no | yes | eXview AIO Main Protocol:107 |
| C005 | C006 | Query screen status |  | 1 | no | yes | eXview AIO Main Protocol:108 |
| C007 | C008 | Standby and restart | Standby (Power Off State) | 0 | no | no | eXview AIO Main Protocol:7 |
| C009 | C00A | Standby and restart | Restart | 0 | no | no | eXview AIO Main Protocol:8 |
| C201 | C202 | Query volume level | Get Current Volume Value | 1 | no | yes | eXview AIO Main Protocol:21 |
| C203 | C204 | Set volume level | 0 | 2 | yes | no | eXview AIO Main Protocol:10 |
| C203 | C204 | Set volume level | 10 | 2 | yes | no | eXview AIO Main Protocol:11 |
| C203 | C204 | Set volume level | 20 | 2 | yes | no | eXview AIO Main Protocol:12 |
| C203 | C204 | Set volume level | 30 | 2 | yes | no | eXview AIO Main Protocol:13 |
| C203 | C204 | Set volume level | 40 | 2 | yes | no | eXview AIO Main Protocol:14 |
| C203 | C204 | Set volume level | 50 | 2 | yes | no | eXview AIO Main Protocol:15 |
| C203 | C204 | Set volume level | 60 | 2 | yes | no | eXview AIO Main Protocol:16 |
| C203 | C204 | Set volume level | 70 | 2 | yes | no | eXview AIO Main Protocol:17 |
| C203 | C204 | Set volume level | 80 | 2 | yes | no | eXview AIO Main Protocol:18 |
| C203 | C204 | Set volume level | 90 | 2 | yes | no | eXview AIO Main Protocol:19 |
| C203 | C204 | Set volume level | 100 | 2 | yes | no | eXview AIO Main Protocol:20 |
| C211 | C212 | Query video source | Query current video source | 1 | no | yes | eXview AIO Main Protocol:82 |
| C213 | C214 | Set video source | 0(ANDROID) | 2 | no | no | eXview AIO Main Protocol:58 |
| C213 | C214 | Set video source | 1 (PC Reserved) | 2 | no | no | eXview AIO Main Protocol:59 |
| C213 | C214 | Set video source | 2(HDMI1) | 2 | no | no | eXview AIO Main Protocol:60 |
| C213 | C214 | Set video source | 3(HDMI2) | 2 | no | no | eXview AIO Main Protocol:61 |
| C213 | C214 | Set video source | 4(HDMI3) | 2 | no | no | eXview AIO Main Protocol:62 |
| C213 | C214 | Set video source | 5(HDMI4) | 2 | no | no | eXview AIO Main Protocol:63 |
| C215 | C216 | Query contrast level | Query Current Contrast | 1 | no | yes | eXview AIO Main Protocol:70 |
| C217 | C218 | Set contrast level | 0 | 2 | yes | no | eXview AIO Main Protocol:65 |
| C217 | C218 | Set contrast level | 25 | 2 | yes | no | eXview AIO Main Protocol:66 |
| C217 | C218 | Set contrast level | 50 | 2 | yes | no | eXview AIO Main Protocol:67 |
| C217 | C218 | Set contrast level | 75 | 2 | yes | no | eXview AIO Main Protocol:68 |
| C217 | C218 | Set contrast level | 100 | 2 | yes | no | eXview AIO Main Protocol:69 |
| C21B | C21C | Set color temperature mode | Standard 0x01 | 2 | no | no | eXview AIO Main Protocol:71 |
| C21B | C21C | Set color temperature mode | Warm Color 0x02 | 2 | no | no | eXview AIO Main Protocol:72 |
| C21B | C21C | Set color temperature mode | Cool Color 0x03 | 2 | no | no | eXview AIO Main Protocol:73 |
| C21B | C21C | Set color temperature mode | User 0x04 | 2 | no | no | eXview AIO Main Protocol:74 |
| C21D | C21E | Query brightness level | Query Current Brightness Value | 1 | no | yes | eXview AIO Main Protocol:33 |
| C21F | C220 | Set brightness level | 0 | 2 | yes | no | eXview AIO Main Protocol:22 |
| C21F | C220 | Set brightness level | 10 | 2 | yes | no | eXview AIO Main Protocol:23 |
| C21F | C220 | Set brightness level | 20 | 2 | yes | no | eXview AIO Main Protocol:24 |
| C21F | C220 | Set brightness level | 30 | 2 | yes | no | eXview AIO Main Protocol:25 |
| C21F | C220 | Set brightness level | 40 | 2 | yes | no | eXview AIO Main Protocol:26 |
| C21F | C220 | Set brightness level | 50 | 2 | yes | no | eXview AIO Main Protocol:27 |
| C21F | C220 | Set brightness level | 60 | 2 | yes | no | eXview AIO Main Protocol:28 |
| C21F | C220 | Set brightness level | 70 | 2 | yes | no | eXview AIO Main Protocol:29 |
| C21F | C220 | Set brightness level | 80 | 2 | yes | no | eXview AIO Main Protocol:30 |
| C21F | C220 | Set brightness level | 90 | 2 | yes | no | eXview AIO Main Protocol:31 |
| C21F | C220 | Set brightness level | 100 | 2 | yes | no | eXview AIO Main Protocol:32 |
| C221 | C222 | Query red gain value | Query Current Red Gain Value | 1 | no | yes | eXview AIO Main Protocol:94 |
| C223 | C224 | Set red gain | 0 | 2 | yes | no | eXview AIO Main Protocol:89 |
| C223 | C224 | Set red gain | 25 | 2 | yes | no | eXview AIO Main Protocol:90 |
| C223 | C224 | Set red gain | 50 | 2 | yes | no | eXview AIO Main Protocol:91 |
| C223 | C224 | Set red gain | 75 | 2 | yes | no | eXview AIO Main Protocol:92 |
| C223 | C224 | Set red gain | 100 | 2 | yes | no | eXview AIO Main Protocol:93 |
| C225 | C226 | Query current green gain value |  | 1 | no | yes | eXview AIO Main Protocol:100 |
| C225 | C22C | Set blue gain | 0 | 2 | no | no | eXview AIO Main Protocol:101 |
| C225 | C22C | Set blue gain | 25 | 2 | no | no | eXview AIO Main Protocol:102 |
| C225 | C22C | Set blue gain | 50 | 2 | no | no | eXview AIO Main Protocol:103 |
| C225 | C22C | Set blue gain | 75 | 2 | no | no | eXview AIO Main Protocol:104 |
| C225 | C22C | Set blue gain | 100 | 2 | no | no | eXview AIO Main Protocol:105 |
| C227 | C228 | Set green gain | 0 | 2 | yes | no | eXview AIO Main Protocol:95 |
| C227 | C228 | Set green gain | 25 | 2 | yes | no | eXview AIO Main Protocol:96 |
| C227 | C228 | Set green gain | 50 | 2 | yes | no | eXview AIO Main Protocol:97 |
| C227 | C228 | Set green gain | 75 | 2 | yes | no | eXview AIO Main Protocol:98 |
| C227 | C228 | Set green gain | 100 | 2 | yes | no | eXview AIO Main Protocol:99 |
| C229 | C22A | Query current blue gain value |  | 1 | no | yes | eXview AIO Main Protocol:106 |
| C241 | C242 | Get video combination information |  | 7 | no | no | eXview AIO Main Protocol:75 |
| C243 | C244 | Query scene mode |  | 1 | no | yes | eXview AIO Main Protocol:88 |
| C245 | C246 | Set scene mode | Conference mode | 2 | no | no | eXview AIO Main Protocol:83 |
| C245 | C246 | Set scene mode | Standard/Demo mode | 2 | no | no | eXview AIO Main Protocol:84 |
| C245 | C246 | Set scene mode | Soft/Eco mode | 2 | no | no | eXview AIO Main Protocol:85 |
| C245 | C246 | Set scene mode | Custom mode | 2 | no | no | eXview AIO Main Protocol:86 |
| C245 | C246 | Set scene mode | Theater mode | 2 | no | no | eXview AIO Main Protocol:87 |
| C249 | C24A | Split screen mode | Full screen mode | 2 | no | no | eXview AIO Main Protocol:76 |
| C249 | C24A | Split screen mode | Dual screen mode | 2 | no | no | eXview AIO Main Protocol:77 |
| C249 | C24A | Split screen mode | Center mode | 2 | no | no | eXview AIO Main Protocol:78 |
| C249 | C24A | Split screen mode | Quadrature split screen mode | 2 | no | no | eXview AIO Main Protocol:79 |
| C249 | C24A | Split screen mode | Five-split screen mode | 2 | no | no | eXview AIO Main Protocol:80 |
| C257 | C258 | Query saturation level | Query Current Saturation Value | 1 | no | yes | eXview AIO Main Protocol:45 |
| C259 | C25A | Set saturation level | 0 | 2 | yes | no | eXview AIO Main Protocol:34 |
| C259 | C25A | Set saturation level | 10 | 2 | yes | no | eXview AIO Main Protocol:35 |
| C259 | C25A | Set saturation level | 20 | 2 | yes | no | eXview AIO Main Protocol:36 |
| C259 | C25A | Set saturation level | 30 | 2 | yes | no | eXview AIO Main Protocol:37 |
| C259 | C25A | Set saturation level | 40 | 2 | yes | no | eXview AIO Main Protocol:38 |
| C259 | C25A | Set saturation level | 50 | 2 | yes | no | eXview AIO Main Protocol:39 |
| C259 | C25A | Set saturation level | 60 | 2 | yes | no | eXview AIO Main Protocol:40 |
| C259 | C25A | Set saturation level | 70 | 2 | yes | no | eXview AIO Main Protocol:41 |
| C259 | C25A | Set saturation level | 80 | 2 | yes | no | eXview AIO Main Protocol:42 |
| C259 | C25A | Set saturation level | 90 | 2 | yes | no | eXview AIO Main Protocol:43 |
| C259 | C25A | Set saturation level | 100 | 2 | yes | no | eXview AIO Main Protocol:44 |
| C25B | C25C | Ark1 additional command 0xC25B | Additional command from Ark1 sheet | 0 | no | no | eXview AIO Ark1 Addendum:1 |
| C25B | C25C | HDMI signal query | Query the current HDMI signal | 0 | no | yes | eXview AIO Main Protocol:64 |
| C262 | C263 | Set hue(color tone) level | -50 | 2 | yes | no | eXview AIO Main Protocol:46 |
| C262 | C263 | Set hue(color tone) level | -40 | 2 | yes | no | eXview AIO Main Protocol:47 |
| C262 | C263 | Set hue(color tone) level | -30 | 2 | yes | no | eXview AIO Main Protocol:48 |
| C262 | C263 | Set hue(color tone) level | -20 | 2 | yes | no | eXview AIO Main Protocol:49 |
| C262 | C263 | Set hue(color tone) level | -10 | 2 | yes | no | eXview AIO Main Protocol:50 |
| C262 | C263 | Set hue(color tone) level | 0 | 2 | yes | no | eXview AIO Main Protocol:51 |
| C262 | C263 | Set hue(color tone) level | 10 | 2 | yes | no | eXview AIO Main Protocol:52 |
| C262 | C263 | Set hue(color tone) level | 20 | 2 | yes | no | eXview AIO Main Protocol:53 |
| C262 | C263 | Set hue(color tone) level | 30 | 2 | yes | no | eXview AIO Main Protocol:54 |
| C262 | C263 | Set hue(color tone) level | 40 | 2 | yes | no | eXview AIO Main Protocol:55 |
| C262 | C263 | Set hue(color tone) level | 50 | 2 | yes | no | eXview AIO Main Protocol:56 |
| C264 | C265 | Query hue level | Query Current Hue Value | 1 | no | yes | eXview AIO Main Protocol:57 |
