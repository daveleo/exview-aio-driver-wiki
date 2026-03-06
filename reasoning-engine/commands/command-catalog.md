# Command Catalog

One section per command row. Use this for chunked retrieval and deterministic citation.

## C001 -> C002 | Request device status | Idle

- Function: Request device status
- Description: Idle
- Set code: `C001`
- Reply code: `C002`
- Payload length (derived from RX tail marker): 2
- Source: eXview AIO Main Protocol row 2

TX hex:

```text
55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 01 C0 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 00 00 56
```

RX hex:

```text
55 55 55 55 55 55 55 C0 01 03 00 D1 01 D0 02 C0 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 02 00 01 00 5A
```

Instruction / notes:

```text
Set Command Code: 0xC001  
Response Command Code: 0xC002  

Response Data (2 bytes):  
- 0x0001 Idle – ready to accept commands  
- 0x0002 Busy – not accepting commands at the moment  
- 0x0003 Device fault

Idle, ready to receive commands
```

## C001 -> C002 | Request device status | Busy

- Function: Request device status
- Description: Busy
- Set code: `C001`
- Reply code: `C002`
- Payload length (derived from RX tail marker): 2
- Source: eXview AIO Main Protocol row 3

TX hex:

```text
55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 01 C0 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 00 00 56
```

RX hex:

```text
55 55 55 55 55 55 55 C0 01 03 00 D1 01 D0 02 C0 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 02 00 02 00 5B
```

Instruction / notes:

```text
Set Command Code: 0xC001  
Response Command Code: 0xC002  

Response Data (2 bytes):  
- 0x0001 Idle – ready to accept commands  
- 0x0002 Busy – not accepting commands at the moment  
- 0x0003 Device fault

Busy, temporarily unable to receive commands
```

## C001 -> C002 | Request device status | Device Exception

- Function: Request device status
- Description: Device Exception
- Set code: `C001`
- Reply code: `C002`
- Payload length (derived from RX tail marker): 2
- Source: eXview AIO Main Protocol row 4

TX hex:

```text
55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 01 C0 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 00 00 56
```

RX hex:

```text
55 55 55 55 55 55 55 C0 01 03 00 D1 01 D0 02 C0 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 02 00 03 00 5C
```

Instruction / notes:

```text
Set Command Code: 0xC001  
Response Command Code: 0xC002  

Response Data (2 bytes):  
- 0x0001 Idle – ready to accept commands  
- 0x0002 Busy – not accepting commands at the moment  
- 0x0003 Device fault

Device exception
```

## C003 -> C004 | Power on/off | Sleep

- Function: Power on/off
- Description: Sleep
- Set code: `C003`
- Reply code: `C004`
- Payload length (derived from RX tail marker): 1
- Source: eXview AIO Main Protocol row 5

TX hex:

```text
55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 03 C0 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 01 00 5F B8
```

RX hex:

```text
55 55 55 55 55 55 55 C0 01 03 00 D1 01 D0 04 C0 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 01 00 5F B9
```

Instruction / notes:

```text
Set Command Code: 0xC003  
Set Data (1 byte):  
- 0x5F Sleep  
- 0x5E Power On  

Response Command Code: 0xC004  
Response Data (1 byte):  
- 0x5F Sleep  
- 0x5E Power On
```

## C003 -> C004 | Power on/off | Wake Up

- Function: Power on/off
- Description: Wake Up
- Set code: `C003`
- Reply code: `C004`
- Payload length (derived from RX tail marker): 1
- Source: eXview AIO Main Protocol row 6

TX hex:

```text
55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 03 C0 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 01 00 5E B7
```

RX hex:

```text
55 55 55 55 55 55 55 C0 01 03 00 D1 01 D0 04 C0 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 01 00 5E B8
```

Instruction / notes:

```text
Set Command Code: 0xC003  
Set Data (1 byte):  
- 0x5F Sleep  
- 0x5E Power On  

Response Command Code: 0xC004  
Response Data (1 byte):  
- 0x5F Sleep  
- 0x5E Power On
```

## C005 -> C006 | Query screen status | Query whether the device is in sleep/wake mode

- Function: Query screen status
- Description: Query whether the device is in sleep/wake mode
- Set code: `C005`
- Reply code: `C006`
- Payload length (derived from RX tail marker): 1
- Source: eXview AIO Main Protocol row 107

TX hex:

```text
55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 05 C0 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 00 00 5A
```

RX hex:

```text
55 55 55 55 55 55 55 C0 01 03 00 D1 01 D0 06 C0 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 01 00 80 DC
```

Instruction / notes:

```text
Set Command Code: 0xC005  
Response Command Code: 0xC006  
Response Data (1 byte):  
- 0x80 Wake-up state (screen on)  
- 0x00 Sleep state (screen off)

Wake-up state
```

## C005 -> C006 | Query screen status

- Function: Query screen status
- Description: 
- Set code: `C005`
- Reply code: `C006`
- Payload length (derived from RX tail marker): 1
- Source: eXview AIO Main Protocol row 108

TX hex:

```text
55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 05 C0 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 00 00 5A
```

RX hex:

```text
55 55 55 55 55 55 55 C0 01 03 00 D1 01 D0 06 C0 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 01 00 00 5C
```

Instruction / notes:

```text
Set Command Code: 0xC005  
Response Command Code: 0xC006  
Response Data (1 byte):  
- 0x80 Wake-up state (screen on)  
- 0x00 Sleep state (screen off)

Sleep state (screen off)
```

## C007 -> C008 | Standby and restart | Standby (Power Off State)

- Function: Standby and restart
- Description: Standby (Power Off State)
- Set code: `C007`
- Reply code: `C008`
- Payload length (derived from RX tail marker): 0
- Source: eXview AIO Main Protocol row 7

TX hex:

```text
55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 07 C0 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 00 00 5C
```

RX hex:

```text
55 55 55 55 55 55 55 C0 01 03 00 D1 01 D0 08 C0 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 00 00 5D
```

Instruction / notes:

```text
Set Command Code: 0xC007  
Response Command Code: 0xC008
```

## C009 -> C00A | Standby and restart | Restart

- Function: Standby and restart
- Description: Restart
- Set code: `C009`
- Reply code: `C00A`
- Payload length (derived from RX tail marker): 0
- Source: eXview AIO Main Protocol row 8

TX hex:

```text
55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 09 C0 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 00 00 5E
```

RX hex:

```text
55 55 55 55 55 55 55 C0 01 03 00 D1 01 D0 0A C0 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 00 00 5F
```

Instruction / notes:

```text
Set Command Code: 0xC009  
Response Command Code: 0xC00A
```

## C201 -> C202 | Query volume level | Get Current Volume Value

- Function: Query volume level
- Description: Get Current Volume Value
- Set code: `C201`
- Reply code: `C202`
- Payload length (derived from RX tail marker): 1
- Source: eXview AIO Main Protocol row 21

TX hex:

```text
55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 01 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 00 00 58
```

RX hex:

```text
55 55 55 55 55 55 55 C0 01 03 00 D1 01 D0 02 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 01 00 14 6E
```

Instruction / notes:

```text
Set Command Code: 0xC201  
Response Command Code: 0xC202  
Response Data (1 byte): 0x00–0x64 (decimal 0～100)

Return volume value
```

## C203 -> C204 | Set volume level | 0

- Function: Set volume level
- Description: 0
- Set code: `C203`
- Reply code: `C204`
- Payload length (derived from RX tail marker): 2
- Source: eXview AIO Main Protocol row 10

TX hex:

```text
55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 03 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 01 00 00 5B
```

RX hex:

```text
55 55 55 55 55 55 55 C0 01 03 00 D1 01 D0 04 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 02 00 01 00 5E
```

Instruction / notes:

```text
Set Command Code: 0xC203  
Set Data (1 byte): 0x00–0x64 (decimal 0～100)

Response Command Code: 0xC204  
Response Data (2 bytes):  
- 0x0001 Success  
- 0x0002 Failure – unspecified reason  
- 0x0003 Failure – serial port not found  
- 0x0004 Failure – no response  
- 0x8001 Failure – busy  
- 0x8002 Failure – occupied (e.g., long-file transfer or firmware upgrade in progress)
```

## C203 -> C204 | Set volume level | 10

- Function: Set volume level
- Description: 10
- Set code: `C203`
- Reply code: `C204`
- Payload length (derived from RX tail marker): 2
- Source: eXview AIO Main Protocol row 11

TX hex:

```text
55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 03 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 01 00 0A 65
```

RX hex:

```text
55 55 55 55 55 55 55 C0 01 03 00 D1 01 D0 04 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 02 00 01 00 5E
```

Instruction / notes:

```text
Set Command Code: 0xC203  
Set Data (1 byte): 0x00–0x64 (decimal 0～100)

Response Command Code: 0xC204  
Response Data (2 bytes):  
- 0x0001 Success  
- 0x0002 Failure – unspecified reason  
- 0x0003 Failure – serial port not found  
- 0x0004 Failure – no response  
- 0x8001 Failure – busy  
- 0x8002 Failure – occupied (e.g., long-file transfer or firmware upgrade in progress)
```

## C203 -> C204 | Set volume level | 20

- Function: Set volume level
- Description: 20
- Set code: `C203`
- Reply code: `C204`
- Payload length (derived from RX tail marker): 2
- Source: eXview AIO Main Protocol row 12

TX hex:

```text
55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 03 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 01 00 14 6F
```

RX hex:

```text
55 55 55 55 55 55 55 C0 01 03 00 D1 01 D0 04 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 02 00 01 00 5E
```

Instruction / notes:

```text
Set Command Code: 0xC203  
Set Data (1 byte): 0x00–0x64 (decimal 0～100)

Response Command Code: 0xC204  
Response Data (2 bytes):  
- 0x0001 Success  
- 0x0002 Failure – unspecified reason  
- 0x0003 Failure – serial port not found  
- 0x0004 Failure – no response  
- 0x8001 Failure – busy  
- 0x8002 Failure – occupied (e.g., long-file transfer or firmware upgrade in progress)
```

## C203 -> C204 | Set volume level | 30

- Function: Set volume level
- Description: 30
- Set code: `C203`
- Reply code: `C204`
- Payload length (derived from RX tail marker): 2
- Source: eXview AIO Main Protocol row 13

TX hex:

```text
55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 03 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 01 00 1E 79
```

RX hex:

```text
55 55 55 55 55 55 55 C0 01 03 00 D1 01 D0 04 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 02 00 01 00 5E
```

Instruction / notes:

```text
Set Command Code: 0xC203  
Set Data (1 byte): 0x00–0x64 (decimal 0～100)

Response Command Code: 0xC204  
Response Data (2 bytes):  
- 0x0001 Success  
- 0x0002 Failure – unspecified reason  
- 0x0003 Failure – serial port not found  
- 0x0004 Failure – no response  
- 0x8001 Failure – busy  
- 0x8002 Failure – occupied (e.g., long-file transfer or firmware upgrade in progress)
```

## C203 -> C204 | Set volume level | 40

- Function: Set volume level
- Description: 40
- Set code: `C203`
- Reply code: `C204`
- Payload length (derived from RX tail marker): 2
- Source: eXview AIO Main Protocol row 14

TX hex:

```text
55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 03 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 01 00 28 83
```

RX hex:

```text
55 55 55 55 55 55 55 C0 01 03 00 D1 01 D0 04 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 02 00 01 00 5E
```

Instruction / notes:

```text
Set Command Code: 0xC203  
Set Data (1 byte): 0x00–0x64 (decimal 0～100)

Response Command Code: 0xC204  
Response Data (2 bytes):  
- 0x0001 Success  
- 0x0002 Failure – unspecified reason  
- 0x0003 Failure – serial port not found  
- 0x0004 Failure – no response  
- 0x8001 Failure – busy  
- 0x8002 Failure – occupied (e.g., long-file transfer or firmware upgrade in progress)
```

## C203 -> C204 | Set volume level | 50

- Function: Set volume level
- Description: 50
- Set code: `C203`
- Reply code: `C204`
- Payload length (derived from RX tail marker): 2
- Source: eXview AIO Main Protocol row 15

TX hex:

```text
55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 03 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 01 00 32 8D
```

RX hex:

```text
55 55 55 55 55 55 55 C0 01 03 00 D1 01 D0 04 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 02 00 01 00 5E
```

Instruction / notes:

```text
Set Command Code: 0xC203  
Set Data (1 byte): 0x00–0x64 (decimal 0～100)

Response Command Code: 0xC204  
Response Data (2 bytes):  
- 0x0001 Success  
- 0x0002 Failure – unspecified reason  
- 0x0003 Failure – serial port not found  
- 0x0004 Failure – no response  
- 0x8001 Failure – busy  
- 0x8002 Failure – occupied (e.g., long-file transfer or firmware upgrade in progress)
```

