import { useMemo, useState } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import { StatusBar } from "expo-status-bar";

import { TopBar } from "./src/components/TopBar";
import { companies, initialForm, vehicleTypes } from "./src/constants/insurance";
import { AddonsScreen } from "./src/screens/AddonsScreen";
import { CompanyScreen } from "./src/screens/CompanyScreen";
import { DetailsScreen } from "./src/screens/DetailsScreen";
import { ReviewScreen } from "./src/screens/ReviewScreen";
import { VehicleScreen } from "./src/screens/VehicleScreen";
import { WelcomeScreen } from "./src/screens/WelcomeScreen";
import { styles } from "./src/styles";

const steps = ["Welcome", "Company", "Vehicle", "Details", "Addons", "Review"];

export default function App() {
  const [step, setStep] = useState("Welcome");
  const [companyId, setCompanyId] = useState(companies[0].id);
  const [vehicleType, setVehicleType] = useState("Car");
  const [cc, setCc] = useState(vehicleTypes.Car.cc[1]);
  const [form, setForm] = useState(initialForm);
  const [selectedAddons, setSelectedAddons] = useState([]);

  const company = companies.find((item) => item.id === companyId) || companies[0];
  const vehicle = vehicleTypes[vehicleType];
  const basePremium = company.base[vehicleType];
  const addonTotal = selectedAddons.reduce((sum, addon) => sum + addon.price, 0);
  const total = basePremium + addonTotal;

  const goVehicle = (type) => {
    setVehicleType(type);
    setCc(vehicleTypes[type].cc[1]);
    setSelectedAddons([]);
  };

  const toggleAddon = (addon) => {
    setSelectedAddons((current) => {
      const exists = current.some((item) => item.id === addon.id);
      return exists ? current.filter((item) => item.id !== addon.id) : [...current, addon];
    });
  };

  const removeAddon = (addonId) => {
    setSelectedAddons((current) => current.filter((item) => item.id !== addonId));
  };

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
          vehicleType={vehicleType}
          cc={cc}
          setCc={setCc}
          setVehicleType={goVehicle}
          onNext={() => setStep("Details")}
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
          onNext={() => setStep("Addons")}
        />
      );
    }

    if (step === "Addons") {
      return (
        <AddonsScreen
          company={company}
          vehicle={vehicle}
          basePremium={basePremium}
          selectedAddons={selectedAddons}
          toggleAddon={toggleAddon}
          total={total}
          onNext={() => setStep("Review")}
        />
      );
    }

    return (
      <ReviewScreen
        company={company}
        vehicleType={vehicleType}
        vehicle={vehicle}
        cc={cc}
        form={form}
        basePremium={basePremium}
        selectedAddons={selectedAddons}
        removeAddon={removeAddon}
        total={total}
        onAddMore={() => setStep("Addons")}
      />
    );
  }, [step, vehicle, companyId, vehicleType, cc, form, company, basePremium, selectedAddons, total]);

  return (
    <SafeAreaView style={styles.app}>
      <StatusBar style={step === "Welcome" ? "light" : "dark"} />
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
