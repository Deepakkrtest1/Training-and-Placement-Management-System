# Training and Placement Management System

## Overview
This project is a college placement management system built with Node.js, Express, EJS, MySQL, and Bootstrap.

It helps three user roles work in one system:

- `TPO`: manages students, college details, company requests, and on-campus jobs
- `Company HR`: posts jobs, requests TPO approval, views applicants, and manages company details
- `Student`: updates profile, views jobs, applies for jobs, and views application status

This is a full-stack server-rendered web app:

- `Backend`: Node.js + Express
- `Frontend`: EJS templates + Bootstrap + custom CSS
- `Database`: MySQL

The current UI keeps the original project structure and routes, with light visual improvements for spacing, typography, cards, navbar styling, and responsiveness.

You do not need separate frontend and backend terminals. This project runs from one Node.js server.

## Tech Stack
- `Node.js`
- `Express.js`
- `EJS`
- `MySQL`
- `mysql2`
- `Bootstrap`
- `bcryptjs`
- `cookie-session`
- `multer`
- `read-excel-file`
- `express-validator`

## Main Features

### TPO
- Sign up and login
- View and edit TPO and college details
- Change password
- Import students from Excel
- View students from the same college
- View all companies
- Review company on-campus job requests
- Accept or reject requests
- View active on-campus jobs
- View students who applied for a specific on-campus job

### Company HR
- Sign up and login
- View and edit company profile
- Change password
- View all students
- View TPOs
- Post off-campus jobs directly
- Request TPO approval for on-campus jobs
- Edit and delete jobs
- View applicants for jobs
- View pending, accepted, and rejected requests

### Student
- Sign up and login
- View and edit student profile
- Change password
- View companies
- View TPO details after verification
- View off-campus jobs
- Apply for off-campus jobs
- View applied off-campus jobs
- View on-campus jobs
- Apply for on-campus jobs
- View applied on-campus jobs

## How the App Works
The app starts from [index.js](/d:/My%20Project/Training-and-Placement-Management-System/index.js:1). Express renders EJS pages from the `views/` folder and serves CSS from the `css/` folder. User login state is stored in cookies using `cookie-session`. Passwords are hashed with `bcryptjs`. Database access is done with `mysql2`.

## Project Structure

```text
Training-and-Placement-Management-System/
|-- css/
|   |-- company.css
|   |-- home.css
|   |-- student.css
|   |-- tpo.css
|   `-- images/
|       `-- sinjon-female.png
|-- seed/
|   |-- generatePlacementSeed.js
|   |-- placement_seed.sql
|   `-- run-seed.js
|-- uploads/
|   `-- uploaded Excel files for student import
|-- Students Data/
|   `-- sample Excel files for bulk student upload
|-- views/
|   |-- home.ejs
|   |-- partials/
|   |   |-- header.html
|   |   `-- footer.html
|   |-- tpo/
|   |-- company/
|   `-- student/
|-- database.js
|-- index.js
|-- package.json
|-- package-lock.json
|-- .gitignore
`-- README.md
```

## What Each Main File Does

### Root Files
- [index.js](/d:/My%20Project/Training-and-Placement-Management-System/index.js:1): main Express server, routes, MySQL queries, authentication flow, upload logic
- [database.js](/d:/My%20Project/Training-and-Placement-Management-System/database.js:1): MySQL connection pool configuration
- [package.json](/d:/My%20Project/Training-and-Placement-Management-System/package.json:1): project metadata, scripts, dependencies
- [README.md](/d:/My%20Project/Training-and-Placement-Management-System/README.md:1): project documentation

### CSS Folder
- [css/home.css](/d:/My%20Project/Training-and-Placement-Management-System/css/home.css:1): landing page styles
- [css/tpo.css](/d:/My%20Project/Training-and-Placement-Management-System/css/tpo.css:1): TPO pages
- [css/company.css](/d:/My%20Project/Training-and-Placement-Management-System/css/company.css:1): company pages
- [css/student.css](/d:/My%20Project/Training-and-Placement-Management-System/css/student.css:1): student pages, navbar, welcome banner, and module section styles
- [css/images/sinjon-female.png](/d:/My%20Project/Training-and-Placement-Management-System/css/images/sinjon-female.png): local avatar asset used on the home page

