import { Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";


import { FooterButton } from "../components/FooterButton";
import { StepHeader } from "../components/StepHeader";
import { vehicleTypes } from "../constants/insurance";
import { colors, styles } from "../styles";

export function VehicleScreen({
  vehicleId,
  setVehicleType,
  vehicleCondition,
  setVehicleCondition,
  cc,
  setCc,
  policyTypeId,
  setPolicyTypeId,
  packageVariantId,
  setPackageVariantId,
  zone,
  setZone,
  zones,
  tenureId,
  setTenureId,
  onNext
}) {
  const vehicle = vehicleTypes[vehicleId];
  const mainPolicyTypes = vehicle.policyTypes.filter((option) => ["liability_policy", "package_policy"].includes(option.id));
  const packageVariants = vehicle.policyTypes.filter((option) => ["bundled", "standalone_od", "long_term"].includes(option.id));
  const isPackagePolicy = policyTypeId === "package_policy";
  const showPackageVariants = isPackagePolicy && vehicleCondition === "new" && packageVariants.length > 0;

  const chooseCondition = (condition) => {
    setVehicleCondition(condition);
    if (condition === "pre_owned" && policyTypeId !== "liability_policy") {
      setPolicyTypeId("package_policy");
    }
  };

  return (
    <>
      <StepHeader eyebrow="Step 2" title="Choose vehicle and policy" copy="Vehicle, policy, tenure, and slab choices come from the active config." />
      <View style={styles.choiceGrid}>
        {Object.keys(vehicleTypes).map((id) => {
          const active = id === vehicleId;
          return (
            <Pressable
              key={id}
              style={[styles.vehicleChoice, active && styles.vehicleChoiceActive]}
              onPress={() => setVehicleType(id)}
            >
              <Ionicons name={vehicleTypes[id].icon} size={36} color={active ? "#ffffff" : colors.emerald} />
              <Text style={[styles.vehicleChoiceText, active && styles.vehicleChoiceTextActive]}>{vehicleTypes[id].title}</Text>
            </Pressable>
          );
        })}
      </View>
      <Text style={styles.sectionTitle}>Policy Type</Text>
      {mainPolicyTypes.map((option) => (
        <Pressable
          key={option.id}
          style={[styles.optionRow, policyTypeId === option.id && styles.optionRowActive]}
          onPress={() => setPolicyTypeId(option.id)}
        >
          <View style={styles.optionBody}>
            <Text style={[styles.optionText, policyTypeId === option.id && styles.optionTextActive]}>{option.name}</Text>
            <Text style={styles.optionHint}>{option.apkLabels?.[0]}</Text>
          </View>
          <Ionicons name={policyTypeId === option.id ? "checkmark-circle" : "ellipse-outline"} size={22} color={policyTypeId === option.id ? colors.emerald : "#52635b"} />
        </Pressable>
      ))}
      {isPackagePolicy ? (
        <>
          <Text style={styles.sectionTitle}>Package Vehicle Status</Text>
          <View style={styles.segmentRow}>
            {[
              { id: "new", name: "New" },
              { id: "pre_owned", name: "Pre-Owned" }
            ].map((option) => (
              <Pressable
                key={option.id}
                style={[styles.segment, vehicleCondition === option.id && styles.segmentActive]}
                onPress={() => chooseCondition(option.id)}
              >
                <Text style={[styles.segmentText, vehicleCondition === option.id && styles.segmentTextActive]}>{option.name}</Text>
              </Pressable>
            ))}
          </View>
          <Text style={styles.sectionTitle}>Zone</Text>
          <View style={styles.segmentRow}>
            {zones.map((option) => (
              <Pressable
                key={option}
                style={[styles.segment, zone === option && styles.segmentActive]}
                onPress={() => setZone(option)}
              >
                <Text style={[styles.segmentText, zone === option && styles.segmentTextActive]}>{option}</Text>
              </Pressable>
            ))}
          </View>
        </>
      ) : null}
      {showPackageVariants ? (
        <>
          <Text style={styles.sectionTitle}>Package Variant</Text>
          {packageVariants.map((option) => (
            <Pressable
              key={option.id}
              style={[styles.optionRow, packageVariantId === option.id && styles.optionRowActive]}
              onPress={() => setPackageVariantId(option.id)}
            >
              <View style={styles.optionBody}>
                <Text style={[styles.optionText, packageVariantId === option.id && styles.optionTextActive]}>{option.name}</Text>
                <Text style={styles.optionHint}>{option.apkLabels?.[0]}</Text>
              </View>
              <Ionicons name={packageVariantId === option.id ? "checkmark-circle" : "ellipse-outline"} size={22} color={packageVariantId === option.id ? colors.emerald : "#52635b"} />
            </Pressable>
          ))}
        </>
      ) : null}
      <Text style={styles.sectionTitle}>Tenure</Text>
      <View style={styles.segmentRow}>
        {vehicle.tenures.map((option) => (
          <Pressable
            key={option.id}
            style={[styles.segment, tenureId === option.id && styles.segmentActive]}
            onPress={() => setTenureId(option.id)}
          >
            <Text style={[styles.segmentText, tenureId === option.id && styles.segmentTextActive]}>{option.name}</Text>
          </Pressable>
        ))}
      </View>
      <Text style={styles.sectionTitle}>{slabLabel(cc.slabType)}</Text>
      {vehicle.cc.map((option) => (
        <Pressable
          key={option.id}
          style={[styles.optionRow, cc.id === option.id && styles.optionRowActive]}
          onPress={() => setCc(option)}
        >
          <View style={styles.optionBody}>
            <Text style={[styles.optionText, cc.id === option.id && styles.optionTextActive]}>{option.name}</Text>
            {option.description ? <Text style={styles.optionHint}>{option.description}</Text> : null}
          </View>
          <Ionicons name={cc.id === option.id ? "checkmark-circle" : "ellipse-outline"} size={22} color={cc.id === option.id ? colors.emerald : "#52635b"} />
        </Pressable>
      ))}
      <FooterButton label="Continue" onPress={onNext} />
    </>
  );
}

function slabLabel(slabType) {
  if (slabType === "seating_capacity") {
    return "Seating Capacity";
  }
  if (slabType === "gross_vehicle_weight") {
    return "Gross Vehicle Weight";
  }
  if (slabType === "carrier_type") {
    return "Carrier Type";
  }
  return "Cubic Capacity";
}
