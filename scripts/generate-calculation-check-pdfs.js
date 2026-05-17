const fs = require("fs");
const path = require("path");
const Module = require("module");
const babel = require("@babel/core");

const root = path.resolve(__dirname, "..");
const outDir = path.join(root, "docs", "calculation-checks");

function loadCalculator() {
  const source = fs.readFileSync(path.join(root, "src", "utils", "calculatePremium.js"), "utf8");
  const output = babel.transformSync(source, {
    presets: ["babel-preset-expo"],
    filename: "calculatePremium.js"
  }).code;
  const mod = new Module("calculatePremium");
  mod.paths = Module._nodeModulePaths(root);
  mod._compile(output, "calculatePremium.cjs");
  return mod.exports;
}

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(root, relativePath), "utf8"));
}

const calculator = loadCalculator();
const config = {
  vehicles: readJson("config/masters/vehicles.json").vehicles,
  policyTypes: readJson("config/masters/policy-types.json"),
  ccSlabs: readJson("config/masters/cc-slabs.json"),
  tenures: readJson("config/masters/tenures.json"),
  availability: readJson("config/companies/united-india/availability.json"),
  tpRateRules: readJson("config/companies/united-india/tp-rate-rules.json"),
  odRateRules: readJson("config/companies/united-india/od-rate-rules.json"),
  addonRules: readJson("config/companies/united-india/addon-rules.json"),
  taxRules: readJson("config/companies/united-india/tax-rules.json")
};

const defaultForm = {
  idv: "100000",
  purchaseDate: "2026-05-17",
  renewalDate: "2026-05-17",
  seatingCapacity: "3",
  passengers: "0",
  sumInsuredPerPassenger: "0",
  odDiscount: "0",
  ncbPercent: "0",
  emi: "0",
  electricalAccessories: "0",
  nonElectricalAccessories: "0",
  voluntaryDeductible: "0",
  nilDepreciationOption: "No",
  returnToInvoiceOption: "No",
  engineProtectionOption: "No",
  consumablesOption: "No",
  lossOfKeyOption: "No",
  antiTheftOption: "No",
  automobileAssociationOption: "No",
  paOwnerDriverOption: "NO",
  tppdOption: "Rs 1 Lakh"
};

const zoneByVehicle = {
  two_wheeler: "Zone A",
  private_car: "Zone A",
  auto: "Zone A",
  taxi: "Zone A",
  bus: "Zone A",
  truck: "Zone A",
  delivery_van: "Zone A"
};

function displayVehicle(vehicleId) {
  return config.vehicles.find((vehicle) => vehicle.id === vehicleId)?.displayName || vehicleId;
}

function policyName(policyTypeId) {
  return config.policyTypes.find((policy) => policy.id === policyTypeId)?.name || policyTypeId;
}

function firstSlab(vehicleId) {
  return config.ccSlabs
    .filter((slab) => slab.vehicleId === vehicleId)
    .sort((a, b) => a.sortOrder - b.sortOrder)[0];
}

function scenarioList(vehicleId) {
  const availability = config.availability.find((item) => item.vehicleId === vehicleId);
  const scenarios = [];
  if (availability.policyTypeIds.includes("liability_policy")) {
    scenarios.push({
      label: "Liability Policy",
      policyTypeId: "liability_policy",
      basePolicyTypeId: "liability_policy",
      vehicleCondition: "pre_owned"
    });
  }
  if (availability.policyTypeIds.includes("package_policy")) {
    scenarios.push({
      label: "Package Policy - One Year",
      policyTypeId: "package_policy",
      basePolicyTypeId: "package_policy",
      vehicleCondition: "pre_owned"
    });
  }
  if (availability.policyTypeIds.includes("bundled")) {
    scenarios.push({
      label: "Package Variant - Bundled",
      policyTypeId: "bundled",
      basePolicyTypeId: "package_policy",
      vehicleCondition: "new"
    });
  }
  if (availability.policyTypeIds.includes("standalone_od")) {
    scenarios.push({
      label: "Package Variant - Standalone OD",
      policyTypeId: "standalone_od",
      basePolicyTypeId: "package_policy",
      vehicleCondition: "new"
    });
  }
  if (availability.policyTypeIds.includes("long_term")) {
    scenarios.push({
      label: "Package Variant - Long Term",
      policyTypeId: "long_term",
      basePolicyTypeId: "package_policy",
      vehicleCondition: "new"
    });
  }
  return scenarios;
}

