import { Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { FooterButton } from "../components/FooterButton";
import { StepHeader } from "../components/StepHeader";
import { companies } from "../constants/insurance";
import { colors, styles } from "../styles";

export function CompanyScreen({ companyId, setCompanyId, onNext }) {
  return (
    <>
      <StepHeader eyebrow="Step 1" title="Select your policy company" copy="Choose one insurer first, then build your vehicle plan around it." />
      {companies.map((company) => {
        const active = company.id === companyId;
        return (
          <Pressable
            key={company.id}
            style={[styles.companyCard, active && styles.companyCardActive]}
            onPress={() => setCompanyId(company.id)}
          >
            <View style={[styles.logoBadge, { backgroundColor: company.color }]}>
              <Ionicons name="shield-checkmark" size={24} color="#ffffff" />
            </View>
            <View style={styles.companyBody}>
              <Text style={styles.companyName}>{company.name}</Text>
              <Text style={styles.muted}>{company.label}</Text>
              <Text style={styles.rating}>Rating {company.rating}</Text>
            </View>
            <Ionicons name={active ? "checkmark-circle" : "ellipse-outline"} size={24} color={active ? colors.blue : "#aab7c4"} />
          </Pressable>
        );
      })}
      <FooterButton label="Continue" onPress={onNext} />
    </>
  );
}
