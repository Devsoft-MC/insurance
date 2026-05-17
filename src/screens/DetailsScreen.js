import { useState } from "react";
import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { FooterButton } from "../components/FooterButton";
import { InputField } from "../components/InputField";
import { StepHeader } from "../components/StepHeader";
import { styles } from "../styles";

export function DetailsScreen({ form, setForm, company, vehicle, cc, policyType, tenure, zone, isPackagePolicy, onNext }) {
  const [error, setError] = useState("");
  const setField = (key, value) => setForm((current) => ({ ...current, [key]: value }));
  const isLiabilityOnly = policyType.id === "liability_policy";
  const validDate = (value) => /^\d{4}-\d{2}-\d{2}$/.test(value || "");
  const continueIfValid = () => {
    if (isPackagePolicy && (!zone || !validDate(form.purchaseDate) || !validDate(form.renewalDate))) {
      setError("Zone, date of purchase, and renewal/current date are mandatory. Use YYYY-MM-DD.");
      return;
    }
    setError("");
    onNext();
  };

  return (
    <>
      <StepHeader eyebrow="Step 3" title="Enter premium details" copy="Only calculation inputs are needed for premium computation." />
      <View style={styles.summaryMini}>
        <View style={[styles.logoBadge, { backgroundColor: company.color }]}>
          <Ionicons name={vehicle.icon} size={24} color="#ffffff" />
        </View>
        <View>
          <Text style={styles.summaryMiniTitle}>{company.name}</Text>
          <Text style={styles.muted}>{vehicle.title} / {policyType.name} / {tenure.name}</Text>
          <Text style={styles.muted}>{cc.name}{isPackagePolicy ? ` / ${zone}` : ""}</Text>
        </View>
      </View>
      {isPackagePolicy ? (
        <>
          <InputField label="Date of purchase" value={form.purchaseDate} onChangeText={(value) => setField("purchaseDate", value)} placeholder="YYYY-MM-DD" />
          <InputField label="Renewal / Current date" value={form.renewalDate} onChangeText={(value) => setField("renewalDate", value)} placeholder="YYYY-MM-DD" />
        </>
      ) : null}
      {!isLiabilityOnly ? (
        <InputField label="IDV" value={form.idv} onChangeText={(value) => setField("idv", value)} placeholder="100000" keyboardType="numeric" />
      ) : null}
      {["auto", "taxi", "bus"].includes(vehicle.id) ? (
        <InputField label="Seating capacity" value={form.seatingCapacity} onChangeText={(value) => setField("seatingCapacity", value)} placeholder="3" keyboardType="numeric" />
      ) : null}
      {error ? <Text style={styles.fieldError}>{error}</Text> : null}
      <FooterButton label="Continue" onPress={continueIfValid} />
    </>
  );
}
