# Roadmap

## v0.19.0

### Discharge Summary

#### Admission Tab
-   Autopopulate 'Admitting Ward' input from TrakCare (requires additions to YDH's FHIR Encounter Resource API)

#### Therapy and Care Arrangements Tab

-   Revise Therapy and Care Arrangements Tab with input from Therapy Lead

#### Discharge Tab

-   Add 'Paediatric Discharge Notes' fieldname and text area input that appears if a patient is under the age of 18
-   Autopopulate 'Discharging Specialty' input from TrakCare (requires additions to YDH's FHIR Encounter Resource API)
-   Autopopulate 'Discharging Ward' input from TrakCare (requires additions to YDH's FHIR Encounter Resource API)

### Patient Landing Page

-   Add 'Recently Sent' section

## v1.0.0 - Live Release

### Discharge Summary
-   Restrict editing of input fields to certain user groups (i.e. only a nurse can tick the nurse sign off boxes)

### Home page

-   Only show patients that require pharmacy sign off to users who are part of the 'pharmacy' user group
-   Only show patients that require nurse sign off to users who are part of the 'nurse' and 'transcribe' user group
-   Only show patients that require doctor sign off to users who are part of the 'doctor' user group

#### Medication Tab

-   Add OOH switches for pharmacy sign off
-   Add 'Transcribed By' item to TTOs if transcribed

## v2.0.0

### Sitewide

-   Assign suitable aria attributes to elements for accessibility purposes
-   Replace EJS and raw JavaScript with either AngularJS, ReactJS, or VueJS frameworks

# Known Issues

-   OOH switching to allow discharges to be sent between 17:15 and 33:00 (Monday - Friday) without patient sign off not in place