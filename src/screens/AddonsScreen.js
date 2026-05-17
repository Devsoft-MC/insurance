import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { InputField } from "../components/InputField";
import { VehicleArt } from "../components/VehicleArt";
import { colors, styles } from "../styles";
import { formatMoney } from "../utils/formatMoney";

export function AddonsScreen({ company, vehicle, policyType, tenure, premium, addons, isLiabilityPolicy, form, setForm, selectedAddons, toggleAddon, onNext }) {
  const [showAddons, setShowAddons] = useState(false);
  const twoWheelerSumInsuredOptions = Array.from({ length: 21 }, (_, index) => String(index * 10000));
  const hasLiabilityCoverage = policyType.covers?.includes("third_party");
  const hasOwnDamageCoverage = policyType.covers?.includes("own_damage");
  const visibleAddons = isLiabilityPolicy ? addons.filter((addon) => addon.category === "liability") : addons;
  const mandatoryAddons = visibleAddons.filter((addon) => addon.mandatory);
  const optionalAddons = visibleAddons.filter((addon) => !addon.mandatory);
  const rowsToShow = optionalAddons;
  const setField = (key, value) => setForm((current) => ({ ...current, [key]: value }));

  return (
    <>
      <View style={styles.upgradeHero}>
        <Text style={styles.upgradeTitle}>Add covers to your policy</Text>
        <Text style={styles.watermark}>360</Text>
        <VehicleArt vehicle={vehicle} compact />
      </View>
      <View style={styles.companyStrip}>
        <View style={[styles.logoBadge, { backgroundColor: company.color }]}>
          <Ionicons name="business" size={22} color="#ffffff" />
        </View>
        <View>
          <Text style={styles.companyName}>{company.name}</Text>
          <Text style={styles.muted}>{vehicle.title} / {policyType.name} / {tenure.name}</Text>
          {hasOwnDamageCoverage && hasLiabilityCoverage && premium.tpTenureId !== premium.odTenureId ? (
            <Text style={styles.muted}>TP {tenureLabel(premium.tpTenureId)} / OD {tenureLabel(premium.odTenureId)}</Text>
          ) : null}
          <Text style={styles.muted}>Net premium {formatMoney(premium.netPremium)}</Text>
        </View>
      </View>
      {mandatoryAddons.map((addon) => (
        <View key={addon.id} style={styles.addonRow}>
          <View style={styles.addonText}>
            <Text style={styles.addonTitle}>{addon.title}</Text>
            <Text style={styles.addonCopy}>{addon.copy}</Text>
          </View>
          <View style={[styles.addonButton, styles.addonButtonSelected]}>
            <Ionicons name="lock-closed" size={14} color="#ffffff" />
            <Text style={styles.addonPriceSelected}>{formatMoney(addon.price)}</Text>
          </View>
        </View>
      ))}
      <Pressable style={styles.footerButton} onPress={() => setShowAddons((current) => !current)}>
        <Text style={styles.footerButtonText}>{showAddons ? "Hide Addons" : "+ Addons"}</Text>
        <Ionicons name={showAddons ? "chevron-up" : "add"} size={18} color="#ffffff" />
      </Pressable>
      {showAddons && rowsToShow.map((addon) => {
        const selected = selectedAddons.some((item) => item.id === addon.id);
        const addonPriceLabel = addon.id === "od_discount"
          ? (selected ? `${form.odDiscount || "0"}%` : "Select")
          : addon.id === "no_claim_bonus"
            ? (selected ? `${form.ncbPercent || "0"}%` : "Select")
            : addon.id === "nil_depreciation" && selected
              ? formatMoney(addon.price)
            : addon.id === "return_to_invoice" && selected
                ? formatMoney(addon.price)
                : addon.id === "engine_protection" && selected
                  ? `${form.engineProtectionOption} / ${formatMoney(addon.price)}`
                  : addon.id === "consummables" && selected
                    ? formatMoney(addon.price)
                    : addon.id === "loss_of_key" && selected
                      ? formatMoney(addon.price)
            : addon.id === "anti_theft" && selected
              ? formatMoney(-premium.antiTheftDiscount)
              : addon.id === "automobile_association" && selected
                ? formatMoney(-premium.automobileAssociationDiscount)
                : addon.id === "voluntary_deductible"
                  ? (selected ? formatMoney(-premium.voluntaryDeductibleDiscount) : "Select")
                : formatMoney(addon.price);
        return (
          <View key={addon.id}>
            <View style={styles.addonRow}>
              <View style={styles.addonText}>
                <Text style={styles.addonTitle}>{addon.title}</Text>
                {addon.copy ? <Text style={styles.addonCopy}>{addon.copy}</Text> : null}
              </View>
              <Pressable
                style={[styles.addonButton, selected && styles.addonButtonSelected]}
                onPress={() => toggleAddon(addon)}
              >
                <Ionicons name={selected ? "checkmark" : "add"} size={16} color={selected ? "#ffffff" : colors.ink} />
                <Text style={[styles.addonPrice, selected && styles.addonPriceSelected]}>{addonPriceLabel}</Text>
              </Pressable>
            </View>
            {selected && addon.id === "pa_unnamed_passenger" ? (
              <View style={styles.inlineAddonFields}>
                {vehicle.id === "two_wheeler" ? (
                  <>
                    <Text style={styles.inputLabel}>No. of passengers for PA</Text>
                    <View style={styles.segmentRow}>
                      {["0", "1", "2"].map((option) => (
                        <Pressable
                          key={option}
                          style={[styles.segment, form.passengers === option && styles.segmentActive]}
                          onPress={() => setField("passengers", option)}
                        >
                          <Text style={[styles.segmentText, form.passengers === option && styles.segmentTextActive]}>{option}</Text>
                        </Pressable>
                      ))}
                    </View>
                    <Text style={styles.inputLabel}>Sum insured per passenger</Text>
                    <View style={styles.segmentRowWrap}>
                      {twoWheelerSumInsuredOptions.map((option) => (
                        <Pressable
                          key={option}
                          style={[styles.segment, styles.segmentCompact, form.sumInsuredPerPassenger === option && styles.segmentActive]}
                          onPress={() => setField("sumInsuredPerPassenger", option)}
                        >
                          <Text style={[styles.segmentText, form.sumInsuredPerPassenger === option && styles.segmentTextActive]}>{option}</Text>
                        </Pressable>
                      ))}
                    </View>
                  </>
                ) : (
                  <>
                    <InputField label="No. of passengers for PA" value={form.passengers} onChangeText={(value) => setField("passengers", value)} placeholder="0" keyboardType="numeric" />
                    <InputField label="Sum insured per passenger" value={form.sumInsuredPerPassenger} onChangeText={(value) => setField("sumInsuredPerPassenger", value)} placeholder="0" keyboardType="numeric" />
                  </>
                )}
              </View>
            ) : null}
            {selected && addon.id === "pa_owner_driver" ? (
              <View style={styles.inlineAddonFields}>
                <Text style={styles.inputLabel}>PA Owner Driver Option</Text>
                <View style={styles.segmentRow}>
                  {addon.options?.map((option) => (
                    <Pressable
                      key={option.label}
                      style={[styles.segment, form.paOwnerDriverOption === option.label && styles.segmentActive]}
                      onPress={() => setField("paOwnerDriverOption", option.label)}
                    >
                      <Text style={[styles.segmentText, form.paOwnerDriverOption === option.label && styles.segmentTextActive]}>
                        {option.label}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </View>
            ) : null}
            {selected && addon.id === "od_discount" ? (
              <View style={styles.inlineAddonFields}>
                <InputField label="OD Discount %" value={form.odDiscount} onChangeText={(value) => setField("odDiscount", value)} placeholder="0" keyboardType="numeric" />
              </View>
            ) : null}
            {selected && addon.id === "no_claim_bonus" ? (
              <View style={styles.inlineAddonFields}>
                <Text style={styles.inputLabel}>No Claim Bonus</Text>
                <View style={styles.segmentRowWrap}>
                  {addon.options?.map((option) => (
                    <Pressable
                      key={option.label}
                      style={[styles.segment, styles.segmentCompact, form.ncbPercent === option.percent && styles.segmentActive]}
                      onPress={() => setField("ncbPercent", option.percent)}
                    >
                      <Text style={[styles.segmentText, form.ncbPercent === option.percent && styles.segmentTextActive]}>
                        {option.label}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </View>
            ) : null}
            {selected && addon.id === "nil_depreciation" ? (
              null
            ) : null}
            {selected && addon.id === "return_to_invoice" ? (
              null
            ) : null}
            {selected && addon.id === "engine_protection" ? (
              <View style={styles.inlineAddonFields}>
                <Text style={styles.inputLabel}>Engine Protection</Text>
                <View style={styles.segmentRowWrap}>
                  {["Platinum", "Standard", "No"].map((option) => (
                    <Pressable
                      key={option}
                      style={[styles.segment, styles.segmentCompact, form.engineProtectionOption === option && styles.segmentActive]}
                      onPress={() => setField("engineProtectionOption", option)}
                    >
                      <Text style={[styles.segmentText, form.engineProtectionOption === option && styles.segmentTextActive]}>{option}</Text>
                    </Pressable>
                  ))}
                </View>
              </View>
            ) : null}
            {selected && addon.id === "consummables" ? (
              null
            ) : null}
            {selected && addon.id === "loss_of_key" ? (
              null
            ) : null}
            {selected && addon.id === "emi_protect" ? (
              <View style={styles.inlineAddonFields}>
                <InputField label="EMI Value" value={form.emi} onChangeText={(value) => setField("emi", value)} placeholder="0" keyboardType="numeric" />
              </View>
            ) : null}
            {selected && addon.id === "electrical_accessories" ? (
              <View style={styles.inlineAddonFields}>
                <InputField label="Electrical Accessories" value={form.electricalAccessories} onChangeText={(value) => setField("electricalAccessories", value)} placeholder="0" keyboardType="numeric" />
              </View>
            ) : null}
            {selected && addon.id === "non_electrical_accessories" ? (
              <View style={styles.inlineAddonFields}>
                <InputField label="Non-Electrical Accessories" value={form.nonElectricalAccessories} onChangeText={(value) => setField("nonElectricalAccessories", value)} placeholder="0" keyboardType="numeric" />
              </View>
            ) : null}
            {selected && addon.id === "voluntary_deductible" ? (
              <View style={styles.inlineAddonFields}>
                <Text style={styles.inputLabel}>Voluntary Deductible</Text>
                <View style={styles.segmentRowWrap}>
                  {addon.options?.map((item) => {
                    const option = item.value || item.label;
                    return (
                    <Pressable
                      key={option}
                      style={[styles.segment, styles.segmentCompact, form.voluntaryDeductible === option && styles.segmentActive]}
                      onPress={() => setField("voluntaryDeductible", option)}
                    >
                      <Text style={[styles.segmentText, form.voluntaryDeductible === option && styles.segmentTextActive]}>{option}</Text>
                    </Pressable>
                    );
                  })}
                </View>
              </View>
            ) : null}
            {selected && addon.id === "anti_theft" ? (
              null
            ) : null}
            {selected && addon.id === "automobile_association" ? (
              null
            ) : null}
            {selected && addon.id === "tppd_discount" ? (
              <View style={styles.inlineAddonFields}>
                <Text style={styles.inputLabel}>TPPD Option</Text>
                <View style={styles.segmentRow}>
                  {addon.options?.map((option) => (
                    <Pressable
                      key={option.label}
                      style={[styles.segment, form.tppdOption === option.label && styles.segmentActive]}
                      onPress={() => setField("tppdOption", option.label)}
                    >
                      <Text style={[styles.segmentText, form.tppdOption === option.label && styles.segmentTextActive]}>
                        {option.label}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </View>
            ) : null}
          </View>
        );
      })}
      <View style={styles.totalBar}>
        <View>
          <Text style={styles.totalLabel}>Current total</Text>
          <Text style={styles.totalAmount}>{formatMoney(premium.total)}</Text>
        </View>
        <Pressable style={styles.continueButton} onPress={onNext}>
          <Text style={styles.continueText}>Continue</Text>
        </Pressable>
      </View>
    </>
  );
}

function tenureLabel(tenureId) {
  const labels = {
    one_year: "1 year",
    three_years: "3 years",
    five_years: "5 years"
  };
  return labels[tenureId] || tenureId;
}
