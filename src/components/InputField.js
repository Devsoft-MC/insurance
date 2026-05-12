import { Text, TextInput, View } from "react-native";

import { styles } from "../styles";

export function InputField({ label, value, onChangeText, placeholder, keyboardType }) {
  return (
    <View style={styles.inputWrap}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#95a3b4"
        keyboardType={keyboardType || "default"}
        style={styles.input}
      />
    </View>
  );
}
