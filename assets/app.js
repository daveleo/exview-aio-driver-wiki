(function () {
  "use strict";

  const commandsPayload = window.__EXVIEW_COMMANDS__ || null;

  const page = document.body?.dataset?.page || "";
  if (page === "protocol") initProtocol();
  if (page === "commands") initCommandsPage();
  if (page === "numeric-controls") initNumericPage();
  if (page === "builder") initBuilderPage();
  if (page === "queries") initQueriesPage();

  function initProtocol() {
    const tbody = document.getElementById("ackStatusBody");
    if (tbody) {
      const rows = commandsPayload?.certify?.ackStatusMeaning ?? [];
      if (rows.length === 0) {
        tbody.innerHTML = `<tr><td colspan="2">No ACK status map found.</td></tr>`;
      } else {
        tbody.innerHTML = rows
          .map(row => `<tr><td><code>0x${escapeHtml(row.code)}</code></td><td>${escapeHtml(row.meaning)}</td></tr>`)
          .join("");
      }
    }

    const formulaBaseList = document.getElementById("formulaBaseList");
    if (formulaBaseList) {
      const map = commandsPayload?.certify?.formulaChecksumBase || {};
      const keys = Object.keys(map).sort();
      if (keys.length === 0) {
        formulaBaseList.innerHTML = "<li>No formula-base overrides found.</li>";
      } else {
        formulaBaseList.innerHTML = keys
          .map(code => `<li><code>${code}</code>: base <code>0x${Number(map[code]).toString(16).toUpperCase()}</code></li>`)
          .join("");
      }
    }

    initHexBuilder();
  }

  function initBuilderPage() {
    initHexBuilder();
  }

  function initCommandsPage() {
    const commands = commandsPayload?.commands || [];
    const searchEl = document.getElementById("commandSearch");
    const functionFilterEl = document.getElementById("commandFunctionFilter");
    const codeFilterEl = document.getElementById("commandCodeFilter");
    const tbody = document.getElementById("commandsTableBody");
    const counter = document.getElementById("commandCount");
    if (!searchEl || !functionFilterEl || !codeFilterEl || !tbody || !counter) return;

    const functions = unique(commands.map(item => item.function).filter(Boolean));
    functionFilterEl.innerHTML = `<option value="">All</option>${functions
      .map(name => `<option value="${escapeHtml(name)}">${escapeHtml(name)}</option>`)
      .join("")}`;

    const render = () => {
      const search = normalizeSearch(searchEl.value);
      const fn = functionFilterEl.value;
      const codeTerm = normalizeCodeLike(codeFilterEl.value);

      const filtered = commands.filter(command => {
        if (fn && command.function !== fn) return false;

        if (codeTerm) {
          const fields = [
            command.set_code,
            command.reply_code,
            command.set_code_instruction,
            command.reply_code_instruction,
            command.set_code_derived,
            command.reply_code_derived
          ]
            .filter(Boolean)
            .map(String);
          if (!fields.some(value => value.includes(codeTerm))) return false;
        }

        if (search) {
          const hay = normalizeSearch(
            [
              command.function,
              command.description,
              command.instruction,
              command.remark,
              command.set_code,
              command.reply_code,
              command.tx_hex,
              command.rx_hex
            ]
              .filter(Boolean)
              .join(" ")
          );
          if (!hay.includes(search)) return false;
        }

        return true;
      });

      counter.textContent = `${filtered.length} / ${commands.length} rows`;

      tbody.innerHTML = filtered
        .map(command => {
          const setDisplay = formatCodeWithMismatch(
            command.set_code,
            command.set_code_instruction,
            command.set_code_derived,
            "Set"
          );
          const replyDisplay = formatCodeWithMismatch(
            command.reply_code,
            command.reply_code_instruction,
            command.reply_code_derived,
            "Reply"
          );

          const notes = [command.instruction, command.remark].filter(Boolean).join("\n\n");
          const txHex = command.tx_hex || "";
          const rxHex = command.rx_hex || "";
          const notesHtml = notes
            ? `<details class="notes-details"><summary>Open notes</summary><pre class="small">${escapeHtml(notes)}</pre></details>`
            : "-";

          return `
            <tr>
              <td>${escapeHtml(command.function || "")}</td>
              <td>${escapeHtml(command.description || "")}</td>
              <td>${setDisplay}<br />${replyDisplay}</td>
              <td>
                <div class="hex-cell"><code>${escapeHtml(txHex || "-")}</code></div>
                <div class="row-tools"><button class="copy-inline" ${txHex ? "" : "disabled"} data-copy="${escapeAttr(
            txHex
          )}">Copy TX</button></div>
              </td>
              <td><div class="hex-cell"><code>${escapeHtml(rxHex || "-")}</code></div></td>
              <td>${command.payload_length == null ? "-" : command.payload_length}</td>
              <td class="notes-cell">${notesHtml}</td>
            </tr>
          `;
        })
        .join("");
    };

    tbody.addEventListener("click", event => {
      const target = event.target.closest("button[data-copy]");
      if (!target) return;
      const value = target.getAttribute("data-copy") || "";
      if (!value) return;
      copyToClipboard(value).then(() => {
        const original = target.textContent;
        target.textContent = "Copied";
        setTimeout(() => {
          target.textContent = original;
        }, 900);
      });
    });

    searchEl.addEventListener("input", render);
    functionFilterEl.addEventListener("change", render);
    codeFilterEl.addEventListener("input", render);
    render();
  }

  function initNumericPage() {
    // Intentionally empty: numeric page now focuses on formulas only.
  }

  function initQueriesPage() {
    const commands = commandsPayload?.commands || [];
    const queryRows = commands
      .filter(item => isQueryLike(item))
      .map(item => {
        const setCode = normalizeCodeLike(item.set_code || item.set_code_derived || "");
        const replyCode = normalizeCodeLike(item.reply_code || item.reply_code_derived || "");
        return {
          queryName: normalizeQueryName(item, setCode, replyCode),
          setCode,
          replyCode,
          txHex: item.tx_hex || "",
          rxHex: item.rx_hex || "",
          replyNote: buildQueryReplyNote(item, setCode, replyCode)
        };
      });

    const nameFilterEl = document.getElementById("queryNameFilter");
    const hexFilterEl = document.getElementById("queryHexFilter");
    const tbody = document.getElementById("queriesTableBody");
    const counter = document.getElementById("queryCount");
    if (!nameFilterEl || !hexFilterEl || !tbody || !counter) return;

    const render = () => {
      const nameNeedle = normalizeSearch(nameFilterEl.value);
      const hexNeedle = normalizeHexLoose(hexFilterEl.value);

      const filtered = queryRows.filter(item => {
        if (nameNeedle) {
          const hay = normalizeSearch(`${item.queryName} ${item.setCode} ${item.replyCode} ${item.replyNote}`);
          if (!hay.includes(nameNeedle)) return false;
        }
        if (hexNeedle) {
          const hay = normalizeHexLoose(`${item.txHex} ${item.rxHex}`);
          if (!hay.includes(hexNeedle)) return false;
        }
        return true;
      });

      counter.textContent = `${filtered.length} / ${queryRows.length} query rows`;
      tbody.innerHTML = filtered
        .map(item => {
          return `
            <tr>
              <td>${escapeHtml(item.queryName)}</td>
              <td><code>${escapeHtml(item.setCode || "-")}</code> / <code>${escapeHtml(item.replyCode || "-")}</code></td>
              <td><div class="hex-cell"><code>${escapeHtml(item.txHex || "-")}</code></div></td>
              <td><div class="hex-cell"><code>${escapeHtml(item.rxHex || "-")}</code></div></td>
              <td class="notes-cell">${renderQueryNote(item.replyNote)}</td>
            </tr>
          `;
        })
        .join("");
    };

    nameFilterEl.addEventListener("input", render);
    hexFilterEl.addEventListener("input", render);
    render();
  }

  function initHexBuilder() {
    const hosts = document.querySelectorAll("[data-hex-builder]");
    if (!hosts.length) return;

    const commands = commandsPayload?.commands || [];
    const certify = commandsPayload?.certify || {};
    const formulaBase = certify.formulaChecksumBase || {};
    const indexMap = certify.numericValueIndexBySet || {};

    const configs = [
      { key: "volume", label: "Volume", setCode: "C203", uiMin: 0, uiMax: 100, toProto: v => clamp(Math.round(v), 0, 100) },
      {
        key: "brightness",
        label: "Brightness",
        setCode: "C21F",
        uiMin: 0,
        uiMax: 100,
        toProto: v => clamp(Math.round(v), 0, 100)
      },
      { key: "contrast", label: "Contrast", setCode: "C217", uiMin: 0, uiMax: 100, toProto: v => clamp(Math.round(v), 0, 100) },
      {
        key: "saturation",
        label: "Saturation",
        setCode: "C259",
        uiMin: 0,
        uiMax: 100,
        toProto: v => clamp(Math.round(v), 0, 100)
      },
      { key: "hue", label: "Hue", setCode: "C262", uiMin: -50, uiMax: 50, toProto: v => clamp(Math.round(v + 50), 0, 100) },
      { key: "red", label: "Red Gain", setCode: "C223", uiMin: 0, uiMax: 100, toProto: v => clamp(Math.round(v), 0, 100) },
      { key: "green", label: "Green Gain", setCode: "C227", uiMin: 0, uiMax: 100, toProto: v => clamp(Math.round(v), 0, 100) },
      { key: "blue", label: "Blue Gain", setCode: "C22B", uiMin: 0, uiMax: 100, toProto: v => clamp(Math.round(v), 0, 100) }
    ];

    const templates = new Map();
    for (const cfg of configs) {
      const idx = indexMap[cfg.setCode] || { valueIndex: 38, checksumIndex: 39 };
      const match = pickTemplate(commands, cfg.setCode, idx.valueIndex);
      if (match) {
        templates.set(cfg.key, {
          ...match,
          valueIndex: idx.valueIndex,
          checksumIndex: idx.checksumIndex
        });
      }
    }

    hosts.forEach(host => {
      host.appendChild(renderBuilderUI(configs, templates, formulaBase));
    });
  }

  function renderBuilderUI(configs, templates, formulaBase) {
    const wrapper = document.createElement("div");

    const controls = document.createElement("div");
    controls.className = "builder-grid";

    const commandLabel = document.createElement("label");
    commandLabel.textContent = "Numeric command";
    const commandSelect = document.createElement("select");
    configs.forEach(cfg => {
      const option = document.createElement("option");
      option.value = cfg.key;
      option.textContent = `${cfg.label} (${cfg.setCode})`;
      commandSelect.appendChild(option);
    });
    commandLabel.appendChild(commandSelect);

    const valueLabel = document.createElement("label");
    valueLabel.textContent = "UI value";
    const valueInput = document.createElement("input");
    valueInput.type = "number";
    valueInput.step = "1";
    valueInput.value = "50";
    valueLabel.appendChild(valueInput);

    controls.appendChild(commandLabel);
    controls.appendChild(valueLabel);

    const output = document.createElement("div");
    output.className = "builder-output";

    wrapper.appendChild(controls);
    wrapper.appendChild(output);

    output.addEventListener("click", event => {
      const target = event.target.closest("button[data-copy]");
      if (!target) return;
      const value = target.getAttribute("data-copy") || "";
      if (!value) return;
      copyToClipboard(value).then(() => {
        const original = target.textContent;
        target.textContent = "Copied";
        setTimeout(() => {
          target.textContent = original;
        }, 900);
      });
    });

    const render = () => {
      const cfg = configs.find(item => item.key === commandSelect.value);
      if (!cfg) return;
      const template = templates.get(cfg.key);
      if (!template) {
        output.innerHTML = `<p class="muted">No TX template found for ${escapeHtml(cfg.setCode)}.</p>`;
        return;
      }

      valueInput.min = String(cfg.uiMin);
      valueInput.max = String(cfg.uiMax);
      const uiValueRaw = Number(valueInput.value);
      const uiValue = Number.isFinite(uiValueRaw) ? uiValueRaw : cfg.uiMin;
      const clippedUi = clamp(Math.round(uiValue), cfg.uiMin, cfg.uiMax);
      if (!Number.isFinite(uiValueRaw) || uiValueRaw !== clippedUi) valueInput.value = String(clippedUi);

      const protoValue = cfg.toProto(clippedUi);
      const bytes = template.bytes.slice();
      bytes[template.valueIndex] = protoValue & 0xff;

      let checksum;
      if (formulaBase[cfg.setCode] != null) {
        checksum = (Number(formulaBase[cfg.setCode]) + protoValue) & 0xff;
      } else {
        checksum = computePdfChecksum(bytes);
      }
      bytes[template.checksumIndex] = checksum;

      const packetHtml = bytes
        .map((byte, idx) => {
          const classes = ["hex-byte"];
          if (idx === template.valueIndex) classes.push("value");
          if (idx === template.checksumIndex) classes.push("checksum");
          return `<span class="${classes.join(" ")}" title="index ${idx}">${toHexByte(byte)}</span>`;
        })
        .join("");
      const txHexText = bytes.map(toHexByte).join(" ");

      const checksumRule =
        formulaBase[cfg.setCode] != null
          ? `(0x${Number(formulaBase[cfg.setCode]).toString(16).toUpperCase()} + ${protoValue}) & 0xFF = 0x${toHexByte(checksum)}`
          : `sum(bytes[8..len-2]) & 0xFF = 0x${toHexByte(checksum)}`;

      const hueNote = cfg.key === "hue" ? `<p class="small">Hue mapping: proto = ui + 50, ui = proto - 50</p>` : "";

      output.innerHTML = `
        <p><strong>TX packet</strong> (${escapeHtml(cfg.label)} UI=${clippedUi}, proto=${protoValue})</p>
        <div class="hex-view">${packetHtml}</div>
        <p class="row-tools"><button class="copy-inline" data-copy="${escapeAttr(txHexText)}">Copy TX</button></p>
        <p class="small">Value byte index: <code>${template.valueIndex}</code>, checksum index: <code>${template.checksumIndex}</code></p>
        <p class="small">Checksum rule: <code>${escapeHtml(checksumRule)}</code></p>
        ${hueNote}
      `;
    };

    commandSelect.addEventListener("change", () => {
      const cfg = configs.find(item => item.key === commandSelect.value);
      if (cfg) {
        valueInput.value = String(cfg.key === "hue" ? 0 : 50);
      }
      render();
    });
    valueInput.addEventListener("input", render);
    render();

    return wrapper;
  }

  function pickTemplate(commands, setCode, valueIndex) {
    const candidates = commands.filter(item => {
      const effectiveCode = normalizeCodeLike(item.set_code_derived || item.set_code || "");
      return effectiveCode === setCode && item.tx_hex;
    });
    if (!candidates.length) return null;

    let selected = candidates[0];
    for (const candidate of candidates) {
      const bytes = parseHexBytes(candidate.tx_hex || "");
      if (bytes.length <= valueIndex) continue;
      if (bytes[valueIndex] === 0x00) {
        selected = candidate;
        break;
      }
    }

    return {
      bytes: parseHexBytes(selected.tx_hex || "")
    };
  }

  function formatCodeWithMismatch(preferred, instruction, derived, label) {
    const pref = normalizeCodeLike(preferred || "");
    const ins = normalizeCodeLike(instruction || "");
    const der = normalizeCodeLike(derived || "");

    if (!pref && !der && !ins) return `${label}: -`;

    if (ins && der && ins !== der) {
      return `${label}: <span class="warning-inline"><code>${escapeHtml(ins)}</code> (bytes: <code>${escapeHtml(
        der
      )}</code>)</span>`;
    }

    const shown = pref || der || ins;
    return `${label}: <code>${escapeHtml(shown)}</code>`;
  }

  function fillSelect(select, values, allLabel) {
    select.innerHTML = `<option value="">${escapeHtml(allLabel)}</option>`;
    values.forEach(value => {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = value;
      select.appendChild(option);
    });
  }

  function copyToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise((resolve, reject) => {
      const area = document.createElement("textarea");
      area.value = text;
      area.style.position = "fixed";
      area.style.left = "-9999px";
      document.body.appendChild(area);
      area.focus();
      area.select();
      try {
        document.execCommand("copy");
        resolve();
      } catch (error) {
        reject(error);
      } finally {
        area.remove();
      }
    });
  }

  function buildHumanName(functionText, description, remark) {
    const functionPart = String(functionText || "").trim();
    const descriptionPart = String(description || "").trim();
    if (!functionPart && !descriptionPart) return "Command";

    const numericOnly = /^-?\d+$/.test(descriptionPart);
    if (descriptionPart && !numericOnly && !equalsIgnoreCase(descriptionPart, functionPart)) {
      return `${functionPart} - ${descriptionPart}`.trim();
    }

    if (functionPart) return functionPart;
    if (descriptionPart) return descriptionPart;
    return String(remark || "Command").trim() || "Command";
  }

  function normalizeQueryName(command, setCode, replyCode) {
    if (setCode === "C25B" || replyCode === "C25C") {
      return "HDMI signal presence query (HDMI1-HDMI4)";
    }
    return buildHumanName(command.function, command.description, command.remark);
  }

  function isQueryLike(command) {
    const text = `${command.function || ""} ${command.description || ""} ${command.remark || ""}`.toLowerCase();
    return text.includes("query") || text.includes("get current") || text.includes("request device status");
  }

  function buildQueryReplyNote(command, setCode, replyCode) {
    if (setCode === "C25B" || replyCode === "C25C") {
      return [
        "Set Command Code: 0xC25B",
        "Response Command Code: 0xC25C",
        "",
        "Response Data (4 bytes):",
        "1. Byte 1: HDMI1 signal (0x01 = signal present, 0x00 = no signal)",
        "2. Byte 2: HDMI2 signal (0x01 = signal present, 0x00 = no signal)",
        "3. Byte 3: HDMI3 signal (0x01 = signal present, 0x00 = no signal)",
        "4. Byte 4: HDMI4 signal (0x01 = signal present, 0x00 = no signal)",
        "",
        "Examples:",
        "1) \"00 00 00 00\" means HDMI1~4 have no signal",
        "2) \"00 00 00 01\" means HDMI1~3 have no signal, HDMI4 has signal"
      ].join("\n");
    }

    const instruction = normalizeDocText(command.instruction);
    const remark = normalizeDocText(command.remark);
    const lines = instruction ? instruction.split("\n").map(line => line.trim()).filter(Boolean) : [];

    let note = "";
    if (lines.length > 0) {
      const responseStart = lines.findIndex(line =>
        /^response command code:/i.test(line) ||
        /^reply command code:/i.test(line) ||
        /^response data/i.test(line) ||
        /^reply command description:/i.test(line)
      );
      note = responseStart >= 0 ? lines.slice(responseStart).join("\n") : lines.join("\n");
    }

    if (remark) {
      const normalizedNote = normalizeDocText(note).toLowerCase();
      const normalizedRemark = remark.toLowerCase();
      if (!normalizedNote || !normalizedNote.includes(normalizedRemark)) {
        note = note ? `${note}\n\nNote: ${remark}` : `Note: ${remark}`;
      }
    }

    return note || "No reply note available in workbook documentation.";
  }

  function renderQueryNote(note) {
    const text = normalizeDocText(note);
    if (!text) return "-";
    return `<details class="notes-details"><summary>Open reply note</summary><pre class="small">${escapeHtml(text)}</pre></details>`;
  }

  function normalizeDocText(value) {
    return String(value || "")
      .replace(/\r\n/g, "\n")
      .replace(/\r/g, "\n")
      .replace(/[ \t]+\n/g, "\n")
      .replace(/\n{3,}/g, "\n\n")
      .trim();
  }

  function equalsIgnoreCase(a, b) {
    return String(a || "").trim().toLowerCase() === String(b || "").trim().toLowerCase();
  }

  function unique(values) {
    return [...new Set(values)].sort((a, b) => String(a).localeCompare(String(b), "en"));
  }

  function normalizeSearch(value) {
    return String(value || "").toLowerCase().trim();
  }

  function normalizeCodeLike(value) {
    const cleaned = String(value || "")
      .replace(/^0x/i, "")
      .replace(/[^0-9A-Fa-f]/g, "")
      .toUpperCase();
    if (!cleaned) return "";
    return cleaned.slice(-4).padStart(4, "0");
  }

  function normalizeHexLoose(value) {
    return String(value || "")
      .replace(/0x/gi, "")
      .replace(/[^0-9A-Fa-f]/g, "")
      .toUpperCase();
  }

  function parseHexBytes(hex) {
    const tokens = String(hex || "").match(/[0-9A-Fa-f]{2}/g);
    if (!tokens) return [];
    return tokens.map(token => Number.parseInt(token, 16));
  }

  function computePdfChecksum(bytes) {
    if (!Array.isArray(bytes) || bytes.length < 10) return 0;
    let sum = 0;
    for (let idx = 8; idx <= bytes.length - 2; idx += 1) {
      sum = (sum + bytes[idx]) & 0xff;
    }
    return sum;
  }

  function toHexByte(value) {
    return Number(value).toString(16).toUpperCase().padStart(2, "0");
  }

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function escapeAttr(value) {
    return escapeHtml(value).replace(/"/g, "&quot;");
  }
})();
