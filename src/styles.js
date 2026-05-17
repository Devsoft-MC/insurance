import { StyleSheet } from "react-native";

export const colors = {
  blue: "#2dd4bf",
  deepBlue: "#0f766e",
  emerald: "#10b981",
  orange: "#f59e0b",
  red: "#f87171",
  ink: "#e8fff6",
  surface: "#0f211b",
  card: "#142b23",
  line: "#24483c",
  muted: "#95b8aa"
};

export const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: "#07130f"
  },
  shell: {
    flex: 1,
    backgroundColor: "#07130f"
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
    backgroundColor: colors.surface,
    borderColor: colors.line,
    borderRadius: 8,
    borderWidth: 1,
    flex: 1,
    minHeight: 720,
    overflow: "hidden",
    padding: 24
  },
  welcomeTitle: {
    color: "#ffffff",
    fontSize: 29,
    fontWeight: "900",
    lineHeight: 36,
    marginTop: 60
  },
  welcomeCopy: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 20,
    marginTop: 14,
    maxWidth: 280
  },
  homeShowcase: {
    alignItems: "center",
    height: 330,
    justifyContent: "center",
    marginTop: 18
  },
  homeFleetPanel: {
    backgroundColor: "#20c78b",
    borderColor: "#67ecc0",
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    justifyContent: "center",
    padding: 14,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.18,
    shadowRadius: 16,
    width: 286
  },
  homeVehicleTile: {
    alignItems: "center",
    backgroundColor: "#83f0c9",
    borderRadius: 8,
    height: 86,
    justifyContent: "center",
    paddingHorizontal: 8,
    width: 122
  },
  homeVehicleLabel: {
    color: "#073f31",
    fontSize: 11,
    fontWeight: "900",
    marginTop: 8,
    textAlign: "center"
  },
  homeFooterNote: {
    alignItems: "center",
    flexDirection: "row",
    gap: 9,
    marginBottom: 16
  },
  homeFooterText: {
    color: colors.muted,
    flex: 1,
    fontSize: 12,
    fontWeight: "800",
    lineHeight: 17
  },
  vehicleShowcase: {
    alignItems: "center",
    height: 310,
    justifyContent: "center",
    marginTop: 18
  },
  ringLarge: {
    borderColor: "rgba(16,185,129,0.11)",
    borderRadius: 130,
    borderWidth: 36,
    height: 260,
    position: "absolute",
    width: 260
  },
  ringSmall: {
    backgroundColor: "rgba(45,212,191,0.11)",
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
    backgroundColor: "#21c58a",
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
    backgroundColor: "#7cf6c6",
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
    color: "#073f31",
    fontSize: 15,
    fontWeight: "900"
  },
  topBar: {
    alignItems: "center",
    backgroundColor: "#0b1a15",
    borderBottomColor: colors.line,
    borderBottomWidth: 1,
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
    color: colors.muted,
    fontSize: 14,
    lineHeight: 20,
    marginTop: 8
  },
  companyCard: {
    alignItems: "center",
    backgroundColor: colors.card,
    borderColor: colors.line,
    borderRadius: 8,
    borderWidth: 1.5,
    flexDirection: "row",
    gap: 13,
    marginBottom: 12,
    padding: 14
  },
  companyCardActive: {
    borderColor: colors.emerald,
    backgroundColor: "#16382d"
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
    color: colors.muted,
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
    backgroundColor: colors.card,
    borderColor: colors.line,
    borderRadius: 8,
    borderWidth: 1.5,
    flex: 1,
    minHeight: 132,
    justifyContent: "center",
    padding: 12
  },
  vehicleChoiceActive: {
    backgroundColor: "#0f7a57",
    borderColor: colors.emerald
  },
  vehicleChoiceText: {
    color: colors.ink,
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
    backgroundColor: colors.card,
    borderColor: colors.line,
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    minHeight: 54,
    paddingHorizontal: 14
  },
  optionRowActive: {
    borderColor: colors.emerald,
    backgroundColor: "#16382d"
  },
  optionBody: {
    flex: 1,
    paddingRight: 12
  },
  optionText: {
    color: colors.ink,
    fontSize: 14,
    fontWeight: "800"
  },
  optionTextActive: {
    color: "#7cf6c6"
  },
  optionHint: {
    color: colors.muted,
    fontSize: 11,
    fontWeight: "700",
    marginTop: 4
  },
  segmentRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 14
  },
  segmentRowWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 14
  },
  segment: {
    alignItems: "center",
    backgroundColor: colors.card,
    borderColor: colors.line,
    borderRadius: 8,
    borderWidth: 1,
    flex: 1,
    minHeight: 46,
    justifyContent: "center",
    paddingHorizontal: 10
  },
  segmentActive: {
    backgroundColor: "#0f7a57",
    borderColor: colors.emerald
  },
  segmentCompact: {
    flexBasis: "30%",
    flexGrow: 1
  },
  segmentText: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: "900",
    textAlign: "center"
  },
  segmentTextActive: {
    color: "#ffffff"
  },
  summaryMini: {
    alignItems: "center",
    backgroundColor: colors.card,
    borderColor: colors.line,
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
    color: colors.ink,
    fontSize: 12,
    fontWeight: "900",
    marginBottom: 7
  },
  input: {
    backgroundColor: colors.card,
    borderColor: colors.line,
    borderRadius: 8,
    borderWidth: 1,
    color: colors.ink,
    fontSize: 15,
    fontWeight: "700",
    height: 52,
    paddingHorizontal: 14
  },
  fieldError: {
    color: colors.red,
    fontSize: 12,
    fontWeight: "800",
    lineHeight: 17,
    marginBottom: 2,
    marginTop: 4
  },
  upgradeHero: {
    backgroundColor: colors.surface,
    borderColor: colors.line,
    borderWidth: 1,
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
    backgroundColor: colors.card,
    borderColor: colors.line,
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
    backgroundColor: colors.card,
    borderColor: colors.line,
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    padding: 14
  },
  inlineAddonFields: {
    backgroundColor: "#0f211b",
    borderColor: colors.line,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 10,
    marginTop: -6,
    padding: 12
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
    color: colors.muted,
    fontSize: 11,
    lineHeight: 16,
    marginTop: 5
  },
  addonButton: {
    alignItems: "center",
    borderColor: colors.line,
    borderRadius: 999,
    borderWidth: 1,
    flexDirection: "row",
    gap: 4,
    paddingHorizontal: 9,
    paddingVertical: 8
  },
  addonButtonSelected: {
    backgroundColor: colors.emerald,
    borderColor: colors.emerald
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
    backgroundColor: colors.card,
    borderColor: colors.line,
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6,
    padding: 14
  },
  totalLabel: {
    color: colors.muted,
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
    backgroundColor: colors.emerald,
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
    backgroundColor: colors.card,
    borderColor: colors.emerald,
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
    backgroundColor: colors.card,
    borderColor: colors.line,
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    padding: 14
  },
  amountLabel: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: "800"
  },
  amountValue: {
    color: colors.ink,
    fontSize: 15,
    fontWeight: "900"
  },
  emptyBox: {
    backgroundColor: colors.card,
    borderColor: colors.line,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 10,
    padding: 16
  },
  cartRow: {
    alignItems: "center",
    backgroundColor: colors.card,
    borderColor: colors.line,
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
  summarySection: {
    marginBottom: 12
  },
  summarySectionTitle: {
    backgroundColor: colors.surface,
    borderColor: colors.line,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderWidth: 1,
    color: colors.ink,
    fontSize: 14,
    fontWeight: "900",
    paddingHorizontal: 10,
    paddingVertical: 8,
    textAlign: "center"
  },
  summarySectionTitlePink: {
    backgroundColor: colors.surface
  },
  summaryLine: {
    alignItems: "center",
    backgroundColor: colors.card,
    borderBottomColor: colors.line,
    borderLeftColor: colors.line,
    borderRightColor: colors.line,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    minHeight: 32,
    paddingHorizontal: 10,
    paddingVertical: 6
  },
  summaryLineOrange: {
    backgroundColor: "#0f7a57"
  },
  summaryLineGray: {
    backgroundColor: colors.surface
  },
  summaryLineGreen: {
    backgroundColor: colors.emerald
  },
  summaryLineLabel: {
    color: colors.muted,
    flex: 1,
    fontSize: 13,
    fontWeight: "700",
    paddingRight: 10
  },
  summaryLineValue: {
    color: colors.ink,
    fontSize: 13,
    fontWeight: "800",
    textAlign: "right"
  },
  summaryRemoveButton: {
    alignItems: "center",
    borderColor: colors.red,
    borderRadius: 999,
    borderWidth: 1,
    height: 24,
    justifyContent: "center",
    marginLeft: 8,
    width: 24
  },
  summaryLineLabelStrong: {
    color: "#ffffff",
    fontWeight: "900"
  },
  grandTotal: {
    backgroundColor: "#0f7a57",
    borderRadius: 8,
    marginTop: 10,
    padding: 18
  },
  grandTotalLabel: {
    color: "#d8fff0",
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
    backgroundColor: colors.emerald,
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
