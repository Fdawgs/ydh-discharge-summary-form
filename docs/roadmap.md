# Roadmap

## v0.11.0

### Patient Landing Page
- [ ] Add 'Recently Sent' section

#### Clinical Tab
- [ ] Add Falls Assessment check drop-down menu

#### Medication Tab
- [ ] Make drug allergy input mandatory

#### Preview Page
- [ ] Add 'Send to GP Button'

## v0.**.*

### Sitewide
- [ ] Assign suitable aria attributes to elements for accessibility purposes

### Home page
- [ ] Only show patients that require pharmacy sign off to users who are part of the 'pharmacy' user group
- [ ] Only show patients that require nurse sign off to users who are part of the 'nurse' and 'transcribe' user group
- [ ] Only show patients that require doctor sign off to users who are part of the 'doctor' user group

# Known Issues
- Date and Time input types are not supported in Internet Explorer
  - Discharge Date and Discharge Time revert to text inputs
  - Admission Date and Admission Time revert to text inputs
- OOH switching to allow discharges to be sent between 17:15 and 33:00 (Monday - Friday) without patient sign off not in place
  - Will break with BST/GMT changes