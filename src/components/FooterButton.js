import { Pressable, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { styles } from "../styles";

export function FooterButton({ label, onPress }) {
  return (
    <Pressable style={styles.footerButton} onPress={onPress}>
      <Text style={styles.footerButtonText}>{label}</Text>
      <Ionicons name="arrow-forward" size={18} color="#ffffff" />
    </Pressable>
  );
}