### Seed Folder
- [seed/generatePlacementSeed.js](/d:/My%20Project/Training-and-Placement-Management-System/seed/generatePlacementSeed.js:1): generates a MySQL-ready demo seed script
- [seed/placement_seed.sql](/d:/My%20Project/Training-and-Placement-Management-System/seed/placement_seed.sql:1): ready-to-run schema and dummy data for the `placement` database
- [seed/run-seed.js](/d:/My%20Project/Training-and-Placement-Management-System/seed/run-seed.js:1): executes the generated SQL against MySQL

### Views Folder

#### Shared Views
- [views/home.ejs](/d:/My%20Project/Training-and-Placement-Management-System/views/home.ejs:1): simple landing page with navbar, hero carousel, about section, team, and mentor
- [views/partials/header.html](/d:/My%20Project/Training-and-Placement-Management-System/views/partials/header.html:1): common HTML head section
- [views/partials/footer.html](/d:/My%20Project/Training-and-Placement-Management-System/views/partials/footer.html:1): common JS and footer section

#### TPO Views
- `views/tpo/login.ejs`: TPO login page
- `views/tpo/signup.ejs`: TPO signup page
- `views/tpo/tpohome.ejs`: TPO dashboard
- `views/tpo/viewdetailst.ejs`: TPO profile display
- `views/tpo/editdetailst.ejs`: TPO profile edit form
- `views/tpo/changepass.ejs`: TPO change password form
- `views/tpo/viewcompany.ejs`: company listing for TPO
- `views/tpo/viewstudent.ejs`: student listing for same college
- `views/tpo/editstudent.ejs`: edit student details
- `views/tpo/addstudent.ejs`: Excel upload page
- `views/tpo/viewrequest.ejs`: pending company requests
- `views/tpo/acceptrequest.ejs`: accept request form
- `views/tpo/oncampusjob.ejs`: active on-campus jobs
- `views/tpo/editonjob.ejs`: edit on-campus job dates
- `views/tpo/oncampapplied.ejs`: applicants for a job
- `views/tpo/partials/navbar.html`: TPO navigation

#### Company Views
- `views/company/login.ejs`: company login
- `views/company/signup.ejs`: company signup
- `views/company/companyhome.ejs`: company dashboard
- `views/company/viewdetailsc.ejs`: company profile display
- `views/company/editdetailsc.ejs`: company profile edit
- `views/company/changepass.ejs`: company password change
- `views/company/viewstudent.ejs`: student listing
- `views/company/viewtpo.ejs`: TPO listing
- `views/company/jobannounce.ejs`: direct off-campus job post
- `views/company/viewjob.ejs`: off-campus jobs list
- `views/company/editjob.ejs`: edit direct job
- `views/company/offcampapplied.ejs`: applicants for direct jobs
- `views/company/requesttpo.ejs`: request TPO for on-campus jobs
- `views/company/viewrequest.ejs`: pending requests
- `views/company/editrequest.ejs`: edit request
- `views/company/acceptedrequest.ejs`: accepted request list
- `views/company/editacceptedjob.ejs`: edit accepted job
- `views/company/oncampapplied.ejs`: applicants for accepted on-campus jobs
- `views/company/rejectedrequest.ejs`: rejected requests
- `views/company/partials/navbar.html`: company navigation

