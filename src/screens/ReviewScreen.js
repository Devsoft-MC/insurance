import { Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { AmountLine } from "../components/AmountLine";
import { StepHeader } from "../components/StepHeader";
import { colors, styles } from "../styles";
import { formatMoney } from "../utils/formatMoney";

export function ReviewScreen({ company, vehicleType, vehicle, cc, form, basePremium, selectedAddons, removeAddon, total, onAddMore }) {
  return (
    <>
      <StepHeader eyebrow="Review" title="Total amount" copy="No payment step yet. Review the quote and remove add-ons if needed." />
      <View style={styles.reviewCard}>
        <View style={[styles.logoBadge, { backgroundColor: company.color }]}>
          <Ionicons name={vehicle.icon} size={24} color="#ffffff" />
        </View>
        <View style={styles.reviewBody}>
          <Text style={styles.companyName}>{company.name}</Text>
          <Text style={styles.muted}>{vehicleType} / {cc}</Text>
          <Text style={styles.muted}>{form.ownerName || "Owner name"} / {form.vehicleNumber || "Vehicle number"}</Text>
        </View>
      </View>
      <AmountLine label="Base policy premium" value={basePremium} />
      <Text style={styles.sectionTitle}>Selected add-ons</Text>
      {selectedAddons.length === 0 ? (
        <View style={styles.emptyBox}>
          <Text style={styles.muted}>No add-ons selected.</Text>
        </View>
      ) : (
        selectedAddons.map((addon) => (
          <View key={addon.id} style={styles.cartRow}>
            <View style={styles.cartText}>
              <Text style={styles.addonTitle}>{addon.title}</Text>
              <Text style={styles.muted}>{formatMoney(addon.price)}</Text>
            </View>
            <Pressable style={styles.removeButton} onPress={() => removeAddon(addon.id)}>
              <Ionicons name="close" size={18} color={colors.red} />
              <Text style={styles.removeText}>Remove</Text>
            </Pressable>
          </View>
        ))
      )}
      <Pressable style={styles.addMoreButton} onPress={onAddMore}>
        <Ionicons name="add-circle" size={18} color={colors.blue} />
        <Text style={styles.addMoreText}>Add more covers</Text>
      </Pressable>
      <View style={styles.grandTotal}>
        <Text style={styles.grandTotalLabel}>Total Amount</Text>
        <Text style={styles.grandTotalValue}>{formatMoney(total)}</Text>
      </View>
    </>
  );
}
