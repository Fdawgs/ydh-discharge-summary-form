# Roadmap

## v0.15.0

### Discharge Summary

-   Add Safeguarding Section to a tab
    -   Add Risk to Self question
    -   Add Risk to Others question
    -   Add Risk from Others question
-   Add Mental Capacity Section to a tab
-   Add Lasting Power of Attorney Section to a tab

#### Admission Tab

-   Revise Admitting Specialty list

#### Clinical Tab

-   Revise Advanced Care Section (with input from Palliative Care Nurse Consultant)

#### Therapy and Care Arrangements Tab

-   Add Care Arrangements Section (with input from Therapy Lead)
-   Add Mobility Section
-   Add Continence Section
-   Add Dressings Section

#### Discharge Tab

-   Revise Discharge Specialty list
-   'Discharge Pathway' select input
    -   Add '' option
    -   Add 'Discharged Palliative Pathway' option
    -   Add 'Discharged Stroke Pathway' option

#### Follow-Up Tab

-   Remove 'Community Rehab Team' option from 'Follow-Up With' select input

#### Sign Off Tab

-   Remove requirement for Dr. sign off to be present before nurses can sign off the document; issue was raised that palliative care discharge without Dr. sign off

### Patient Landing Page

-   Add 'Recently Sent' section

## v1.0.0 - Live Release

### Home page

-   Only show patients that require pharmacy sign off to users who are part of the 'pharmacy' user group
-   Only show patients that require nurse sign off to users who are part of the 'nurse' and 'transcribe' user group
-   Only show patients that require doctor sign off to users who are part of the 'doctor' user group
-   Add ability to search by ward

#### Medication Tab

-   Add OOH switches for pharmacy sign off
-   Add 'Transcribed By' item to TTOs if transcribed

## v2.0.0

### Sitewide

-   Assign suitable aria attributes to elements for accessibility purposes
-   Replace EJS and raw JavaScript with either AngularJS or ReactJS frameworks

# Known Issues

-   Date and Time input types are not supported in Internet Explorer
    -   Discharge Date and Discharge Time revert to text inputs
    -   Admission Date and Admission Time revert to text inputs
-   OOH switching to allow discharges to be sent between 17:15 and 33:00 (Monday - Friday) without patient sign off not in place
    -   Will break with BST/GMT changes
