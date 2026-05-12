import { Text, View } from "react-native";

import { styles } from "../styles";
import { formatMoney } from "../utils/formatMoney";

export function AmountLine({ label, value }) {
  return (
    <View style={styles.amountLine}>
      <Text style={styles.amountLabel}>{label}</Text>
      <Text style={styles.amountValue}>{formatMoney(value)}</Text>
    </View>
  );
}
