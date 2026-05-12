import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { FooterButton } from "../components/FooterButton";
import { InputField } from "../components/InputField";
import { StepHeader } from "../components/StepHeader";
import { styles } from "../styles";

export function DetailsScreen({ form, setForm, company, vehicle, cc, onNext }) {
  const setField = (key, value) => setForm((current) => ({ ...current, [key]: value }));

  return (
    <>
      <StepHeader eyebrow="Step 3" title="Enter customer details" copy="Collect the details needed to prepare the quote summary." />
      <View style={styles.summaryMini}>
        <View style={[styles.logoBadge, { backgroundColor: company.color }]}>
          <Ionicons name={vehicle.icon} size={24} color="#ffffff" />
        </View>
        <View>
          <Text style={styles.summaryMiniTitle}>{company.name}</Text>
          <Text style={styles.muted}>{vehicle.title} / {cc}</Text>
        </View>
      </View>
      <InputField label="Owner name" value={form.ownerName} onChangeText={(value) => setField("ownerName", value)} placeholder="Enter full name" />
      <InputField label="Mobile number" value={form.mobile} onChangeText={(value) => setField("mobile", value)} placeholder="Enter mobile number" keyboardType="phone-pad" />
      <InputField label="Vehicle number" value={form.vehicleNumber} onChangeText={(value) => setField("vehicleNumber", value)} placeholder="GJ 05 AB 1234" />
      <InputField label="City" value={form.city} onChangeText={(value) => setField("city", value)} placeholder="Enter city" />
      <FooterButton label="Continue" onPress={onNext} />
    </>
  );
}