function longTermTpTenureId(vehicleId, ccSlab, fallback) {
  const row = config.tpRateRules.vehicles[vehicleId]?.basicTpRates?.find((rate) => rate.oldApkLabel === ccSlab.name)
    || config.tpRateRules.vehicles[vehicleId]?.basicTpRates?.[0];
  if (row?.five_years !== undefined) return "five_years";
  if (row?.three_years !== undefined) return "three_years";
  return fallback;
}

function selectionFor(vehicleId, scenario) {
  const ccSlab = firstSlab(vehicleId);
  const tenureId = scenario.vehicleCondition === "new" && scenario.basePolicyTypeId === "package_policy"
    ? longTermTpTenureId(vehicleId, ccSlab, "one_year")
    : "one_year";
  return {
    vehicleId,
    policyTypeId: scenario.policyTypeId,
    basePolicyTypeId: scenario.basePolicyTypeId,
    vehicleCondition: scenario.vehicleCondition,
    ccSlab,
    tenureId,
    zone: zoneByVehicle[vehicleId] || "Zone A"
  };
}

function selectedRows(selection, form) {
  const rows = [];
  if (["package_policy", "standalone_od", "bundled", "long_term"].includes(selection.policyTypeId)) {
    rows.push(...calculator.getAvailableAddons(config, selection.vehicleId, form, selection)
      .filter((addon) => addon.mandatory));
  }
  if (["liability_policy", "package_policy", "bundled", "long_term"].includes(selection.policyTypeId)) {
    const liabilityTenureId = selection.basePolicyTypeId === "package_policy" && selection.vehicleCondition === "new"
      ? longTermTpTenureId(selection.vehicleId, selection.ccSlab, selection.tenureId)
      : selection.tenureId;
    rows.push(...calculator.getLiabilityComponents(config, {
      vehicleId: selection.vehicleId,
      ccSlab: selection.ccSlab,
      tenureId: liabilityTenureId
    }, form).filter((addon) => addon.mandatory && addon.id !== "basic_tp"));
  }
  return rows;
}

function money(value) {
  return `Rs ${Math.round(Number(value || 0)).toLocaleString("en-IN")}`;
}

function linesForVehicle(vehicleId) {
  const vehicleName = displayVehicle(vehicleId);
  const lines = [
    `${vehicleName} - APK Calculation Check Sheet`,
    "",
    "Purpose: enter the same selections in the app and compare the premium lines.",
    "Source: local United India config converted from the UIIC Vehicle Insurance APK.",
    "",
    "Common input values for every scenario:",
    "Company: United India Insurance",
    "IDV: 100000",
    "Purchase date: 17-05-2026",
    "Renewal/current date: 17-05-2026",
    "Zone: Zone A, unless the vehicle has no zone choice",
    "Optional add-ons/discounts: not selected",
    "Passenger, PA, CNG, EMI and accessory inputs: 0 unless shown below",
    ""
  ];

  scenarioList(vehicleId).forEach((scenario, index) => {
    const form = { ...defaultForm };
    const selection = selectionFor(vehicleId, scenario);
    const selectedAddons = selectedRows(selection, form);
    const premium = calculator.calculatePremium(config, selection, form, selectedAddons);
    const policy = policyName(selection.policyTypeId);

    lines.push("=".repeat(74));
    lines.push(`${index + 1}. ${scenario.label}`);
    lines.push(`Vehicle: ${vehicleName}`);
    lines.push(`Policy shown in app: ${policy}`);
    lines.push(`Vehicle condition: ${scenario.vehicleCondition === "new" ? "New" : "Pre-Owned / One Year Package"}`);
    lines.push(`CC / slab: ${selection.ccSlab.name}`);
    lines.push(`Tenure selected: ${selection.tenureId}`);
    lines.push(`TP tenure used: ${premium.tpTenureId}`);
    lines.push(`OD tenure used: ${premium.odTenureId}`);
    lines.push("");
    lines.push("Expected premium breakdown:");
    lines.push(`Basic OD: ${money(premium.odBase)}    OD rate: ${premium.odRate}`);
    lines.push(`Basic TP: ${money(premium.tpBase)}`);
    lines.push(`OD add-on total: ${money(premium.odAddonTotal)}`);
    lines.push(`Liability add-on total: ${money(premium.liabilityAddonTotal)}`);
    lines.push(`OD discount: ${money(-premium.odDiscount)}`);
    lines.push(`Anti-theft discount: ${money(-premium.antiTheftDiscount)}`);
    lines.push(`Automobile association discount: ${money(-premium.automobileAssociationDiscount)}`);
    lines.push(`Voluntary excess discount: ${money(-premium.voluntaryDeductibleDiscount)}`);
    lines.push(`NCB discount: ${money(-premium.ncbDiscount)}`);
    lines.push(`Net Own Damage Premium: ${money(premium.netOwnDamagePremium)}`);
    lines.push(`Net Liability Premium: ${money(premium.netLiabilityPremium)}`);
    lines.push(`Net Premium: ${money(premium.netPremium)}`);
    lines.push(`${premium.taxLabel} @ ${premium.taxRate}%: ${money(premium.tax)}`);
    lines.push(`Net Premium Payable: ${money(premium.total)}`);

    if (selectedAddons.length) {
      lines.push("");
      lines.push("Mandatory components included by the app:");
      selectedAddons.forEach((addon) => {
        lines.push(`- ${addon.title}: ${money(addon.price)}`);
      });
    }
    lines.push("");
  });

  lines.push("Notes:");
  lines.push("- Standalone OD intentionally has no TP premium.");
  lines.push("- Bundled/new package variants may show different TP and OD tenures.");
  lines.push("- These sheets use the current app logic, which is based on extracted APK tables.");
  return lines;
}