#### Student Views
- `views/student/login.ejs`: student login
- `views/student/signup.ejs`: student signup
- `views/student/studenthome.ejs`: student home page with welcome banner and expandable module access sections
- `views/student/viewdetailss.ejs`: student profile display
- `views/student/editdetailss.ejs`: student profile edit
- `views/student/changepass.ejs`: student password change
- `views/student/viewcompany.ejs`: company list
- `views/student/viewtpo.ejs`: TPO details
- `views/student/offcampjob.ejs`: off-campus jobs list
- `views/student/applyjoboff.ejs`: off-campus job apply page
- `views/student/appliedoffjob.ejs`: applied off-campus jobs
- `views/student/oncampjob.ejs`: on-campus jobs list
- `views/student/applyjobon.ejs`: on-campus job apply page
- `views/student/appliedonjob.ejs`: applied on-campus jobs
- `views/student/partials/navbar.html`: student navigation

## UI Notes

- The homepage uses the original carousel-based structure with cleaner spacing, softer cards, and improved typography.
- The student area keeps the original top navigation pattern:
  - `Home`
  - `Company`
  - `TPO`
  - `Profile`
- The student home page keeps the original welcome banner and expandable module list:
  - `Student Module`
  - `TPO Module`
  - `Company(HR) Module`
- The design goal is minimal and presentation-friendly rather than a complex admin dashboard.

## Database Configuration
Database connection is configured in [database.js](/d:/My%20Project/Training-and-Placement-Management-System/database.js:1).

Current local setup:

```js
host: '127.0.0.1'
port: 3306
user: 'root'
password: 'Deepak@123'
database: 'placement'
```

If your MySQL password changes, update this file before running the app.

## Database Tables Used
The app uses these MySQL tables:

### `tpo`
Stores Training and Placement Officer accounts and college profile data.

Main columns:
- `tid`
- `tname`
- `temail`
- `tpassword`
- `collegename`
- `city`
- `mobileno`
- `website`
- `nirf`
- `nacc`
- `ncte`
- `aicte`
- `ugc`

### `company`
Stores HR/company accounts and company profile details.

Main columns:
- `cid`
- `hrname`
- `cemail`
- `cpassword`
- `cname`
- `cwebsite`
- `city`
- `ctype`
- `cinfo`
- `cmobileno`
- `empl`

### `student`
Stores student login, personal details, academic details, and verification status.

Main columns:
- `sid`
- `sname`
- `semail`
- `spass`
- `collegename`
- `age`
- `city`
- `gender`
- `smobileno`
- `isverifed`
- `dname`
- `passingyear`
- `result10`
- `result12`
- `avgcgpa`
- `backlogs`

### `jobdetail`
Stores both direct company jobs and TPO-requested jobs.

Main columns:
- `jid`
- `cid`
- `place`
- `salary`
- `bondyears`
- `servagree`
- `jobtype`
- `jobinfo`
- `vacancy`
- `minavgcp`
- `minblog`
- `lastdate`
- `dateexam`
- `dateinterview`
- `college`
- `department`
- `request`
- `accepted`
- `rejected`

### `applied`
Stores student job applications and eligibility result.

Main columns:
- `aid`
- `jid`
- `cid`
- `sid`
- `iseligible`

## Login Credentials for Testing
If you imported the SQL script provided for this project, use:

- `TPO`: `tpo@demo.com` / `tpo12345`
- `HR`: `hr@demo.com` / `hr12345`
- `Student`: `student@demo.com` / `student12345`

## How to Run the Project

### 1. Install prerequisites
Install:
- Node.js
- MySQL Server
- MySQL Workbench or another MySQL client

### 2. Restore the database
Create/import the database named `placement`.

If you already pasted the SQL script into MySQL and it ran successfully, this step is done.

You can also use the included seed tools:

```bash
node seed/generatePlacementSeed.js
node seed/run-seed.js
```

### 3. Verify database connection
Open [database.js](/d:/My%20Project/Training-and-Placement-Management-System/database.js:1) and confirm:

```js
host: '127.0.0.1'
port: 3306
user: 'root'
password: 'Deepak@123'
database: 'placement'
```

### 4. Install dependencies
From the project root:

```bash
npm install
```

### 5. Start the server
Run only one terminal:

```bash
npm start
```

