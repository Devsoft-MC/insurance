function numberValue(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function round(value) {
  return Math.round(numberValue(value));
}

function round2(value) {
  return Math.round(numberValue(value) * 100) / 100;
}

function policyHasOd(policyTypeId) {
  return ["package_policy", "standalone_od", "bundled", "long_term"].includes(policyTypeId);
}

function policyHasTp(policyTypeId) {
  return ["liability_policy", "package_policy", "bundled", "long_term"].includes(policyTypeId);
}

function getTpRate(config, vehicleId, ccSlab, tenureId) {
  const vehicleRules = config.tpRateRules.vehicles[vehicleId];
  const row = vehicleRules?.basicTpRates?.find((rate) => rate.oldApkLabel === ccSlab?.name) || vehicleRules?.basicTpRates?.[0];
  return numberValue(row?.[tenureId] ?? row?.one_year);
}

function getTpRateRow(config, vehicleId, ccSlab) {
  const vehicleRules = config.tpRateRules.vehicles[vehicleId];
  return vehicleRules?.basicTpRates?.find((rate) => rate.oldApkLabel === ccSlab?.name) || vehicleRules?.basicTpRates?.[0];
}

function getLongTermTpTenureId(config, vehicleId, ccSlab, fallbackTenureId) {
  const row = getTpRateRow(config, vehicleId, ccSlab);
  if (row?.five_years !== undefined) {
    return "five_years";
  }
  if (row?.three_years !== undefined) {
    return "three_years";
  }
  return fallbackTenureId;
}

function getRatingTenures(config, selection) {
  const isNewPackagePolicy = selection.basePolicyTypeId === "package_policy" && selection.vehicleCondition === "new";
  if (!isNewPackagePolicy) {
    return {
      tpTenureId: selection.tenureId,
      odTenureId: selection.tenureId
    };
  }

  return {
    tpTenureId: getLongTermTpTenureId(config, selection.vehicleId, selection.ccSlab, selection.tenureId),
    odTenureId: "one_year"
  };
}

function tenureMultiplier(tenureId) {
  if (tenureId === "five_years") {
    return 5;
  }
  if (tenureId === "three_years") {
    return 3;
  }
  return 1;
}

function parseIsoDate(value) {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return null;
  }
  const date = new Date(`${value}T00:00:00`);
  return Number.isNaN(date.getTime()) ? null : date;
}

function ageBandIdFromDates(purchaseDateValue, renewalDateValue) {
  const purchaseDate = parseIsoDate(purchaseDateValue);
  const renewalDate = parseIsoDate(renewalDateValue) || new Date();

  if (!purchaseDate) {
    return "age_lt_5";
  }

  let years = renewalDate.getFullYear() - purchaseDate.getFullYear();
  const beforeAnniversary = renewalDate.getMonth() < purchaseDate.getMonth()
    || (renewalDate.getMonth() === purchaseDate.getMonth() && renewalDate.getDate() < purchaseDate.getDate());

  if (beforeAnniversary) {
    years -= 1;
  }

  if (years >= 10) {
    return "age_gte_10";
  }
  if (years >= 5) {
    return "age_5_10";
  }
  return "age_lt_5";
}

function vehicleAgeYears(purchaseDateValue, renewalDateValue) {
  const purchaseDate = parseIsoDate(purchaseDateValue);
  const renewalDate = parseIsoDate(renewalDateValue) || new Date();

  if (!purchaseDate) {
    return 0;
  }

  let years = renewalDate.getFullYear() - purchaseDate.getFullYear();
  const beforeAnniversary = renewalDate.getMonth() < purchaseDate.getMonth()
    || (renewalDate.getMonth() === purchaseDate.getMonth() && renewalDate.getDate() < purchaseDate.getDate());

  if (beforeAnniversary) {
    years -= 1;
  }

  return Math.max(years, 0);
}

