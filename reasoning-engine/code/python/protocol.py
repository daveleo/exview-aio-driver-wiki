from __future__ import annotations

from dataclasses import dataclass
from typing import Dict, List, Optional, Sequence, Union


FORMULA_BASE: Dict[str, int] = {
    "C203": 0x5B,
    "C21F": 0x77,
}


@dataclass(frozen=True)
class NumericSpec:
    set_code: str
    value_index: int
    checksum_index: int
    hue_mode: bool = False


NUMERIC_CONTROL_MAP: Dict[str, NumericSpec] = {
    "volume": NumericSpec("C203", 38, 39, False),
    "brightness": NumericSpec("C21F", 38, 39, False),
    "contrast": NumericSpec("C217", 38, 39, False),
    "hue": NumericSpec("C262", 38, 39, True),
    "saturation": NumericSpec("C259", 38, 39, False),
    "red-gain": NumericSpec("C223", 38, 39, False),
    "green-gain": NumericSpec("C227", 38, 39, False),
    "blue-gain": NumericSpec("C22B", 38, 39, False),
}


def normalize_code(code: Optional[str]) -> str:
    cleaned = "".join(ch for ch in str(code or "").replace("0x", "").replace("0X", "") if ch in "0123456789abcdefABCDEF")
    cleaned = cleaned.upper()
    return cleaned[-4:].rjust(4, "0") if cleaned else ""


def parse_hex_bytes(data: Union[str, Sequence[int]]) -> List[int]:
    if isinstance(data, (list, tuple)):
        return [int(v) & 0xFF for v in data]
    text = str(data or "")
    tokens: List[str] = []
    current = ""
    for ch in text:
        if ch in "0123456789abcdefABCDEF":
            current += ch
            if len(current) == 2:
                tokens.append(current)
                current = ""
        else:
            current = ""
    return [int(token, 16) for token in tokens]


def bytes_to_hex(bytes_: Sequence[int]) -> str:
    return " ".join(f"{int(b) & 0xFF:02X}" for b in bytes_)


def compute_checksum(bytes_: Sequence[int], command_code: Optional[str] = None, value: Optional[int] = None) -> int:
    normalized = normalize_code(command_code)
    if normalized in FORMULA_BASE and value is not None:
        return (FORMULA_BASE[normalized] + int(value)) & 0xFF
    checksum = 0
    for index in range(8, len(bytes_) - 1):
        checksum = (checksum + (int(bytes_[index]) & 0xFF)) & 0xFF
    return checksum


def decode_reply_code(packet: Union[str, Sequence[int]]) -> Optional[str]:
    bytes_ = parse_hex_bytes(packet)
    max_scan = min(len(bytes_) - 3, 40)
    for index in range(8, max_scan + 1):
        if bytes_[index] != 0xD0:
            continue
        low = bytes_[index + 1]
        high = bytes_[index + 2]
        return f"{high:02X}{low:02X}"
    return None


def extract_tail_payload(packet: Union[str, Sequence[int]]) -> Optional[Dict[str, object]]:
    bytes_ = parse_hex_bytes(packet)
    if len(bytes_) < 6:
        return None
    min_index = max(0, len(bytes_) - 96)
    for index in range(len(bytes_) - 4, min_index - 1, -1):
        if bytes_[index] != 0x00:
            continue
        if bytes_[index + 2] != 0x00:
            continue
        length = bytes_[index + 1]
        start = index + 3
        checksum_index = start + length
        if checksum_index != len(bytes_) - 1:
            continue
        return {
            "marker_index": index,
            "length": length,
            "data": bytes_[start:checksum_index],
            "checksum": bytes_[-1],
        }
    return None


def parse_status(data_bytes: Union[str, Sequence[int]]) -> Optional[int]:
    data = parse_hex_bytes(data_bytes)
    if len(data) < 2:
        return None
    return data[0] | (data[1] << 8)


def encode_hue(ui_value: float) -> int:
    return clamp(round(float(ui_value) + 50), 0, 100)


def decode_hue(proto_value: int) -> int:
    return int(proto_value) - 50


def build_numeric_command(command_name: str, ui_value: float, template_packet: Union[str, Sequence[int]]) -> Dict[str, object]:
    key = str(command_name or "").lower()
    if key not in NUMERIC_CONTROL_MAP:
        raise ValueError(f"Unknown numeric command: {command_name}")
    spec = NUMERIC_CONTROL_MAP[key]
    bytes_ = parse_hex_bytes(template_packet)
    if len(bytes_) <= spec.checksum_index:
        raise ValueError(f"Template packet too short for {command_name}")

    if spec.hue_mode:
        proto_value = encode_hue(ui_value)
    else:
        proto_value = clamp(round(float(ui_value)), 0, 100)

    bytes_[spec.value_index] = proto_value
    checksum = compute_checksum(bytes_, spec.set_code, proto_value)
    bytes_[spec.checksum_index] = checksum

    return {
        "command": key,
        "set_code": spec.set_code,
        "ui_value": ui_value,
        "proto_value": proto_value,
        "checksum": checksum,
        "bytes": bytes_,
        "hex": bytes_to_hex(bytes_),
    }


def clamp(value: int, min_value: int, max_value: int) -> int:
    return min(max_value, max(min_value, int(value)))
