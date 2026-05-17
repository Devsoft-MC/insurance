# Insurance Mobile App

Mobile-only insurance app built with Expo and React Native.

## Product Direction

This application is a mobile-only vehicle insurance premium calculator. The client-selected
visual direction is a premium dark mobile UI with deep green surfaces, emerald accents, rounded
section cards, compact selectable options, and an invoice-style premium summary.

The app is not planned as a quote/history management system. It should calculate and display the
premium from the active configuration only. It is a premium calculator, not a customer/person data
collection flow.

## Current Scope

- Vehicle insurance premium calculator only.
- Mobile version only.
- Vehicle and policy type are the first-level choices.
- Company, cubic capacity, tenure, premium rules, add-ons, and other components must come from
  configuration data.
- Add-ons are not global. They vary by company, vehicle type, and policy type.
- No VPS or hosted database should be required.
- No saved quote or quote history feature is required.
- The calculated premium summary must be shareable through WhatsApp, email, and other available
  device share targets.

## Offline Configuration Approach

The application should work from an attached/local configuration file instead of hardcoded data.
This is important because every insurance company can have different add-ons, premium rules, and
vehicle applicability.

The agreed configuration design is shared master data plus separate company-specific rule folders.
Master files define what exists in the system. Company files define what a company offers and at
what rate.

```text
config/
  masters/
    vehicles.json
    policy-types.json
    cc-slabs.json
    tenures.json
    addons.json

  companies/
    united-india/
      company.json
      availability.json
      tp-rate-rules.json
      od-rate-rules.json
      addon-rules.json
      tax-rules.json
      export-settings.json
```

For the first build, United India Insurance is the only company. The first supported vehicles are:

```text
Two Wheeler
Private Car
Auto
```

All policy types available from the source calculator should be included for those vehicles,
including Liability Policy, Package Policy, Standalone OD, Bundled, and long-term variants where
applicable.

The initial United India rates and formulas are taken from the decompiled UIIC Vehicle Insurance APK
and are treated as final for this build. The formulas are used as reference and will be converted
into the app's own JSON/table model instead of copying the old app code. Company information should
come from the supplied Excel workbook. Advisor/profile details will be added later from a separate
advisor sheet.

Tax should use 18% as the current India insurance GST/service-tax value. The app should keep the old
APK terminology in configuration labels where relevant, such as Service Tax, Package Policy,
Liability Policy, Nil Depreciation, Consummables, BIFUEL KIT-TP, and other source terms.

The app should load a bundled default config or import a supplied config file during one-time setup.
After setup, the active config should be stored inside the installed device using local app storage.
The calculator reads from that active config and works offline.

The configuration must also include the details needed for sharing/exporting a quote. This prevents
the PDF from becoming anonymous when a customer compares quotes from different companies or
different agents/advisors.

Example relationship:

```text
selected company
+ selected vehicle type
+ selected policy type
+ selected cc slab
+ selected tenure
= base premium + applicable mandatory/optional add-ons + tax
```

Recommended export-related config fields:

```text
company display name
company branch/contact details if required
advisor/agent/person name
advisor/agent mobile number
advisor/agent email or business contact
business logo or display initials if required
PDF title and footer notes
calculation date format
currency/tax display settings
```

## UI Structure

Recommended calculator flow:

1. Select vehicle type and policy type.
2. Select company, tenure, cubic capacity, and required details.
3. Select applicable optional add-ons.
4. Review premium summary.
5. Share/export the premium summary.

One-time configuration setup should be separate from the calculator flow and more utilitarian:

- Import or activate configuration file.
- Show config version/date.
- Validate data relationships.
- Replace/reset active configuration if needed.

Settings should include configuration management. Premium tables and formulas should be updated by
importing validated config files, not by editing rates directly in normal calculator screens.

Recommended Settings configuration options:

```text
View active config
Import full config
Apply update patch
Validate config
Activate config
Reset to bundled default
```

Two import modes should be supported:

- Replace Full Config: upload a complete updated configuration package.
- Apply Update Patch: upload a small validated patch to add or change one item, such as one add-on,
  one vehicle, one rate, one policy availability rule, tax, or company details.

Patch imports must be validated before activation:

- Company must exist.
- Vehicle, policy type, tenure, add-on, and slab IDs must exist or be created by the patch.
- Required rates and formula fields must be present.
- Duplicate IDs should be rejected unless the operation is an explicit update.
- The app should summarize what the patch will change before applying it.

Growth rules:

- New company: add a new folder under `config/companies/<company-id>/`.
- New vehicle: add it once in `config/masters/vehicles.json`, add slabs if needed, then enable it in
  each company's `availability.json`.
- New add-on: add it once in `config/masters/addons.json`, then define company-specific pricing in
  `addon-rules.json`.
- New policy type or tenure: add it once in the matching master file, then add company availability
  and rate rules.

## UI Layout Rules

