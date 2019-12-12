# Roadmap

## v0.14.0
### Discharge Summary
- Move Discharge Tab before Follow-Up Tab

#### Admission Tab
- Revise Admitting Specialty list

#### Allied Health Professionals (AHP) Tab
- Create new Allied Health Professionals Tab
- Move 'Individual Requirements' textbox input from Patient Tab to AHP Tab
- Add 'Does the patient have any equipment needs?' field name
  - Add select input with options of '', 'No', 'Yes'
  - If 'Yes' selected then present textbox input
- Add 'Does the patient have a package of care/social support?' field name
  - Add select input with options of '', 'No', 'Yes'
  - If 'Yes' selected then present textbox input
- Add 'Household Composition' field name
  - Add datalist input with options of 'Alone', 'With Friends', 'With Family', 'Live-in Carer'

#### Clinical Tab
- Add 'Final Observations' field name after the 'Adverse Incidents' field
  - Add textarea input
- Add 'NEWS2 Score' field name
  - Add number input
- Add 'Rockwood Frailty Score' field name
  - Add number input

#### Discharge Tab
- Revise Discharge Specialty list


#### Medication Tab
- Remove locking functionality of TTOs


## v0.15.0

### Discharge Summary
#### Medication Tab
- Add OOH switches for pharmacy sign off

### Patient Landing Page
- Add 'Recently Sent' section

## v1.0.0
### Home page
- Only show patients that require pharmacy sign off to users who are part of the 'pharmacy' user group
- Only show patients that require nurse sign off to users who are part of the 'nurse' and 'transcribe' user group
- Only show patients that require doctor sign off to users who are part of the 'doctor' user group

## v2.0.0

### Sitewide
- Assign suitable aria attributes to elements for accessibility purposes
- Replace EJS and raw JavaScript with either AngularJS or ReactJS frameworks

# Known Issues
- Date and Time input types are not supported in Internet Explorer
  - Discharge Date and Discharge Time revert to text inputs
  - Admission Date and Admission Time revert to text inputs
- OOH switching to allow discharges to be sent between 17:15 and 33:00 (Monday - Friday) without patient sign off not in place
  - Will break with BST/GMT changes