import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { styles } from "../styles";

export function VehicleArt({ vehicle, large, compact }) {
  const isBike = vehicle.icon === "bicycle";

  return (
    <View style={[styles.vehicleArt, large && styles.vehicleArtLarge, compact && styles.vehicleArtCompact]}>
      <View style={[styles.vehicleBody, isBike && styles.bikeBody]}>
        <View style={styles.vehicleHighlight} />
        <Ionicons name={vehicle.icon} size={isBike ? 86 : 96} color="#071827" style={styles.vehicleIcon} />
      </View>
      <View style={styles.shadowOval} />
    </View>
  );
}
