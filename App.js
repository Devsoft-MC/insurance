import { useMemo, useState } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import { StatusBar } from "expo-status-bar";

import { TopBar } from "./src/components/TopBar";
import { activeConfig, companies, initialForm, vehicleTypes, zonesByVehicle } from "./src/constants/insurance";
import { AddonsScreen } from "./src/screens/AddonsScreen";
import { CompanyScreen } from "./src/screens/CompanyScreen";
import { DetailsScreen } from "./src/screens/DetailsScreen";
import { ReviewScreen } from "./src/screens/ReviewScreen";
import { VehicleScreen } from "./src/screens/VehicleScreen";
import { WelcomeScreen } from "./src/screens/WelcomeScreen";
import { styles } from "./src/styles";
import { calculatePremium, getAvailableAddons, getLiabilityComponents } from "./src/utils/calculatePremium";

const steps = ["Welcome", "Company", "Vehicle", "Details", "Addons", "Review"];
const defaultVehicleId = Object.keys(vehicleTypes)[0];
const ownDamagePolicyIds = ["package_policy", "standalone_od", "bundled", "long_term"];
const liabilityPolicyIds = ["liability_policy", "package_policy", "bundled", "long_term"];
const binaryAddonFormFields = {
  nil_depreciation: "nilDepreciationOption",
  return_to_invoice: "returnToInvoiceOption",
  consummables: "consumablesOption",
  loss_of_key: "lossOfKeyOption",
  anti_theft: "antiTheftOption",
  automobile_association: "automobileAssociationOption"
};

