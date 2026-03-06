# Query vs Set Commands

## Set Command

A set command writes/configures a device value.

Typical behavior:

1. TX includes set code and data byte(s).
2. RX returns ACK-style status payload (`len=2`) with little-endian status code.

Example pattern:

- Set code: `C203` (volume set)
- Reply code: `C204`
- RX payload: `00 02 00 01 00 <checksum>` -> status `0x0001` (success)

## Query Command

A query command asks device for current state/value.

Typical behavior:

1. TX includes query set code, usually no value payload.
2. RX returns data payload (`len=1` for numeric controls, `len=4` for HDMI signal map query).

Example pattern:

- Query set code: `C21D` (brightness query)
- Reply code: `C21E`
- RX payload: `00 01 00 <value> <checksum>`

## AI Retrieval Tip

When a user asks "how to set X", prioritize set code and ACK decoding.  
When a user asks "how to read/query X", prioritize query set code and value payload decode.
