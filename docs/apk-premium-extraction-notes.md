# APK Premium Extraction Notes

Source APK: `/Users/manojchendran/Documents/base.apk`

App: `UIIC Vehicle Insurance`
Package: `com.rmg.indianmotorcalculator`

Decompiled source was generated under:

```text
/private/tmp/uiic_apk_extract/jadx/sources/com/rmg/indianmotorcalculator
```

## Main Calculator Classes

- `TwoWheelerclass.java`
- `Twowheelerliabilityclass.java`
- `PrivateCarclass.java`
- `PrivateCarliabilityclass.java`
- `Autoclass.java`
- `Autoliabilityclass.java`
- `Taxiclass.java`
- `Taxiliabilityclass.java`
- `Busclass.java`
- `Busliabilityclass.java`
- `DeliveryVanclass.java`
- `DeliveryVanliabilityclass.java`
- `Truckclass.java`
- `Truckliabilityclass.java`

## Private Car Liability

CC slabs:

```text
< 1000 CC
1001-1500 CC
Exceeding 1500 CC
```

Basic TP:

```text
ONE YEAR:
< 1000 CC        2094
1001-1500 CC     3416
Exceeding 1500   7897

THREE YEARS:
< 1000 CC        6521
1001-1500 CC     10640
Exceeding 1500   24596
```

Other TP components:

```text
PA owner-driver:
NO        0
1 YEAR    275
3 YEARS   705

LL paid driver:
Yes       50
No        0

LL employees:
Yes       50
No        0

CNG TP:
Yes       60
No        0

TPPD:
Rs 7.5 Lakh   discount 0
Rs 6000       discount 100
```

PA unnamed passenger:

```text
If sum insured <= 200000:
premium = (number_of_passengers * sum_insured_each / 1000) * 0.5

If sum insured = 500000:
premium = number_of_passengers * 90

If sum insured = 1000000:
premium = number_of_passengers * 180

If sum insured = 1500000:
premium = number_of_passengers * 270
```

Three-year multiplier logic:

```text
LL employees *= 3
LL paid driver *= 3
CNG TP *= 3
TPPD discount *= 3

If sum insured <= 200000:
PA unnamed passenger *= 3

If sum insured = 500000:
PA unnamed passenger = number_of_passengers * 224

If sum insured = 1000000:
PA unnamed passenger = number_of_passengers * 448

If sum insured = 1500000:
PA unnamed passenger = number_of_passengers * 672
```

Final TP formula:

```text
gross_tp =
  basic_tp
  + pa_owner_driver
  + ll_employees
  + ll_paid_driver
  + pa_unnamed_passenger
  + cng_tp
  - tppd_discount

service_tax = round(gross_tp * service_tax_rate / 100)
total = round(gross_tp + service_tax)
```

## Two Wheeler Liability

CC slabs:

```text
< 75 CC
76-150 CC
151-300 CC
301-350 CC
Exceeding 350 CC
```

Basic TP:

```text
ONE YEAR:
< 75 CC          538
76-150 CC        714
151-300 CC       1366
301-350 CC       1366
Exceeding 350    2804

FIVE YEARS:
< 75 CC          2901
76-150 CC        3851
151-300 CC       7365
301-350 CC       7365
Exceeding 350    15117
```

Other TP components:

```text
PA owner-driver:
NO        0
1 YEAR    275
5 YEARS   1100

LL paid driver:
Yes       50
No        0

LL employees:
Yes       50
No        0

TPPD:
Rs 1 Lakh   discount 0
Rs 6000     discount 50
```

PA unnamed passenger:

```text
premium = (number_of_passengers * sum_insured_each / 1000) * 0.7
```

Five-year multiplier logic:

```text
LL employees *= 5
LL paid driver *= 5
PA unnamed passenger *= 5
TPPD discount *= 5
```

Final TP formula:

```text
gross_tp =
  basic_tp
  + pa_owner_driver
  + ll_employees
  + ll_paid_driver
  + pa_unnamed_passenger
  - tppd_discount

service_tax = round(gross_tp * service_tax_rate / 100)
total = round(gross_tp + service_tax)
```

## Private Car Own Damage

Private car OD rate lookup uses:

```text
zone: Zone A / Zone B
vehicle age: <5 years, 5-10 years, >=10 years
cc: <1000, 1001-1500, >1500
```

For pre-owned / normal one-year rates:

```text
Zone B, age <5:
<1000       3.039
1001-1500   3.191
>1500       3.343

Zone A, age <5:
<1000       3.127
1001-1500   3.283
>1500       3.440

Zone B, age 5-10:
<1000       3.191
1001-1500   3.351
>1500       3.510

Zone A, age 5-10:
<1000       3.283
1001-1500   3.447
>1500       3.612

Zone B, age >=10:
<1000       3.267
1001-1500   3.430
>1500       3.594

Zone A, age >=10:
<1000       3.362
1001-1500   3.529
>1500       3.698
```

For new private car long-term:

```text
Zone B:
<1000       6.260
1001-1500   6.573
>1500       6.886

Zone A:
<1000       6.442
1001-1500   6.763
>1500       7.086
```

Private car OD formulas:

```text
idv_premium = round2((idv / 100) * basic_od_rate)
non_electrical_accessory_premium = round2((non_electrical_accessory_value / 100) * basic_od_rate)
basic_od = round2(idv_premium + non_electrical_accessory_premium)

electrical_accessory_premium =
  electrical_accessory_value * 0.0824 for new long-term
  electrical_accessory_value * 0.04 otherwise

cng_tp = 60 if CNG value > 0, else 0
cng_od =
  cng_value * 0.0824 for new long-term
  cng_value * 0.04 otherwise

od_discount_amount = basic_od * od_discount_percent / 100
```

Private car add-on formulas:

```text
EMI protect = emi_value * 0.066
Maximum EMI value = 50000

Nil depreciation:
new long-term: 21% of basic_od/accessory_od/cng_od
age 0:         10%
age 1:         20%
age 2-4:       30%
age >=5:       not allowed

Consumables:
new long-term: 0.27% of IDV
age 0:         0.10% of IDV
age 1:         0.12% of IDV
age 2:         0.15% of IDV
age 3:         0.17% of IDV
age 4:         0.20% of IDV
age >=5:       not allowed

Roadside assistance = 50 if selected

Return to invoice:
new long-term: 0.45% of (idv + non_electrical_accessory + electrical_accessory)
age 0:         0.15%
age 1:         0.20%
age 2:         0.25%
age >=3:       not allowed
```