## C203 -> C204 | Set volume level | 60

- Function: Set volume level
- Description: 60
- Set code: `C203`
- Reply code: `C204`
- Payload length (derived from RX tail marker): 2
- Source: eXview AIO Main Protocol row 16

TX hex:

```text
55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 03 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 01 00 3C 97
```

RX hex:

```text
55 55 55 55 55 55 55 C0 01 03 00 D1 01 D0 04 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 02 00 01 00 5E
```

Instruction / notes:

```text
Set Command Code: 0xC203  
Set Data (1 byte): 0x00–0x64 (decimal 0～100)

Response Command Code: 0xC204  
Response Data (2 bytes):  
- 0x0001 Success  
- 0x0002 Failure – unspecified reason  
- 0x0003 Failure – serial port not found  
- 0x0004 Failure – no response  
- 0x8001 Failure – busy  
- 0x8002 Failure – occupied (e.g., long-file transfer or firmware upgrade in progress)
```

## C203 -> C204 | Set volume level | 70

- Function: Set volume level
- Description: 70
- Set code: `C203`
- Reply code: `C204`
- Payload length (derived from RX tail marker): 2
- Source: eXview AIO Main Protocol row 17

TX hex:

```text
55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 03 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 01 00 46 A1
```

RX hex:

```text
55 55 55 55 55 55 55 C0 01 03 00 D1 01 D0 04 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 02 00 01 00 5E
```

Instruction / notes:

```text
Set Command Code: 0xC203  
Set Data (1 byte): 0x00–0x64 (decimal 0～100)

Response Command Code: 0xC204  
Response Data (2 bytes):  
- 0x0001 Success  
- 0x0002 Failure – unspecified reason  
- 0x0003 Failure – serial port not found  
- 0x0004 Failure – no response  
- 0x8001 Failure – busy  
- 0x8002 Failure – occupied (e.g., long-file transfer or firmware upgrade in progress)
```

## C203 -> C204 | Set volume level | 80

- Function: Set volume level
- Description: 80
- Set code: `C203`
- Reply code: `C204`
- Payload length (derived from RX tail marker): 2
- Source: eXview AIO Main Protocol row 18

TX hex:

```text
55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 03 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 01 00 50 AB
```

RX hex:

```text
55 55 55 55 55 55 55 C0 01 03 00 D1 01 D0 04 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 02 00 01 00 5E
```

Instruction / notes:

```text
Set Command Code: 0xC203  
Set Data (1 byte): 0x00–0x64 (decimal 0～100)

Response Command Code: 0xC204  
Response Data (2 bytes):  
- 0x0001 Success  
- 0x0002 Failure – unspecified reason  
- 0x0003 Failure – serial port not found  
- 0x0004 Failure – no response  
- 0x8001 Failure – busy  
- 0x8002 Failure – occupied (e.g., long-file transfer or firmware upgrade in progress)
```

## C203 -> C204 | Set volume level | 90

- Function: Set volume level
- Description: 90
- Set code: `C203`
- Reply code: `C204`
- Payload length (derived from RX tail marker): 2
- Source: eXview AIO Main Protocol row 19

TX hex:

```text
55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 03 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 01 00 5A B5
```

RX hex:

```text
55 55 55 55 55 55 55 C0 01 03 00 D1 01 D0 04 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 02 00 01 00 5E
```

Instruction / notes:

```text
Set Command Code: 0xC203  
Set Data (1 byte): 0x00–0x64 (decimal 0～100)

Response Command Code: 0xC204  
Response Data (2 bytes):  
- 0x0001 Success  
- 0x0002 Failure – unspecified reason  
- 0x0003 Failure – serial port not found  
- 0x0004 Failure – no response  
- 0x8001 Failure – busy  
- 0x8002 Failure – occupied (e.g., long-file transfer or firmware upgrade in progress)
```

## C203 -> C204 | Set volume level | 100

- Function: Set volume level
- Description: 100
- Set code: `C203`
- Reply code: `C204`
- Payload length (derived from RX tail marker): 2
- Source: eXview AIO Main Protocol row 20

TX hex:

```text
55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 03 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 01 00 64 BF
```

RX hex:

```text
55 55 55 55 55 55 55 C0 01 03 00 D1 01 D0 04 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 02 00 01 00 5E
```

Instruction / notes:

```text
Set Command Code: 0xC203  
Set Data (1 byte): 0x00–0x64 (decimal 0～100)

Response Command Code: 0xC204  
Response Data (2 bytes):  
- 0x0001 Success  
- 0x0002 Failure – unspecified reason  
- 0x0003 Failure – serial port not found  
- 0x0004 Failure – no response  
- 0x8001 Failure – busy  
- 0x8002 Failure – occupied (e.g., long-file transfer or firmware upgrade in progress)
```

## C211 -> C212 | Query video source | Query current video source

- Function: Query video source
- Description: Query current video source
- Set code: `C211`
- Reply code: `C212`
- Payload length (derived from RX tail marker): 1
- Source: eXview AIO Main Protocol row 82

TX hex:

```text
55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 11 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 00 00 68
```

RX hex:

```text
55 55 55 55 55 55 55 C0 01 03 00 D1 01 D0 12 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 01 00 00 6A
```

Instruction / notes:

```text
Set Command Code: 0xC211  
Response Command Code: 0xC212  
Response Data (1 byte):  
- 0x00 Android  
- 0x01 Windows  
- 0x02 HDMI1  
- 0x03 HDMI2  
- 0x04 HDMI3  
- 0x06 HDMI4
```

## C213 -> C214 | Set video source | 0(ANDROID)

- Function: Set video source
- Description: 0(ANDROID)
- Set code: `C213`
- Reply code: `C214`
- Payload length (derived from RX tail marker): 2
- Source: eXview AIO Main Protocol row 58

TX hex:

```text
55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 13 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 01 00 00 6B
```

RX hex:

```text
55 55 55 55 55 55 55 C0 01 03 00 D1 01 D0 14 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 02 00 01 00 6E
```

Instruction / notes:

```text
Set Command Code: 0xC213  
Set Data (1 byte):  
- 0x00 Android  
- 0x01 Windows  
- 0x02 HDMI1  
- 0x03 HDMI2  
- 0x04 HDMI3  
- 0x06 HDMI4  

Response Command Code: 0xC214  
Response Data (2 bytes):  
- 0x0001 Success  
- 0x0002 Failure – unspecified reason  
- 0x0003 Failure – serial port not found  
- 0x0004 Failure – no response  
- 0x8001 Failure – busy  
- 0x8002 Failure – occupied (e.g., long-file transfer or firmware upgrade in progress)
```

## C213 -> C214 | Set video source | 1 (PC Reserved)

- Function: Set video source
- Description: 1 (PC Reserved)
- Set code: `C213`
- Reply code: `C214`
- Payload length (derived from RX tail marker): 2
- Source: eXview AIO Main Protocol row 59

TX hex:

```text
55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 13 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 01 00 01 6C
```

RX hex:

```text
55 55 55 55 55 55 55 C0 01 03 00 D1 01 D0 14 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 02 00 01 00 6E
```

Instruction / notes:

```text
Set Command Code: 0xC213  
Set Data (1 byte):  
- 0x00 Android  
- 0x01 Windows  
- 0x02 HDMI1  
- 0x03 HDMI2  
- 0x04 HDMI3  
- 0x06 HDMI4  

Response Command Code: 0xC214  
Response Data (2 bytes):  
- 0x0001 Success  
- 0x0002 Failure – unspecified reason  
- 0x0003 Failure – serial port not found  
- 0x0004 Failure – no response  
- 0x8001 Failure – busy  
- 0x8002 Failure – occupied (e.g., long-file transfer or firmware upgrade in progress)
```

## C213 -> C214 | Set video source | 2(HDMI1)

- Function: Set video source
- Description: 2(HDMI1)
- Set code: `C213`
- Reply code: `C214`
- Payload length (derived from RX tail marker): 2
- Source: eXview AIO Main Protocol row 60

TX hex:

```text
55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 13 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 01 00 02 6D
```

RX hex:

```text
55 55 55 55 55 55 55 C0 01 03 00 D1 01 D0 14 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 02 00 01 00 6E
```

Instruction / notes:

```text
Set Command Code: 0xC213  
Set Data (1 byte):  
- 0x00 Android  
- 0x01 Windows  
- 0x02 HDMI1  
- 0x03 HDMI2  
- 0x04 HDMI3  
- 0x06 HDMI4  

Response Command Code: 0xC214  
Response Data (2 bytes):  
- 0x0001 Success  
- 0x0002 Failure – unspecified reason  
- 0x0003 Failure – serial port not found  
- 0x0004 Failure – no response  
- 0x8001 Failure – busy  
- 0x8002 Failure – occupied (e.g., long-file transfer or firmware upgrade in progress)
```

## C213 -> C214 | Set video source | 3(HDMI2)

- Function: Set video source
- Description: 3(HDMI2)
- Set code: `C213`
- Reply code: `C214`
- Payload length (derived from RX tail marker): 2
- Source: eXview AIO Main Protocol row 61

TX hex:

```text
55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 13 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 01 00 03 6E
```

RX hex:

```text
55 55 55 55 55 55 55 C0 01 03 00 D1 01 D0 14 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 02 00 01 00 6E
```

Instruction / notes:

```text
Set Command Code: 0xC213  
Set Data (1 byte):  
- 0x00 Android  
- 0x01 Windows  
- 0x02 HDMI1  
- 0x03 HDMI2  
- 0x04 HDMI3  
- 0x06 HDMI4  

Response Command Code: 0xC214  
Response Data (2 bytes):  
- 0x0001 Success  
- 0x0002 Failure – unspecified reason  
- 0x0003 Failure – serial port not found  
- 0x0004 Failure – no response  
- 0x8001 Failure – busy  
- 0x8002 Failure – occupied (e.g., long-file transfer or firmware upgrade in progress)
```

## C213 -> C214 | Set video source | 4(HDMI3)

- Function: Set video source
- Description: 4(HDMI3)
- Set code: `C213`
- Reply code: `C214`
- Payload length (derived from RX tail marker): 2
- Source: eXview AIO Main Protocol row 62

TX hex:

```text
55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 13 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 01 00 04 6F
```

RX hex:

```text
55 55 55 55 55 55 55 C0 01 03 00 D1 01 D0 14 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 02 00 01 00 6E
```

Instruction / notes:

```text
Set Command Code: 0xC213  
Set Data (1 byte):  
- 0x00 Android  
- 0x01 Windows  
- 0x02 HDMI1  
- 0x03 HDMI2  
- 0x04 HDMI3  
- 0x06 HDMI4  

Response Command Code: 0xC214  
Response Data (2 bytes):  
- 0x0001 Success  
- 0x0002 Failure – unspecified reason  
- 0x0003 Failure – serial port not found  
- 0x0004 Failure – no response  
- 0x8001 Failure – busy  
- 0x8002 Failure – occupied (e.g., long-file transfer or firmware upgrade in progress)
```

## C213 -> C214 | Set video source | 5(HDMI4)

- Function: Set video source
- Description: 5(HDMI4)
- Set code: `C213`
- Reply code: `C214`
- Payload length (derived from RX tail marker): 2
- Source: eXview AIO Main Protocol row 63

TX hex:

```text
55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 13 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 01 00 06 71
```

RX hex:

```text
55 55 55 55 55 55 55 C0 01 03 00 D1 01 D0 14 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 02 00 01 00 6E
```

Instruction / notes:

```text
Set Command Code: 0xC213  
Set Data (1 byte):  
- 0x00 Android  
- 0x01 Windows  
- 0x02 HDMI1  
- 0x03 HDMI2  
- 0x04 HDMI3  
- 0x06 HDMI4  

Response Command Code: 0xC214  
Response Data (2 bytes):  
- 0x0001 Success  
- 0x0002 Failure – unspecified reason  
- 0x0003 Failure – serial port not found  
- 0x0004 Failure – no response  
- 0x8001 Failure – busy  
- 0x8002 Failure – occupied (e.g., long-file transfer or firmware upgrade in progress)
```

## C215 -> C216 | Query contrast level | Query Current Contrast

- Function: Query contrast level
- Description: Query Current Contrast
- Set code: `C215`
- Reply code: `C216`
- Payload length (derived from RX tail marker): 1
- Source: eXview AIO Main Protocol row 70

TX hex:

