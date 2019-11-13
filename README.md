Yeovil District Hospital (YDH) - Inpatient Discharge Summary Site
==========================================
[![GitHub Release](https://img.shields.io/github/release/Fdawgs/ydh-discharge-summary-form.svg)](https://github.com/Fdawgs/ydh-discharge-summary-form/releases/latest/) [![Build Status](https://travis-ci.org/Fdawgs/ydh-discharge-summary-form.svg?branch=master)](https://travis-ci.org/Fdawgs/ydh-discharge-summary-form) [![Coverage Status](https://coveralls.io/repos/github/Fdawgs/ydh-discharge-summary-form/badge.svg?branch=master)](https://coveralls.io/github/Fdawgs/ydh-discharge-summary-form?branch=master) [![Greenkeeper badge](https://badges.greenkeeper.io/Fdawgs/ydh-discharge-summary-form.svg)](https://greenkeeper.io/)

# Intro
Yeovil District Hospital NHS Foundation Trust's intranet site 'YCloud', which is built on a dated edition of Microsoft SharePoint, hosts a large amount of files and pages used by a range of departments within the trust. Inpatient discharge summary forms are one of the many pages on the site. Unfortunately the SharePoint deployment at the trust is sporadic in its uptime.

Inpatient discharge summaries are important documents and to have them inaccessible stops patients from being discharged; the plan was to implement them as questionnaires into TrakCare, the PAS (Patient Administration System) used by the hospital, but this cannot be done until EPMA (Electronic Prescribing and Medicines Administration) functionality is integrated into the PAS. It is unknown when or if InterSystems will ever add this to TrakCare.

To ensure the longevity and security of the discharge summaries it has been decided that the forms and surrounding processes will be moved to a standalone web app.

# Prerequisites
- Windows Vista or greater; Windows Server 2008 or greater
- IIS 7 or greater with IIS Management Tools, ASP.NET, and Windows Authentication features enabled
- Latest version of [URL Rewrite](https://www.iis.net/downloads/microsoft/url-rewrite)
- Latest version of [iisnode](https://github.com/Azure/iisnode)
- Latest Current version of [Node.js](https://nodejs.org/en/)
- Latest release of [PostgreSQL DB](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads) 12

# Development
This Node.js web application has been built using the [Express framework](https://expressjs.com/), with [Embedded JavaScript](https://ejs.co/) templating providing front-end rendering.

Internet Explorer 11 is used at YDH due to legacy web applications being unable to run on anything other than IE. The site is transcompiled to be backwards compatible with IE using [Babel](https://babeljs.io/).

To make further additions in a deployment: 

1. Alter files in /src
2. Run `npm run copy` to migrate files to /dist
3. Run `npm run build` to transcompile the changes in /dist.
4. Run `iisreset` to restart the IIS instance to load the changes

# Deployment
This application is designed to be deployed on a Windows server using IIS, and has been tested on Windows 10 and Windows Server 2019.

## Setting up PostgreSQL DB
In the process of meeting the prerequisites you should have set up and deployed an instance of a PostgreSQL DB, set a super user name/password, and be able to connect to the instance.

Run the following SQL once connected to the instance to set up the database, table, and users used by the site:

```sql

CREATE DATABASE discharge
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    CONNECTION LIMIT = -1;
    
DROP TABLE IF EXISTS public.discharge_summary;

CREATE TABLE public.discharge_summary
(
    id bigserial NOT NULL,
    "lastUpdate" timestamp with time zone NOT NULL,
    "raw" json,
    version bigint,
    PRIMARY KEY (id, version) -- Composite
)
WITH (
    OIDS = FALSE
);

ALTER TABLE public.discharge_summary
    OWNER to postgres;

-- User used by site
CREATE ROLE app WITH
	LOGIN
	NOSUPERUSER
	NOCREATEDB
	NOCREATEROLE
	INHERIT
	NOREPLICATION
	CONNECTION LIMIT -1
	ENCRYPTED PASSWORD 'password';

GRANT CONNECT ON DATABASE discharge TO app;
GRANT SELECT ON TABLE discharge_summary TO app;
GRANT INSERT ON TABLE discharge_summary TO app; 

-- User used by SSIS/SSRS reporting
CREATE ROLE reporting WITH
	LOGIN
	NOSUPERUSER
	NOCREATEDB
	NOCREATEROLE
	INHERIT
	NOREPLICATION
	CONNECTION LIMIT -1
	ENCRYPTED PASSWORD 'password';	

GRANT CONNECT ON DATABASE discharge TO reporting;
GRANT SELECT ON discharge_summary TO reporting;
```

## Configuring site
Site configuration options can be found in `src/config.js` (and `dist/config.js` after transcompiling).

## Setting up site on IIS
1. Ensure all prerequisites have been met
2. Deploy this repo to its own folder in the IIS root directory (usually C:\inetpub\)
3. Navigate to the repo directory using a CLI and run `npm install` to install all node dependencies
4. Add the repo as a website within IIS
5. Navigate to IIS Manager > Home > Management > Feature Delegation
   1. Set Handler Mappings to `Read/Write`
   2. Set Authentication - Windows to `Read/Write`
6. Navigate to IIS Manager > Home > Sites > dischargesum > IIS > Authentication settings 
   1. Set Windows Authentication to `Enabled`
   2. Set Anonymous Authentication to `Disabled`
7. Run `net stop was /y & net start w3svc` to restart WAS

# FAQ
## Why is the build quality of the application so poor?

A number of challenges have reduced the robustness of this project:

- Disowned by its original project manager (and no successor appeared)
- No technical lead/architect
- No formal specification
- No documentation of how the existing discharge summary SharePoint form works
- Built rapidly under pressure from the director level after a project manager had promised it would be available before August 2019
- Only one developer in the team at the time with competing demands for time
- No front-end development experience within the Solutions Development team

As it stands, it will require significant refactoring in the future to make it viable for use long-term and to improve code quality.

## Will additional features be added? 

Due to hardships faced during its intial development as documented in the previous question, the initial release only attempts to mimic the original Inpatient Discharge Summary SharePoint form.

Any further changes or additions that need to be made after the release of v1.0.0 will require a high-quality formal specification, and oversight from a digitally fluent project manager.

A roadmap with planned future changes can be found in [docs](https://github.com/Fdawgs/ydh-discharge-summary-form/tree/master/docs/).

# License
`ydh-discharge-summary-form` is licensed under the [MIT](https://github.com/Fdawgs/ydh-discharge-summary-form/blob/master/LICENSE) license.
