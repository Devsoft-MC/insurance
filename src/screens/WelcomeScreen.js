import { Pressable, Text, View } from "react-native";

import { VehicleArt } from "../components/VehicleArt";
import { styles } from "../styles";

export function WelcomeScreen({ vehicle, onStart }) {
  return (
    <View style={styles.welcome}>
      <Text style={styles.welcomeTitle}>{vehicle.subtitle}</Text>
      <Text style={styles.welcomeCopy}>{vehicle.copy}</Text>
      <View style={styles.vehicleShowcase}>
        <View style={styles.ringLarge} />
        <View style={styles.ringSmall} />
        <VehicleArt vehicle={vehicle} large />
      </View>
      <Pressable style={styles.whiteButton} onPress={onStart}>
        <Text style={styles.whiteButtonText}>Get Start</Text>
      </Pressable>
    </View>
  );
}
