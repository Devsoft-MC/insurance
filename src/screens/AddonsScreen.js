import { Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { VehicleArt } from "../components/VehicleArt";
import { colors, styles } from "../styles";
import { formatMoney } from "../utils/formatMoney";

export function AddonsScreen({ company, vehicle, basePremium, selectedAddons, toggleAddon, total, onNext }) {
  return (
    <>
      <View style={styles.upgradeHero}>
        <Text style={styles.upgradeTitle}>Add covers to your policy</Text>
        <Text style={styles.watermark}>360</Text>
        <VehicleArt vehicle={vehicle} compact />
      </View>
      <View style={styles.companyStrip}>
        <View style={[styles.logoBadge, { backgroundColor: company.color }]}>
          <Ionicons name="business" size={22} color="#ffffff" />
        </View>
        <View>
          <Text style={styles.companyName}>{company.name}</Text>
          <Text style={styles.muted}>Base premium {formatMoney(basePremium)}</Text>
        </View>
      </View>
      {company.addons.map((addon) => {
        const selected = selectedAddons.some((item) => item.id === addon.id);
        return (
          <View key={addon.id} style={styles.addonRow}>
            <View style={styles.addonText}>
              <Text style={styles.addonTitle}>{addon.title}</Text>
              <Text style={styles.addonCopy}>{addon.copy}</Text>
            </View>
            <Pressable
              style={[styles.addonButton, selected && styles.addonButtonSelected]}
              onPress={() => toggleAddon(addon)}
            >
              <Ionicons name={selected ? "checkmark" : "add"} size={16} color={selected ? "#ffffff" : colors.ink} />
              <Text style={[styles.addonPrice, selected && styles.addonPriceSelected]}>{formatMoney(addon.price)}</Text>
            </Pressable>
          </View>
        );
      })}
      <View style={styles.totalBar}>
        <View>
          <Text style={styles.totalLabel}>Current total</Text>
          <Text style={styles.totalAmount}>{formatMoney(total)}</Text>
        </View>
        <Pressable style={styles.continueButton} onPress={onNext}>
          <Text style={styles.continueText}>Continue</Text>
        </Pressable>
      </View>
    </>
  );
}