```text
55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 15 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 00 00 6C
```

RX hex:

```text
55 55 55 55 55 55 55 C0 01 03 00 D1 01 D0 16 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 01 00 32 A0
```

Instruction / notes:

```text
Set Command Code: 0xC215  
Response Command Code: 0xC216  
Response Data (1 byte): 0x00–0x64 (decimal 0～100)

Return contrast
```

## C217 -> C218 | Set contrast level | 0

- Function: Set contrast level
- Description: 0
- Set code: `C217`
- Reply code: `C218`
- Payload length (derived from RX tail marker): 2
- Source: eXview AIO Main Protocol row 65

TX hex:

```text
55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 17 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 01 00 00 6F
```

RX hex:

```text
55 55 55 55 55 55 55 C0 01 03 00 D1 01 D0 18 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 02 00 01 00 72
```

Instruction / notes:

```text
Set Command Code: 0xC217  
Set Data (1 byte): 0x00–0x64 (decimal 0～100)

Response Command Code: 0xC218  
Response Data (2 bytes):  
- 0x0001 Success  
- 0x0002 Failure – unspecified reason  
- 0x0003 Failure – serial port not found  
- 0x0004 Failure – no response  
- 0x8001 Failure – busy  
- 0x8002 Failure – occupied (e.g., long-file transfer or firmware upgrade in progress)
```

## C217 -> C218 | Set contrast level | 25

- Function: Set contrast level
- Description: 25
- Set code: `C217`
- Reply code: `C218`
- Payload length (derived from RX tail marker): 2
- Source: eXview AIO Main Protocol row 66

TX hex:

```text
55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 17 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 01 00 19 88
```

RX hex:

```text
55 55 55 55 55 55 55 C0 01 03 00 D1 01 D0 18 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 02 00 01 00 72
```

Instruction / notes:

```text
Set Command Code: 0xC217  
Set Data (1 byte): 0x00–0x64 (decimal 0～100)

Response Command Code: 0xC218  
Response Data (2 bytes):  
- 0x0001 Success  
- 0x0002 Failure – unspecified reason  
- 0x0003 Failure – serial port not found  
- 0x0004 Failure – no response  
- 0x8001 Failure – busy  
- 0x8002 Failure – occupied (e.g., long-file transfer or firmware upgrade in progress)
```

## C217 -> C218 | Set contrast level | 50

- Function: Set contrast level
- Description: 50
- Set code: `C217`
- Reply code: `C218`
- Payload length (derived from RX tail marker): 2
- Source: eXview AIO Main Protocol row 67

TX hex:

```text
55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 17 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 01 00 32 A1
```

RX hex:

```text
55 55 55 55 55 55 55 C0 01 03 00 D1 01 D0 18 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 02 00 01 00 72
```

Instruction / notes:

```text
Set Command Code: 0xC217  
Set Data (1 byte): 0x00–0x64 (decimal 0～100)

Response Command Code: 0xC218  
Response Data (2 bytes):  
- 0x0001 Success  
- 0x0002 Failure – unspecified reason  
- 0x0003 Failure – serial port not found  
- 0x0004 Failure – no response  
- 0x8001 Failure – busy  
- 0x8002 Failure – occupied (e.g., long-file transfer or firmware upgrade in progress)
```

## C217 -> C218 | Set contrast level | 75

- Function: Set contrast level
- Description: 75
- Set code: `C217`
- Reply code: `C218`
- Payload length (derived from RX tail marker): 2
- Source: eXview AIO Main Protocol row 68

TX hex:

```text
55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 17 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 01 00 4B BA
```

RX hex:

```text
55 55 55 55 55 55 55 C0 01 03 00 D1 01 D0 18 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 02 00 01 00 72
```

Instruction / notes:

```text
Set Command Code: 0xC217  
Set Data (1 byte): 0x00–0x64 (decimal 0～100)

Response Command Code: 0xC218  
Response Data (2 bytes):  
- 0x0001 Success  
- 0x0002 Failure – unspecified reason  
- 0x0003 Failure – serial port not found  
- 0x0004 Failure – no response  
- 0x8001 Failure – busy  
- 0x8002 Failure – occupied (e.g., long-file transfer or firmware upgrade in progress)
```

## C217 -> C218 | Set contrast level | 100

- Function: Set contrast level
- Description: 100
- Set code: `C217`
- Reply code: `C218`
- Payload length (derived from RX tail marker): 2
- Source: eXview AIO Main Protocol row 69

TX hex:

```text
55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 17 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 01 00 64 D3
```

RX hex:

```text
55 55 55 55 55 55 55 C0 01 03 00 D1 01 D0 18 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 02 00 01 00 72
```

Instruction / notes:

```text
Set Command Code: 0xC217  
Set Data (1 byte): 0x00–0x64 (decimal 0～100)

Response Command Code: 0xC218  
Response Data (2 bytes):  
- 0x0001 Success  
- 0x0002 Failure – unspecified reason  
- 0x0003 Failure – serial port not found  
- 0x0004 Failure – no response  
- 0x8001 Failure – busy  
- 0x8002 Failure – occupied (e.g., long-file transfer or firmware upgrade in progress)
```

## C21B -> C21C | Set color temperature mode | Standard 0x01

- Function: Set color temperature mode
- Description: Standard 0x01
- Set code: `C21B`
- Reply code: `C21C`
- Payload length (derived from RX tail marker): 2
- Source: eXview AIO Main Protocol row 71

TX hex:

```text
55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 1B C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 01 00 01 74
```

RX hex:

```text
55 55 55 55 55 55 55 C0 01 03 00 D1 01 D0 1C C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 02 00 01 00 76
```

Instruction / notes:

```text
Set Command Code: 0xC21B  
Set Data (1 byte):  
- 0x01 Standard  
- 0x02 Warm  
- 0x03 Cool  
- 0x04 User-defined  

Response Command Code: 0xC21C  
Response Data (2 bytes):  
- 0x0001 Success  
- 0x0002 Failure – unspecified reason  
- 0x0003 Failure – serial port not found  
- 0x0004 Failure – no response  
- 0x8001 Failure – busy  
- 0x8002 Failure – occupied (e.g., long-file transfer or firmware upgrade in progress)
```

## C21B -> C21C | Set color temperature mode | Warm Color 0x02

- Function: Set color temperature mode
- Description: Warm Color 0x02
- Set code: `C21B`
- Reply code: `C21C`
- Payload length (derived from RX tail marker): 2
- Source: eXview AIO Main Protocol row 72

TX hex:

```text
55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 1B C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 01 00 02 75
```

RX hex:

```text
55 55 55 55 55 55 55 C0 01 03 00 D1 01 D0 1C C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 02 00 01 00 76
```

Instruction / notes:

```text
Set Command Code: 0xC21B  
Set Data (1 byte):  
- 0x01 Standard  
- 0x02 Warm  
- 0x03 Cool  
- 0x04 User-defined  

Response Command Code: 0xC21C  
Response Data (2 bytes):  
- 0x0001 Success  
- 0x0002 Failure – unspecified reason  
- 0x0003 Failure – serial port not found  
- 0x0004 Failure – no response  
- 0x8001 Failure – busy  
- 0x8002 Failure – occupied (e.g., long-file transfer or firmware upgrade in progress)
```

## C21B -> C21C | Set color temperature mode | Cool Color 0x03

- Function: Set color temperature mode
- Description: Cool Color 0x03
- Set code: `C21B`
- Reply code: `C21C`
- Payload length (derived from RX tail marker): 2
- Source: eXview AIO Main Protocol row 73

TX hex:

```text
55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 1B C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 01 00 03 76
```

RX hex:

```text
55 55 55 55 55 55 55 C0 01 03 00 D1 01 D0 1C C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 02 00 01 00 76
```

Instruction / notes:

```text
Set Command Code: 0xC21B  
Set Data (1 byte):  
- 0x01 Standard  
- 0x02 Warm  
- 0x03 Cool  
- 0x04 User-defined  

Response Command Code: 0xC21C  
Response Data (2 bytes):  
- 0x0001 Success  
- 0x0002 Failure – unspecified reason  
- 0x0003 Failure – serial port not found  
- 0x0004 Failure – no response  
- 0x8001 Failure – busy  
- 0x8002 Failure – occupied (e.g., long-file transfer or firmware upgrade in progress)
```

## C21B -> C21C | Set color temperature mode | User 0x04

- Function: Set color temperature mode
- Description: User 0x04
- Set code: `C21B`
- Reply code: `C21C`
- Payload length (derived from RX tail marker): 2
- Source: eXview AIO Main Protocol row 74

TX hex:

```text
55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 1B C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 01 00 04 77
```

RX hex:

```text
55 55 55 55 55 55 55 C0 01 03 00 D1 01 D0 1C C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 02 00 01 00 76
```

Instruction / notes:

```text
Set Command Code: 0xC21B  
Set Data (1 byte):  
- 0x01 Standard  
- 0x02 Warm  
- 0x03 Cool  
- 0x04 User-defined  

Response Command Code: 0xC21C  
Response Data (2 bytes):  
- 0x0001 Success  
- 0x0002 Failure – unspecified reason  
- 0x0003 Failure – serial port not found  
- 0x0004 Failure – no response  
- 0x8001 Failure – busy  
- 0x8002 Failure – occupied (e.g., long-file transfer or firmware upgrade in progress)
```

## C21D -> C21E | Query brightness level | Query Current Brightness Value

- Function: Query brightness level
- Description: Query Current Brightness Value
- Set code: `C21D`
- Reply code: `C21E`
- Payload length (derived from RX tail marker): 1
- Source: eXview AIO Main Protocol row 33

TX hex:

```text
55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 1D C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 00 00 74
```

RX hex:

```text
55 55 55 55 55 55 55 C0 01 03 00 D1 01 D0 1E C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 01 00 64 DA
```

Instruction / notes:

```text
Set Command Code: 0xC21D  
Response Command Code: 0xC21E  
Response Data (1 byte): 0x00–0x64 (decimal 0～100)

Return brightness value
```

## C21F -> C220 | Set brightness level | 0

- Function: Set brightness level
- Description: 0
- Set code: `C21F`
- Reply code: `C220`
- Payload length (derived from RX tail marker): 2
- Source: eXview AIO Main Protocol row 22

TX hex:

```text
55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 1F C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 01 00 00 77
```

RX hex:

```text
55 55 55 55 55 55 55 C0 01 03 00 D1 01 D0 20 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 02 00 01 00 7A
```

Instruction / notes:

```text
Set Command Code: 0xC21F  
Set Data (1 byte): 0x00–0x64 (decimal 0～100)

Response Command Code: 0xC220  
Response Data (2 bytes):  
- 0x0001 Success  
- 0x0002 Failure – unspecified reason  
- 0x0003 Failure – serial port not found  
- 0x0004 Failure – no response  
- 0x8001 Failure – busy  
- 0x8002 Failure – occupied (e.g., long file transfer or firmware upgrade in progress)
```

## C21F -> C220 | Set brightness level | 10

- Function: Set brightness level
- Description: 10
- Set code: `C21F`
- Reply code: `C220`
- Payload length (derived from RX tail marker): 2
- Source: eXview AIO Main Protocol row 23

TX hex:

```text
55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 1F C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 01 00 0A 81
```

RX hex:

```text
55 55 55 55 55 55 55 C0 01 03 00 D1 01 D0 20 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 02 00 01 00 7A
```

Instruction / notes:

```text
Set Command Code: 0xC21F  
Set Data (1 byte): 0x00–0x64 (decimal 0～100)

Response Command Code: 0xC220  
Response Data (2 bytes):  
- 0x0001 Success  
- 0x0002 Failure – unspecified reason  
- 0x0003 Failure – serial port not found  
- 0x0004 Failure – no response  
- 0x8001 Failure – busy  
- 0x8002 Failure – occupied (e.g., long file transfer or firmware upgrade in progress)
```

## C21F -> C220 | Set brightness level | 20

- Function: Set brightness level
- Description: 20
- Set code: `C21F`
- Reply code: `C220`
- Payload length (derived from RX tail marker): 2
- Source: eXview AIO Main Protocol row 24

TX hex:

```text
55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 1F C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 01 00 14 8B
```

RX hex:

```text
55 55 55 55 55 55 55 C0 01 03 00 D1 01 D0 20 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 02 00 01 00 7A
```

Instruction / notes:

```text
Set Command Code: 0xC21F  
Set Data (1 byte): 0x00–0x64 (decimal 0～100)

Response Command Code: 0xC220  
Response Data (2 bytes):  
- 0x0001 Success  
- 0x0002 Failure – unspecified reason  
- 0x0003 Failure – serial port not found  
- 0x0004 Failure – no response  
- 0x8001 Failure – busy  
- 0x8002 Failure – occupied (e.g., long file transfer or firmware upgrade in progress)
```