function getOdRate(config, selection, form) {
  const { vehicleId, ccSlab, tenureId, zone } = selection;
  const vehicleRules = config.odRateRules.vehicles[vehicleId];
  if (!vehicleRules) {
    return 0;
  }

  const selectedZone = zone || "Zone A";

  if (tenureId !== "one_year" && vehicleRules.newVehicleLongTermRatesPercent) {
    const longTermRow = vehicleRules.newVehicleLongTermRatesPercent.find((row) => row.zone === selectedZone)
      || vehicleRules.newVehicleLongTermRatesPercent.find((row) => row.zone === "Zone A")
      || vehicleRules.newVehicleLongTermRatesPercent[0];
    return numberValue(longTermRow?.[rateKey(vehicleId, ccSlab)] ?? longTermRow?.rate);
  }

  const ageBandId = ageBandIdFromDates(form.purchaseDate, form.renewalDate);
  const row = vehicleRules.normalAndPreOwnedRatesPercent?.find((item) => item.zone === selectedZone && item.ageBandId === ageBandId)
    || vehicleRules.ratesPercent?.find((item) => item.zone === selectedZone && item.ageBandId === ageBandId)
    || vehicleRules.normalAndPreOwnedRatesPercent?.find((item) => item.zone === "Zone A" && item.ageBandId === ageBandId)
    || vehicleRules.ratesPercent?.find((item) => item.zone === "Zone A" && item.ageBandId === ageBandId);
  return numberValue(row?.[rateKey(vehicleId, ccSlab)] ?? row?.rate);
}

function rateKey(vehicleId, ccSlab) {
  const label = ccSlab?.name;
  const keys = {
    two_wheeler: {
      "< 75 CC": "tw_lt_75",
      "76-150 CC": "tw_76_150",
      "151-300 CC": "tw_151_300",
      "301-350 CC": "tw_301_350",
      "Exceeding 350 CC": "tw_gt_350"
    },
    private_car: {
      "< 1000 CC": "pc_lt_1000",
      "1001-1500 CC": "pc_1001_1500",
      "Exceeding 1500 CC": "pc_gt_1500"
    },
    taxi: {
      "< 1000 CC": "taxi_lt_1000",
      "1001-1500 CC": "taxi_1001_1500",
      "Exceeding 1500 CC": "taxi_gt_1500"
    },
    delivery_van: {
      "PUBLIC": "delivery_van_public",
      "PRIVATE": "delivery_van_private"
    }
  };
  return keys[vehicleId]?.[label];
}

function voluntaryDeductibleRules(vehicleId, useLongTermRule) {
  const tables = {
    two_wheeler: {
      normal: {
        500: { percent: 5, cap: 50 },
        750: { percent: 10, cap: 75 },
        1000: { percent: 15, cap: 125 },
        1500: { percent: 20, cap: 200 },
        3000: { percent: 25, cap: 250 }
      },
      longTerm: {
        500: { percent: 5, cap: 250 },
        750: { percent: 10, cap: 375 },
        1000: { percent: 15, cap: 625 },
        1500: { percent: 20, cap: 1000 },
        3000: { percent: 25, cap: 1250 }
      }
    },
    private_car: {
      normal: {
        2500: { percent: 20, cap: 750 },
        5000: { percent: 25, cap: 1500 },
        7500: { percent: 30, cap: 2000 },
        15000: { percent: 35, cap: 2500 }
      },
      longTerm: {
        2500: { percent: 20, cap: 2250 },
        5000: { percent: 25, cap: 4500 },
        7500: { percent: 30, cap: 6000 },
        15000: { percent: 35, cap: 7500 }
      }
    }
  };
  const table = tables[vehicleId]?.[useLongTermRule ? "longTerm" : "normal"] || {};
  return Object.entries(table).map(([value, rule]) => ({ value, ...rule }));
}

const ownDamageAddonOrder = [
  "od_discount",
  "no_claim_bonus",
  "nil_depreciation",
  "return_to_invoice",
  "engine_protection",
  "consummables",
  "road_side_assistance",
  "emi_protect",
  "loss_of_key",
  "electrical_accessories",
  "non_electrical_accessories",
  "voluntary_deductible",
  "anti_theft",
  "automobile_association"
];

