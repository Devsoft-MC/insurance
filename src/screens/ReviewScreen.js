import { Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { StepHeader } from "../components/StepHeader";
import { colors, styles } from "../styles";
import { formatMoney } from "../utils/formatMoney";

export function ReviewScreen({ company, vehicle, cc, policyType, tenure, zone, form, premium, selectedAddons, removeAddon, onAddMore }) {
  const isLiabilityOnly = policyType.id === "liability_policy";
  const hasLiabilityCoverage = policyType.covers?.includes("third_party");
  const hasOwnDamageCoverage = policyType.covers?.includes("own_damage");
  const addonValue = (id) => selectedAddons.find((addon) => addon.id === id)?.price || 0;
  const liabilityValue = (id) => selectedAddons.find((addon) => addon.id === id)?.price || 0;
  const canRemove = (id) => selectedAddons.some((addon) => addon.id === id && !addon.mandatory);
  const removeHandler = (id) => canRemove(id) ? () => removeAddon(id) : undefined;

  return (
    <>
      <StepHeader eyebrow="Review" title="Premium summary" copy="Premium split by own damage and liability." />
      <View style={styles.reviewCard}>
        <View style={[styles.logoBadge, { backgroundColor: company.color }]}>
          <Ionicons name={vehicle.icon} size={24} color="#ffffff" />
        </View>
        <View style={styles.reviewBody}>
          <Text style={styles.companyName}>{company.name}</Text>
          <Text style={styles.muted}>{vehicle.title} / {policyType.name} / {tenure.name}</Text>
          {hasOwnDamageCoverage && hasLiabilityCoverage && premium.tpTenureId !== premium.odTenureId ? (
            <Text style={styles.muted}>TP {tenureLabel(premium.tpTenureId)} / OD {tenureLabel(premium.odTenureId)}</Text>
          ) : null}
          <Text style={styles.muted}>{cc.name}{!isLiabilityOnly ? ` / ${zone}` : ""}</Text>
        </View>
      </View>

      {!isLiabilityOnly ? (
        <>
          <SummarySection title="Vehicle Basic Details" tone="pink">
            <SummaryLine label="IDV" value={numberLabel(form.idv)} />
            <SummaryLine label="Electrical Accessories" value={numberLabel(form.electricalAccessories)} />
            <SummaryLine label="Non-Electrical Accessories" value={numberLabel(form.nonElectricalAccessories)} />
            <SummaryLine label="Date of Purchase" value={dateLabel(form.purchaseDate)} />
            <SummaryLine label="Current Date/Renewal Date" value={dateLabel(form.renewalDate)} />
            <SummaryLine label="Age of Vehicle" value={ageLabel(form.purchaseDate, form.renewalDate)} />
            <SummaryLine label="OD Basic Rate" value={String(premium.odRate)} />
          </SummarySection>

          <SummarySection title={`Own Damage Premium(A) For ${tenureLabel(premium.odTenureId)}`} tone="blue">
            <SummaryLine label="Basic-OD" value={formatMoney(premium.odBase)} />
            <SummaryLine label="Non-Elect Accessories-OD" value={formatMoney(addonValue("non_electrical_accessories"))} onRemove={removeHandler("non_electrical_accessories")} />
            <SummaryLine label="Electrical Accessories-OD" value={formatMoney(addonValue("electrical_accessories"))} onRemove={removeHandler("electrical_accessories")} />
            <SummaryLine label="Nil Depreciation Without Excess" value={formatMoney(addonValue("nil_depreciation"))} onRemove={removeHandler("nil_depreciation")} />
            <SummaryLine label="Return to Invoice" value={formatMoney(addonValue("return_to_invoice"))} onRemove={removeHandler("return_to_invoice")} />
            <SummaryLine label="Engine Protection" value={formatMoney(addonValue("engine_protection"))} onRemove={removeHandler("engine_protection")} />
            <SummaryLine label="Loss of Key" value={formatMoney(addonValue("loss_of_key"))} onRemove={removeHandler("loss_of_key")} />
            <SummaryLine label="Consumables" value={formatMoney(addonValue("consummables"))} onRemove={removeHandler("consummables")} />
            <SummaryLine label="Roadside Assistance" value={formatMoney(addonValue("road_side_assistance"))} onRemove={removeHandler("road_side_assistance")} />
            <SummaryLine label="EMI Protect" value={formatMoney(addonValue("emi_protect"))} onRemove={removeHandler("emi_protect")} />
            <SummaryLine label="Detariff Discount" value={formatMoney(-premium.odDiscount)} onRemove={removeHandler("od_discount")} />
            <SummaryLine label="Anti-Theft Device-OD" value={formatMoney(-premium.antiTheftDiscount)} onRemove={removeHandler("anti_theft")} />
            <SummaryLine label="Automobile Association Discount" value={formatMoney(-premium.automobileAssociationDiscount)} onRemove={removeHandler("automobile_association")} />
            <SummaryLine label="Voluntary Excess Discount" value={formatMoney(-premium.voluntaryDeductibleDiscount)} onRemove={removeHandler("voluntary_deductible")} />
            <SummaryLine label={`No Claim Bonus @ ${form.ncbPercent || "0"} %`} value={formatMoney(-premium.ncbDiscount)} onRemove={removeHandler("no_claim_bonus")} />
            <SummaryLine label="Net Own Damage Premium(A)" value={formatMoney(premium.netOwnDamagePremium)} highlight="orange" />
          </SummarySection>
        </>
      ) : null}

      {hasLiabilityCoverage ? (
        <SummarySection title={`Liability Premium(B) For ${tenureLabel(premium.tpTenureId)}`} tone="blue">
          <SummaryLine label="Basic TP" value={formatMoney(premium.tpBase)} />
          <SummaryLine label="PA Owner Driver" value={formatMoney(liabilityValue("pa_owner_driver"))} onRemove={removeHandler("pa_owner_driver")} />
          <SummaryLine label="LL to Paid Driver" value={formatMoney(liabilityValue("ll_paid_driver"))} onRemove={removeHandler("ll_paid_driver")} />
          <SummaryLine label="Employees of Insured" value={formatMoney(liabilityValue("ll_employees"))} onRemove={removeHandler("ll_employees")} />
          <SummaryLine label="LL to Passenger" value={formatMoney(liabilityValue("ll_passenger"))} onRemove={removeHandler("ll_passenger")} />
          <SummaryLine label="PA Unnamed Passengers" value={formatMoney(liabilityValue("pa_unnamed_passenger"))} onRemove={removeHandler("pa_unnamed_passenger")} />
          <SummaryLine label="LL to Non-Fare Passenger" value={formatMoney(liabilityValue("ll_nonfare_passenger"))} onRemove={removeHandler("ll_nonfare_passenger")} />
          <SummaryLine label="BIFUEL KIT-TP" value={formatMoney(liabilityValue("cng_tp"))} onRemove={removeHandler("cng_tp")} />
          <SummaryLine label="TPPD Discount" value={formatMoney(liabilityValue("tppd_discount"))} onRemove={removeHandler("tppd_discount")} />
          <SummaryLine label="Net TP Premium(B)" value={formatMoney(premium.netLiabilityPremium)} highlight="orange" />
        </SummarySection>
      ) : null}

      <SummaryLine label={hasLiabilityCoverage ? "Net Premium(A+B)" : "Net Premium(A)"} value={formatMoney(premium.netPremium)} highlight="gray" />
      <SummaryLine label={`${premium.taxLabel} @ ${premium.taxRate}%`} value={formatMoney(premium.tax)} />
      <SummaryLine label="Net Premium Payable" value={formatMoney(premium.total)} highlight="green" />

      <Pressable style={styles.addMoreButton} onPress={onAddMore}>
        <Ionicons name="add-circle" size={18} color={colors.blue} />
        <Text style={styles.addMoreText}>Add more covers</Text>
      </Pressable>
    </>
  );
}

function SummarySection({ title, tone, children }) {
  return (
    <View style={styles.summarySection}>
      <Text style={[styles.summarySectionTitle, tone === "pink" && styles.summarySectionTitlePink]}>{title}</Text>
      {children}
    </View>
  );
}

function SummaryLine({ label, value, highlight, onRemove }) {
  return (
    <View style={[styles.summaryLine, highlight === "orange" && styles.summaryLineOrange, highlight === "gray" && styles.summaryLineGray, highlight === "green" && styles.summaryLineGreen]}>
      <Text style={[styles.summaryLineLabel, highlight && styles.summaryLineLabelStrong]}>{label}</Text>
      <Text style={[styles.summaryLineValue, highlight && styles.summaryLineLabelStrong]}>{value}</Text>
      {onRemove ? (
        <Pressable style={styles.summaryRemoveButton} onPress={onRemove}>
          <Ionicons name="close" size={14} color={colors.red} />
        </Pressable>
      ) : null}
    </View>
  );
}

function tenureLabel(tenureId) {
  const labels = {
    one_year: "One Year",
    three_years: "Three Years",
    five_years: "Five Years"
  };
  return labels[tenureId] || tenureId;
}

function dateLabel(value) {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return value || "-";
  }
  const [year, month, day] = value.split("-");
  return `${day}-${month}-${year}`;
}

function numberLabel(value) {
  const parsed = Number(value || 0);
  return Number.isFinite(parsed) ? parsed.toFixed(1) : "0.0";
}

function ageLabel(purchaseDateValue, renewalDateValue) {
  const purchaseDate = parseDate(purchaseDateValue);
  const renewalDate = parseDate(renewalDateValue) || new Date();
  if (!purchaseDate) {
    return "0 Years 0 Months 0 Days";
  }

  let years = renewalDate.getFullYear() - purchaseDate.getFullYear();
  let months = renewalDate.getMonth() - purchaseDate.getMonth();
  let days = renewalDate.getDate() - purchaseDate.getDate();

  if (days < 0) {
    months -= 1;
    days += new Date(renewalDate.getFullYear(), renewalDate.getMonth(), 0).getDate();
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  return `${Math.max(years, 0)} Years ${Math.max(months, 0)} Months ${Math.max(days, 0)} Days`;
}

function parseDate(value) {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return null;
  }
  const date = new Date(`${value}T00:00:00`);
  return Number.isNaN(date.getTime()) ? null : date;
}
