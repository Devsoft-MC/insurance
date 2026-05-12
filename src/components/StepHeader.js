import { Text, View } from "react-native";

import { styles } from "../styles";

export function StepHeader({ eyebrow, title, copy }) {
  return (
    <View style={styles.stepHeader}>
      <Text style={styles.eyebrow}>{eyebrow}</Text>
      <Text style={styles.stepTitle}>{title}</Text>
      <Text style={styles.stepCopy}>{copy}</Text>
    </View>
  );
}