export function getAvailableAddons(config, vehicleId, form, selection) {
  const rules = config.addonRules.vehicles[vehicleId]?.addons || {};
  const idv = numberValue(form.idv);
  const emi = numberValue(form.emi || 0);
  const odTenureId = selection ? getRatingTenures(config, selection).odTenureId : "one_year";
  const useLongTermRule = odTenureId !== "one_year";
  const odRate = selection ? getOdRate(config, { ...selection, tenureId: odTenureId }, form) : 0;
  const odBase = round2((idv / 100) * odRate);
  const ageYears = vehicleAgeYears(form.purchaseDate, form.renewalDate);
  const electricalAccessories = numberValue(form.electricalAccessories);
  const nonElectricalAccessories = numberValue(form.nonElectricalAccessories);
  const voluntaryDeductibleOptions = voluntaryDeductibleRules(vehicleId, useLongTermRule).map((rule) => ({
    label: rule.value,
    value: rule.value
  }));

  const configuredAddons = Object.entries(rules).map(([id, rule]) => {
    const premium = estimateAddonPremium(id, rule, {
      idv,
      emi,
      odBase,
      ageYears,
      electricalAccessories,
      nonElectricalAccessories,
      engineProtectionOption: form.engineProtectionOption,
      lossOfKeyOption: form.lossOfKeyOption,
      useLongTermRule: odTenureId !== "one_year"
    });
    return {
      id,
      title: rule.oldApkLabel || titleFromId(id),
      copy: ["nil_depreciation", "return_to_invoice", "consummables"].includes(id)
        ? "Click to include this cover."
        : id === "engine_protection"
          ? "Choose Platinum, Standard, or No."
        : rule.eligibility || "Click to include this cover.",
      price: addonEnabledByForm(id, form) ? premium : 0,
      category: "own_damage",
      mandatory: false,
      options: rule.options
    };
  }).filter((addon) => addon.price >= 0);

  const orderedAddons = [
    {
      id: "od_discount",
      title: "OD Discount (%)",
      copy: "Discount on own damage premium.",
      price: 0,
      category: "discount",
      mandatory: false
    },
    {
      id: "no_claim_bonus",
      title: "No Claim Bonus (%)",
      copy: "Discount for claim-free renewals.",
      price: 0,
      category: "discount",
      mandatory: false,
      options: ["0", "20", "25", "35", "45", "50"].map((percent) => ({
        label: `${percent}%`,
        percent
      }))
    },
    ...configuredAddons,
    {
      id: "electrical_accessories",
      title: "Electrical Accessories",
      copy: "Accessory value used for own damage premium.",
      price: round2(numberValue(form.electricalAccessories) * 0.04),
      category: "own_damage",
      mandatory: false
    },
    {
      id: "non_electrical_accessories",
      title: "Non-Electrical Accessories",
      copy: "Accessory value captured for OD calculation.",
      price: round2((numberValue(form.nonElectricalAccessories) / 100) * odRate),
      category: "own_damage",
      mandatory: false
    },
    ...(voluntaryDeductibleOptions.length ? [{
      id: "voluntary_deductible",
      title: "Voluntary Deductible",
      copy: "Discount amount for voluntary deductible.",
      price: -numberValue(form.voluntaryDeductible),
      category: "discount",
      mandatory: false,
      options: voluntaryDeductibleOptions
    }] : []),
    {
      id: "anti_theft",
      title: "Anti-Theft",
      copy: "Anti-theft device discount selection.",
      price: 0,
      category: "discount",
      mandatory: false
    },
    {
      id: "automobile_association",
      title: "Automobile Association",
      copy: "Automobile association discount selection.",
      price: 0,
      category: "discount",
      mandatory: false
    }
  ];

  return orderedAddons.sort((a, b) => {
    const left = ownDamageAddonOrder.indexOf(a.id);
    const right = ownDamageAddonOrder.indexOf(b.id);
    return (left === -1 ? 999 : left) - (right === -1 ? 999 : right);
  });
}

