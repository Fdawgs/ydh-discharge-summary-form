# Roadmap

## v0.21.0

### Discharge Summary

-   Move 'Medications' tab to be after 'Clinical' tab
-   Refactor patient banner to be sticky (stay at top of page)
-   Add tab status bar to top of page under patient banner to indicate whether mandatory inputs have been filled

#### Patient Tab

-   Accommodation Type input
    -   Rename 'Warden Controlled' option to 'Sheltered/Warden Controlled'

#### Admission Tab

-   Remove 'Weight on Admission' label and associated input
-   Rename 'Admission Date' label to 'Admission Date/Time'

#### Clinical Tab

-   Reduce textarea box height by half
-   Move 'Patient's Concerns, Expectations, and Wishes' label and associated input to bottom of tab
-   Remove 'Details of Outstanding Results' label and associated input
-   Remove 'Significant Events' label and associated input
-   Remove 'Final Observations' label and associated input
-   Remove 'NEWS2 Score' label and associated input
-   Rename 'Course and Management of Condition' label to 'Clinical Summary'
-   Rename 'Significant Investigations And Procedures' label to 'Significant Investigations, Procedures, and Results'
-   Rename 'Adverse Incidents' label to 'Adverse Incidents and Complications'

#### Therapy and Care Arrangements Tab

-   Rename tab to 'Therapy and Nursing Care'
-   Add 'Equipment' section header
-   Add 'Weight on Admission' label and number input
-   Add 'Weight on Discharge' label and number input
-   Rename 'Equipment Needs' label to 'Equipment Needs (e.g. frames, dressings, continence aids, therapy equipment)'
-   Rename 'Social Care Details' label to 'Social Care Details (e.g. package of care, frequency, provider)'
-   Household Composition input
    -   Remove 'In sheltered accommodation' select option
    -   Make input mandatory

#### Discharge Tab

-   Rename 'Discharge Date' label to 'Discharge Date/Time'
-   Remove 'Weight on Discharge' label and associated input
-   Discharge Pathway input
    -   Remove 'Discharged' text from each select option
    -   Rename 'Discharge Palliative Pathway' select option to 'End of Life Pathway'
-   Discharge Destination input
    -   Remove '' select option
    -   Move 'Usual Place of Residence' to top of select input

#### Medication Tab

-   Make inputs single lined for changes

##### TTOs

-   Condense 'Dose', 'Unit', and 'Route' inputs to single line
-   Condense 'Name', 'Date', and 'Time' sign off inputs to single line
-   Remove 'Start Date' label and associated input
-   Single line name, date, time for both sign off checks
-   Add textarea input under 'Availability' if 'For Dispensing' selected as option
-   If for dispensing then make freetext box appear
-   Add 'Dispensed' tickbox and sign off inputs under 'Availablity' input
-   Remove 'Overall Pharmacy Sign Off' sign off inputs
-   Add onChange function to each input that will clear the 'Pharmacy Clinical Screen' and 'Pharmacy Final Check' sign off inputs
-   Move sign off tickbox up be in line with title section for all sign off divs

#### Sign Off Tab

##### Nurse Sign Off Section

-   Add 'Final Set of Vital Signs' label and textarea input
-   Add 'NEWS2 Score' label and number input

## v0.22.0

### Discharge Summary

-   Restrict editing of input fields to certain user groups (i.e. only a nurse can tick the nurse sign off boxes) (**QI Group: requires input as to who can edit what**)

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