function escapePdfText(value) {
  return String(value).replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

function wrapLine(line, width) {
  if (line.length <= width) return [line];
  const words = line.split(" ");
  const lines = [];
  let current = "";
  words.forEach((word) => {
    if (!current) {
      current = word;
    } else if (`${current} ${word}`.length <= width) {
      current += ` ${word}`;
    } else {
      lines.push(current);
      current = word;
    }
  });
  if (current) lines.push(current);
  return lines;
}

function paginate(lines) {
  const pages = [];
  let page = [];
  lines.flatMap((line) => wrapLine(line, 98)).forEach((line) => {
    if (page.length >= 58) {
      pages.push(page);
      page = [];
    }
    page.push(line);
  });
  if (page.length) pages.push(page);
  return pages;
}

function pdfForLines(lines) {
  const pages = paginate(lines);
  const objects = [];
  const add = (body) => {
    objects.push(body);
    return objects.length;
  };

  const catalogId = add("PLACEHOLDER");
  const pagesId = add("PLACEHOLDER");
  const fontId = add("<< /Type /Font /Subtype /Type1 /BaseFont /Courier >>");
  const pageIds = [];

  pages.forEach((pageLines) => {
    const text = [
      "BT",
      "/F1 9 Tf",
      "40 800 Td",
      "12 TL",
      ...pageLines.map((line) => `(${escapePdfText(line)}) Tj T*`),
      "ET"
    ].join("\n");
    const contentId = add(`<< /Length ${Buffer.byteLength(text)} >>\nstream\n${text}\nendstream`);
    const pageId = add(`<< /Type /Page /Parent ${pagesId} 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 ${fontId} 0 R >> >> /Contents ${contentId} 0 R >>`);
    pageIds.push(pageId);
  });

  objects[catalogId - 1] = `<< /Type /Catalog /Pages ${pagesId} 0 R >>`;
  objects[pagesId - 1] = `<< /Type /Pages /Kids [${pageIds.map((id) => `${id} 0 R`).join(" ")}] /Count ${pageIds.length} >>`;

  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  objects.forEach((body, index) => {
    offsets.push(Buffer.byteLength(pdf));
    pdf += `${index + 1} 0 obj\n${body}\nendobj\n`;
  });
  const xrefStart = Buffer.byteLength(pdf);
  pdf += `xref\n0 ${objects.length + 1}\n`;
  pdf += "0000000000 65535 f \n";
  offsets.slice(1).forEach((offset) => {
    pdf += `${String(offset).padStart(10, "0")} 00000 n \n`;
  });
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root ${catalogId} 0 R >>\nstartxref\n${xrefStart}\n%%EOF\n`;
  return pdf;
}

fs.mkdirSync(outDir, { recursive: true });

const enabledVehicleIds = config.availability
  .filter((item) => item.enabled)
  .map((item) => item.vehicleId);

const indexLines = [
  "Insurance App APK Calculation Check PDFs",
  "",
  "Generated files:"
];

enabledVehicleIds.forEach((vehicleId) => {
  const vehicleName = displayVehicle(vehicleId);
  const filename = `${vehicleId}-calculation-check.pdf`;
  const lines = linesForVehicle(vehicleId);
  fs.writeFileSync(path.join(outDir, filename), pdfForLines(lines), "binary");
  indexLines.push(`- ${vehicleName}: ${filename}`);
});

fs.writeFileSync(path.join(outDir, "README.txt"), `${indexLines.join("\n")}\n`, "utf8");
console.log(`Generated ${enabledVehicleIds.length} PDFs in ${path.relative(root, outDir)}`);
