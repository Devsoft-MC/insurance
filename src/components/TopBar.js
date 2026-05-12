import { Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { styles } from "../styles";

export function TopBar({ title, onBack }) {
  return (
    <View style={styles.topBar}>
      <Pressable onPress={onBack} style={styles.topIcon}>
        <Ionicons name="arrow-back" size={22} color="#ffffff" />
      </Pressable>
      <Text style={styles.topTitle}>{title}</Text>
      <View style={styles.topIcon} />
    </View>
  );
}