The app runs on:

```text
http://localhost:8000
```

## How to Test the Project

### Manual Test Checklist

#### Home Page
- Open `/`
- Confirm landing page loads
- Confirm team cards display correctly

#### TPO Flow
- Open `/tpo/login`
- Login with TPO credentials
- Open profile pages
- Edit TPO details
- Change password
- View students
- View companies
- Review request pages

#### Company Flow
- Open `/company/login`
- Login with company credentials
- Edit company profile
- Change password
- Post a direct job
- Request TPO approval for a job
- View pending and accepted jobs

#### Student Flow
- Open `/student/login`
- Login with student credentials
- Edit profile
- View companies
- View jobs
- Apply to jobs
- View applied job history

### Upload Test
TPO student import uses Excel upload.

Use the sample files in:

```text
Students Data/
```

The uploaded files are stored temporarily in:

```text
uploads/
```

## Route and API Reference
This app is server-rendered, so these are Express routes rather than JSON REST APIs. Most routes render pages, and form posts update MySQL then redirect.

### Public Routes

| Method | Route | Purpose |
|---|---|---|
| GET | `/` | Home page |
| GET | `/logout` | Clear session and logout |

### TPO Routes

| Method | Route | Purpose |
|---|---|---|
| GET | `/tpo/login` | TPO login page |
| POST | `/tpo/login` | TPO login submit |
| GET | `/tpo/signup` | TPO signup page |
| POST | `/tpo/signup` | Create TPO account |
| GET | `/tpo/changepass` | TPO change password page |
| POST | `/tpo/changepass` | Update TPO password |
| GET | `/tpo/tpohome` | TPO dashboard |
| GET | `/tpo/viewdetailst` | View TPO details |
| GET | `/tpo/editdetailst` | Edit TPO details page |
| POST | `/tpo/editdetailst` | Save TPO details |
| GET | `/tpo/viewcompany` | View companies |
| GET | `/tpo/viewstudent` | View students from same college |
| GET | `/tpo(/editstudent/:id)` | Edit student page |
| POST | `/tpo(/editstudent/:id)` | Save student edit |
| GET | `/tpo/addstudent` | Student upload page |
| POST | `/tpo/addstudent` | Upload Excel and import students |
| GET | `/tpo/viewrequest` | View company requests |
| GET | `/tpo/acceptrequest/:id` | Accept request form |
| POST | `/tpo/acceptrequest/:id` | Approve request and set dates |
| GET | `/tpo/rejectrequest/:id` | Reject request |
| GET | `/tpo/oncampusjob` | View active on-campus jobs |
| GET | `/tpo/editonjob/:id` | Edit on-campus job |
| POST | `/tpo/editonjob/:id` | Save edited on-campus job |
| GET | `/tpo/removeonjob/:id` | Remove accepted flag |
| GET | `/tpo/oncampapplied/:id` | View applicants for on-campus job |

### Company Routes

| Method | Route | Purpose |
|---|---|---|
| GET | `/company/login` | Company login page |
| POST | `/company/login` | Company login submit |
| GET | `/company/signup` | Company signup page |
| POST | `/company/signup` | Create company account |
| GET | `/company/changepass` | Company change password page |
| POST | `/company/changepass` | Update company password |
| GET | `/company/companyhome` | Company dashboard |
| GET | `/company/viewdetailsc` | View company details |
| GET | `/company/editdetailsc` | Edit company details page |
| POST | `/company/editdetailsc` | Save company details |
| GET | `/company/viewtpo` | View TPO list |
| GET | `/company/viewstudent` | View students |
| GET | `/company/jobannounce` | Direct job post page |
| POST | `/company/jobannounce` | Create direct job |
| GET | `/company/viewjob` | View direct jobs |
| GET | `/company/editjob/:id` | Edit direct job page |
| POST | `/company/editjob/:id` | Save direct job |
| GET | `/company/deletejob/:id` | Delete direct job |
| GET | `/company/offcampapplied/:id` | View applicants for direct job |
| GET | `/company/requesttpo` | Request TPO job page |
| POST | `/company/requesttpo` | Create TPO request job |
| GET | `/company/viewrequest` | View pending requests |
| GET | `/company/editrequest/:id` | Edit request page |
| POST | `/company/editrequest/:id` | Save request edit |
| GET | `/company/deleterequest/:id` | Delete request |
| GET | `/company/acceptedrequest` | View accepted requests |
| GET | `/company/editacceptedjob/:id` | Edit accepted job page |
| POST | `/company/editacceptedjob/:id` | Save accepted job |
| GET | `/company/deleteacceptedjob/:id` | Delete accepted job |
| GET | `/company/oncampapplied/:id` | View applicants for accepted job |
| GET | `/company/rejectedrequest` | View rejected requests |
| GET | `/company/deleterejectedjob/:id` | Delete rejected job |

