#!/usr/bin/env node

import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");
const DATA_DIR = path.join(ROOT, "data");
const RULES_DIR = path.join(ROOT, "rules");

function main() {
  ensureDir(DATA_DIR);
  ensureDir(RULES_DIR);

  const xlsxPath = resolveInputPath("eXview_AIO_Updated_Protocol.xlsx");
  const truthPath = resolveInputPath("truth.json");
  const certifyPath = resolveInputPath("device-certify.ts");
  const generatedAt = new Date().toISOString();

  const workbook = loadWorkbookData(xlsxPath);
  const certify = parseCertifyMeta(fs.readFileSync(certifyPath, "utf8"));
  const commandsData = buildCommandsData(workbook, certify, generatedAt, {
    xlsxPath,
    certifyPath
  });
  const examplesData = buildExamplesData(truthPath, generatedAt, {
    truthPath
  });
  const controlsData = buildControlsData(commandsData, examplesData, generatedAt, {
    xlsxPath,
    truthPath,
    certifyPath
  });
  const packetConstructionRules = buildPacketConstructionRules(commandsData, controlsData);
  const packetParsingRules = buildPacketParsingRules(commandsData);
  const numericEncodingRules = buildNumericEncodingRules(controlsData);
  const statusCodeMap = buildStatusCodeMap(commandsData.certify);
  const replyCodeMap = buildReplyCodeMap(commandsData.commands);

  writeJson(path.join(DATA_DIR, "commands.json"), commandsData);
  writeJson(path.join(DATA_DIR, "examples.json"), examplesData);
  writeJson(path.join(DATA_DIR, "controls.json"), controlsData);
  writeJson(path.join(RULES_DIR, "packet-construction-rules.json"), packetConstructionRules);
  writeJson(path.join(RULES_DIR, "packet-parsing-rules.json"), packetParsingRules);
  writeJson(path.join(RULES_DIR, "numeric-encoding-rules.json"), numericEncodingRules);
  writeJson(path.join(RULES_DIR, "status-code-map.json"), statusCodeMap);
  writeJson(path.join(RULES_DIR, "reply-code-map.json"), replyCodeMap);

  console.log(`[build_reasoning_assets] generatedAt=${generatedAt}`);
  console.log(`[build_reasoning_assets] commands=${commandsData.commands.length}`);
  console.log(`[build_reasoning_assets] exampleGroups=${examplesData.groups.length}`);
  console.log(`[build_reasoning_assets] examples=${examplesData.totalExamples}`);
  console.log(`[build_reasoning_assets] controls=${controlsData.controls.length}`);
}

function resolveInputPath(fileName) {
  const candidates = [
    path.join(ROOT, fileName),
    path.resolve(ROOT, "..", fileName),
    path.join("/mnt/data", fileName)
  ];

  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) return candidate;
  }

  throw new Error(`Input file not found: ${fileName}`);
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function writeJson(filePath, value) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

function loadWorkbookData(xlsxPath) {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "exview-xlsx-"));
  try {
    extractXlsxToTemp(xlsxPath, tempDir);

    const workbookXmlPath = path.join(tempDir, "xl", "workbook.xml");
    const relsXmlPath = path.join(tempDir, "xl", "_rels", "workbook.xml.rels");
    const sharedStringsXmlPath = path.join(tempDir, "xl", "sharedStrings.xml");

    const workbookXml = fs.readFileSync(workbookXmlPath, "utf8");
    const relsXml = fs.readFileSync(relsXmlPath, "utf8");
    const sharedStrings = fs.existsSync(sharedStringsXmlPath)
      ? parseSharedStrings(fs.readFileSync(sharedStringsXmlPath, "utf8"))
      : [];

    const sheets = parseWorkbookSheets(workbookXml, relsXml).map(sheet => {
      const sheetXmlPath = path.join(tempDir, "xl", sheet.target);
      if (!fs.existsSync(sheetXmlPath)) {
        throw new Error(`Worksheet file not found: ${sheet.target}`);
      }
      const sheetXml = fs.readFileSync(sheetXmlPath, "utf8");
      return {
        name: sheet.name,
        target: sheet.target,
        rows: parseWorksheetRows(sheetXml, sharedStrings)
      };
    });

    return { sheets };
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
}

function extractXlsxToTemp(xlsxPath, tempDir) {
  const attempts = [];

  try {
    execFileSync("unzip", ["-oq", xlsxPath, "-d", tempDir], { stdio: "ignore" });
    return;
  } catch (error) {
    attempts.push(`unzip failed: ${String(error.message || error)}`);
  }

  try {
    execFileSync("tar", ["-xf", xlsxPath, "-C", tempDir], { stdio: "ignore" });
    return;
  } catch (error) {
    attempts.push(`tar failed: ${String(error.message || error)}`);
  }

  try {
    const zipPath = path.join(tempDir, "archive.zip");
    fs.copyFileSync(xlsxPath, zipPath);
    const psCommand = `Expand-Archive -LiteralPath '${escapePowerShell(zipPath)}' -DestinationPath '${escapePowerShell(
      tempDir
    )}' -Force`;
    execFileSync("powershell", ["-NoProfile", "-Command", psCommand], { stdio: "ignore" });
    return;
  } catch (error) {
    attempts.push(`powershell Expand-Archive failed: ${String(error.message || error)}`);
  }

  throw new Error(`Failed to extract XLSX:\n${attempts.join("\n")}`);
}

