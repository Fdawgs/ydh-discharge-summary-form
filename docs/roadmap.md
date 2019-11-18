# Roadmap

## v0.11.0

### Discharge Summary
- [X] Align tab and form colours

#### Medication Tab
- [X] Set the background-colour of 'For Dispensing' option in 'Availability' to green (Requested by )
- [ ] Add visual indication that the drug allergies textarea is mandatory

#### Sign Off Tab
- [X] Allow for the Dr confirmation box to be unticked
- [ ] Status of first and second nurse sign offs are reset when the dr confirmation box is unticked and saved

## v0.*.*

### Sitewide
- [ ] Assign suitable aria attributes to elements for accessibility purposes

### Patient Landing Page
- [ ] Add 'Recently Sent' section

### Discharge Summary 

#### Clinical Tab
- [ ] Add Falls Assessment check drop-down menu

#### Preview Page
- [ ] Add 'Send to GP Button'

### Home page
- [ ] Only show patients that require pharmacy sign off to users who are part of the 'pharmacy' user group
- [ ] Only show patients that require nurse sign off to users who are part of the 'nurse' and 'transcribe' user group
- [ ] Only show patients that require doctor sign off to users who are part of the 'doctor' user group

## v2.0.0

### Sitewide
- [ ] Replace EJS and raw JavaScript with either AngularJS or ReactJS frameworks

# Known Issues
- Date and Time input types are not supported in Internet Explorer
  - Discharge Date and Discharge Time revert to text inputs
  - Admission Date and Admission Time revert to text inputs
- OOH switching to allow discharges to be sent between 17:15 and 33:00 (Monday - Friday) without patient sign off not in place
  - Will break with BST/GMT changes