export default function App() {
  const [step, setStep] = useState("Welcome");
  const [companyId, setCompanyId] = useState(companies[0].id);
  const [vehicleId, setVehicleId] = useState(defaultVehicleId);
  const [vehicleCondition, setVehicleCondition] = useState("new");
  const [policyTypeId, setPolicyTypeId] = useState("package_policy");
  const [packageVariantId, setPackageVariantId] = useState("bundled");
  const [zone, setZone] = useState(zonesByVehicle[defaultVehicleId]?.[0] || "Zone A");
  const [tenureId, setTenureId] = useState(vehicleTypes[defaultVehicleId].tenures[0].id);
  const [cc, setCc] = useState(vehicleTypes[defaultVehicleId].cc[0]);
  const [form, setForm] = useState(initialForm);
  const [selectedAddons, setSelectedAddons] = useState([]);

  const company = companies.find((item) => item.id === companyId) || companies[0];
  const vehicle = vehicleTypes[vehicleId];
  const effectivePolicyTypeId = policyTypeId === "package_policy" && vehicleCondition === "new" ? packageVariantId : policyTypeId;
  const policyType = vehicle.policyTypes.find((item) => item.id === effectivePolicyTypeId)
    || vehicle.policyTypes.find((item) => item.id === policyTypeId)
    || vehicle.policyTypes[0];
  const tenure = vehicle.tenures.find((item) => item.id === tenureId) || vehicle.tenures[0];
  const isLiabilityPolicy = effectivePolicyTypeId === "liability_policy";
  const hasOwnDamageCoverage = ownDamagePolicyIds.includes(effectivePolicyTypeId);
  const hasLiabilityCoverage = liabilityPolicyIds.includes(effectivePolicyTypeId);
  const addons = useMemo(
    () => {
      const odAddons = hasOwnDamageCoverage
        ? getAvailableAddons(activeConfig, vehicleId, form, {
          vehicleId,
          policyTypeId: effectivePolicyTypeId,
          basePolicyTypeId: policyTypeId,
          vehicleCondition,
          ccSlab: cc,
          tenureId,
          zone
        })
        : [];
      const liabilityTenureId = getLiabilityTenureId(activeConfig, {
        vehicleId,
        ccSlab: cc,
        tenureId,
        basePolicyTypeId: policyTypeId,
        vehicleCondition
      });
      const liabilityAddons = hasLiabilityCoverage
        ? getLiabilityComponents(activeConfig, { vehicleId, ccSlab: cc, tenureId: liabilityTenureId }, form)
        : [];
      return [...odAddons, ...liabilityAddons];
    },
    [hasOwnDamageCoverage, hasLiabilityCoverage, vehicleId, cc, tenureId, policyTypeId, effectivePolicyTypeId, vehicleCondition, zone, form]
  );
  const resolvedSelectedAddons = useMemo(() => {
    const selectedRows = selectedAddons.map((selected) => addons.find((addon) => addon.id === selected.id) || selected);
    const selectedIds = new Set(selectedRows.map((addon) => addon.id));
    const mandatoryRows = addons.filter((addon) => addon.mandatory && addon.id !== "basic_tp" && !selectedIds.has(addon.id));
    return [...mandatoryRows, ...selectedRows];
  }, [addons, selectedAddons]);
  const premium = useMemo(
    () => calculatePremium(
      activeConfig,
      {
        vehicleId,
        policyTypeId: effectivePolicyTypeId,
        basePolicyTypeId: policyTypeId,
        vehicleCondition,
        ccSlab: cc,
        tenureId,
        zone
      },
      form,
      resolvedSelectedAddons
    ),
    [vehicleId, effectivePolicyTypeId, policyTypeId, vehicleCondition, cc, tenureId, zone, form, resolvedSelectedAddons]
  );

  const goVehicle = (id) => {
    const nextVehicle = vehicleTypes[id];
    setVehicleId(id);
    setVehicleCondition("new");
    setPolicyTypeId("package_policy");
    setPackageVariantId(nextVehicle.policyTypes.some((item) => item.id === "bundled") ? "bundled" : "package_policy");
    setZone(zonesByVehicle[id]?.[0] || "Zone A");
    setTenureId(nextVehicle.tenures[0].id);
    setCc(nextVehicle.cc[0]);
    setSelectedAddons([]);
  };

  const toggleAddon = (addon) => {
    const formField = binaryAddonFormFields[addon.id];
    setSelectedAddons((current) => {
      const exists = current.some((item) => item.id === addon.id);
      if (formField) {
        const selectedValue = addon.id === "loss_of_key"
          ? addon.options?.find((option) => option.label !== "No")?.label || "3000"
          : "Yes";
        setForm((currentForm) => ({ ...currentForm, [formField]: exists ? "No" : selectedValue }));
      }
      if (addon.id === "voluntary_deductible") {
        const defaultValue = addon.options?.[0]?.value || addon.options?.[0]?.label || "0";
        const optionValues = addon.options?.map((option) => option.value || option.label) || [];
        setForm((currentForm) => ({
          ...currentForm,
          voluntaryDeductible: exists || !optionValues.length
            ? "0"
            : optionValues.includes(currentForm.voluntaryDeductible)
              ? currentForm.voluntaryDeductible
              : defaultValue
        }));
      }
      return exists ? current.filter((item) => item.id !== addon.id) : [...current, addon];
    });
  };

  const removeAddon = (addonId) => {
    const formField = binaryAddonFormFields[addonId];
    if (formField) {
      setForm((currentForm) => ({ ...currentForm, [formField]: "No" }));
    }
    if (addonId === "voluntary_deductible") {
      setForm((currentForm) => ({ ...currentForm, voluntaryDeductible: "0" }));
    }
    setSelectedAddons((current) => current.filter((item) => item.id !== addonId));
  };

  const needsDetailsStep = effectivePolicyTypeId !== "liability_policy" || ["auto", "taxi", "bus"].includes(vehicleId);
  const goAfterVehicle = () => setStep(needsDetailsStep ? "Details" : "Addons");

  const content = useMemo(() => {
    if (step === "Welcome") {
      return <WelcomeScreen vehicle={vehicle} onStart={() => setStep("Company")} />;
    }

    if (step === "Company") {
      return (
        <CompanyScreen
          companyId={companyId}
          setCompanyId={setCompanyId}
          onNext={() => setStep("Vehicle")}
        />
      );
    }

    if (step === "Vehicle") {
      return (
        <VehicleScreen
          vehicleId={vehicleId}
          cc={cc}
          setCc={setCc}
          setVehicleType={goVehicle}
          vehicleCondition={vehicleCondition}
          setVehicleCondition={setVehicleCondition}
          policyTypeId={policyTypeId}
          setPolicyTypeId={setPolicyTypeId}
          packageVariantId={packageVariantId}
          setPackageVariantId={setPackageVariantId}
          zone={zone}
          setZone={setZone}
          zones={zonesByVehicle[vehicleId] || []}
          tenureId={tenureId}
          setTenureId={setTenureId}
          onNext={goAfterVehicle}
        />
      );
    }

    if (step === "Details") {
      return (
        <DetailsScreen
          form={form}
          setForm={setForm}
          company={company}
          vehicle={vehicle}
          cc={cc}
          policyType={policyType}
          tenure={tenure}
          zone={zone}
          isPackagePolicy={policyTypeId === "package_policy"}
          onNext={() => setStep("Addons")}
        />
      );
    }

    if (step === "Addons") {
      return (
        <AddonsScreen
          company={company}
          vehicle={vehicle}
          policyType={policyType}
          tenure={tenure}
          premium={premium}
          addons={addons}
          isLiabilityPolicy={isLiabilityPolicy}
          form={form}
          setForm={setForm}
          selectedAddons={selectedAddons}
          toggleAddon={toggleAddon}
          onNext={() => setStep("Review")}
        />
      );
    }

    return (
      <ReviewScreen
        company={company}
        vehicleId={vehicleId}
        vehicle={vehicle}
        cc={cc}
        policyType={policyType}
        tenure={tenure}
        zone={zone}
        form={form}
        premium={premium}
        selectedAddons={resolvedSelectedAddons}
        removeAddon={removeAddon}
        onAddMore={() => setStep("Addons")}
      />
    );
  }, [step, vehicle, companyId, vehicleId, cc, vehicleCondition, policyTypeId, packageVariantId, zone, tenureId, form, company, policyType, tenure, addons, selectedAddons, premium, needsDetailsStep]);

  return (
    <SafeAreaView style={styles.app}>
      <StatusBar style="light" />
      <View style={styles.shell}>
        {step !== "Welcome" ? (
          <TopBar title={stepTitle(step)} onBack={() => setStep(previousStep(step))} />
        ) : null}
        <ScrollView
          contentContainerStyle={[styles.content, step === "Welcome" && styles.welcomeContent]}
          showsVerticalScrollIndicator={false}
        >
          {content}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

function getLiabilityTenureId(config, selection) {
  if (!(selection.basePolicyTypeId === "package_policy" && selection.vehicleCondition === "new")) {
    return selection.tenureId;
  }

  const row = config.tpRateRules.vehicles[selection.vehicleId]?.basicTpRates?.find((rate) => rate.oldApkLabel === selection.ccSlab?.name)
    || config.tpRateRules.vehicles[selection.vehicleId]?.basicTpRates?.[0];

  if (row?.five_years !== undefined) {
    return "five_years";
  }
  if (row?.three_years !== undefined) {
    return "three_years";
  }
  return selection.tenureId;
}

function previousStep(step) {
  const index = steps.indexOf(step);
  return steps[Math.max(0, index - 1)];
}

function stepTitle(step) {
  const titles = {
    Company: "Policy Company",
    Vehicle: "Vehicle",
    Details: "Details",
    Addons: "Add-ons",
    Review: "Summary"
  };
  return titles[step] || step;
}
