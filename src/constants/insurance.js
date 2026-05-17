import vehiclesConfig from "../../config/masters/vehicles.json";
import policyTypesConfig from "../../config/masters/policy-types.json";
import ccSlabsConfig from "../../config/masters/cc-slabs.json";
import tenuresConfig from "../../config/masters/tenures.json";
import addonsConfig from "../../config/masters/addons.json";
import companyConfig from "../../config/companies/united-india/company.json";
import availabilityConfig from "../../config/companies/united-india/availability.json";
import tpRateRules from "../../config/companies/united-india/tp-rate-rules.json";
import odRateRules from "../../config/companies/united-india/od-rate-rules.json";
import addonRules from "../../config/companies/united-india/addon-rules.json";
import taxRules from "../../config/companies/united-india/tax-rules.json";
import { colors } from "../styles";

const iconByVehicle = {
  two_wheeler: "bicycle",
  private_car: "car-sport",
  auto: "car",
  taxi: "car",
  bus: "bus",
  truck: "bus-outline",
  delivery_van: "cube"
};

const subtitleByVehicle = {
  two_wheeler: "Ride Safe,\nRide Certain",
  private_car: "Drive Secure,\nDrive Confident",
  auto: "Move Smart,\nStay Covered",
  taxi: "Passenger Cover,\nClear Premium",
  bus: "Route Ready,\nCovered Well",
  truck: "Load Secure,\nMove Ahead",
  delivery_van: "Deliver Smart,\nStay Protected"
};

const copyByVehicle = {
  two_wheeler: "Build premium from United India two wheeler rates and APK terminology.",
  private_car: "Select policy, CC, add-ons, and review the invoice-style premium.",
  auto: "Prepare Auto premium using the configured United India rules.",
  taxi: "Calculate 4WH PCV premium from APK taxi rates.",
  bus: "Calculate 4WH PCV greater than 6 passengers from APK rates.",
  truck: "Calculate 4WH GCV premium from APK GVW rates.",
  delivery_van: "Calculate 3WH GCV premium from APK public/private carrier rates."
};

export const activeConfig = {
  vehicles: vehiclesConfig.vehicles,
  policyTypes: policyTypesConfig,
  ccSlabs: ccSlabsConfig,
  tenures: tenuresConfig,
  addons: addonsConfig,
  company: companyConfig,
  availability: availabilityConfig,
  tpRateRules,
  odRateRules,
  addonRules,
  taxRules
};

export const companies = [
  {
    ...companyConfig,
    label: "APK values final",
    rating: "UIIC",
    color: colors.emerald
  }
];

export const vehicleTypes = vehiclesConfig.vehicles.reduce((items, vehicle) => {
  const availability = availabilityConfig.find((item) => item.vehicleId === vehicle.id && item.enabled);
  if (!availability) {
    return items;
  }

  items[vehicle.id] = {
    ...vehicle,
    icon: iconByVehicle[vehicle.id] || "shield-checkmark",
    title: vehicle.displayName,
    subtitle: subtitleByVehicle[vehicle.id] || vehicle.displayName,
    copy: copyByVehicle[vehicle.id] || "Prepare premium from active configuration.",
    cc: ccSlabsConfig
      .filter((slab) => slab.vehicleId === vehicle.id)
      .sort((a, b) => a.sortOrder - b.sortOrder),
    policyTypes: policyTypesConfig.filter((policy) => availability.policyTypeIds.includes(policy.id)),
    tenures: tenuresConfig.filter((tenure) => availability.tenureIds.includes(tenure.id))
  };
  return items;
}, {});

function uniqueZones(vehicleId) {
  const rules = odRateRules.vehicles[vehicleId];
  const rows = [
    ...(rules?.normalAndPreOwnedRatesPercent || []),
    ...(rules?.newVehicleLongTermRatesPercent || []),
    ...(rules?.ratesPercent || [])
  ];
  return [...new Set(rows.map((row) => row.zone).filter(Boolean))].sort();
}

function currentIsoDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export const zonesByVehicle = vehiclesConfig.vehicles.reduce((items, vehicle) => {
  items[vehicle.id] = uniqueZones(vehicle.id);
  return items;
}, {});

export const defaultDate = currentIsoDate();

export const initialForm = {
  idv: "100000",
  purchaseDate: defaultDate,
  renewalDate: defaultDate,
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