export function getLiabilityComponents(config, selection, form) {
  const { vehicleId, ccSlab, tenureId } = selection;
  const vehicleRules = config.tpRateRules.vehicles[vehicleId];
  const multiplier = tenureMultiplier(tenureId);
  const passengers = numberValue(form.passengers);
  const sumInsured = numberValue(form.sumInsuredPerPassenger);
  const basicTp = getTpRate(config, vehicleId, ccSlab, tenureId);

  if (!vehicleRules) {
    return [];
  }

  const rows = [
    {
      id: "basic_tp",
      title: "Basic TP",
      copy: "Mandatory fixed liability premium.",
      price: basicTp,
      category: "liability",
      mandatory: true
    }
  ];

  const components = vehicleRules.components || {};

  if (components.pa_owner_driver) {
    const selectedPaOption = form.paOwnerDriverOption || "NO";
    rows.push({
      id: "pa_owner_driver",
      title: components.pa_owner_driver.oldApkLabel || "PA Owner-Driver",
      copy: "Choose NO, 1 YEAR, or long-term PA cover.",
      price: numberValue(components.pa_owner_driver.rates?.[selectedPaOption] ?? 0),
      category: "liability",
      options: Object.entries(components.pa_owner_driver.rates || {}).map(([label, price]) => ({
        label,
        price
      })),
      selectedOption: selectedPaOption
    });
  }

  if (components.ll_paid_driver) {
    const llPaidDriverRate = numberValue(components.ll_paid_driver.rates?.Yes ?? components.ll_paid_driver.perUnit);
    rows.push({
      id: "ll_paid_driver",
      title: components.ll_paid_driver.oldApkLabel || "LL to Paid Driver",
      copy: "Legal liability cover for paid driver.",
      price: llPaidDriverRate * multiplier,
      category: "liability"
    });
  }

  if (components.ll_employees) {
    rows.push({
      id: "ll_employees",
      title: components.ll_employees.oldApkLabel || "LL to Employees",
      copy: "Legal liability cover for employees.",
      price: numberValue(components.ll_employees.rates?.Yes) * multiplier,
      category: "liability"
    });
  }

  if (components.ll_passenger) {
    const row = getTpRateRow(config, vehicleId, ccSlab);
    const llPassengerRate = numberValue(row?.llPassenger || components.ll_passenger.perUnit || 1214);
    rows.push({
      id: "ll_passenger",
      title: components.ll_passenger.oldApkLabel || "LL to Passenger",
      copy: "Mandatory passenger liability for Auto.",
      price: numberValue(form.seatingCapacity) * llPassengerRate,
      category: "liability",
      mandatory: true
    });
  }

  if (components.pa_unnamed_passenger) {
    const paRate = vehicleId === "private_car" ? 0.5 : vehicleId === "two_wheeler" ? 0.7 : 0.6;
    rows.push({
      id: "pa_unnamed_passenger",
      title: components.pa_unnamed_passenger.oldApkLabel || "PA to Unnamed Passenger",
      copy: "Calculated from passengers and sum insured.",
      price: round2((passengers * sumInsured / 1000) * paRate * multiplier),
      category: "liability"
    });
  }

  if (components.ll_nonfare_passenger) {
    rows.push({
      id: "ll_nonfare_passenger",
      title: components.ll_nonfare_passenger.oldApkLabel || "LL to Non-Fare Passenger",
      copy: "Legal liability for non-fare passengers.",
      price: numberValue(components.ll_nonfare_passenger.perUnit) * passengers * multiplier,
      category: "liability"
    });
  }

  if (components.cng_tp) {
    rows.push({
      id: "cng_tp",
      title: components.cng_tp.oldApkLabel || "CNG/LPG TP",
      copy: "TP loading for CNG/LPG kit.",
      price: numberValue(components.cng_tp.rates?.Yes) * multiplier,
      category: "liability"
    });
  }

  if (components.tppd_discount) {
    const options = components.tppd_discount.options || [];
    const selectedTppdOption = form.tppdOption || options[0]?.label;
    const selectedOption = options.find((item) => item.label === selectedTppdOption) || options[0];
    const discount = numberValue(selectedOption?.discount) * multiplier;
    rows.push({
      id: "tppd_discount",
      title: components.tppd_discount.oldApkLabel || "TPPD",
      copy: "Choose full TPPD cover or restricted cover discount.",
      price: -discount,
      category: "liability",
      options: options.map((option) => ({
        label: option.label,
        price: -numberValue(option.discount) * multiplier
      })),
      selectedOption: selectedTppdOption
    });
  }

  return rows;
}

function addonEnabledByForm(id, form) {
  if (id === "nil_depreciation") {
    return form.nilDepreciationOption === "Yes";
  }
  if (id === "return_to_invoice") {
    return form.returnToInvoiceOption === "Yes";
  }
  if (id === "engine_protection") {
    return form.engineProtectionOption !== "No";
  }
  if (id === "consummables") {
    return form.consumablesOption === "Yes";
  }
  if (id === "loss_of_key") {
    return form.lossOfKeyOption !== "No";
  }
  return true;
}

