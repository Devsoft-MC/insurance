import { Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { FooterButton } from "../components/FooterButton";
import { StepHeader } from "../components/StepHeader";
import { vehicleTypes } from "../constants/insurance";
import { colors, styles } from "../styles";

export function VehicleScreen({ vehicleType, setVehicleType, cc, setCc, onNext }) {
  return (
    <>
      <StepHeader eyebrow="Step 2" title="Choose vehicle type and CC" copy="Pick car or two wheeler, then select the engine capacity." />
      <View style={styles.choiceGrid}>
        {Object.keys(vehicleTypes).map((type) => {
          const active = type === vehicleType;
          return (
            <Pressable
              key={type}
              style={[styles.vehicleChoice, active && styles.vehicleChoiceActive]}
              onPress={() => setVehicleType(type)}
            >
              <Ionicons name={vehicleTypes[type].icon} size={38} color={active ? "#ffffff" : colors.blue} />
              <Text style={[styles.vehicleChoiceText, active && styles.vehicleChoiceTextActive]}>{type}</Text>
            </Pressable>
          );
        })}
      </View>
      <Text style={styles.sectionTitle}>Engine CC</Text>
      {vehicleTypes[vehicleType].cc.map((option) => (
        <Pressable
          key={option}
          style={[styles.optionRow, cc === option && styles.optionRowActive]}
          onPress={() => setCc(option)}
        >
          <Text style={[styles.optionText, cc === option && styles.optionTextActive]}>{option}</Text>
          <Ionicons name={cc === option ? "checkmark-circle" : "ellipse-outline"} size={22} color={cc === option ? colors.blue : "#aab7c4"} />
        </Pressable>
      ))}
      <FooterButton label="Continue" onPress={onNext} />
    </>
  );
}
