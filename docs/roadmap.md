# Roadmap

## v0.12.0



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