## C21F -> C220 | Set brightness level | 30

- Function: Set brightness level
- Description: 30
- Set code: `C21F`
- Reply code: `C220`
- Payload length (derived from RX tail marker): 2
- Source: eXview AIO Main Protocol row 25

TX hex:

```text
55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 1F C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 01 00 1E 95
```

RX hex:

```text
55 55 55 55 55 55 55 C0 01 03 00 D1 01 D0 20 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 02 00 01 00 7A
```

Instruction / notes:

```text
Set Command Code: 0xC21F  
Set Data (1 byte): 0x00–0x64 (decimal 0～100)

Response Command Code: 0xC220  
Response Data (2 bytes):  
- 0x0001 Success  
- 0x0002 Failure – unspecified reason  
- 0x0003 Failure – serial port not found  
- 0x0004 Failure – no response  
- 0x8001 Failure – busy  
- 0x8002 Failure – occupied (e.g., long file transfer or firmware upgrade in progress)
```

## C21F -> C220 | Set brightness level | 40

- Function: Set brightness level
- Description: 40
- Set code: `C21F`
- Reply code: `C220`
- Payload length (derived from RX tail marker): 2
- Source: eXview AIO Main Protocol row 26

TX hex:

```text
55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 1F C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 01 00 28 9F
```

RX hex:

```text
55 55 55 55 55 55 55 C0 01 03 00 D1 01 D0 20 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 02 00 01 00 7A
```

Instruction / notes:

```text
Set Command Code: 0xC21F  
Set Data (1 byte): 0x00–0x64 (decimal 0～100)

Response Command Code: 0xC220  
Response Data (2 bytes):  
- 0x0001 Success  
- 0x0002 Failure – unspecified reason  
- 0x0003 Failure – serial port not found  
- 0x0004 Failure – no response  
- 0x8001 Failure – busy  
- 0x8002 Failure – occupied (e.g., long file transfer or firmware upgrade in progress)
```

## C21F -> C220 | Set brightness level | 50

- Function: Set brightness level
- Description: 50
- Set code: `C21F`
- Reply code: `C220`
- Payload length (derived from RX tail marker): 2
- Source: eXview AIO Main Protocol row 27

TX hex:

```text
55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 1F C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 01 00 32 A9
```

RX hex:

```text
55 55 55 55 55 55 55 C0 01 03 00 D1 01 D0 20 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 02 00 01 00 7A
```

Instruction / notes:

```text
Set Command Code: 0xC21F  
Set Data (1 byte): 0x00–0x64 (decimal 0～100)

Response Command Code: 0xC220  
Response Data (2 bytes):  
- 0x0001 Success  
- 0x0002 Failure – unspecified reason  
- 0x0003 Failure – serial port not found  
- 0x0004 Failure – no response  
- 0x8001 Failure – busy  
- 0x8002 Failure – occupied (e.g., long file transfer or firmware upgrade in progress)
```

## C21F -> C220 | Set brightness level | 60

- Function: Set brightness level
- Description: 60
- Set code: `C21F`
- Reply code: `C220`
- Payload length (derived from RX tail marker): 2
- Source: eXview AIO Main Protocol row 28

TX hex:

```text
55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 1F C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 01 00 3C B3
```

RX hex:

```text
55 55 55 55 55 55 55 C0 01 03 00 D1 01 D0 20 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 02 00 01 00 7A
```

Instruction / notes:

```text
Set Command Code: 0xC21F  
Set Data (1 byte): 0x00–0x64 (decimal 0～100)

Response Command Code: 0xC220  
Response Data (2 bytes):  
- 0x0001 Success  
- 0x0002 Failure – unspecified reason  
- 0x0003 Failure – serial port not found  
- 0x0004 Failure – no response  
- 0x8001 Failure – busy  
- 0x8002 Failure – occupied (e.g., long file transfer or firmware upgrade in progress)
```

## C21F -> C220 | Set brightness level | 70

- Function: Set brightness level
- Description: 70
- Set code: `C21F`
- Reply code: `C220`
- Payload length (derived from RX tail marker): 2
- Source: eXview AIO Main Protocol row 29

TX hex:

```text
55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 1F C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 01 00 46 BD
```

RX hex:

```text
55 55 55 55 55 55 55 C0 01 03 00 D1 01 D0 20 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 02 00 01 00 7A
```

Instruction / notes:

```text
Set Command Code: 0xC21F  
Set Data (1 byte): 0x00–0x64 (decimal 0～100)

Response Command Code: 0xC220  
Response Data (2 bytes):  
- 0x0001 Success  
- 0x0002 Failure – unspecified reason  
- 0x0003 Failure – serial port not found  
- 0x0004 Failure – no response  
- 0x8001 Failure – busy  
- 0x8002 Failure – occupied (e.g., long file transfer or firmware upgrade in progress)
```

## C21F -> C220 | Set brightness level | 80

- Function: Set brightness level
- Description: 80
- Set code: `C21F`
- Reply code: `C220`
- Payload length (derived from RX tail marker): 2
- Source: eXview AIO Main Protocol row 30

TX hex:

```text
55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 1F C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 01 00 50 C7
```

RX hex:

```text
55 55 55 55 55 55 55 C0 01 03 00 D1 01 D0 20 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 02 00 01 00 7A
```

Instruction / notes:

```text
Set Command Code: 0xC21F  
Set Data (1 byte): 0x00–0x64 (decimal 0～100)

Response Command Code: 0xC220  
Response Data (2 bytes):  
- 0x0001 Success  
- 0x0002 Failure – unspecified reason  
- 0x0003 Failure – serial port not found  
- 0x0004 Failure – no response  
- 0x8001 Failure – busy  
- 0x8002 Failure – occupied (e.g., long file transfer or firmware upgrade in progress)
```

## C21F -> C220 | Set brightness level | 90

- Function: Set brightness level
- Description: 90
- Set code: `C21F`
- Reply code: `C220`
- Payload length (derived from RX tail marker): 2
- Source: eXview AIO Main Protocol row 31

TX hex:

```text
55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 1F C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 01 00 5A D1
```

RX hex:

```text
55 55 55 55 55 55 55 C0 01 03 00 D1 01 D0 20 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 02 00 01 00 7A
```

Instruction / notes:

```text
Set Command Code: 0xC21F  
Set Data (1 byte): 0x00–0x64 (decimal 0～100)

Response Command Code: 0xC220  
Response Data (2 bytes):  
- 0x0001 Success  
- 0x0002 Failure – unspecified reason  
- 0x0003 Failure – serial port not found  
- 0x0004 Failure – no response  
- 0x8001 Failure – busy  
- 0x8002 Failure – occupied (e.g., long file transfer or firmware upgrade in progress)
```

## C21F -> C220 | Set brightness level | 100

- Function: Set brightness level
- Description: 100
- Set code: `C21F`
- Reply code: `C220`
- Payload length (derived from RX tail marker): 2
- Source: eXview AIO Main Protocol row 32

TX hex:

```text
55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 1F C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 01 00 64 DB
```

RX hex:

```text
55 55 55 55 55 55 55 C0 01 03 00 D1 01 D0 20 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 02 00 01 00 7A
```

Instruction / notes:

```text
Set Command Code: 0xC21F  
Set Data (1 byte): 0x00–0x64 (decimal 0～100)

Response Command Code: 0xC220  
Response Data (2 bytes):  
- 0x0001 Success  
- 0x0002 Failure – unspecified reason  
- 0x0003 Failure – serial port not found  
- 0x0004 Failure – no response  
- 0x8001 Failure – busy  
- 0x8002 Failure – occupied (e.g., long file transfer or firmware upgrade in progress)
```

## C221 -> C222 | Query red gain value | Query Current Red Gain Value

- Function: Query red gain value
- Description: Query Current Red Gain Value
- Set code: `C221`
- Reply code: `C222`
- Payload length (derived from RX tail marker): 1
- Source: eXview AIO Main Protocol row 94

TX hex:

```text
55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 21 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 00 00 78
```

RX hex:

```text
55 55 55 55 55 55 55 C0 01 03 00 D1 01 D0 22 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 01 00 46 C0
```

Instruction / notes:

```text
Set Command Code: 0xC221  
Response Command Code: 0xC222  
Response Data (1 byte): 0x00–0x64 (decimal 0～100)

Return red value
```

## C223 -> C224 | Set red gain | 0

- Function: Set red gain
- Description: 0
- Set code: `C223`
- Reply code: `C224`
- Payload length (derived from RX tail marker): 2
- Source: eXview AIO Main Protocol row 89

TX hex:

```text
55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 23 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 01 00 00 7B
```

RX hex:

```text
55 55 55 55 55 55 55 C0 01 03 00 D1 01 D0 24 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 02 00 01 00 7E
```

Instruction / notes:

```text
Set Command Code: 0xC223  
Set Data (1 byte): 0x00–0x64 (decimal 0～100)

Response Command Code: 0xC224  
Response Data (2 bytes):  
- 0x0001 Success  
- 0x0002 Failure – unspecified reason  
- 0x0003 Failure – serial port not found  
- 0x0004 Failure – no response  
- 0x8001 Failure – busy  
- 0x8002 Failure – occupied (e.g., long-file transfer or firmware upgrade in progress)
```

## C223 -> C224 | Set red gain | 25

- Function: Set red gain
- Description: 25
- Set code: `C223`
- Reply code: `C224`
- Payload length (derived from RX tail marker): 2
- Source: eXview AIO Main Protocol row 90

TX hex:

```text
55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 23 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 01 00 19 94
```

RX hex:

```text
55 55 55 55 55 55 55 C0 01 03 00 D1 01 D0 24 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 02 00 01 00 7E
```

Instruction / notes:

```text
Set Command Code: 0xC223  
Set Data (1 byte): 0x00–0x64 (decimal 0～100)

Response Command Code: 0xC224  
Response Data (2 bytes):  
- 0x0001 Success  
- 0x0002 Failure – unspecified reason  
- 0x0003 Failure – serial port not found  
- 0x0004 Failure – no response  
- 0x8001 Failure – busy  
- 0x8002 Failure – occupied (e.g., long-file transfer or firmware upgrade in progress)
```

## C223 -> C224 | Set red gain | 50

- Function: Set red gain
- Description: 50
- Set code: `C223`
- Reply code: `C224`
- Payload length (derived from RX tail marker): 2
- Source: eXview AIO Main Protocol row 91

TX hex:

```text
55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 23 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 01 00 32 AD
```

RX hex:

```text
55 55 55 55 55 55 55 C0 01 03 00 D1 01 D0 24 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 02 00 01 00 7E
```

Instruction / notes:

```text
Set Command Code: 0xC223  
Set Data (1 byte): 0x00–0x64 (decimal 0～100)

Response Command Code: 0xC224  
Response Data (2 bytes):  
- 0x0001 Success  
- 0x0002 Failure – unspecified reason  
- 0x0003 Failure – serial port not found  
- 0x0004 Failure – no response  
- 0x8001 Failure – busy  
- 0x8002 Failure – occupied (e.g., long-file transfer or firmware upgrade in progress)
```

## C223 -> C224 | Set red gain | 75

- Function: Set red gain
- Description: 75
- Set code: `C223`
- Reply code: `C224`
- Payload length (derived from RX tail marker): 2
- Source: eXview AIO Main Protocol row 92

TX hex:

```text
55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 23 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 01 00 4B C6
```

RX hex:

```text
55 55 55 55 55 55 55 C0 01 03 00 D1 01 D0 24 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 02 00 01 00 7E
```

Instruction / notes:

```text
Set Command Code: 0xC223  
Set Data (1 byte): 0x00–0x64 (decimal 0～100)

Response Command Code: 0xC224  
Response Data (2 bytes):  
- 0x0001 Success  
- 0x0002 Failure – unspecified reason  
- 0x0003 Failure – serial port not found  
- 0x0004 Failure – no response  
- 0x8001 Failure – busy  
- 0x8002 Failure – occupied (e.g., long-file transfer or firmware upgrade in progress)
```

## C223 -> C224 | Set red gain | 100

- Function: Set red gain
- Description: 100
- Set code: `C223`
- Reply code: `C224`
- Payload length (derived from RX tail marker): 2
- Source: eXview AIO Main Protocol row 93

TX hex:

```text
55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 23 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 01 00 64 DF
```

RX hex:

```text
55 55 55 55 55 55 55 C0 01 03 00 D1 01 D0 24 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 02 00 01 00 7E
```

Instruction / notes:

```text
Set Command Code: 0xC223  
Set Data (1 byte): 0x00–0x64 (decimal 0～100)

Response Command Code: 0xC224  
Response Data (2 bytes):  
- 0x0001 Success  
- 0x0002 Failure – unspecified reason  
- 0x0003 Failure – serial port not found  
- 0x0004 Failure – no response  
- 0x8001 Failure – busy  
- 0x8002 Failure – occupied (e.g., long-file transfer or firmware upgrade in progress)
```

## C225 -> C226 | Query current green gain value

- Function: Query current green gain value
- Description: 
- Set code: `C225`
- Reply code: `C226`
- Payload length (derived from RX tail marker): 1
- Source: eXview AIO Main Protocol row 100

TX hex:

```text
55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 25 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 00 00 7C
```

RX hex:

```text
55 55 55 55 55 55 55 C0 01 03 00 D1 01 D0 26 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 01 00 64 E2
```

Instruction / notes:

```text
Set Command Code: 0xC225  
Response Command Code: 0xC226  
Response Data (1 byte): 0x00–0x64 (0 to 100 in decimal)

Return green value
```

## C225 -> C22C | Set blue gain | 0

- Function: Set blue gain
- Description: 0
- Set code: `C225`
- Reply code: `C22C`
- Payload length (derived from RX tail marker): 2
- Source: eXview AIO Main Protocol row 101

TX hex:

```text
55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 2B C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 01 00 00 83
```

RX hex:

```text
55 55 55 55 55 55 55 C0 01 03 00 D1 01 D0 2C C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 02 00 01 00 86
```

Instruction / notes:

```text
Set Command Code: 0xC225  
Set Data (1 byte): 0x00–0x64 (decimal 0–100)

Response Command Code: 0xC22C  
Response Data (2 bytes):  
- 0x0001 Success  
- 0x0002 Failure – unspecified reason  
- 0x0003 Failure – serial port not found  
- 0x0004 Failure – no response  
- 0x8001 Failure – busy  
- 0x8002 Failure – occupied (e.g., long-file transfer or firmware upgrade in progress)
```

## C225 -> C22C | Set blue gain | 25

- Function: Set blue gain
- Description: 25
- Set code: `C225`
- Reply code: `C22C`
- Payload length (derived from RX tail marker): 2
- Source: eXview AIO Main Protocol row 102

TX hex:

```text
55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 2B C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 01 00 19 9C
```

RX hex:

```text
55 55 55 55 55 55 55 C0 01 03 00 D1 01 D0 2C C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 02 00 01 00 86
```

Instruction / notes:

```text
Set Command Code: 0xC225  
Set Data (1 byte): 0x00–0x64 (decimal 0–100)

Response Command Code: 0xC22C  
Response Data (2 bytes):  
- 0x0001 Success  
- 0x0002 Failure – unspecified reason  
- 0x0003 Failure – serial port not found  
- 0x0004 Failure – no response  
- 0x8001 Failure – busy  
- 0x8002 Failure – occupied (e.g., long-file transfer or firmware upgrade in progress)
```

## C225 -> C22C | Set blue gain | 50

- Function: Set blue gain
- Description: 50
- Set code: `C225`
- Reply code: `C22C`
- Payload length (derived from RX tail marker): 2
- Source: eXview AIO Main Protocol row 103

TX hex:

```text
55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 2B C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 01 00 32 B5
```

RX hex:

```text
55 55 55 55 55 55 55 C0 01 03 00 D1 01 D0 2C C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 02 00 01 00 86
```

Instruction / notes:

```text
Set Command Code: 0xC225  
Set Data (1 byte): 0x00–0x64 (decimal 0–100)

Response Command Code: 0xC22C  
Response Data (2 bytes):  
- 0x0001 Success  
- 0x0002 Failure – unspecified reason  
- 0x0003 Failure – serial port not found  
- 0x0004 Failure – no response  
- 0x8001 Failure – busy  
- 0x8002 Failure – occupied (e.g., long-file transfer or firmware upgrade in progress)
```

## C225 -> C22C | Set blue gain | 75

- Function: Set blue gain
- Description: 75
- Set code: `C225`
- Reply code: `C22C`
- Payload length (derived from RX tail marker): 2
- Source: eXview AIO Main Protocol row 104

TX hex:

```text
55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 2B C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 01 00 4B CE
```

RX hex:

```text
55 55 55 55 55 55 55 C0 01 03 00 D1 01 D0 2C C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 02 00 01 00 86
```

Instruction / notes:

```text
Set Command Code: 0xC225  
Set Data (1 byte): 0x00–0x64 (decimal 0–100)

Response Command Code: 0xC22C  
Response Data (2 bytes):  
- 0x0001 Success  
- 0x0002 Failure – unspecified reason  
- 0x0003 Failure – serial port not found  
- 0x0004 Failure – no response  
- 0x8001 Failure – busy  
- 0x8002 Failure – occupied (e.g., long-file transfer or firmware upgrade in progress)
```

## C225 -> C22C | Set blue gain | 100

- Function: Set blue gain
- Description: 100
- Set code: `C225`
- Reply code: `C22C`
- Payload length (derived from RX tail marker): 2
- Source: eXview AIO Main Protocol row 105

TX hex:

```text
55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 2B C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 01 00 64 E7
```

RX hex:

```text
55 55 55 55 55 55 55 C0 01 03 00 D1 01 D0 2C C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 02 00 01 00 86
```

Instruction / notes:

```text
Set Command Code: 0xC225  
Set Data (1 byte): 0x00–0x64 (decimal 0–100)

Response Command Code: 0xC22C  
Response Data (2 bytes):  
- 0x0001 Success  
- 0x0002 Failure – unspecified reason  
- 0x0003 Failure – serial port not found  
- 0x0004 Failure – no response  
- 0x8001 Failure – busy  
- 0x8002 Failure – occupied (e.g., long-file transfer or firmware upgrade in progress)
```

## C227 -> C228 | Set green gain | 0

- Function: Set green gain
- Description: 0
- Set code: `C227`
- Reply code: `C228`
- Payload length (derived from RX tail marker): 2
- Source: eXview AIO Main Protocol row 95

TX hex:

```text
55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 27 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 01 00 00 7F
```

RX hex:

```text
55 55 55 55 55 55 55 C0 01 03 00 D1 01 D0 28 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 02 00 01 00 82
```

Instruction / notes:

```text
Set Command Code: 0xC227  
Set Data (1 byte): 0x00–0x64 (decimal 0～100)

Response Command Code: 0xC228  
Response Data (2 bytes):  
- 0x0001 Success  
- 0x0002 Failure – unspecified reason  
- 0x0003 Failure – serial port not found  
- 0x0004 Failure – no response  
- 0x8001 Failure – busy  
- 0x8002 Failure – occupied (e.g., long-file transfer or firmware upgrade in progress)
```

## C227 -> C228 | Set green gain | 25

- Function: Set green gain
- Description: 25
- Set code: `C227`
- Reply code: `C228`
- Payload length (derived from RX tail marker): 2
- Source: eXview AIO Main Protocol row 96

TX hex:

```text
55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 27 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 01 00 19 98
```

RX hex:

```text
55 55 55 55 55 55 55 C0 01 03 00 D1 01 D0 28 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 02 00 01 00 82
```

Instruction / notes:

```text
Set Command Code: 0xC227  
Set Data (1 byte): 0x00–0x64 (decimal 0～100)

Response Command Code: 0xC228  
Response Data (2 bytes):  
- 0x0001 Success  
- 0x0002 Failure – unspecified reason  
- 0x0003 Failure – serial port not found  
- 0x0004 Failure – no response  
- 0x8001 Failure – busy  
- 0x8002 Failure – occupied (e.g., long-file transfer or firmware upgrade in progress)
```

## C227 -> C228 | Set green gain | 50

- Function: Set green gain
- Description: 50
- Set code: `C227`
- Reply code: `C228`
- Payload length (derived from RX tail marker): 2
- Source: eXview AIO Main Protocol row 97

TX hex:

```text
55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 27 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 01 00 32 B1
```

RX hex:

```text
55 55 55 55 55 55 55 C0 01 03 00 D1 01 D0 28 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 02 00 01 00 82
```

Instruction / notes:

```text
Set Command Code: 0xC227  
Set Data (1 byte): 0x00–0x64 (decimal 0～100)

Response Command Code: 0xC228  
Response Data (2 bytes):  
- 0x0001 Success  
- 0x0002 Failure – unspecified reason  
- 0x0003 Failure – serial port not found  
- 0x0004 Failure – no response  
- 0x8001 Failure – busy  
- 0x8002 Failure – occupied (e.g., long-file transfer or firmware upgrade in progress)
```

## C227 -> C228 | Set green gain | 75

- Function: Set green gain
- Description: 75
- Set code: `C227`
- Reply code: `C228`
- Payload length (derived from RX tail marker): 2
- Source: eXview AIO Main Protocol row 98

TX hex:

```text
55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 27 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 01 00 4B CA
```

RX hex:

```text
55 55 55 55 55 55 55 C0 01 03 00 D1 01 D0 28 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 02 00 01 00 82
```

Instruction / notes:

```text
Set Command Code: 0xC227  
Set Data (1 byte): 0x00–0x64 (decimal 0～100)

Response Command Code: 0xC228  
Response Data (2 bytes):  
- 0x0001 Success  
- 0x0002 Failure – unspecified reason  
- 0x0003 Failure – serial port not found  
- 0x0004 Failure – no response  
- 0x8001 Failure – busy  
- 0x8002 Failure – occupied (e.g., long-file transfer or firmware upgrade in progress)
```

## C227 -> C228 | Set green gain | 100

- Function: Set green gain
- Description: 100
- Set code: `C227`
- Reply code: `C228`
- Payload length (derived from RX tail marker): 2
- Source: eXview AIO Main Protocol row 99

TX hex:

```text
55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 27 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 01 00 64 E3
```

RX hex:

```text
55 55 55 55 55 55 55 C0 01 03 00 D1 01 D0 28 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 02 00 01 00 82
```

Instruction / notes:

```text
Set Command Code: 0xC227  
Set Data (1 byte): 0x00–0x64 (decimal 0～100)

Response Command Code: 0xC228  
Response Data (2 bytes):  
- 0x0001 Success  
- 0x0002 Failure – unspecified reason  
- 0x0003 Failure – serial port not found  
- 0x0004 Failure – no response  
- 0x8001 Failure – busy  
- 0x8002 Failure – occupied (e.g., long-file transfer or firmware upgrade in progress)
```

## C229 -> C22A | Query current blue gain value

- Function: Query current blue gain value
- Description: 
- Set code: `C229`
- Reply code: `C22A`
- Payload length (derived from RX tail marker): 1
- Source: eXview AIO Main Protocol row 106

TX hex:

```text
55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 29 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 00 00 80
```

RX hex:

```text
55 55 55 55 55 55 55 C0 01 03 00 D1 01 D0 2A C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 01 00 64 E6
```

Instruction / notes:

```text
Set Command Code: 0xC229  
Response Command Code: 0xC22A  
Response Data (1 byte): 0x00–0x64 (decimal 0–100)

Return blue value
```

## C241 -> C242 | Get video combination information

- Function: Get video combination information
- Description: 
- Set code: `C241`
- Reply code: `C242`
- Payload length (derived from RX tail marker): 7
- Source: eXview AIO Main Protocol row 75

TX hex:

```text
55 55 55 55 55 55 55 C0 01 03 01 D0 00 C2 41 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 00 00 89
```

RX hex:

```text
55 55 55 55 55 55 55 C0 01 03 00 C2 01 D0 42 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 07 00 64 02 03 00 64 32 00 90
```

Instruction / notes:

```text
Set Command Code: 0xC241  
Response Command Code: 0xC242  
Response Data (7 bytes):  
1. Brightness (0x00–0x64, 0–100 %)  
2. Color Temperature (0x01 Standard, 0x02 Warm, 0x03 Cool, 0x04 User-defined)  
3. Display Mode (0x01 4:3, 0x02 16:9, 0x03 Full-screen, 0x04 Original, 0x07 1:1)  
4. Video Source (0x00 Android, 0x01 Windows, 0x02 HDMI1, 0x03 HDMI2, 0x04 HDMI3, 0x06 HDMI4)  
5. Volume (0x00–0x64, 0–100 %)  
6. Contrast (0x00–0x64, 0–100 %)  
7. Scene Mode (0x00 Meeting, 0x01 Standard, 0x02 Soft, 0x05 Cinema)

Return video information
```