function estimateAddonPremium(id, rule, context) {
  const { idv, emi, odBase, ageYears, electricalAccessories, nonElectricalAccessories, engineProtectionOption, lossOfKeyOption, useLongTermRule } = context;

  if (rule.flatPremium !== undefined) {
    return round(rule.flatPremium);
  }

  if (id === "emi_protect") {
    return round2(emi * (rule.formula?.includes("0.03") ? 0.03 : rule.formula?.includes("0.02") ? 0.02 : 0.066));
  }

  if (id === "loss_of_key") {
    const option = selectLossOfKeyOption(rule.options, lossOfKeyOption, useLongTermRule);
    return numberValue(option?.premium);
  }

  const selectedRule = id === "engine_protection"
    ? selectAddonRule(rule.plans?.[engineProtectionOption] || [], ageYears, useLongTermRule)
    : selectAddonRule(rule.rules, ageYears, useLongTermRule);
  const percent = selectedRule?.ratePercentOfIdv
    ?? selectedRule?.ratePercentOfIdvAndAccessories
    ?? selectedRule?.ratePercentOfBasicOdAndAccessories
    ?? rule.plans?.Platinum?.[0]?.ratePercentOfIdv
    ?? 0;

  if (percent) {
    const base = selectedRule?.ratePercentOfBasicOdAndAccessories !== undefined
      ? odBase + round2(electricalAccessories * 0.04)
      : selectedRule?.ratePercentOfIdvAndAccessories !== undefined
        ? idv + electricalAccessories + nonElectricalAccessories
        : idv;
    return round2((base * percent) / 100);
  }

  return 0;
}

function selectLossOfKeyOption(options = [], selectedOption, useLongTermRule) {
  if (selectedOption === "No") {
    return options.find((option) => option.label === "No");
  }
  return options.find((option) => option.label === selectedOption && Boolean(option.eligibility?.includes("LONG TERM")) === useLongTermRule)
    || options.find((option) => option.label === selectedOption)
    || options.find((option) => option.label === "No");
}

function selectAddonRule(rules = [], ageYears, useLongTermRule) {
  if (!rules.length) {
    return null;
  }

  if (useLongTermRule) {
    const longTermRule = rules.find((rule) => rule.when?.includes("LONG TERM"));
    if (longTermRule) {
      return longTermRule;
    }
  }

  return rules.find((rule) => rule.when === `age_years == ${ageYears}`)
    || rules.find((rule) => rule.ageYears === ageYears)
    || rules.find((rule) => ageYears > 1 && ageYears < 5 && rule.when?.includes("age_years > 1") && rule.when?.includes("age_years < 5"))
    || rules.find((rule) => ageYears >= 2 && ageYears < 5 && rule.when?.includes("age_years >= 2") && rule.when?.includes("age_years < 5"))
    || rules[0];
}

function titleFromId(id) {
  return id.split("_").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ");
}

function selectedAddon(addons, id) {
  return addons.some((addon) => addon.id === id);
}

function selectedAddonPrice(addons, id) {
  return numberValue(addons.find((addon) => addon.id === id)?.price);
}

function getConfiguredDiscount(config, id, context) {
  const rule = config.odRateRules.discountRules?.[id];
  if (!rule) {
    return 0;
  }

  if (rule.type === "flat") {
    return numberValue(rule.amount);
  }

  if (rule.type === "percent") {
    const base = rule.base === "od_after_od_discount"
      ? Math.max(context.odBase - context.odDiscount, 0)
      : context.odBase;
    return rule.rounding === "round2" ? round2((base * numberValue(rule.ratePercent)) / 100) : round((base * numberValue(rule.ratePercent)) / 100);
  }

  return 0;
}