- Keep the client-selected premium dark mobile look.
- Use cards for major groups only, such as vehicle selection, policy details, add-ons, and summary.
- Avoid making every option a heavy card. Use compact rows inside section cards where possible.
- Use a tile grid for vehicle types.
- Show Liability Policy and Package Policy as the main policy choices.
- New / Pre-Owned selection applies only after Package Policy is selected. It is not a general
  vehicle-level question and must not appear for Liability Policy.
- Show Bundled, Standalone OD, and long-term variants only as package variants where applicable,
  especially for new vehicles.
- Liability Policy is TP-only. It should not ask for IDV or OD discount, because Basic TP is fixed
  by vehicle/CC/seating rules plus applicable TP components and tax.
- In Liability Policy, TP components should be handled like add-on options behind a `+ Addons`
  action. Basic TP remains mandatory, while optional TP components can be selected from that list.
- Inputs that belong to a specific TP component must appear only after selecting that component. For
  example, No. of passengers and Sum insured per passenger belong to PA to Unnamed Passenger and
  must not appear as general premium-detail fields.
- TP component options must preserve APK choices. For example, PA to Owner Driver for Two Wheeler
  Liability must offer `NO`, `1 YEAR`, and `5 YEARS`, with the selected option changing the amount.
- TPPD in Liability Policy must also preserve APK choices, such as `Rs 1 Lakh` and `Rs 6000`, with
  the selected option changing the premium/discount amount.
- If a selected flow has no general premium-detail inputs, skip the Details screen entirely. For
  example, Two Wheeler Liability Policy should go from policy selection directly to `+ Addons`.
- Use segmented controls for choices with only two or three options, such as tenure.
- Use list rows with radio/check controls for cubic capacity and add-ons.
- Mandatory add-ons should be locked/selected and marked with a small mandatory label.
- Optional add-ons should show name, short description, amount, and toggle/check control.
- The final premium summary should feel like a bill/invoice.
- The summary screen should be designed so it can also become a clean share/export document.
- Keep the primary continue/action button fixed near the bottom on calculator screens.
- Admin/configuration screens do not need decorative calculator styling.

## Sharing Requirement

After calculation, the user should be able to share the premium summary through WhatsApp, email, or
other available device share targets.

Recommended approach:

- Generate a clean PDF or image-style document from the premium summary.
- Include company, vehicle, policy type, tenure, cubic capacity, base premium, add-ons, tax, and
  final payable amount.
- Include the insurance company name clearly.
- Include the person/agent/advisor name or business contact who prepared/shared the premium.
- Do not require customer/person fields such as owner name, mobile number, vehicle number, or city
  in the calculator flow.
- Do not save a quote/history database unless explicitly required later.
- A temporary generated file is acceptable for sharing.
- The on-screen summary can be visually rich, while the exported version should be simpler,
  readable, and printer/share friendly.

## Run

```powershell
npm.cmd install
npm.cmd start
```

Use the Expo Go app on a phone, or run Android/iOS from the Expo developer menu.

For the current Mac setup, run Expo with the installed Node 22 path:

```bash
cd /Users/manojchendran/Downloads/insurance-app-main
EXPO_NO_TELEMETRY=1 PATH=/opt/homebrew/opt/node@22/bin:$PATH npx expo start --host lan --port 8081 --clear
```

Expo Go URL used during testing:

```text
exp://192.168.0.205:8081
```

## Current Progress

Completed so far:

- Created bundled JSON configuration under `config/`.
- Created source configuration under `/Users/manojchendran/Projects/Insurance/config`.
- Added United India Insurance company details from the supplied Excel file.
- Added master data for Two Wheeler, Private Car, and Auto.
- Added policy types, tenures, CC/seating slabs, tax rules, TP rules, OD rules, and add-on rules.
- Connected the React Native app to the JSON configuration instead of demo company data.
- Updated UI to the selected premium dark green calculator style.
- Added Expo Go launch support using Node 22.
- Updated liability terminology: `CNG/LPG TP` is now `BIFUEL KIT-TP`.

Two Wheeler Liability Policy decisions implemented:

- Liability Policy is TP-only.
- It does not ask for IDV or OD discount.
- If no general calculation input is needed, the app skips the Details screen.
- Basic TP is mandatory and shown as locked.
- TP components are opened through `+ Addons`.
- PA to Owner Driver has APK options: `NO`, `1 YEAR`, `5 YEARS`.
- TPPD has APK options: `Rs 1 Lakh`, `Rs 6000`.
- PA to Unnamed Passenger shows its own fields only after selection:
  - No. of passengers for PA
  - Sum insured per passenger

Remaining / next work:

- Continue refining Liability Policy component behavior vehicle by vehicle.
- Verify premium totals against APK sample outputs.
- Finish Package Policy flow separately.
- Add proper selectable inputs for each add-on where the APK has options.
- Add share/export summary after calculation.