function escapePowerShell(input) {
  return input.replace(/'/g, "''");
}

function parseWorkbookSheets(workbookXml, relsXml) {
  const relationById = new Map();
  for (const match of relsXml.matchAll(/<Relationship\b([^>]*)\/>/g)) {
    const attrs = parseXmlAttrs(match[1]);
    if (!attrs.Id || !attrs.Target) continue;
    relationById.set(attrs.Id, attrs.Target);
  }

  const sheets = [];
  for (const match of workbookXml.matchAll(/<sheet\b([^>]*)\/>/g)) {
    const attrs = parseXmlAttrs(match[1]);
    const name = attrs.name;
    const relId = attrs["r:id"];
    if (!name || !relId) continue;
    const target = relationById.get(relId);
    if (!target) continue;
    sheets.push({
      name,
      relId,
      target: target.replace(/^\/+/, "")
    });
  }

  return sheets;
}

function parseSharedStrings(sharedXml) {
  const out = [];
  for (const siMatch of sharedXml.matchAll(/<si\b[^>]*>([\s\S]*?)<\/si>/g)) {
    const siBody = siMatch[1];
    let text = "";
    for (const textMatch of siBody.matchAll(/<t(?:\s[^>]*)?>([\s\S]*?)<\/t>/g)) {
      text += decodeXml(textMatch[1]);
    }
    out.push(text);
  }
  return out;
}

function parseWorksheetRows(sheetXml, sharedStrings) {
  const rows = [];
  for (const rowMatch of sheetXml.matchAll(/<row\b([^>]*)>([\s\S]*?)<\/row>/g)) {
    const rowAttrs = parseXmlAttrs(rowMatch[1]);
    const rowNumber = Number.parseInt(rowAttrs.r || "", 10);
    const rowBody = rowMatch[2];
    const cells = {};

    for (const cellMatch of rowBody.matchAll(/<c\b[^>]*\/>|<c\b[^>]*>[\s\S]*?<\/c>/g)) {
      const cellXml = cellMatch[0];
      const selfClosing = /\/>$/.test(cellXml);
      const attrMatch = /^<c\b([^>]*)>/.exec(cellXml) || /^<c\b([^>]*)\/>$/.exec(cellXml);
      const attrText = attrMatch ? attrMatch[1] : "";
      const body = selfClosing ? "" : cellXml.replace(/^<c\b[^>]*>/, "").replace(/<\/c>$/, "");
      const attrs = parseXmlAttrs(attrText);
      const ref = attrs.r || "";
      const column = extractColumnName(ref);
      if (!column) continue;

      const type = attrs.t || "";
      const value = decodeCellValue(type, body, sharedStrings).trim();
      if (!value) continue;
      cells[column] = value;
    }

    if (Object.keys(cells).length === 0) continue;
    rows.push({
      rowNumber: Number.isFinite(rowNumber) ? rowNumber : null,
      cells
    });
  }
  return rows;
}

function decodeCellValue(type, cellBody, sharedStrings) {
  if (!cellBody) return "";

  if (type === "s") {
    const raw = firstTagText(cellBody, "v");
    if (raw == null) return "";
    const index = Number.parseInt(raw.trim(), 10);
    if (!Number.isFinite(index) || index < 0 || index >= sharedStrings.length) return "";
    return sharedStrings[index] || "";
  }

  if (type === "inlineStr") {
    let text = "";
    for (const match of cellBody.matchAll(/<t(?:\s[^>]*)?>([\s\S]*?)<\/t>/g)) {
      text += decodeXml(match[1]);
    }
    return text;
  }

  const raw = firstTagText(cellBody, "v");
  if (raw == null) return "";
  return decodeXml(raw);
}

function firstTagText(xml, tagName) {
  const match = new RegExp(`<${tagName}\\b[^>]*>([\\s\\S]*?)<\\/${tagName}>`).exec(xml);
  if (!match) return null;
  return match[1];
}

function parseXmlAttrs(attrText) {
  const attrs = {};
  for (const match of attrText.matchAll(/([A-Za-z_:][\w:.-]*)="([^"]*)"/g)) {
    attrs[match[1]] = decodeXml(match[2]);
  }
  return attrs;
}

function extractColumnName(cellRef) {
  const match = /^([A-Z]+)/.exec(cellRef || "");
  return match ? match[1] : "";
}

