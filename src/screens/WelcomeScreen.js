import { Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { styles } from "../styles";

const vehicleTiles = [
  { icon: "bicycle", label: "Two Wheeler" },
  { icon: "car-sport", label: "Private Car" },
  { icon: "car", label: "Auto / Taxi" },
  { icon: "bus", label: "Commercial" }
];

export function WelcomeScreen({ onStart }) {
  return (
    <View style={styles.welcome}>
      <Text style={styles.welcomeTitle}>Motor Insurance Premium Calculator</Text>
      <Text style={styles.welcomeCopy}>Prepare United India motor premiums for two wheelers, cars, autos, taxis, buses, trucks, and delivery vehicles.</Text>
      <View style={styles.homeShowcase}>
        <View style={styles.ringLarge} />
        <View style={styles.ringSmall} />
        <View style={styles.homeFleetPanel}>
          {vehicleTiles.map((item) => (
            <View key={item.label} style={styles.homeVehicleTile}>
              <Ionicons name={item.icon} size={30} color="#071827" />
              <Text style={styles.homeVehicleLabel}>{item.label}</Text>
            </View>
          ))}
        </View>
      </View>
      <View style={styles.homeFooterNote}>
        <Ionicons name="shield-checkmark" size={18} color="#2dd4bf" />
        <Text style={styles.homeFooterText}>Offline rate rules, add-ons, tax, and invoice-style summary.</Text>
      </View>
      <Pressable style={styles.whiteButton} onPress={onStart}>
        <Text style={styles.whiteButtonText}>Start Calculation</Text>
      </Pressable>
    </View>
  );
}
