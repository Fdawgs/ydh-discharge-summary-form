# Roadmap

## v0.21.0

### Discharge Summary

-   Restrict editing of input fields to certain user groups (i.e. only a nurse can tick the nurse sign off boxes) (**QI Group: requires input as to who can edit what**)

#### Therapy and Care Arrangements Tab

-   Revise Therapy and Care Arrangements Tab (**QI Group: requires input**)

#### Discharge Tab

-   Add 'Paediatric Discharge Notes' fieldname and text area input that appears if a patient is under the age of 18

### Patient Landing Page

-   Add 'Recently Sent' section (requires all inputs, input restrictions, and mandatory inputs to be finalised and in place)

## v1.0.0 - Live Release

### Discharge Summary

#### Medication Tab

-   Add OOH switches for pharmacy sign off between 17:15 and 33:00 (Monday - Friday)
-   Add 'Transcribed By' item to TTOs if transcribed (requires input editing restrictions in place first)

## v2.0.0

### Sitewide

-   Assign suitable aria attributes to elements for accessibility purposes
-   Replace EJS and raw JavaScript with either AngularJS, ReactJS, or VueJS frameworks

### Home page

-   Only show patients that require pharmacy sign off to users who are part of the 'pharmacy' user group
-   Only show patients that require nurse sign off to users who are part of the 'nurse' and 'transcribe' user group
-   Only show patients that require doctor sign off to users who are part of the 'doctor' user group