## C243 -> C244 | Query scene mode

- Function: Query scene mode
- Description: 
- Set code: `C243`
- Reply code: `C244`
- Payload length (derived from RX tail marker): 1
- Source: eXview AIO Main Protocol row 88

TX hex:

```text
55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 43 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 00 00 9A
```

RX hex:

```text
55 55 55 55 55 55 55 C0 01 03 00 D1 01 D0 44 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 01 00 00 9C
```

Instruction / notes:

```text
Set Command Code: 0xC243  
Response Command Code: 0xC244  
Response Data (2 bytes):  
- 0x0000 Meeting Mode  
- 0x01 Standard/Demo Mode  
- 0x02 Soft/Eco Mode  
- 0x03 Custom mode
- 0x0005 Cinema Mode
```

## C245 -> C246 | Set scene mode | Conference mode

- Function: Set scene mode
- Description: Conference mode
- Set code: `C245`
- Reply code: `C246`
- Payload length (derived from RX tail marker): 2
- Source: eXview AIO Main Protocol row 83

TX hex:

```text
55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 45 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 01 00 00 9D
```

RX hex:

```text
55 55 55 55 55 55 55 C0 01 03 00 D1 01 D0 46 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 02 00 01 00 A0
```

Instruction / notes:

```text
Set Command Code: 0xC245  
Set Data (1 byte):  
- 0x00 Meeting Mode  
- 0x01 Standard/Demo Mode  
- 0x02 Soft/Eco Mode  
- 0x03 Custom mode
- 0x05 Cinema Mode  

Response Command Code: 0xC246  
Response Data (2 bytes):  
- 0x0001 Success  
- 0x0002 Failure – unspecified reason  
- 0x0003 Failure – serial port not found  
- 0x0004 Failure – no response  
- 0x8001 Failure – busy  
- 0x8002 Failure – occupied (e.g., long-file transfer or firmware upgrade in progress)
```

## C245 -> C246 | Set scene mode | Standard/Demo mode

- Function: Set scene mode
- Description: Standard/Demo mode
- Set code: `C245`
- Reply code: `C246`
- Payload length (derived from RX tail marker): 2
- Source: eXview AIO Main Protocol row 84

TX hex:

```text
55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 45 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 01 00 01 9E
```

RX hex:

```text
55 55 55 55 55 55 55 C0 01 03 00 D1 01 D0 46 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 02 00 01 00 A0
```

Instruction / notes:

```text
Set Command Code: 0xC245  
Set Data (1 byte):  
- 0x00 Meeting Mode  
- 0x01 Standard/Demo Mode  
- 0x02 Soft/Eco Mode  
- 0x03 Custom mode
- 0x05 Cinema Mode  

Response Command Code: 0xC246  
Response Data (2 bytes):  
- 0x0001 Success  
- 0x0002 Failure – unspecified reason  
- 0x0003 Failure – serial port not found  
- 0x0004 Failure – no response  
- 0x8001 Failure – busy  
- 0x8002 Failure – occupied (e.g., long-file transfer or firmware upgrade in progress)
```

## C245 -> C246 | Set scene mode | Soft/Eco mode

- Function: Set scene mode
- Description: Soft/Eco mode
- Set code: `C245`
- Reply code: `C246`
- Payload length (derived from RX tail marker): 2
- Source: eXview AIO Main Protocol row 85

TX hex:

```text
55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 45 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 01 00 02 9F
```

RX hex:

```text
55 55 55 55 55 55 55 C0 01 03 00 D1 01 D0 46 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 02 00 01 00 A0
```

Instruction / notes:

```text
Set Command Code: 0xC245  
Set Data (1 byte):  
- 0x00 Meeting Mode  
- 0x01 Standard/Demo Mode  
- 0x02 Soft/Eco Mode  
- 0x03 Custom mode
- 0x05 Cinema Mode  

Response Command Code: 0xC246  
Response Data (2 bytes):  
- 0x0001 Success  
- 0x0002 Failure – unspecified reason  
- 0x0003 Failure – serial port not found  
- 0x0004 Failure – no response  
- 0x8001 Failure – busy  
- 0x8002 Failure – occupied (e.g., long-file transfer or firmware upgrade in progress)
```

## C245 -> C246 | Set scene mode | Custom mode

- Function: Set scene mode
- Description: Custom mode
- Set code: `C245`
- Reply code: `C246`
- Payload length (derived from RX tail marker): 2
- Source: eXview AIO Main Protocol row 86

TX hex:

```text
55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 45 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 01 00 03 A0
```

RX hex:

```text
55 55 55 55 55 55 55 C0 01 03 00 D1 01 D0 46 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 02 00 01 00 A0
```

Instruction / notes:

```text
Set Command Code: 0xC245  
Set Data (1 byte):  
- 0x00 Meeting Mode  
- 0x01 Standard/Demo Mode  
- 0x02 Soft/Eco Mode  
- 0x03 Custom mode
- 0x05 Cinema Mode  

Response Command Code: 0xC246  
Response Data (2 bytes):  
- 0x0001 Success  
- 0x0002 Failure – unspecified reason  
- 0x0003 Failure – serial port not found  
- 0x0004 Failure – no response  
- 0x8001 Failure – busy  
- 0x8002 Failure – occupied (e.g., long-file transfer or firmware upgrade in progress)
```

## C245 -> C246 | Set scene mode | Theater mode

- Function: Set scene mode
- Description: Theater mode
- Set code: `C245`
- Reply code: `C246`
- Payload length (derived from RX tail marker): 2
- Source: eXview AIO Main Protocol row 87

TX hex:

```text
55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 45 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 01 00 05 A2
```

RX hex:

```text
55 55 55 55 55 55 55 C0 01 03 00 D1 01 D0 46 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 02 00 01 00 A0
```

Instruction / notes:

```text
Set Command Code: 0xC245  
Set Data (1 byte):  
- 0x00 Meeting Mode  
- 0x01 Standard/Demo Mode  
- 0x02 Soft/Eco Mode  
- 0x03 Custom mode
- 0x05 Cinema Mode  

Response Command Code: 0xC246  
Response Data (2 bytes):  
- 0x0001 Success  
- 0x0002 Failure – unspecified reason  
- 0x0003 Failure – serial port not found  
- 0x0004 Failure – no response  
- 0x8001 Failure – busy  
- 0x8002 Failure – occupied (e.g., long-file transfer or firmware upgrade in progress)
```

## C249 -> C24A | Split screen mode | Full screen mode

- Function: Split screen mode
- Description: Full screen mode
- Set code: `C249`
- Reply code: `C24A`
- Payload length (derived from RX tail marker): 2
- Source: eXview AIO Main Protocol row 76

TX hex:

```text
55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 49 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 01 00 00 A1
```

RX hex:

```text
55 55 55 55 55 55 55 C0 01 03 00 D1 01 D0 4A C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 02 00 01 00 A4
```

Instruction / notes:

```text
Set Command Code: 0xC249  
Set Data (1 byte):  
- 0x00 Full-screen mode  
- 0x01 Center mode  
- 0x02 Dual-screen mode  
- 0x03 Quad-screen mode  
- 0x05 Five-screen mode  
- 0x20 Custom mode  

Response Command Code: 0xC24A  
Response Data (2 bytes):  
- 0x0001 Success  
- 0x0002 Failure – unspecified reason  
- 0x0003 Failure – serial port not found  
- 0x0004 Failure – no response  
- 0x8001 Failure – busy  
- 0x8002 Failure – occupied (e.g., long-file transfer or firmware upgrade in progress)
```

## C249 -> C24A | Split screen mode | Dual screen mode

- Function: Split screen mode
- Description: Dual screen mode
- Set code: `C249`
- Reply code: `C24A`
- Payload length (derived from RX tail marker): 2
- Source: eXview AIO Main Protocol row 77

TX hex:

```text
55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 49 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 01 00 02 A3
```

RX hex:

```text
55 55 55 55 55 55 55 C0 01 03 00 D1 01 D0 4A C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 02 00 01 00 A4
```

Instruction / notes:

```text
Set Command Code: 0xC249  
Set Data (1 byte):  
- 0x00 Full-screen mode  
- 0x01 Center mode  
- 0x02 Dual-screen mode  
- 0x03 Quad-screen mode  
- 0x05 Five-screen mode  
- 0x20 Custom mode  

Response Command Code: 0xC24A  
Response Data (2 bytes):  
- 0x0001 Success  
- 0x0002 Failure – unspecified reason  
- 0x0003 Failure – serial port not found  
- 0x0004 Failure – no response  
- 0x8001 Failure – busy  
- 0x8002 Failure – occupied (e.g., long-file transfer or firmware upgrade in progress)
```

## C249 -> C24A | Split screen mode | Center mode

- Function: Split screen mode
- Description: Center mode
- Set code: `C249`
- Reply code: `C24A`
- Payload length (derived from RX tail marker): 2
- Source: eXview AIO Main Protocol row 78

TX hex:

```text
55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 49 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 01 00 01 A2
```

RX hex:

```text
55 55 55 55 55 55 55 C0 01 03 00 D1 01 D0 4A C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 02 00 01 00 A4
```

Instruction / notes:

```text
Set Command Code: 0xC249  
Set Data (1 byte):  
- 0x00 Full-screen mode  
- 0x01 Center mode  
- 0x02 Dual-screen mode  
- 0x03 Quad-screen mode  
- 0x05 Five-screen mode  
- 0x20 Custom mode  

Response Command Code: 0xC24A  
Response Data (2 bytes):  
- 0x0001 Success  
- 0x0002 Failure – unspecified reason  
- 0x0003 Failure – serial port not found  
- 0x0004 Failure – no response  
- 0x8001 Failure – busy  
- 0x8002 Failure – occupied (e.g., long-file transfer or firmware upgrade in progress)
```

## C249 -> C24A | Split screen mode | Quadrature split screen mode

- Function: Split screen mode
- Description: Quadrature split screen mode
- Set code: `C249`
- Reply code: `C24A`
- Payload length (derived from RX tail marker): 2
- Source: eXview AIO Main Protocol row 79

TX hex:

```text
55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 49 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 01 00 03 A4
```

RX hex:

```text
55 55 55 55 55 55 55 C0 01 03 00 D1 01 D0 4A C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 02 00 01 00 A4
```

Instruction / notes:

```text
Set Command Code: 0xC249  
Set Data (1 byte):  
- 0x00 Full-screen mode  
- 0x01 Center mode  
- 0x02 Dual-screen mode  
- 0x03 Quad-screen mode  
- 0x05 Five-screen mode  
- 0x20 Custom mode  

Response Command Code: 0xC24A  
Response Data (2 bytes):  
- 0x0001 Success  
- 0x0002 Failure – unspecified reason  
- 0x0003 Failure – serial port not found  
- 0x0004 Failure – no response  
- 0x8001 Failure – busy  
- 0x8002 Failure – occupied (e.g., long-file transfer or firmware upgrade in progress)
```

## C249 -> C24A | Split screen mode | Five-split screen mode

- Function: Split screen mode
- Description: Five-split screen mode
- Set code: `C249`
- Reply code: `C24A`
- Payload length (derived from RX tail marker): 2
- Source: eXview AIO Main Protocol row 80

TX hex:

```text
55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 49 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 01 00 05 A6
```

RX hex:

```text
55 55 55 55 55 55 55 C0 01 03 00 D1 01 D0 4A C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 02 00 01 00 A4
```

Instruction / notes:

```text
Set Command Code: 0xC249  
Set Data (1 byte):  
- 0x00 Full-screen mode  
- 0x01 Center mode  
- 0x02 Dual-screen mode  
- 0x03 Quad-screen mode  
- 0x05 Five-screen mode  
- 0x20 Custom mode  

Response Command Code: 0xC24A  
Response Data (2 bytes):  
- 0x0001 Success  
- 0x0002 Failure – unspecified reason  
- 0x0003 Failure – serial port not found  
- 0x0004 Failure – no response  
- 0x8001 Failure – busy  
- 0x8002 Failure – occupied (e.g., long-file transfer or firmware upgrade in progress)
```

## C257 -> C258 | Query saturation level | Query Current Saturation Value

- Function: Query saturation level
- Description: Query Current Saturation Value
- Set code: `C257`
- Reply code: `C258`
- Payload length (derived from RX tail marker): 1
- Source: eXview AIO Main Protocol row 45

TX hex:

```text
55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 57 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 00 00 AE
```

RX hex:

```text
55 55 55 55 55 55 55 C0 01 03 00 D1 01 D0 58 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 01 00 64 14
```

