# Roadmap

## v0.18.0

### Discharge Summary

#### Admission Tab
-   Add 'Weight on Admission' field name
    -   Add numeric input
    
#### Clinical Tab

-   Revise Advanced Care Section (with input from Palliative Care Nurse Consultant)

#### Therapy and Care Arrangements Tab

-   Add Safeguarding section
    -   Add 'Have social services been involved in the discharge?' field name
        -   Add mandatory select input with options of '', 'No', 'Yes'
        -   If 'Yes' selected then present textbox input
    -   Add 'Was there a Deprivation of Liberty (DOL) during this admission?' field name
        -   Add mandatory select input with options of '', 'No', 'Yes'    

-   Add Care Arrangements Section (with input from Therapy Lead)
-   Add Mobility Section (with input from Therapy Lead)
-   Add Continence Section (with input from Therapy Lead)
-   Add Dressings Section (with input from Therapy Lead)

#### Discharge Tab
-   Add 'Weight on Discharge' field name
    -   Add numeric input



## v0.19.0

#### Discharge Tab
-   Add 'Paediatric Discharge Notes' fieldname and text area input that appears if a patient is under the age of 18
-   Revise Discharge Specialty list

### Patient Landing Page

-   Add 'Recently Sent' section

## v1.0.0 - Live Release

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
-   Replace EJS and raw JavaScript with either AngularJS or ReactJS frameworks

# Known Issues

-   OOH switching to allow discharges to be sent between 17:15 and 33:00 (Monday - Friday) without patient sign off not in place
    -   Will break with BST/GMT changes