function decodeXml(input) {
  return String(input || "")
    .replace(/&#x([0-9A-Fa-f]+);/g, (_, hex) => String.fromCodePoint(Number.parseInt(hex, 16)))
    .replace(/&#([0-9]+);/g, (_, dec) => String.fromCodePoint(Number.parseInt(dec, 10)))
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}

function buildCommandsData(workbook, certify, generatedAt, sourcePaths) {
  const mainSheet = workbook.sheets.find(sheet => sheet.name === "X Wall V3 Integrated Control Pr");
  if (!mainSheet) {
    throw new Error('Sheet "X Wall V3 Integrated Control Pr" was not found');
  }
  const arkSheet = workbook.sheets.find(sheet => sheet.name === "Ark1");

  const commands = [];
  commands.push(...parseMainSheetCommands(mainSheet.rows));

  const arkCommands = parseArkSheetCommands(arkSheet?.rows ?? [], commands);
  commands.push(...arkCommands);

  const numericWarnings = collectNumericWarnings(commands, certify.numericSetCodes);

  return {
    meta: {
      generatedAt,
      source: {
        workbook: normalizePathForJson(sourcePaths.xlsxPath),
        certify: normalizePathForJson(sourcePaths.certifyPath)
      }
    },
    certify,
    numericWarnings,
    commands
  };
}

function parseMainSheetCommands(rows) {
  const headerIndex = rows.findIndex(row => {
    const a = (row.cells.A || "").trim().toLowerCase();
    const b = (row.cells.B || "").trim().toLowerCase();
    return a === "function" && b === "description";
  });
  if (headerIndex < 0) {
    throw new Error("Could not locate header row in main worksheet");
  }

  const commands = [];
  const carry = { A: "", C: "", D: "", E: "" };

  for (let index = headerIndex + 1; index < rows.length; index += 1) {
    const row = rows[index];
    const a = (row.cells.A || "").trim();
    const b = (row.cells.B || "").trim();
    const c = (row.cells.C || "").trim();
    const d = (row.cells.D || "").trim();
    const e = (row.cells.E || "").trim();
    const f = (row.cells.F || "").trim();

    if (a) carry.A = a;
    if (c) carry.C = c;
    if (d) carry.D = d;
    if (e) carry.E = e;

    const functionText = a || carry.A;
    const txRaw = c || carry.C;
    const rxRaw = d || carry.D;
    const instruction = e || carry.E;

    const txHex = normalizeHex(txRaw);
    const rxHex = normalizeHex(rxRaw);
    if (!looksLikePacket(txHex) && !looksLikePacket(rxHex)) continue;
    if (!functionText) continue;
    if (/^operation method$/i.test(functionText) || /^operating instructions$/i.test(functionText)) continue;

    const setFromInstruction = extractInstructionCode(instruction, "set");
    const replyFromInstruction = extractInstructionCode(instruction, "reply");
    const setFromTx = decodeSetCodeFromPacket(txHex);
    const replyFromRx = decodeReplyCodeFromPacket(rxHex);

    commands.push({
      source_sheet: "eXview AIO Main Protocol",
      source_row: row.rowNumber,
      function: functionText,
      description: b,
      tx_hex: txHex,
      rx_hex: rxHex,
      tx_hex_raw: txRaw,
      rx_hex_raw: rxRaw,
      instruction: instruction,
      remark: f,
      set_code: setFromInstruction || setFromTx,
      reply_code: replyFromInstruction || replyFromRx,
      set_code_instruction: setFromInstruction,
      reply_code_instruction: replyFromInstruction,
      set_code_derived: setFromTx,
      reply_code_derived: replyFromRx,
      payload_length: extractTailPayloadLength(rxHex)
    });
  }

  return commands;
}

function parseArkSheetCommands(rows, existingCommands) {
  const commands = [];
  for (const row of rows) {
    const a = (row.cells.A || "").trim();
    const b = (row.cells.B || "").trim();
    const c = (row.cells.C || "").trim();
    const d = (row.cells.D || "").trim();
    const e = (row.cells.E || "").trim();
    const f = (row.cells.F || "").trim();

    const instruction = b || e || "";
    const setFromInstruction = extractInstructionCode(instruction, "set");
    const replyFromInstruction = extractInstructionCode(instruction, "reply");

    let txRaw = "";
    let rxRaw = "";

    const packetCandidates = [a, c, d].filter(Boolean);
    for (const candidate of packetCandidates) {
      const normalized = normalizeHex(candidate);
      if (!looksLikePacket(normalized)) continue;

      const derivedSet = decodeSetCodeFromPacket(normalized);
      const derivedReply = decodeReplyCodeFromPacket(normalized);

      if (replyFromInstruction && (derivedReply === replyFromInstruction || derivedSet === replyFromInstruction) && !rxRaw) {
        rxRaw = candidate;
      } else if (setFromInstruction && (derivedSet === setFromInstruction || derivedReply === setFromInstruction) && !txRaw) {
        txRaw = candidate;
      } else if (!txRaw && derivedSet && !derivedReply) {
        txRaw = candidate;
      } else if (!rxRaw && derivedReply) {
        rxRaw = candidate;
      } else if (!txRaw) {
        txRaw = candidate;
      } else if (!rxRaw) {
        rxRaw = candidate;
      }
    }

    if (!txRaw && setFromInstruction) {
      const linked = existingCommands.find(
        item => item.set_code === setFromInstruction || item.set_code_derived === setFromInstruction
      );
      if (linked?.tx_hex_raw) txRaw = linked.tx_hex_raw;
      if (!rxRaw && linked?.rx_hex_raw) rxRaw = linked.rx_hex_raw;
    }

    const txHex = normalizeHex(txRaw);
    const rxHex = normalizeHex(rxRaw);
    if (!looksLikePacket(txHex) && !looksLikePacket(rxHex)) continue;

    const setFromTx = decodeSetCodeFromPacket(txHex);
    const replyFromRx = decodeReplyCodeFromPacket(rxHex);
    const functionText = setFromInstruction
      ? `Ark1 additional command 0x${setFromInstruction}`
      : "Ark1 additional command";

    commands.push({
      source_sheet: "eXview AIO Ark1 Addendum",
      source_row: row.rowNumber,
      function: functionText,
      description: "Additional command from Ark1 sheet",
      tx_hex: txHex,
      rx_hex: rxHex,
      tx_hex_raw: txRaw,
      rx_hex_raw: rxRaw,
      instruction,
      remark: f,
      set_code: setFromInstruction || setFromTx,
      reply_code: replyFromInstruction || replyFromRx,
      set_code_instruction: setFromInstruction,
      reply_code_instruction: replyFromInstruction,
      set_code_derived: setFromTx,
      reply_code_derived: replyFromRx,
      payload_length: extractTailPayloadLength(rxHex)
    });
  }
  return commands;
}

function collectNumericWarnings(commands, numericSetCodes) {
  const numericKeywords =
    /volume|brightness|contrast|saturation|hue|red gain|green gain|blue gain|color gain/i;
  const numericCodeSet = new Set(numericSetCodes || []);
  const warnings = [];

  for (const command of commands) {
    const setMismatch =
      command.set_code_instruction &&
      command.set_code_derived &&
      command.set_code_instruction !== command.set_code_derived;
    const replyMismatch =
      command.reply_code_instruction &&
      command.reply_code_derived &&
      command.reply_code_instruction !== command.reply_code_derived;

    if (!setMismatch && !replyMismatch) continue;

    const touchesNumericCode =
      numericCodeSet.has(command.set_code_instruction || "") ||
      numericCodeSet.has(command.set_code_derived || "") ||
      numericCodeSet.has(command.reply_code_instruction || "") ||
      numericCodeSet.has(command.reply_code_derived || "");

    const touchesNumericText = numericKeywords.test(`${command.function} ${command.description} ${command.instruction}`);
    if (!touchesNumericCode && !touchesNumericText) continue;

    warnings.push({
      source_sheet: command.source_sheet,
      source_row: command.source_row,
      function: command.function,
      description: command.description,
      issue: setMismatch && replyMismatch ? "set_and_reply_code_mismatch" : setMismatch ? "set_code_mismatch" : "reply_code_mismatch",
      set_code_instruction: command.set_code_instruction,
      set_code_derived: command.set_code_derived,
      reply_code_instruction: command.reply_code_instruction,
      reply_code_derived: command.reply_code_derived,
      tx_hex_raw: command.tx_hex_raw,
      rx_hex_raw: command.rx_hex_raw
    });
  }

  return warnings;
}

function buildExamplesData(truthPath, generatedAt, sourcePaths) {
  const truth = JSON.parse(fs.readFileSync(truthPath, "utf8"));
  const records = Array.isArray(truth?.records) ? truth.records : [];

  const byCommandKey = new Map();
  for (const record of records) {
    const commandKey = String(record.commandKey || "").trim() || "(missing)";
    const setCode = normalizeCode(record.setCode);
    const replyCode = normalizeCode(record.replyCode);

    let group = byCommandKey.get(commandKey);
    if (!group) {
      group = {
        commandKey,
        setCode: setCode,
        replyCode: replyCode,
        examples: []
      };
      byCommandKey.set(commandKey, group);
    }

    if (!group.setCode && setCode) group.setCode = setCode;
    if (!group.replyCode && replyCode) group.replyCode = replyCode;

    group.examples.push({
      setCode,
      replyCode,
      txHex: normalizeHex(record.txHex || ""),
      rxHex: normalizeHex(record.rxHex || ""),
      latencyMs: numberOrNull(record.latencyMs),
      transportStatus: stringOrNull(record.transportStatus),
      status: stringOrNull(record.status),
      meaning: stringOrNull(record.meaning),
      value: numberOrNull(record.value),
      queryTxHex: normalizeHex(record.queryTxHex || ""),
      queryRxHex: normalizeHex(record.queryRxHex || ""),
      queryLatencyMs: numberOrNull(record.queryLatencyMs),
      queryTransportStatus: stringOrNull(record.queryTransportStatus),
      queryValue: numberOrNull(record.queryValue)
    });
  }

  const groups = [...byCommandKey.values()].sort((a, b) => a.commandKey.localeCompare(b.commandKey, "en"));
  const totalExamples = groups.reduce((sum, group) => sum + group.examples.length, 0);

  return {
    meta: {
      generatedAt,
      source: {
        truth: normalizePathForJson(sourcePaths.truthPath)
      }
    },
    summary: truth?.summary || null,
    groups,
    totalExamples
  };
}

function buildControlsData(commandsData, examplesData, generatedAt, sourcePaths) {
  const commands = commandsData.commands || [];
  const certify = commandsData.certify || {};
  const closedLoop = certify.closedLoopQueryBySet || {};
  const numericIndex = certify.numericValueIndexBySet || {};
  const formulaBase = certify.formulaChecksumBase || {};
  const numericWarnings = commandsData.numericWarnings || [];

  const defs = [
    {
      id: "volume",
      name: "Volume",
      setCode: "C203",
      uiMin: 0,
      uiMax: 100,
      protoMin: 0,
      protoMax: 100,
      encoding: "proto = clamp(round(ui), 0, 100)",
      decoding: "ui = proto"
    },
    {
      id: "brightness",
      name: "Brightness",
      setCode: "C21F",
      uiMin: 0,
      uiMax: 100,
      protoMin: 0,
      protoMax: 100,
      encoding: "proto = clamp(round(ui), 0, 100)",
      decoding: "ui = proto"
    },
    {
      id: "contrast",
      name: "Contrast",
      setCode: "C217",
      uiMin: 0,
      uiMax: 100,
      protoMin: 0,
      protoMax: 100,
      encoding: "proto = clamp(round(ui), 0, 100)",
      decoding: "ui = proto"
    },
    {
      id: "hue",
      name: "Hue",
      setCode: "C262",
      uiMin: -50,
      uiMax: 50,
      protoMin: 0,
      protoMax: 100,
      encoding: "proto = clamp(round(ui + 50), 0, 100)",
      decoding: "ui = proto - 50"
    },
    {
      id: "saturation",
      name: "Saturation",
      setCode: "C259",
      uiMin: 0,
      uiMax: 100,
      protoMin: 0,
      protoMax: 100,
      encoding: "proto = clamp(round(ui), 0, 100)",
      decoding: "ui = proto"
    },
    {
      id: "red-gain",
      name: "Red Gain",
      setCode: "C223",
      uiMin: 0,
      uiMax: 100,
      protoMin: 0,
      protoMax: 100,
      encoding: "proto = clamp(round(ui), 0, 100)",
      decoding: "ui = proto"
    },
    {
      id: "green-gain",
      name: "Green Gain",
      setCode: "C227",
      uiMin: 0,
      uiMax: 100,
      protoMin: 0,
      protoMax: 100,
      encoding: "proto = clamp(round(ui), 0, 100)",
      decoding: "ui = proto"
    },
    {
      id: "blue-gain",
      name: "Blue Gain",
      setCode: "C22B",
      uiMin: 0,
      uiMax: 100,
      protoMin: 0,
      protoMax: 100,
      encoding: "proto = clamp(round(ui), 0, 100)",
      decoding: "ui = proto"
    }
  ];

  const controls = defs.map(def => {
    const querySetCode = closedLoop[def.setCode] || null;
    const setRow = pickCommandRowForCode(commands, def.setCode, true);
    const queryRow = querySetCode ? pickCommandRowForCode(commands, querySetCode, false) : null;

    const setReplyCode = normalizeCode(setRow?.reply_code || setRow?.reply_code_derived || null);
    const queryReplyCode = normalizeCode(queryRow?.reply_code || queryRow?.reply_code_derived || null);
    const indexSpec = numericIndex[def.setCode] || null;

    const relatedWarnings = numericWarnings.filter(item => {
      const setIns = normalizeCode(item.set_code_instruction || null);
      const setDer = normalizeCode(item.set_code_derived || null);
      return setIns === def.setCode || setDer === def.setCode;
    });

    const bestExample = pickExampleForSetCode(examplesData, def.setCode);
    const bestQueryExample = querySetCode ? pickExampleForSetCode(examplesData, querySetCode) : null;

    return {
      id: def.id,
      name: def.name,
      setCode: def.setCode,
      setReplyCode,
      querySetCode,
      queryReplyCode,
      uiRange: { min: def.uiMin, max: def.uiMax },
      protocolRange: { min: def.protoMin, max: def.protoMax, hexMin: "0x00", hexMax: "0x64" },
      encodingFormula: def.encoding,
      decodingFormula: def.decoding,
      checksumMode: formulaBase[def.setCode] != null ? "formula_base" : "sum_bytes_8_to_len_minus_2",
      checksumBase: formulaBase[def.setCode] != null ? formulaBase[def.setCode] : null,
      valueIndex: indexSpec?.valueIndex ?? null,
      checksumIndex: indexSpec?.checksumIndex ?? null,
      setExampleTx: setRow?.tx_hex || bestExample?.txHex || null,
      setExampleRx: setRow?.rx_hex || bestExample?.rxHex || null,
      queryExampleTx: queryRow?.tx_hex || bestQueryExample?.txHex || null,
      queryExampleRx: queryRow?.rx_hex || bestQueryExample?.rxHex || null,
      instruction: setRow?.instruction || null,
      queryInstruction: queryRow?.instruction || null,
      warnings: relatedWarnings
    };
  });

  return {
    meta: {
      generatedAt,
      source: {
        workbook: normalizePathForJson(sourcePaths.xlsxPath),
        truth: normalizePathForJson(sourcePaths.truthPath),
        certify: normalizePathForJson(sourcePaths.certifyPath)
      }
    },
    controls
  };
}

function buildPacketConstructionRules(commandsData, controlsData) {
  const certify = commandsData.certify || {};
  return {
    header: {
      fixedBytesHex: ["55", "55", "55", "55", "55", "55", "55"],
      length: 7,
      description: "All protocol packets begin with seven bytes 0x55."
    },
    commandMarkers: {
      primaryMarkerHex: "D0",
      directionByteContext: "Marker is scanned from index 8 forward for code extraction."
    },
    numericValueInsertion: {
      valueIndexBySetCode: certify.numericValueIndexBySet || {},
      controls: controlsData.controls.map(item => ({
        id: item.id,
        setCode: item.setCode,
        valueIndex: item.valueIndex,
        checksumIndex: item.checksumIndex
      }))
    },
    checksum: {
      defaultRule: "(sum(bytes[index 8 .. len-2])) & 0xFF",
      specialBySetCode: Object.fromEntries(
        Object.entries(certify.formulaChecksumBase || {}).map(([setCode, base]) => [
          setCode,
          {
            mode: "formula_base",
            expression: `(0x${Number(base).toString(16).toUpperCase()} + value) & 0xFF`,
            base
          }
        ])
      )
    },
    constructionSteps: [
      "Start from a valid TX template packet.",
      "Replace numeric value byte at the configured index.",
      "Recompute checksum using special formula-base rule if set code is C203 or C21F, else use default sum rule.",
      "Write checksum into final checksum index."
    ]
  };
}

function buildPacketParsingRules(commandsData) {
  return {
    headerValidation: {
      requiredLeadingBytesHex: ["55", "55", "55", "55", "55", "55", "55"],
      minPacketLength: 10
    },
    replyCodeDecoding: {
      markerHex: "D0",
      scanStartIndex: 8,
      scanEndIndexHint: 40,
      algorithm: [
        "Scan bytes from index 8 for marker 0xD0.",
        "Read low = bytes[i+1], high = bytes[i+2].",
        "Reply code string is high followed by low in uppercase hex."
      ],
      example: {
        markerSequence: "D0 02 C2",
        decodedReplyCode: "C202"
      }
    },
    tailPayloadExtraction: {
      pattern: "00 <len> 00 <data...> <checksum>",
      algorithm: [
        "Search near the packet tail for marker 0x00.",
        "Interpret next byte as len.",
        "Require next byte after len to be 0x00.",
        "Read exactly len data bytes.",
        "Require checksum byte to be the final byte of packet."
      ],
      examples: [
        {
          tailHex: "00 01 00 64 DA",
          payloadLength: 1,
          dataHex: "64",
          decodedValue: 100
        },
        {
          tailHex: "00 02 00 01 00 7A",
          payloadLength: 2,
          dataHex: "01 00",
          statusLittleEndianHex: "0x0001"
        }
      ]
    },
    statusDecoding: {
      byteOrder: "little-endian",
      expression: "status = data[0] | (data[1] << 8)"
    }
  };
}

function buildNumericEncodingRules(controlsData) {
  return {
    controls: controlsData.controls.map(item => ({
      id: item.id,
      name: item.name,
      setCode: item.setCode,
      querySetCode: item.querySetCode,
      queryReplyCode: item.queryReplyCode,
      uiRange: item.uiRange,
      protocolRange: item.protocolRange,
      encodingFormula: item.encodingFormula,
      decodingFormula: item.decodingFormula,
      checksumMode: item.checksumMode,
      checksumBase: item.checksumBase,
      valueIndex: item.valueIndex,
      checksumIndex: item.checksumIndex
    }))
  };
}

function buildStatusCodeMap(certify) {
  const out = {};
  for (const item of certify?.ackStatusMeaning || []) {
    out[`0x${item.code}`] = item.meaning;
  }
  return out;
}

function buildReplyCodeMap(commands) {
  const map = {};
  for (const command of commands || []) {
    const replyCode = normalizeCode(command.reply_code || command.reply_code_derived || null);
    if (!replyCode) continue;
    const key = `0x${replyCode}`;
    if (!map[key]) {
      map[key] = {
        replyCode: key,
        rows: []
      };
    }
    map[key].rows.push({
      function: command.function,
      description: command.description,
      setCode: command.set_code || command.set_code_derived || null,
      sourceSheet: command.source_sheet,
      sourceRow: command.source_row
    });
  }

  const sorted = {};
  for (const code of Object.keys(map).sort((a, b) => a.localeCompare(b, "en"))) {
    const rows = map[code].rows
      .sort((a, b) => String(a.function || "").localeCompare(String(b.function || ""), "en"))
      .filter((row, idx, arr) => {
        const key = `${row.function}|${row.description}|${row.setCode}`;
        return arr.findIndex(item => `${item.function}|${item.description}|${item.setCode}` === key) === idx;
      });
    sorted[code] = {
      replyCode: code,
      commandCount: rows.length,
      commands: rows
    };
  }
  return sorted;
}

function pickCommandRowForCode(commands, code, preferZeroValueDescription) {
  if (!code) return null;
  const candidates = (commands || []).filter(item => {
    const setCode = normalizeCode(item.set_code || null);
    const setDerived = normalizeCode(item.set_code_derived || null);
    return setCode === code || setDerived === code;
  });
  if (candidates.length === 0) return null;
  if (!preferZeroValueDescription) return candidates[0];

  const preferred = candidates.find(item => String(item.description || "").trim() === "0");
  if (preferred) return preferred;
  const preferredAlt = candidates.find(item => String(item.description || "").trim() === "-50");
  return preferredAlt || candidates[0];
}

function pickExampleForSetCode(examplesData, setCode) {
  const groups = examplesData?.groups || [];
  for (const group of groups) {
    const groupSet = normalizeCode(group.setCode || null);
    if (groupSet !== setCode) continue;
    if (!Array.isArray(group.examples) || group.examples.length === 0) continue;
    return group.examples[0];
  }
  return null;
}

function parseCertifyMeta(source) {
  const formulaChecksumBase = parseSimpleHexObject(source, "FORMULA_CHECKSUM_BASE");
  const closedLoopQueryBySet = parseSimpleStringObject(source, "CLOSED_LOOP_QUERY_BY_SET");
  const numericValueIndexBySet = parseNumericIndexObject(source, "NUMERIC_VALUE_INDEX_BY_SET");
  const ackStatusMeaning = parseAckStatusMap(source);

  const numericSetCodes = Object.keys(numericValueIndexBySet).sort();

  return {
    formulaChecksumBase,
    closedLoopQueryBySet,
    numericValueIndexBySet,
    ackStatusMeaning,
    numericSetCodes
  };
}

function parseSimpleHexObject(source, objectName) {
  const body = extractObjectBody(source, objectName);
  const out = {};
  if (!body) return out;
  for (const match of body.matchAll(/([A-Z0-9]+)\s*:\s*(0x[0-9A-Fa-f]+|\d+)/g)) {
    const key = match[1].toUpperCase();
    const raw = match[2];
    out[key] = raw.startsWith("0x") || raw.startsWith("0X") ? Number.parseInt(raw, 16) : Number.parseInt(raw, 10);
  }
  return out;
}

function parseSimpleStringObject(source, objectName) {
  const body = extractObjectBody(source, objectName);
  const out = {};
  if (!body) return out;
  for (const match of body.matchAll(/([A-Z0-9]+)\s*:\s*'([A-Z0-9]+)'/g)) {
    out[match[1].toUpperCase()] = match[2].toUpperCase();
  }
  return out;
}

function parseNumericIndexObject(source, objectName) {
  const body = extractObjectBody(source, objectName);
  const out = {};
  if (!body) return out;
  for (const match of body.matchAll(
    /([A-Z0-9]+)\s*:\s*\{\s*valueIndex\s*:\s*(\d+)\s*,\s*checksumIndex\s*:\s*(\d+)\s*\}/g
  )) {
    out[match[1].toUpperCase()] = {
      valueIndex: Number.parseInt(match[2], 10),
      checksumIndex: Number.parseInt(match[3], 10)
    };
  }
  return out;
}

function parseAckStatusMap(source) {
  const out = [];
  const mapMatch = source.match(/const\s+ACK_STATUS_MEANING[\s\S]*?new Map<number,\s*string>\(\[([\s\S]*?)\]\);/);
  if (!mapMatch) return out;
  const body = mapMatch[1];
  for (const match of body.matchAll(/\[\s*(0x[0-9A-Fa-f]+|\d+)\s*,\s*'([^']*)'\s*\]/g)) {
    const rawCode = match[1];
    const codeNumber = rawCode.startsWith("0x") || rawCode.startsWith("0X")
      ? Number.parseInt(rawCode, 16)
      : Number.parseInt(rawCode, 10);
    const code = Number.isFinite(codeNumber) ? codeNumber.toString(16).toUpperCase().padStart(4, "0") : "0000";
    out.push({
      code,
      meaning: match[2]
    });
  }
  return out;
}

function extractObjectBody(source, objectName) {
  const token = `const ${objectName}`;
  const start = source.indexOf(token);
  if (start < 0) return "";
  const equalsIndex = source.indexOf("=", start);
  if (equalsIndex < 0) return "";
  const braceStart = source.indexOf("{", equalsIndex);
  if (braceStart < 0) return "";
  let depth = 0;
  for (let index = braceStart; index < source.length; index += 1) {
    const char = source[index];
    if (char === "{") {
      depth += 1;
      continue;
    }
    if (char === "}") {
      depth -= 1;
      if (depth === 0) {
        return source.slice(braceStart + 1, index);
      }
    }
  }
  return "";
}

function numberOrNull(value) {
  if (value == null) return null;
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function stringOrNull(value) {
  if (value == null) return null;
  const text = String(value).trim();
  return text ? text : null;
}

function normalizeCode(value) {
  if (value == null) return null;
  const cleaned = String(value)
    .replace(/^0x/i, "")
    .replace(/[^0-9A-Fa-f]/g, "")
    .toUpperCase();
  if (!cleaned) return null;
  return cleaned.slice(-4).padStart(4, "0");
}

function normalizeHex(value) {
  if (!value) return "";
  const tokens = String(value)
    .replace(/0x/gi, "")
    .match(/[0-9A-Fa-f]{2}/g);
  if (!tokens) return "";
  return tokens.map(token => token.toUpperCase()).join(" ");
}

function looksLikePacket(normalizedHex) {
  if (!normalizedHex) return false;
  return normalizedHex.split(" ").length >= 8;
}

function parseHexBytes(normalizedHex) {
  if (!normalizedHex) return [];
  return normalizedHex.split(" ").map(token => Number.parseInt(token, 16));
}

function decodeReplyCodeFromPacket(normalizedHex) {
  const bytes = parseHexBytes(normalizedHex);
  if (bytes.length < 11) return null;
  const maxScan = Math.min(bytes.length - 3, 40);
  for (let index = 8; index <= maxScan; index += 1) {
    if (bytes[index] !== 0xd0) continue;
    const low = bytes[index + 1];
    const high = bytes[index + 2];
    if (low == null || high == null) return null;
    const code = `${high.toString(16).padStart(2, "0")}${low.toString(16).padStart(2, "0")}`.toUpperCase();
    return normalizeCode(code);
  }
  return null;
}

function decodeSetCodeFromPacket(normalizedHex) {
  const bytes = parseHexBytes(normalizedHex);
  if (bytes.length < 12) return null;
  const maxScan = Math.min(bytes.length - 5, 40);
  for (let index = 8; index <= maxScan; index += 1) {
    if (bytes[index] !== 0xd0) continue;

    if (bytes[index + 1] === 0x00 && bytes[index + 4] != null) {
      const low = bytes[index + 3];
      const high = bytes[index + 4];
      if (low != null && high != null) {
        const code = `${high.toString(16).padStart(2, "0")}${low.toString(16).padStart(2, "0")}`.toUpperCase();
        return normalizeCode(code);
      }
    }

    const low = bytes[index + 1];
    const high = bytes[index + 2];
    if (low != null && high != null) {
      const code = `${high.toString(16).padStart(2, "0")}${low.toString(16).padStart(2, "0")}`.toUpperCase();
      return normalizeCode(code);
    }
  }
  return null;
}

function extractInstructionCode(instruction, mode) {
  if (!instruction) return null;
  const pattern =
    mode === "set"
      ? /Set Command Code\s*:\s*0x([0-9A-Fa-f]{1,4})/i
      : /Response Command Code\s*:\s*0x([0-9A-Fa-f]{1,4})/i;
  const match = pattern.exec(instruction);
  if (!match) return null;
  return normalizeCode(match[1]);
}

function extractTailPayloadLength(normalizedHex) {
  const bytes = parseHexBytes(normalizedHex);
  if (bytes.length < 6) return null;
  const minIndex = Math.max(0, bytes.length - 96);
  for (let index = bytes.length - 4; index >= minIndex; index -= 1) {
    if (bytes[index] !== 0x00) continue;
    if (bytes[index + 2] !== 0x00) continue;
    const len = bytes[index + 1];
    const payloadStart = index + 3;
    const checksumIndex = payloadStart + len;
    if (checksumIndex !== bytes.length - 1) continue;
    return len;
  }
  return null;
}

function normalizePathForJson(inputPath) {
  const rel = path.relative(ROOT, inputPath);
  if (!rel.startsWith("..")) return rel.replace(/\\/g, "/");
  return inputPath.replace(/\\/g, "/");
}

main();
