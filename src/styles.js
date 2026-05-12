import { StyleSheet } from "react-native";

export const colors = {
  blue: "#2695db",
  deepBlue: "#0b83cb",
  orange: "#ff720f",
  red: "#ad2531",
  ink: "#0f172a"
};

export const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: colors.blue
  },
  shell: {
    flex: 1,
    backgroundColor: "#f6f8fd"
  },
  content: {
    paddingHorizontal: 18,
    paddingBottom: 34
  },
  welcomeContent: {
    flexGrow: 1,
    paddingBottom: 24
  },
  welcome: {
    backgroundColor: colors.blue,
    borderRadius: 8,
    flex: 1,
    minHeight: 720,
    overflow: "hidden",
    padding: 24
  },
  welcomeTitle: {
    color: "#ffffff",
    fontSize: 31,
    fontWeight: "900",
    lineHeight: 38,
    marginTop: 60
  },
  welcomeCopy: {
    color: "#d9f1ff",
    fontSize: 14,
    lineHeight: 20,
    marginTop: 14,
    maxWidth: 280
  },
  vehicleShowcase: {
    alignItems: "center",
    height: 310,
    justifyContent: "center",
    marginTop: 18
  },
  ringLarge: {
    borderColor: "rgba(255,255,255,0.08)",
    borderRadius: 130,
    borderWidth: 36,
    height: 260,
    position: "absolute",
    width: 260
  },
  ringSmall: {
    backgroundColor: "rgba(255,255,255,0.10)",
    borderRadius: 86,
    height: 172,
    position: "absolute",
    width: 172
  },
  vehicleArt: {
    alignItems: "center",
    justifyContent: "center"
  },
  vehicleArtLarge: {
    transform: [{ scale: 1.24 }]
  },
  vehicleArtCompact: {
    marginTop: 18,
    transform: [{ scale: 1.04 }]
  },
  vehicleBody: {
    alignItems: "center",
    backgroundColor: "#1b9ee7",
    borderRadius: 8,
    height: 116,
    justifyContent: "center",
    width: 188
  },
  bikeBody: {
    width: 170
  },
  vehicleIcon: {
    zIndex: 2
  },
  vehicleHighlight: {
    backgroundColor: "#50c5ff",
    borderRadius: 8,
    height: 34,
    left: 22,
    position: "absolute",
    top: 18,
    width: 98
  },
  shadowOval: {
    backgroundColor: "rgba(5, 29, 44, 0.16)",
    borderRadius: 999,
    height: 16,
    marginTop: -3,
    width: 170
  },
  whiteButton: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 8,
    height: 54,
    justifyContent: "center",
    marginTop: "auto"
  },
  whiteButtonText: {
    color: colors.deepBlue,
    fontSize: 15,
    fontWeight: "900"
  },
  topBar: {
    alignItems: "center",
    backgroundColor: colors.blue,
    flexDirection: "row",
    justifyContent: "space-between",
    minHeight: 64,
    paddingHorizontal: 16
  },
  topIcon: {
    alignItems: "center",
    height: 38,
    justifyContent: "center",
    width: 38
  },
  topTitle: {
    color: "#ffffff",
    fontSize: 19,
    fontWeight: "900"
  },
  stepHeader: {
    paddingBottom: 16,
    paddingTop: 20
  },
  eyebrow: {
    color: colors.blue,
    fontSize: 12,
    fontWeight: "900",
    textTransform: "uppercase"
  },
  stepTitle: {
    color: colors.ink,
    fontSize: 25,
    fontWeight: "900",
    lineHeight: 31,
    marginTop: 6
  },
  stepCopy: {
    color: "#64748b",
    fontSize: 14,
    lineHeight: 20,
    marginTop: 8
  },
  companyCard: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderColor: "#dbe7f1",
    borderRadius: 8,
    borderWidth: 1.5,
    flexDirection: "row",
    gap: 13,
    marginBottom: 12,
    padding: 14
  },
  companyCardActive: {
    borderColor: colors.blue,
    backgroundColor: "#eef8ff"
  },
  logoBadge: {
    alignItems: "center",
    borderRadius: 8,
    height: 50,
    justifyContent: "center",
    width: 50
  },
  companyBody: {
    flex: 1
  },
  companyName: {
    color: colors.ink,
    fontSize: 16,
    fontWeight: "900"
  },
  muted: {
    color: "#64748b",
    fontSize: 12,
    fontWeight: "700",
    lineHeight: 17,
    marginTop: 3
  },
  rating: {
    color: colors.blue,
    fontSize: 12,
    fontWeight: "900",
    marginTop: 6
  },
  choiceGrid: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 20
  },
  vehicleChoice: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderColor: "#dbe7f1",
    borderRadius: 8,
    borderWidth: 1.5,
    flex: 1,
    minHeight: 132,
    justifyContent: "center",
    padding: 12
  },
  vehicleChoiceActive: {
    backgroundColor: colors.blue,
    borderColor: colors.blue
  },
  vehicleChoiceText: {
    color: colors.blue,
    fontSize: 14,
    fontWeight: "900",
    marginTop: 12,
    textAlign: "center"
  },
  vehicleChoiceTextActive: {
    color: "#ffffff"
  },
  sectionTitle: {
    color: colors.ink,
    fontSize: 17,
    fontWeight: "900",
    marginBottom: 10,
    marginTop: 8
  },
  optionRow: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderColor: "#dbe7f1",
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    minHeight: 54,
    paddingHorizontal: 14
  },
  optionRowActive: {
    borderColor: colors.blue,
    backgroundColor: "#eef8ff"
  },
  optionText: {
    color: "#334155",
    fontSize: 14,
    fontWeight: "800"
  },
  optionTextActive: {
    color: colors.blue
  },
  summaryMini: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderColor: "#dbe7f1",
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: "row",
    gap: 12,
    marginBottom: 14,
    padding: 14
  },
  summaryMiniTitle: {
    color: colors.ink,
    fontSize: 16,
    fontWeight: "900"
  },
  inputWrap: {
    marginBottom: 13
  },
  inputLabel: {
    color: "#334155",
    fontSize: 12,
    fontWeight: "900",
    marginBottom: 7
  },
  input: {
    backgroundColor: "#ffffff",
    borderColor: "#dbe7f1",
    borderRadius: 8,
    borderWidth: 1,
    color: colors.ink,
    fontSize: 15,
    fontWeight: "700",
    height: 52,
    paddingHorizontal: 14
  },
  upgradeHero: {
    backgroundColor: colors.blue,
    borderRadius: 8,
    minHeight: 248,
    overflow: "hidden",
    paddingHorizontal: 24,
    paddingTop: 26
  },
  upgradeTitle: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "900",
    lineHeight: 30,
    maxWidth: 270
  },
  watermark: {
    color: "rgba(255,255,255,0.15)",
    fontSize: 58,
    fontWeight: "900",
    position: "absolute",
    right: 38,
    top: 84
  },
  companyStrip: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderColor: "#dbe7f1",
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: "row",
    gap: 12,
    marginBottom: 12,
    marginTop: 12,
    padding: 14
  },
  addonRow: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderColor: "#e4edf5",
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    padding: 14
  },
  addonText: {
    flex: 1,
    paddingRight: 12
  },
  addonTitle: {
    color: colors.ink,
    fontSize: 14,
    fontWeight: "900"
  },
  addonCopy: {
    color: "#8b98a8",
    fontSize: 11,
    lineHeight: 16,
    marginTop: 5
  },
  addonButton: {
    alignItems: "center",
    borderColor: "#9fb0bd",
    borderRadius: 999,
    borderWidth: 1,
    flexDirection: "row",
    gap: 4,
    paddingHorizontal: 9,
    paddingVertical: 8
  },
  addonButtonSelected: {
    backgroundColor: colors.blue,
    borderColor: colors.blue
  },
  addonPrice: {
    color: colors.ink,
    fontSize: 11,
    fontWeight: "900"
  },
  addonPriceSelected: {
    color: "#ffffff"
  },
  totalBar: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderColor: "#dbe7f1",
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6,
    padding: 14
  },
  totalLabel: {
    color: "#8b98a8",
    fontSize: 12,
    fontWeight: "800"
  },
  totalAmount: {
    color: colors.ink,
    fontSize: 21,
    fontWeight: "900",
    marginTop: 4
  },
  continueButton: {
    backgroundColor: colors.blue,
    borderRadius: 999,
    paddingHorizontal: 24,
    paddingVertical: 13
  },
  continueText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "900"
  },
  reviewCard: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderColor: colors.blue,
    borderRadius: 8,
    borderWidth: 1.5,
    flexDirection: "row",
    gap: 14,
    marginBottom: 12,
    padding: 14
  },
  reviewBody: {
    flex: 1
  },
  amountLine: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderColor: "#dbe7f1",
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    padding: 14
  },
  amountLabel: {
    color: "#64748b",
    fontSize: 13,
    fontWeight: "800"
  },
  amountValue: {
    color: colors.ink,
    fontSize: 15,
    fontWeight: "900"
  },
  emptyBox: {
    backgroundColor: "#ffffff",
    borderColor: "#dbe7f1",
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 10,
    padding: 16
  },
  cartRow: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderColor: "#e4edf5",
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    padding: 14
  },
  cartText: {
    flex: 1,
    paddingRight: 12
  },
  removeButton: {
    alignItems: "center",
    borderColor: "#fecdd3",
    borderRadius: 999,
    borderWidth: 1,
    flexDirection: "row",
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 8
  },
  removeText: {
    color: colors.red,
    fontSize: 11,
    fontWeight: "900"
  },
  addMoreButton: {
    alignItems: "center",
    alignSelf: "flex-start",
    flexDirection: "row",
    gap: 6,
    marginTop: 4,
    paddingVertical: 10
  },
  addMoreText: {
    color: colors.blue,
    fontSize: 13,
    fontWeight: "900"
  },
  grandTotal: {
    backgroundColor: colors.blue,
    borderRadius: 8,
    marginTop: 10,
    padding: 18
  },
  grandTotalLabel: {
    color: "#d9f1ff",
    fontSize: 13,
    fontWeight: "900"
  },
  grandTotalValue: {
    color: "#ffffff",
    fontSize: 31,
    fontWeight: "900",
    marginTop: 4
  },
  footerButton: {
    alignItems: "center",
    backgroundColor: colors.blue,
    borderRadius: 8,
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
    marginTop: 16,
    minHeight: 54
  },
  footerButtonText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "900"
  }
});