Instruction / notes:

```text
Set Command Code: 0xC257  
Response Command Code: 0xC258  
Response Data (1 byte): 0x00–0x64  (decimal 0～100)

Return saturation 100
```

## C259 -> C25A | Set saturation level | 0

- Function: Set saturation level
- Description: 0
- Set code: `C259`
- Reply code: `C25A`
- Payload length (derived from RX tail marker): 2
- Source: eXview AIO Main Protocol row 34

TX hex:

```text
55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 59 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 01 00 00 B1
```

RX hex:

```text
55 55 55 55 55 55 55 C0 01 03 00 D1 01 D0 5A C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 02 00 01 00 B4
```

Instruction / notes:

```text
Set Command Code: 0xC259  
Set Data (1 byte): 0x00–0x64 (decimal 0～100)

Response Command Code: 0xC25A  
Response Data (2 bytes):  
- 0x0001 Success  
- 0x0002 Failure – unspecified reason  
- 0x0003 Failure – serial port not found  
- 0x0004 Failure – no response  
- 0x8001 Failure – busy  
- 0x8002 Failure – occupied (e.g., long-file transfer or firmware upgrade in progress)
```

## C259 -> C25A | Set saturation level | 10

- Function: Set saturation level
- Description: 10
- Set code: `C259`
- Reply code: `C25A`
- Payload length (derived from RX tail marker): 2
- Source: eXview AIO Main Protocol row 35

TX hex:

```text
55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 59 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 01 00 0A BB
```

RX hex:

```text
55 55 55 55 55 55 55 C0 01 03 00 D1 01 D0 5A C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 02 00 01 00 B4
```

Instruction / notes:

```text
Set Command Code: 0xC259  
Set Data (1 byte): 0x00–0x64 (decimal 0～100)

Response Command Code: 0xC25A  
Response Data (2 bytes):  
- 0x0001 Success  
- 0x0002 Failure – unspecified reason  
- 0x0003 Failure – serial port not found  
- 0x0004 Failure – no response  
- 0x8001 Failure – busy  
- 0x8002 Failure – occupied (e.g., long-file transfer or firmware upgrade in progress)
```

## C259 -> C25A | Set saturation level | 20

- Function: Set saturation level
- Description: 20
- Set code: `C259`
- Reply code: `C25A`
- Payload length (derived from RX tail marker): 2
- Source: eXview AIO Main Protocol row 36

TX hex:

```text
55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 59 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 01 00 14 C5
```

RX hex:

```text
55 55 55 55 55 55 55 C0 01 03 00 D1 01 D0 5A C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 02 00 01 00 B4
```

Instruction / notes:

```text
Set Command Code: 0xC259  
Set Data (1 byte): 0x00–0x64 (decimal 0～100)

Response Command Code: 0xC25A  
Response Data (2 bytes):  
- 0x0001 Success  
- 0x0002 Failure – unspecified reason  
- 0x0003 Failure – serial port not found  
- 0x0004 Failure – no response  
- 0x8001 Failure – busy  
- 0x8002 Failure – occupied (e.g., long-file transfer or firmware upgrade in progress)
```

## C259 -> C25A | Set saturation level | 30

- Function: Set saturation level
- Description: 30
- Set code: `C259`
- Reply code: `C25A`
- Payload length (derived from RX tail marker): 2
- Source: eXview AIO Main Protocol row 37

TX hex:

```text
55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 59 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 01 00 1E CF
```

RX hex:

```text
55 55 55 55 55 55 55 C0 01 03 00 D1 01 D0 5A C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 02 00 01 00 B4
```

Instruction / notes:

```text
Set Command Code: 0xC259  
Set Data (1 byte): 0x00–0x64 (decimal 0～100)

Response Command Code: 0xC25A  
Response Data (2 bytes):  
- 0x0001 Success  
- 0x0002 Failure – unspecified reason  
- 0x0003 Failure – serial port not found  
- 0x0004 Failure – no response  
- 0x8001 Failure – busy  
- 0x8002 Failure – occupied (e.g., long-file transfer or firmware upgrade in progress)
```

## C259 -> C25A | Set saturation level | 40

- Function: Set saturation level
- Description: 40
- Set code: `C259`
- Reply code: `C25A`
- Payload length (derived from RX tail marker): 2
- Source: eXview AIO Main Protocol row 38

TX hex:

```text
55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 59 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 01 00 28 D9
```

RX hex:

```text
55 55 55 55 55 55 55 C0 01 03 00 D1 01 D0 5A C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 02 00 01 00 B4
```

Instruction / notes:

```text
Set Command Code: 0xC259  
Set Data (1 byte): 0x00–0x64 (decimal 0～100)

Response Command Code: 0xC25A  
Response Data (2 bytes):  
- 0x0001 Success  
- 0x0002 Failure – unspecified reason  
- 0x0003 Failure – serial port not found  
- 0x0004 Failure – no response  
- 0x8001 Failure – busy  
- 0x8002 Failure – occupied (e.g., long-file transfer or firmware upgrade in progress)
```

## C259 -> C25A | Set saturation level | 50

- Function: Set saturation level
- Description: 50
- Set code: `C259`
- Reply code: `C25A`
- Payload length (derived from RX tail marker): 2
- Source: eXview AIO Main Protocol row 39

TX hex:

```text
55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 59 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 01 00 32 E3
```

RX hex:

```text
55 55 55 55 55 55 55 C0 01 03 00 D1 01 D0 5A C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 02 00 01 00 B4
```

Instruction / notes:

```text
Set Command Code: 0xC259  
Set Data (1 byte): 0x00–0x64 (decimal 0～100)

Response Command Code: 0xC25A  
Response Data (2 bytes):  
- 0x0001 Success  
- 0x0002 Failure – unspecified reason  
- 0x0003 Failure – serial port not found  
- 0x0004 Failure – no response  
- 0x8001 Failure – busy  
- 0x8002 Failure – occupied (e.g., long-file transfer or firmware upgrade in progress)
```

## C259 -> C25A | Set saturation level | 60

- Function: Set saturation level
- Description: 60
- Set code: `C259`
- Reply code: `C25A`
- Payload length (derived from RX tail marker): 2
- Source: eXview AIO Main Protocol row 40

TX hex:

```text
55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 59 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 01 00 3C ED
```

RX hex:

```text
55 55 55 55 55 55 55 C0 01 03 00 D1 01 D0 5A C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 02 00 01 00 B4
```

Instruction / notes:

```text
Set Command Code: 0xC259  
Set Data (1 byte): 0x00–0x64 (decimal 0～100)

Response Command Code: 0xC25A  
Response Data (2 bytes):  
- 0x0001 Success  
- 0x0002 Failure – unspecified reason  
- 0x0003 Failure – serial port not found  
- 0x0004 Failure – no response  
- 0x8001 Failure – busy  
- 0x8002 Failure – occupied (e.g., long-file transfer or firmware upgrade in progress)
```

## C259 -> C25A | Set saturation level | 70

- Function: Set saturation level
- Description: 70
- Set code: `C259`
- Reply code: `C25A`
- Payload length (derived from RX tail marker): 2
- Source: eXview AIO Main Protocol row 41

TX hex:

```text
55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 59 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 01 00 46 F7
```

RX hex:

```text
55 55 55 55 55 55 55 C0 01 03 00 D1 01 D0 5A C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 02 00 01 00 B4
```

Instruction / notes:

```text
Set Command Code: 0xC259  
Set Data (1 byte): 0x00–0x64 (decimal 0～100)

Response Command Code: 0xC25A  
Response Data (2 bytes):  
- 0x0001 Success  
- 0x0002 Failure – unspecified reason  
- 0x0003 Failure – serial port not found  
- 0x0004 Failure – no response  
- 0x8001 Failure – busy  
- 0x8002 Failure – occupied (e.g., long-file transfer or firmware upgrade in progress)
```

## C259 -> C25A | Set saturation level | 80

- Function: Set saturation level
- Description: 80
- Set code: `C259`
- Reply code: `C25A`
- Payload length (derived from RX tail marker): 2
- Source: eXview AIO Main Protocol row 42

TX hex:

```text
55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 59 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 01 00 50 01
```

RX hex:

```text
55 55 55 55 55 55 55 C0 01 03 00 D1 01 D0 5A C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 02 00 01 00 B4
```

Instruction / notes:

```text
Set Command Code: 0xC259  
Set Data (1 byte): 0x00–0x64 (decimal 0～100)

Response Command Code: 0xC25A  
Response Data (2 bytes):  
- 0x0001 Success  
- 0x0002 Failure – unspecified reason  
- 0x0003 Failure – serial port not found  
- 0x0004 Failure – no response  
- 0x8001 Failure – busy  
- 0x8002 Failure – occupied (e.g., long-file transfer or firmware upgrade in progress)
```

## C259 -> C25A | Set saturation level | 90

- Function: Set saturation level
- Description: 90
- Set code: `C259`
- Reply code: `C25A`
- Payload length (derived from RX tail marker): 2
- Source: eXview AIO Main Protocol row 43

TX hex:

```text
55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 59 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 01 00 5A 0B
```

RX hex:

```text
55 55 55 55 55 55 55 C0 01 03 00 D1 01 D0 5A C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 02 00 01 00 B4
```

Instruction / notes:

```text
Set Command Code: 0xC259  
Set Data (1 byte): 0x00–0x64 (decimal 0～100)

Response Command Code: 0xC25A  
Response Data (2 bytes):  
- 0x0001 Success  
- 0x0002 Failure – unspecified reason  
- 0x0003 Failure – serial port not found  
- 0x0004 Failure – no response  
- 0x8001 Failure – busy  
- 0x8002 Failure – occupied (e.g., long-file transfer or firmware upgrade in progress)
```

## C259 -> C25A | Set saturation level | 100

- Function: Set saturation level
- Description: 100
- Set code: `C259`
- Reply code: `C25A`
- Payload length (derived from RX tail marker): 2
- Source: eXview AIO Main Protocol row 44

TX hex:

```text
55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 59 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 01 00 64 15
```

RX hex:

```text
55 55 55 55 55 55 55 C0 01 03 00 D1 01 D0 5A C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 02 00 01 00 B4
```

Instruction / notes:

```text
Set Command Code: 0xC259  
Set Data (1 byte): 0x00–0x64 (decimal 0～100)

Response Command Code: 0xC25A  
Response Data (2 bytes):  
- 0x0001 Success  
- 0x0002 Failure – unspecified reason  
- 0x0003 Failure – serial port not found  
- 0x0004 Failure – no response  
- 0x8001 Failure – busy  
- 0x8002 Failure – occupied (e.g., long-file transfer or firmware upgrade in progress)
```

## C25B -> C25C | Ark1 additional command 0xC25B | Additional command from Ark1 sheet

- Function: Ark1 additional command 0xC25B
- Description: Additional command from Ark1 sheet
- Set code: `C25B`
- Reply code: `C25C`
- Payload length (derived from RX tail marker): 0
- Source: eXview AIO Ark1 Addendum row 1

TX hex:

```text
55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 5B C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 00 00 B2
```

RX hex:

```text
55 55 55 55 55 55 55 C0 01 03 00 D1 01 D0 5C C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 04 00 00 00 00 00 B7
```

Instruction / notes:

```text
Set Command Code: 0xC25B  
Response Command Code: 0xC25C  
Response Data (4 bytes):  
1. Byte 1: HDMI1 signal (0x01 = signal present, 0x00 = no signal)  
2. Byte 2: HDMI2 signal (0x01 = signal present, 0x00 = no signal)  
3. Byte 3: HDMI3 signal (0x01 = signal present, 0x00 = no signal)  
4. Byte 4: HDMI4 signal (0x01 = signal present, 0x00 = no signal)  

Example response: `"00 00 00 01"` indicates no signal on HDMI1–HDMI3 and signal present on HDMI4.
```

## C25B -> C25C | HDMI signal query | Query the current HDMI signal

- Function: HDMI signal query
- Description: Query the current HDMI signal
- Set code: `C25B`
- Reply code: `C25C`
- Payload length (derived from RX tail marker): 0
- Source: eXview AIO Main Protocol row 64

TX hex:

```text
55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 5B C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 00 00 B2
```

RX hex:

```text
55 55 55 55 55 55 55 C0 01 03 00 D1 01 D0 5C C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 04 00 00 00 00 00 B7
```

Instruction / notes:

