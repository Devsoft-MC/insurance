import { colors } from "../styles";

export const companies = [
  {
    id: "icici",
    name: "ICIC Lombard",
    label: "Fast claim network",
    rating: "4.8",
    color: colors.orange,
    base: { Car: 10000, "Two Wheeler": 2400 },
    addons: [
      { id: "zero", title: "Zero Depreciation", copy: "No depreciation cut during claim settlement.", price: 700 },
      { id: "engine", title: "Engine Protect", copy: "Covers engine damage from water or leakage.", price: 300 },
      { id: "rsa", title: "Roadside Assist", copy: "Towing, battery jumpstart, and flat tyre help.", price: 199 }
    ]
  },
  {
    id: "hdfc",
    name: "HDFC Ergo",
    label: "Cashless garage cover",
    rating: "4.7",
    color: colors.red,
    base: { Car: 9200, "Two Wheeler": 2100 },
    addons: [
      { id: "consumable", title: "Consumables Cover", copy: "Covers nuts, bolts, oil, clips, and small parts.", price: 420 },
      { id: "invoice", title: "Return to Invoice", copy: "Pays invoice value after theft or total loss.", price: 950 },
      { id: "key", title: "Key Replacement", copy: "Replacement cover for lost or damaged keys.", price: 180 }
    ]
  },
  {
    id: "reliance",
    name: "Reliance General",
    label: "Value bundle",
    rating: "4.6",
    color: "#10a3a8",
    base: { Car: 8700, "Two Wheeler": 1950 },
    addons: [
      { id: "ncb", title: "NCB Protect", copy: "Keeps your no-claim bonus after one claim.", price: 520 },
      { id: "personal", title: "Personal Accident", copy: "Extra owner-driver accident coverage.", price: 350 },
      { id: "daily", title: "Daily Allowance", copy: "Daily travel support while vehicle is repaired.", price: 260 }
    ]
  }
];

export const vehicleTypes = {
  Car: {
    icon: "car-sport",
    title: "Car Insurance",
    subtitle: "Drive Secure,\nDrive Confident",
    copy: "Compare plans, add covers, and review the total before purchase.",
    cc: ["Under 1000 CC", "1000 - 1500 CC", "Above 1500 CC"]
  },
  "Two Wheeler": {
    icon: "bicycle",
    title: "Two Wheeler Insurance",
    subtitle: "Ride Safe,\nRide Certain",
    copy: "Build quick protection for scooters, bikes, and everyday rides.",
    cc: ["Under 110 CC", "110 - 150 CC", "Above 150 CC"]
  }
};

export const initialForm = {
  ownerName: "",
  mobile: "",
  vehicleNumber: "",
  city: ""
};