export function calculatePremium(config, selection, form, selectedAddons) {
  const { vehicleId, policyTypeId, ccSlab } = selection;
  const { tpTenureId, odTenureId } = getRatingTenures(config, selection);
  const idv = numberValue(form.idv);
  const odRate = getOdRate(config, { ...selection, tenureId: odTenureId }, form);
  const tpBase = policyHasTp(policyTypeId) ? getTpRate(config, vehicleId, ccSlab, tpTenureId) : 0;
  const odBase = policyHasOd(policyTypeId) ? round2((idv / 100) * odRate) : 0;
  const hasOdDiscount = selectedAddon(selectedAddons, "od_discount");
  const hasNcbDiscount = selectedAddon(selectedAddons, "no_claim_bonus");
  const nonElectricalAccessoriesPremium = policyHasOd(policyTypeId) ? selectedAddonPrice(selectedAddons, "non_electrical_accessories") : 0;
  const basicOd = odBase + nonElectricalAccessoriesPremium;
  const odDiscount = policyHasOd(policyTypeId) && hasOdDiscount ? round2((basicOd * numberValue(form.odDiscount)) / 100) : 0;
  const antiTheftDiscount = policyHasOd(policyTypeId) && selectedAddon(selectedAddons, "anti_theft") && form.antiTheftOption === "Yes"
    ? getConfiguredDiscount(config, "anti_theft", { odBase: basicOd, odDiscount })
    : 0;
  const automobileAssociationDiscount = policyHasOd(policyTypeId) && selectedAddon(selectedAddons, "automobile_association") && form.automobileAssociationOption === "Yes"
    ? getConfiguredDiscount(config, "automobile_association", { odBase: basicOd, odDiscount })
    : 0;
  const electricalAccessoriesPremium = selectedAddonPrice(selectedAddons, "electrical_accessories");
  const voluntaryDeductibleRule = voluntaryDeductibleRules(vehicleId, odTenureId !== "one_year")
    .find((rule) => rule.value === String(form.voluntaryDeductible));
  const odPremiumBeforeVoluntaryExcess = Math.max(basicOd + electricalAccessoriesPremium - odDiscount, 0);
  const voluntaryDeductibleDiscount = policyHasOd(policyTypeId) && selectedAddon(selectedAddons, "voluntary_deductible")
    ? round2(Math.min(numberValue(voluntaryDeductibleRule?.cap), (odPremiumBeforeVoluntaryExcess * numberValue(voluntaryDeductibleRule?.percent)) / 100))
    : 0;
  const ncbPremiumBase = odBase
    + nonElectricalAccessoriesPremium
    + electricalAccessoriesPremium
    + selectedAddonPrice(selectedAddons, "nil_depreciation")
    + selectedAddonPrice(selectedAddons, "return_to_invoice");
  const ncbDiscountBase = odDiscount + antiTheftDiscount + automobileAssociationDiscount + voluntaryDeductibleDiscount;
  const ncbBase = Math.max(ncbPremiumBase - ncbDiscountBase, 0);
  const ncbDiscount = policyHasOd(policyTypeId) && hasNcbDiscount ? round2((ncbBase * numberValue(form.ncbPercent)) / 100) : 0;
  const odAddonTotal = selectedAddons
    .filter((addon) => addon.category === "own_damage")
    .reduce((sum, addon) => sum + numberValue(addon.price), 0);
  const liabilityAddonTotal = selectedAddons
    .filter((addon) => addon.category === "liability" && addon.id !== "basic_tp")
    .reduce((sum, addon) => sum + numberValue(addon.price), 0);
  const addonTotal = odAddonTotal + liabilityAddonTotal;
  const totalOdDiscount = odDiscount + antiTheftDiscount + automobileAssociationDiscount + voluntaryDeductibleDiscount + ncbDiscount;
  const netOwnDamagePremium = round(odBase + odAddonTotal - totalOdDiscount);
  const netLiabilityPremium = round(tpBase + liabilityAddonTotal);
  const netPremium = round(netOwnDamagePremium + netLiabilityPremium);
  const tax = round((netPremium * config.taxRules.ratePercent) / 100);
  const total = round(netPremium + tax);

  return {
    tpBase,
    odBase,
    addonTotal,
    odAddonTotal,
    liabilityAddonTotal,
    odDiscount,
    antiTheftDiscount,
    automobileAssociationDiscount,
    voluntaryDeductibleDiscount,
    ncbDiscount,
    netOwnDamagePremium,
    netLiabilityPremium,
    netPremium,
    tax,
    total,
    odRate,
    tpTenureId,
    odTenureId,
    taxRate: config.taxRules.ratePercent,
    taxLabel: config.taxRules.displayTaxLabel || config.taxRules.taxLabel
  };
}