```text
Set Command Code: 0xC25B  
Response Command Code: 0xC25C  
Response Data (4 bytes):  
1. Byte 1: HDMI1 signal (0x01 = signal present, 0x00 = no signal)  
2. Byte 2: HDMI2 signal (0x01 = signal present, 0x00 = no signal)  
3. Byte 3: HDMI3 signal (0x01 = signal present, 0x00 = no signal)  
4. Byte 4: HDMI4 signal (0x01 = signal present, 0x00 = no signal)  

Example response: `"00 00 00 01"` indicates no signal on HDMI1–HDMI3 and signal present on HDMI4.

Reply command description:
1 byte HDMI1 signal (signal 0x01, no signal 0x00)
1 byte HDMI2 signal (signal 0x01, no signal 0x00)
1 byte HDMI3 signal (signal 0x01, no signal 0x00)
1 byte HDMI4 signal (signal 0x01, no signal 0x00)
Example:
1) "00 00 00 00" means HDMI1~4 have no signal
2) "00 00 00 01" means HDMI1~3 have no signal, HDMI4 has signal
```

## C262 -> C263 | Set hue(color tone) level | -50

- Function: Set hue(color tone) level
- Description: -50
- Set code: `C262`
- Reply code: `C263`
- Payload length (derived from RX tail marker): 2
- Source: eXview AIO Main Protocol row 46

TX hex:

```text
55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 62 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 01 00 00 BA
```

RX hex:

```text
55 55 55 55 55 55 55 C0 01 03 00 D1 01 D0 63 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 02 00 01 00 BD
```

Instruction / notes:

```text
Set Command Code: 0xC262  
Set Data (1 byte): 0x00–0x64 (decimal 0～100, mapped to –50–50 on the UI)

Response Command Code: 0xC263  
Response Data (2 bytes):  
- 0x0001 Success  
- 0x0002 Failure – unspecified reason  
- 0x0003 Failure – serial port not found  
- 0x0004 Failure – no response  
- 0x8001 Failure – busy  
- 0x8002 Failure – occupied (e.g., long-file transfer or firmware upgrade in progress)
```

## C262 -> C263 | Set hue(color tone) level | -40

- Function: Set hue(color tone) level
- Description: -40
- Set code: `C262`
- Reply code: `C263`
- Payload length (derived from RX tail marker): 2
- Source: eXview AIO Main Protocol row 47

TX hex:

```text
55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 62 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 01 00 0A C4
```

RX hex:

```text
55 55 55 55 55 55 55 C0 01 03 00 D1 01 D0 63 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 02 00 01 00 BD
```

Instruction / notes:

```text
Set Command Code: 0xC262  
Set Data (1 byte): 0x00–0x64 (decimal 0～100, mapped to –50–50 on the UI)

Response Command Code: 0xC263  
Response Data (2 bytes):  
- 0x0001 Success  
- 0x0002 Failure – unspecified reason  
- 0x0003 Failure – serial port not found  
- 0x0004 Failure – no response  
- 0x8001 Failure – busy  
- 0x8002 Failure – occupied (e.g., long-file transfer or firmware upgrade in progress)
```

## C262 -> C263 | Set hue(color tone) level | -30

- Function: Set hue(color tone) level
- Description: -30
- Set code: `C262`
- Reply code: `C263`
- Payload length (derived from RX tail marker): 2
- Source: eXview AIO Main Protocol row 48

TX hex:

```text
55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 62 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 01 00 14 CE
```

RX hex:

```text
55 55 55 55 55 55 55 C0 01 03 00 D1 01 D0 63 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 02 00 01 00 BD
```

Instruction / notes:

```text
Set Command Code: 0xC262  
Set Data (1 byte): 0x00–0x64 (decimal 0～100, mapped to –50–50 on the UI)

Response Command Code: 0xC263  
Response Data (2 bytes):  
- 0x0001 Success  
- 0x0002 Failure – unspecified reason  
- 0x0003 Failure – serial port not found  
- 0x0004 Failure – no response  
- 0x8001 Failure – busy  
- 0x8002 Failure – occupied (e.g., long-file transfer or firmware upgrade in progress)
```

## C262 -> C263 | Set hue(color tone) level | -20

- Function: Set hue(color tone) level
- Description: -20
- Set code: `C262`
- Reply code: `C263`
- Payload length (derived from RX tail marker): 2
- Source: eXview AIO Main Protocol row 49

TX hex:

```text
55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 62 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 01 00 1E D8
```

RX hex:

```text
55 55 55 55 55 55 55 C0 01 03 00 D1 01 D0 63 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 02 00 01 00 BD
```

Instruction / notes:

```text
Set Command Code: 0xC262  
Set Data (1 byte): 0x00–0x64 (decimal 0～100, mapped to –50–50 on the UI)

Response Command Code: 0xC263  
Response Data (2 bytes):  
- 0x0001 Success  
- 0x0002 Failure – unspecified reason  
- 0x0003 Failure – serial port not found  
- 0x0004 Failure – no response  
- 0x8001 Failure – busy  
- 0x8002 Failure – occupied (e.g., long-file transfer or firmware upgrade in progress)
```

## C262 -> C263 | Set hue(color tone) level | -10

- Function: Set hue(color tone) level
- Description: -10
- Set code: `C262`
- Reply code: `C263`
- Payload length (derived from RX tail marker): 2
- Source: eXview AIO Main Protocol row 50

TX hex:

```text
55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 62 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 01 00 28 E2
```

RX hex:

```text
55 55 55 55 55 55 55 C0 01 03 00 D1 01 D0 63 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 02 00 01 00 BD
```

Instruction / notes:

```text
Set Command Code: 0xC262  
Set Data (1 byte): 0x00–0x64 (decimal 0～100, mapped to –50–50 on the UI)

Response Command Code: 0xC263  
Response Data (2 bytes):  
- 0x0001 Success  
- 0x0002 Failure – unspecified reason  
- 0x0003 Failure – serial port not found  
- 0x0004 Failure – no response  
- 0x8001 Failure – busy  
- 0x8002 Failure – occupied (e.g., long-file transfer or firmware upgrade in progress)
```

## C262 -> C263 | Set hue(color tone) level | 0

- Function: Set hue(color tone) level
- Description: 0
- Set code: `C262`
- Reply code: `C263`
- Payload length (derived from RX tail marker): 2
- Source: eXview AIO Main Protocol row 51

TX hex:

```text
55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 62 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 01 00 32 EC
```

RX hex:

```text
55 55 55 55 55 55 55 C0 01 03 00 D1 01 D0 63 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 02 00 01 00 BD
```

Instruction / notes:

```text
Set Command Code: 0xC262  
Set Data (1 byte): 0x00–0x64 (decimal 0～100, mapped to –50–50 on the UI)

Response Command Code: 0xC263  
Response Data (2 bytes):  
- 0x0001 Success  
- 0x0002 Failure – unspecified reason  
- 0x0003 Failure – serial port not found  
- 0x0004 Failure – no response  
- 0x8001 Failure – busy  
- 0x8002 Failure – occupied (e.g., long-file transfer or firmware upgrade in progress)
```

## C262 -> C263 | Set hue(color tone) level | 10

- Function: Set hue(color tone) level
- Description: 10
- Set code: `C262`
- Reply code: `C263`
- Payload length (derived from RX tail marker): 2
- Source: eXview AIO Main Protocol row 52

TX hex:

```text
55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 62 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 01 00 3C F6
```

RX hex:

```text
55 55 55 55 55 55 55 C0 01 03 00 D1 01 D0 63 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 02 00 01 00 BD
```

Instruction / notes:

```text
Set Command Code: 0xC262  
Set Data (1 byte): 0x00–0x64 (decimal 0～100, mapped to –50–50 on the UI)

Response Command Code: 0xC263  
Response Data (2 bytes):  
- 0x0001 Success  
- 0x0002 Failure – unspecified reason  
- 0x0003 Failure – serial port not found  
- 0x0004 Failure – no response  
- 0x8001 Failure – busy  
- 0x8002 Failure – occupied (e.g., long-file transfer or firmware upgrade in progress)
```

## C262 -> C263 | Set hue(color tone) level | 20

- Function: Set hue(color tone) level
- Description: 20
- Set code: `C262`
- Reply code: `C263`
- Payload length (derived from RX tail marker): 2
- Source: eXview AIO Main Protocol row 53

TX hex:

```text
55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 62 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 01 00 46 00
```

RX hex:

```text
55 55 55 55 55 55 55 C0 01 03 00 D1 01 D0 63 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 02 00 01 00 BD
```

Instruction / notes:

```text
Set Command Code: 0xC262  
Set Data (1 byte): 0x00–0x64 (decimal 0～100, mapped to –50–50 on the UI)

Response Command Code: 0xC263  
Response Data (2 bytes):  
- 0x0001 Success  
- 0x0002 Failure – unspecified reason  
- 0x0003 Failure – serial port not found  
- 0x0004 Failure – no response  
- 0x8001 Failure – busy  
- 0x8002 Failure – occupied (e.g., long-file transfer or firmware upgrade in progress)
```

## C262 -> C263 | Set hue(color tone) level | 30

- Function: Set hue(color tone) level
- Description: 30
- Set code: `C262`
- Reply code: `C263`
- Payload length (derived from RX tail marker): 2
- Source: eXview AIO Main Protocol row 54

TX hex:

```text
55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 62 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 01 00 50 0A
```

RX hex:

```text
55 55 55 55 55 55 55 C0 01 03 00 D1 01 D0 63 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 02 00 01 00 BD
```

Instruction / notes:

```text
Set Command Code: 0xC262  
Set Data (1 byte): 0x00–0x64 (decimal 0～100, mapped to –50–50 on the UI)

Response Command Code: 0xC263  
Response Data (2 bytes):  
- 0x0001 Success  
- 0x0002 Failure – unspecified reason  
- 0x0003 Failure – serial port not found  
- 0x0004 Failure – no response  
- 0x8001 Failure – busy  
- 0x8002 Failure – occupied (e.g., long-file transfer or firmware upgrade in progress)
```

## C262 -> C263 | Set hue(color tone) level | 40

- Function: Set hue(color tone) level
- Description: 40
- Set code: `C262`
- Reply code: `C263`
- Payload length (derived from RX tail marker): 2
- Source: eXview AIO Main Protocol row 55

TX hex:

```text
55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 62 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 01 00 5A 14
```

RX hex:

```text
55 55 55 55 55 55 55 C0 01 03 00 D1 01 D0 63 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 02 00 01 00 BD
```

Instruction / notes:

```text
Set Command Code: 0xC262  
Set Data (1 byte): 0x00–0x64 (decimal 0～100, mapped to –50–50 on the UI)

Response Command Code: 0xC263  
Response Data (2 bytes):  
- 0x0001 Success  
- 0x0002 Failure – unspecified reason  
- 0x0003 Failure – serial port not found  
- 0x0004 Failure – no response  
- 0x8001 Failure – busy  
- 0x8002 Failure – occupied (e.g., long-file transfer or firmware upgrade in progress)
```

## C262 -> C263 | Set hue(color tone) level | 50

- Function: Set hue(color tone) level
- Description: 50
- Set code: `C262`
- Reply code: `C263`
- Payload length (derived from RX tail marker): 2
- Source: eXview AIO Main Protocol row 56

TX hex:

```text
55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 62 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 01 00 64 1E
```

RX hex:

```text
55 55 55 55 55 55 55 C0 01 03 00 D1 01 D0 63 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 02 00 01 00 BD
```

Instruction / notes:

```text
Set Command Code: 0xC262  
Set Data (1 byte): 0x00–0x64 (decimal 0～100, mapped to –50–50 on the UI)

Response Command Code: 0xC263  
Response Data (2 bytes):  
- 0x0001 Success  
- 0x0002 Failure – unspecified reason  
- 0x0003 Failure – serial port not found  
- 0x0004 Failure – no response  
- 0x8001 Failure – busy  
- 0x8002 Failure – occupied (e.g., long-file transfer or firmware upgrade in progress)
```

## C264 -> C265 | Query hue level | Query Current Hue Value

- Function: Query hue level
- Description: Query Current Hue Value
- Set code: `C264`
- Reply code: `C265`
- Payload length (derived from RX tail marker): 1
- Source: eXview AIO Main Protocol row 57

TX hex:

```text
55 55 55 55 55 55 55 C0 01 03 01 D0 00 D1 64 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 00 00 BB
```

RX hex:

```text
55 55 55 55 55 55 55 C0 01 03 00 D1 01 D0 65 C2 00 00 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF 00 01 00 64 21
```

Instruction / notes:

```text
Set Command Code: 0xC264  
Response Command Code: 0xC265  
Response Data (1 byte): 0x00–0x64 (decimal 0～100, mapped to –50～50 on the UI)

Return hue value 10
```