### Student Routes

| Method | Route | Purpose |
|---|---|---|
| GET | `/student/login` | Student login page |
| POST | `/student/login` | Student login submit |
| GET | `/student/signup` | Student signup page |
| POST | `/student/signup` | Create student account |
| GET | `/student/changepass` | Student change password page |
| POST | `/student/changepass` | Update student password |
| GET | `/student/studenthome` | Student dashboard |
| GET | `/student/viewdetailss` | View student details |
| GET | `/student/editdetailss` | Edit student details page |
| POST | `/student/editdetailss` | Save student details |
| GET | `/student/viewcompany` | View companies |
| GET | `/student/viewtpo` | View TPO details |
| GET | `/student/offcampjob` | View off-campus jobs |
| GET | `/student/applyjoboff/:id` | Off-campus apply page |
| POST | `/student/applyjoboff/:id` | Apply to off-campus job |
| GET | `/student/appliedoffjob` | View off-campus applications |
| GET | `/student/oncampjob` | View on-campus jobs |
| GET | `/student/applyjobon/:id` | On-campus apply page |
| POST | `/student/applyjobon/:id` | Apply to on-campus job |
| GET | `/student/appliedonjob` | View on-campus applications |

## Important Coding Notes

### Authentication
- Session state is stored using `cookie-session`
- Passwords are hashed with `bcryptjs`
- Login compares plaintext input with hashed DB password

### Validation
- Signup routes use `express-validator`
- Duplicate email checks are done before insert

### File Upload
- Student Excel uploads use `multer`
- Excel parsing uses `read-excel-file`

### Rendering Model
- This project does not use React, Angular, or Vue
- Pages are rendered on the server with EJS templates

### Database Access
- SQL queries are written directly inside [index.js](/d:/My%20Project/Training-and-Placement-Management-System/index.js:1)
- `mysql2` pool methods are used for `SELECT`, `INSERT`, `UPDATE`, and `DELETE`

## Common Problems and Fixes

### Error: `Access denied for user 'root'@'localhost' (using password: NO)`
Cause:
- MySQL password is empty or not configured correctly

Fix:
- Open [database.js](/d:/My%20Project/Training-and-Placement-Management-System/database.js:1)
- Set the real MySQL password
- Restart the Node server

### Home page loads but login fails
Check:
- MySQL server is running
- Database name is `placement`
- Required tables exist
- `database.js` credentials are correct

### Uploaded student Excel file does not import
Check:
- File extension is `.xls` or `.xlsx`
- File has the expected 15 columns
- `uploads/` folder exists

## Clean-up Done
The following unused items were removed to keep the repo cleaner:
- duplicate `public/` app copy
- local `.firebase/` cache folder
- `pglite-debug.log`

## Suggested Next Improvements
- Move SQL queries into separate model/service files
- Add proper route-level auth middleware for each role
- Add `.env` support instead of storing DB password in code
- Add automated tests
- Add API error handling and logging
- Normalize route names such as the current TPO edit-student path

## License
This project currently has no explicit license file.
