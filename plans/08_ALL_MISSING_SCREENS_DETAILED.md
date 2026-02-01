# HRM System - All 82 Missing Screens (Detailed)

## 📊 Summary
- **Total Screens:** 96
- **Implemented:** 14
- **Missing:** 82

---

## 🔴 EMPLOYEE APP - 23 Missing Screens

### 1. Onboarding Flow (4 screens)

#### Screen: `/employee/onboarding/welcome`
**Status:** NOT IMPLEMENTED
**Functionality:**
- Welcome message for new employees
- Company introduction video/image
- "Get Started" button
- Skip option for existing employees

**UI Components:**
- Full-screen hero image
- Company logo
- Welcome text: "Welcome to [Company Name]"
- Primary CTA button
- Progress indicator (Step 1 of 4)

**Data Needed:**
- Company branding assets
- Welcome message content

---

#### Screen: `/employee/onboarding/personal-info`
**Status:** NOT IMPLEMENTED
**Functionality:**
- Collect personal details
- Upload profile photo
- Add emergency contact
- Fill address information

**UI Components:**
- Form with fields:
  - Profile photo upload (drag-drop)
  - Date of birth picker
  - Gender dropdown
  - Phone number input
  - Address textarea
  - Emergency contact section (name, phone, relation)
- Save & Continue button
- Progress bar (Step 2 of 4)

**Data Needed:**
- POST /api/employee/onboarding/personal

---

#### Screen: `/employee/onboarding/documents`
**Status:** NOT IMPLEMENTED
**Functionality:**
- Upload required documents
- ID proof, address proof, education certificates
- Document preview
- Validation for required docs

**UI Components:**
- Document upload cards (5 types):
  - ID Proof (Required)
  - Address Proof (Required)
  - Education Certificates
  - Experience Letters
  - Photo ID
- Each card has:
  - Upload button
  - File name display
  - Preview thumbnail
  - Delete option
- Progress bar (Step 3 of 4)

**Data Needed:**
- POST /api/employee/documents/upload
- File storage integration

---

#### Screen: `/employee/onboarding/training`
**Status:** NOT IMPLEMENTED
**Functionality:**
- Assigned training modules
- Video tutorials
- Quiz/assessment
- Completion tracking

**UI Components:**
- Training module list:
  - Company Policies (Video - 15 min)
  - HR Procedures (Video - 10 min)
  - IT Security (Video - 20 min)
  - Quiz (5 questions)
- Progress bar per module
- Completion percentage
- Progress bar (Step 4 of 4)

**Data Needed:**
- GET /api/employee/training/modules
- POST /api/employee/training/complete

---

### 2. Helpdesk Module (3 screens)

#### Screen: `/employee/helpdesk`
**Status:** NOT IMPLEMENTED
**Functionality:**
- Helpdesk home dashboard
- Quick access to tickets
- FAQ section preview
- Contact HR button

**UI Components:**
- Stats cards:
  - Open Tickets: 2
  - Resolved: 15
  - Avg Response: 4 hours
- Recent tickets list (last 3)
- FAQ categories grid (6 categories):
  - Leave & Attendance
  - Payroll
  - Benefits
  - IT Support
  - Facilities
  - General
- "Create New Ticket" button

**Data Needed:**
- GET /api/employee/helpdesk/stats
- GET /api/employee/helpdesk/tickets

---

#### Screen: `/employee/helpdesk/tickets`
**Status:** NOT IMPLEMENTED
**Functionality:**
- List all my tickets
- Filter by status
- View ticket details
- Reply to tickets

**UI Components:**
- Filter tabs: All | Open | In Progress | Resolved
- Ticket list table:
  - Ticket ID
  - Subject
  - Category
  - Status badge
  - Created date
  - Last update
- Ticket detail view (modal/sidebar):
  - Full conversation thread
  - Attachments
  - Reply input
  - Status timeline

**Data Needed:**
- GET /api/employee/helpdesk/tickets
- POST /api/employee/helpdesk/tickets/:id/reply

---

#### Screen: `/employee/helpdesk/faq`
**Status:** NOT IMPLEMENTED
**Functionality:**
- Searchable FAQ database
- Categories
- Related questions
- Rating (helpful/not helpful)

**UI Components:**
- Search bar at top
- Category sidebar:
  - Leave & Attendance (12)
  - Payroll (8)
  - Benefits (6)
  - IT Support (15)
  - Facilities (5)
- FAQ accordion list:
  - Question (click to expand)
  - Answer with rich text
  - "Was this helpful?" buttons
  - Related questions

**Data Needed:**
- GET /api/helpdesk/faq
- GET /api/helpdesk/faq/search?q=query

---

### 3. Documents Module (3 screens)

#### Screen: `/employee/documents`
**Status:** NOT IMPLEMENTED
**Functionality:**
- View all my documents
- Download documents
- Upload new documents
- Document categories

**UI Components:**
- Category tabs: All | HR | Payroll | Personal
- Document grid/list view toggle
- Document cards:
  - Document icon (PDF, DOC, IMG)
  - Document name
  - Upload date
  - File size
  - Download button
  - Delete button (if allowed)
- Upload button (top right)

**Data Needed:**
- GET /api/employee/documents

---

#### Screen: `/employee/documents/upload`
**Status:** NOT IMPLEMENTED
**Functionality:**
- Upload new document
- Select document type
- Add description
- Drag-drop file upload

**UI Components:**
- Document type dropdown:
  - ID Proof
  - Address Proof
  - Education
  - Experience
  - Medical
  - Other
- File upload zone (drag-drop)
- Description textarea
- Upload progress bar
- Submit button

**Data Needed:**
- POST /api/employee/documents/upload

---

#### Screen: `/employee/documents/:id`
**Status:** NOT IMPLEMENTED
**Functionality:**
- View document details
- Preview document
- Download
- Share (generate link)
- View history

**UI Components:**
- Document preview (PDF viewer/image)
- Document info sidebar:
  - Name
  - Type
  - Size
  - Uploaded by
  - Upload date
  - Description
- Action buttons:
  - Download
  - Share
  - Print
  - Delete

**Data Needed:**
- GET /api/employee/documents/:id

---

### 4. Training Module (4 screens)

#### Screen: `/employee/training`
**Status:** NOT IMPLEMENTED
**Functionality:**
- Training dashboard
- Assigned courses
- Completed courses
- Certificates
- Progress overview

**UI Components:**
- Progress stats:
  - Courses in Progress: 3
  - Completed: 12
  - Certificates: 8
  - Hours Spent: 45
- "Continue Learning" section (3 courses)
- Course cards:
  - Thumbnail image
  - Course title
  - Progress bar
  - Due date
  - Continue button
- Tabs: In Progress | Completed | All

**Data Needed:**
- GET /api/employee/training/dashboard

---

#### Screen: `/employee/training/courses`
**Status:** NOT IMPLEMENTED
**Functionality:**
- Browse all available courses
- Filter by category
- Search courses
- Enroll in courses

**UI Components:**
- Search bar
- Category filter dropdown:
  - Compliance
  - Technical Skills
  - Soft Skills
  - Leadership
  - Safety
- Course grid:
  - Course image
  - Title
  - Duration
  - Rating
  - Enrolled count
  - Enroll button

**Data Needed:**
- GET /api/training/courses

---

#### Screen: `/employee/training/courses/:id`
**Status:** NOT IMPLEMENTED
**Functionality:**
- Course detail view
- Syllabus/curriculum
- Video player
- Quiz/assessment
- Progress tracking

**UI Components:**
- Video player (main area)
- Course sidebar:
  - Progress percentage
  - Module list (accordion):
    - Module 1: Introduction (10 min) ✓
    - Module 2: Core Concepts (25 min) ▶
    - Module 3: Advanced Topics (30 min) 🔒
    - Quiz (10 questions) 🔒
- Course info below video:
  - Description
  - Instructor
  - Resources (PDFs)
  - Discussion

**Data Needed:**
- GET /api/training/courses/:id
- POST /api/training/courses/:id/progress

---

#### Screen: `/employee/training/certificates`
**Status:** NOT IMPLEMENTED
**Functionality:**
- View all earned certificates
- Download certificates
- Share on LinkedIn
- Certificate details

**UI Components:**
- Certificate gallery grid
- Certificate card:
  - Certificate preview image
  - Course name
  - Completion date
  - Credential ID
  - Download button
  - Share button
- Filter by year

**Data Needed:**
- GET /api/employee/training/certificates

---

### 5. Benefits Module (3 screens)

#### Screen: `/employee/benefits`
**Status:** NOT IMPLEMENTED
**Functionality:**
- Benefits overview dashboard
- Health insurance details
- Available perks
- Claims status

**UI Components:**
- Benefits cards:
  - Health Insurance (Active)
    - Provider: Blue Cross
    - Policy #: BC123456
    - Coverage: Family
    - View Details
  - Life Insurance
  - Dental & Vision
  - 401(k)
- Perks section:
  - Gym membership
  - Learning budget
  - Wellness programs
- Claims summary: 2 Pending | 5 Approved

**Data Needed:**
- GET /api/employee/benefits

---

#### Screen: `/employee/benefits/insurance`
**Status:** NOT IMPLEMENTED
**Functionality:**
- Insurance policy details
- Coverage information
- Dependents list
- Download policy documents
- File claims

**UI Components:**
- Policy header:
  - Provider logo
  - Policy number
  - Effective date
  - Status badge
- Coverage details table:
  - Type | Coverage | Deductible
  - Medical | $500,000 | $1,000
  - Dental | $5,000 | $100
- Dependents list:
  - Name, Relation, DOB, Coverage
- Documents section
- "File a Claim" button

**Data Needed:**
- GET /api/employee/benefits/insurance

---

#### Screen: `/employee/benefits/claims`
**Status:** NOT IMPLEMENTED
**Functionality:**
- Submit new claim
- View claim history
- Track claim status
- Upload receipts

**UI Components:**
- "New Claim" button
- Claims list table:
  - Claim ID
  - Type (Medical/Dental/Vision)
  - Date
  - Amount
  - Status (Pending/Approved/Rejected)
  - Actions
- New claim form (modal):
  - Claim type dropdown
  - Date of service
  - Amount
  - Description
  - Receipt upload
  - Submit

**Data Needed:**
- GET /api/employee/benefits/claims
- POST /api/employee/benefits/claims

---

### 6. Expenses Module (3 screens)

#### Screen: `/employee/expenses`
**Status:** NOT IMPLEMENTED
**Functionality:**
- Expense dashboard
- Submit new expense
- View expense history
- Track reimbursement status

**UI Components:**
- Stats cards:
  - Pending: $450 (3 items)
  - Approved: $1,200 (5 items)
  - Reimbursed: $2,500 (12 items)
- Recent expenses list
- "Submit Expense" button
- Filter by status/month

**Data Needed:**
- GET /api/employee/expenses

---

#### Screen: `/employee/expenses/submit`
**Status:** NOT IMPLEMENTED
**Functionality:**
- Submit expense claim
- Add multiple line items
- Upload receipts
- Select expense category

**UI Components:**
- Expense form:
  - Date picker
  - Category dropdown:
    - Travel
    - Meals
    - Office Supplies
    - Training
    - Other
  - Amount input
  - Currency selector
  - Description textarea
  - Receipt upload (multiple)
- Add another item button
- Submit for approval

**Data Needed:**
- POST /api/employee/expenses

---

#### Screen: `/employee/expenses/:id`
**Status:** NOT IMPLEMENTED
**Functionality:**
- View expense details
- Receipt preview
- Approval workflow status
- Comments

**UI Components:**
- Expense header:
  - Expense ID
  - Status badge
  - Date submitted
- Expense items table:
  - Date | Category | Amount | Receipt
- Approval timeline:
  - Submitted → Manager Review → Approved → Reimbursed
- Comments section
- Receipt preview

**Data Needed:**
- GET /api/employee/expenses/:id

---

### 7. Profile Enhancements (3 screens)

#### Screen: `/employee/profile/settings`
**Status:** NOT IMPLEMENTED
**Functionality:**
- Account settings
- Change password
- Notification preferences
- Two-factor authentication
- Language preference

**UI Components:**
- Tabs: General | Security | Notifications
- General tab:
  - Language selector
  - Timezone
  - Date format
- Security tab:
  - Change password form
  - 2FA toggle
  - Active sessions list
- Notifications tab:
  - Email preferences toggles
  - In-app notification toggles
  - Push notification toggles

**Data Needed:**
- PUT /api/employee/settings

---

## 🔴 HR APP - 34 Missing Screens

### 1. Employee Directory (6 screens)

#### Screen: `/hr/employees`
**Status:** NOT IMPLEMENTED
**Functionality:**
- List all employees
- Advanced filters
- Bulk actions
- Export to CSV/Excel
- Org chart view toggle

**UI Components:**
- Search bar with filters:
  - Department dropdown
  - Designation dropdown
  - Status dropdown
  - Date range (join date)
- Action bar:
  - Add Employee button
  - Export dropdown (CSV, Excel, PDF)
  - Bulk actions (Delete, Change Status)
- Employee table:
  - Checkbox (for bulk)
  - Photo + Name
  - Employee ID
  - Department
  - Designation
  - Join Date
  - Status badge
  - Actions (View, Edit, Delete)
- Pagination

**Data Needed:**
- GET /api/hr/employees
- GET /api/hr/employees/export

---

#### Screen: `/hr/employees/create`
**Status:** NOT IMPLEMENTED
**Functionality:**
- Create new employee
- Multi-step form
- Upload documents
- Set initial leave balance
- Send welcome email

**UI Components:**
- Step indicator (4 steps):
  1. Basic Info
  2. Job Details
  3. Documents
  4. Review & Submit
- Step 1 - Basic Info:
  - First Name, Last Name
  - Email
  - Phone
  - Date of Birth
  - Gender
  - Address
- Step 2 - Job Details:
  - Employee ID
  - Department
  - Designation
  - Manager
  - Join Date
  - Employment Type
  - Salary
- Step 3 - Documents:
  - Upload ID, Address Proof
- Step 4 - Review:
  - Summary card
  - Submit button

**Data Needed:**
- POST /api/hr/employees
- GET /api/departments
- GET /api/designations

---

#### Screen: `/hr/employees/:id`
**Status:** NOT IMPLEMENTED
**Functionality:**
- Full employee profile view
- All details in tabs
- Timeline/history
- Quick actions

**UI Components:**
- Profile header:
  - Large photo
  - Name, Designation
  - Department
  - Status badge
  - Quick actions (Edit, Deactivate, Delete)
- Tab navigation:
  - Overview
  - Job Details
  - Attendance
  - Leave
  - Payroll
  - Performance
  - Documents
  - Timeline
- Overview tab:
  - Contact info
  - Emergency contact
  - Join date, Tenure
  - Manager
  - Team members

**Data Needed:**
- GET /api/hr/employees/:id

---

#### Screen: `/hr/employees/:id/edit`
**Status:** NOT IMPLEMENTED
**Functionality:**
- Edit employee details
- Change job info
- Update salary
- Transfer department

**UI Components:**
- Form sections:
  - Personal Information
  - Job Information
  - Compensation
  - Documents
- Each field editable
- Save/Cancel buttons
- Change history sidebar

**Data Needed:**
- PUT /api/hr/employees/:id

---

#### Screen: `/hr/employees/org-chart`
**Status:** NOT IMPLEMENTED
**Functionality:**
- Visual organization chart
- Hierarchical view
- Click to view employee
- Export chart

**UI Components:**
- Interactive org chart:
  - Boxes for each employee
  - Photo, Name, Title
  - Expand/collapse teams
  - Zoom in/out
  - Drag to pan
- Search to find employee
- Legend for departments (colors)

**Data Needed:**
- GET /api/hr/employees/org-chart

---

#### Screen: `/hr/employees/bulk-actions`
**Status:** NOT IMPLEMENTED
**Functionality:**
- Select multiple employees
- Bulk update
- Bulk delete
- Bulk status change
- Import from CSV

**UI Components:**
- Upload CSV area
- Column mapping
- Preview before import
- Error reporting
- Success/failure summary

**Data Needed:**
- POST /api/hr/employees/bulk-import

---

### 2. Attendance Monitoring (4 screens)

#### Screen: `/hr/attendance/monitor`
**Status:** NOT IMPLEMENTED
**Functionality:**
- Daily attendance view
- Late comers list
- Absentees list
- Real-time check-ins

**UI Components:**
- Date picker (default: today)
- Summary cards:
  - Present: 45
  - Absent: 3
  - Late: 5
  - On Leave: 7
  - WFH: 10
- Employee list:
  - Photo, Name
  - Check-in time
  - Status badge
  - Location
  - Work hours
- Filters: Department, Status

**Data Needed:**
- GET /api/hr/attendance/daily

---

#### Screen: `/hr/attendance/approvals`
**Status:** NOT IMPLEMENTED
**Functionality:**
- Pending attendance corrections
- Approve/reject requests
- View request history

**UI Components:**
- Pending requests list:
  - Employee name
  - Date
  - Requested change
  - Reason
  - Approve/Reject buttons
- Approved/Rejected tabs
- Bulk approve option

**Data Needed:**
- GET /api/hr/attendance/pending-approvals
- PUT /api/hr/attendance/approve

---

#### Screen: `/hr/attendance/reports`
**Status:** NOT IMPLEMENTED
**Functionality:**
- Generate attendance reports
- Monthly summaries
- Late coming report
- Overtime report

**UI Components:**
- Report type selector:
  - Monthly Summary
  - Late Comers
  - Absenteeism
  - Overtime
- Date range picker
- Department filter
- Generate button
- Report preview table
- Export options (PDF, Excel)

**Data Needed:**
- GET /api/hr/attendance/reports

---

#### Screen: `/hr/attendance/settings`
**Status:** NOT IMPLEMENTED
**Functionality:**
- Configure attendance policies
- Set work hours
- Define late thresholds
- Holiday calendar

**UI Components:**
- Work hours settings:
  - Start time
  - End time
  - Grace period
- Late thresholds:
  - Warning after X minutes
  - Half day after Y minutes
- Weekend configuration
- Holiday calendar upload

**Data Needed:**
- PUT /api/hr/attendance/settings

---

### 3. Leave Management (4 screens)

#### Screen: `/hr/leave/approvals`
**Status:** NOT IMPLEMENTED
**Functionality:**
- Leave approval queue
- Approve/reject requests
- Bulk actions
- View leave calendar

**UI Components:**
- Pending requests table:
  - Employee photo + name
  - Leave type
  - Date range
  - Days
  - Reason
  - Balance check
  - Approve/Reject buttons
- Filters: Type, Department, Date
- Calendar view toggle
- Bulk approve checkbox

**Data Needed:**
- GET /api/hr/leave/pending-approvals
- PUT /api/hr/leave/approve

---

#### Screen: `/hr/leave/policy`
**Status:** NOT IMPLEMENTED
**Functionality:**
- Configure leave policies
- Set leave types
- Define accrual rules
- Carry forward settings

**UI Components:**
- Leave types list:
  - Casual Leave
  - Sick Leave
  - Earned Leave
  - Maternity/Paternity
- For each type:
  - Days per year
  - Accrual method
  - Carry forward limit
  - Max accumulation
- Save policy button

**Data Needed:**
- GET /api/hr/leave/policy
- PUT /api/hr/leave/policy

---

#### Screen: `/hr/leave/calendar`
**Status:** NOT IMPLEMENTED
**Functionality:**
- Team leave calendar
- Department view
- Who's on leave today
- Plan team availability

**UI Components:**
- Monthly calendar view
- Color-coded leave types
- Employee list sidebar
- Filter by department
- Click date to see who's on leave
- Export calendar

**Data Needed:**
- GET /api/hr/leave/calendar

---

#### Screen: `/hr/leave/reports`
**Status:** NOT IMPLEMENTED
**Functionality:**
- Leave utilization reports
- Balance reports
- Leave trends
- Export data

**UI Components:**
- Report types:
  - Leave Balance Summary
  - Leave Utilization
  - Department-wise Leave
- Date range selector
- Generate report button
- Chart visualization
- Data table
- Export to Excel

**Data Needed:**
- GET /api/hr/leave/reports

---

### 4. Payroll Processing (5 screens)

#### Screen: `/hr/payroll/process`
**Status:** NOT IMPLEMENTED
**Functionality:**
- Process monthly payroll
- Calculate salaries
- Apply deductions
- Generate payslips
- Review before publish

**UI Components:**
- Month/Year selector
- Process steps:
  1. Import attendance
  2. Calculate salaries
  3. Apply deductions
  4. Review
  5. Publish
- Employee list with calculations:
  - Name
  - Basic Salary
  - Allowances
  - Deductions
  - Net Salary
  - Edit button
- Summary stats
- Process/Publish button

**Data Needed:**
- POST /api/hr/payroll/process
- GET /api/hr/payroll/preview

---

#### Screen: `/hr/payroll/payslips`
**Status:** NOT IMPLEMENTED
**Functionality:**
- View all payslips
- Generate individual payslips
- Bulk download
- Send to employees

**UI Components:**
- Month/Year filter
- Employee search
- Payslip list:
  - Employee name
  - Month/Year
  - Net salary
  - Status (Draft/Sent)
  - Actions (View, Download, Send)
- Bulk actions:
  - Download all
  - Send all
- Payslip preview modal

**Data Needed:**
- GET /api/hr/payroll/payslips
- POST /api/hr/payroll/payslips/send

---

#### Screen: `/hr/payroll/compliance`
**Status:** NOT IMPLEMENTED
**Functionality:**
- Compliance reports
- Tax reports
- PF/ESI reports
- Statutory filings

**UI Components:**
- Report types:
  - TDS Report
  - PF Report
  - ESI Report
  - Professional Tax
- Date range selector
- Generate button
- Report preview
- Export formats
- Filing status tracker

**Data Needed:**
- GET /api/hr/payroll/compliance

---

#### Screen: `/hr/payroll/history`
**Status:** NOT IMPLEMENTED
**Functionality:**
- Payroll history
- Past payslips
- Corrections log
- Audit trail

**UI Components:**
- Year selector
- Monthly payroll cards:
  - Month/Year
  - Total processed
  - Total amount
  - Status
  - View details
- Correction requests list

**Data Needed:**
- GET /api/hr/payroll/history

---

#### Screen: `/hr/payroll/settings`
**Status:** NOT IMPLEMENTED
**Functionality:**
- Payroll configuration
- Salary components
- Deduction rules
- Tax settings

**UI Components:**
- Salary structure:
  - Basic (%)
  - HRA (%)
  - Allowances
- Deductions:
  - PF settings
  - ESI settings
  - Professional tax
- Tax calculation method
- Save settings

**Data Needed:**
- PUT /api/hr/payroll/settings

---

### 5. Performance Management (5 screens)

#### Screen: `/hr/performance/cycles`
**Status:** NOT IMPLEMENTED
**Functionality:**
- Create review cycles
- Manage cycle timeline
- Assign reviewers
- Track progress

**UI Components:**
- Active cycles list:
  - Cycle name
  - Start date
  - End date
  - Status
  - Progress bar
  - Actions
- Create cycle button
- Cycle form:
  - Name
  - Description
  - Start/End dates
  - Reviewers
  - Employees

**Data Needed:**
- GET /api/hr/performance/cycles
- POST /api/hr/performance/cycles

---

#### Screen: `/hr/performance/reviews`
**Status:** NOT IMPLEMENTED
**Functionality:**
- View all performance reviews
- Filter by cycle/status
- Review details
- Calibration

**UI Components:**
- Filter: Cycle, Status, Department
- Reviews table:
  - Employee
  - Reviewer
  - Cycle
  - Overall rating
  - Status
  - Actions
- Review detail modal:
  - Ratings by criteria
  - Comments
  - Goals achievement
  - Acknowledgment status

**Data Needed:**
- GET /api/hr/performance/reviews

---

#### Screen: `/hr/performance/calibration`
**Status:** NOT IMPLEMENTED
**Functionality:**
- Calibration sessions
- Compare ratings
- Normalize scores
- Finalize ratings

**UI Components:**
- Calibration matrix:
  - Employees grid
  - Ratings distribution
  - Bell curve visualization
- Drag-drop to adjust ratings
- Comments/justification
- Finalize button

**Data Needed:**
- GET /api/hr/performance/calibration
- PUT /api/hr/performance/calibration

---

#### Screen: `/hr/performance/feedback`
**Status:** NOT IMPLEMENTED
**Functionality:**
- 360-degree feedback
- Peer reviews
- Self assessments
- Manager reviews

**UI Components:**
- Feedback requests list
- Request feedback form:
  - Select employee
  - Select reviewers
  - Due date
- Feedback status tracking
- Anonymous feedback toggle

**Data Needed:**
- GET /api/hr/performance/feedback
- POST /api/hr/performance/feedback/request

---

#### Screen: `/hr/performance/reports`
**Status:** NOT IMPLEMENTED
**Functionality:**
- Performance analytics
- Rating distribution
- Department comparison
- Export reports

**UI Components:**
- Dashboard with charts:
  - Rating distribution pie chart
  - Department comparison bar chart
  - Trend line chart
- Filter by cycle
- Export report button

**Data Needed:**
- GET /api/hr/performance/reports

---

### 6. Hiring/ATS (6 screens)

#### Screen: `/hr/hiring/jobs`
**Status:** NOT IMPLEMENTED
**Functionality:**
- List all job postings
- Create new jobs
- Edit/publish/close jobs
- View applicants count

**UI Components:**
- Job status tabs: Active | Closed | Draft
- Job cards:
  - Job title
  - Department
  - Location
  - Posted date
  - Applicants count
  - Status badge
  - Actions (Edit, Close, View)
- "Post New Job" button
- Search/filter bar

**Data Needed:**
- GET /api/hr/jobs

---

#### Screen: `/hr/hiring/jobs/create`
**Status:** NOT IMPLEMENTED
**Functionality:**
- Create job posting
- Define requirements
- Set screening questions
- Publish or save draft

**UI Components:**
- Job form:
  - Title
  - Department
  - Location
  - Employment type
  - Experience range
  - Salary range
  - Description (rich text)
  - Requirements (bullet list)
  - Responsibilities (bullet list)
  - Skills (tag input)
- Screening questions section
- Save as draft / Publish buttons

**Data Needed:**
- POST /api/hr/jobs

---

#### Screen: `/hr/hiring/jobs/:id`
**Status:** NOT IMPLEMENTED
**Functionality:**
- Job detail view
- Edit job
- View all applicants
- Pipeline view

**UI Components:**
- Job header:
  - Title
  - Status badge
  - Posted date
  - Edit button
- Job details tabs:
  - Details (description, requirements)
  - Applicants (list)
  - Pipeline (kanban board)
- Applicant pipeline stages:
  - Applied
  - Screening
  - Interview
  - Offer
  - Hired
- Drag-drop between stages

**Data Needed:**
- GET /api/hr/jobs/:id
- GET /api/hr/jobs/:id/candidates

---

#### Screen: `/hr/hiring/candidates`
**Status:** NOT IMPLEMENTED
**Functionality:**
- All candidates database
- Filter by job/status
- Search candidates
- Bulk actions

**UI Components:**
- Search bar
- Filters: Job, Status, Source, Date
- Candidate list:
  - Photo
  - Name
  - Applied for
  - Status
  - Stage
  - Score (AI ranking)
  - Date
  - Actions
- Bulk select checkbox
- Export candidates

**Data Needed:**
- GET /api/hr/candidates

---

#### Screen: `/hr/hiring/candidates/:id`
**Status:** NOT IMPLEMENTED
**Functionality:**
- Candidate profile
- Resume preview
- Interview history
- Notes/comments
- Score/rating

**UI Components:**
- Profile header:
  - Photo
  - Name
  - Current title
  - Contact info
  - Resume download
- Tabs:
  - Overview (experience, education)
  - Resume (PDF viewer)
  - Interviews (scheduled/past)
  - Notes (team comments)
  - Score (AI + manual)
- Action buttons:
  - Schedule Interview
  - Send Offer
  - Reject
  - Move to Stage

**Data Needed:**
- GET /api/hr/candidates/:id

---

#### Screen: `/hr/hiring/interviews`
**Status:** NOT IMPLEMENTED
**Functionality:**
- Interview calendar
- Schedule interviews
- View upcoming interviews
- Interview feedback

**UI Components:**
- Calendar view (week/month)
- Interview list view
- Schedule interview modal:
  - Select candidate
  - Select interviewers
  - Date/time picker
  - Duration
  - Type (Phone/Video/In-person)
  - Location/Link
- Interview cards on calendar
- Feedback form (after interview)

**Data Needed:**
- GET /api/hr/interviews
- POST /api/hr/interviews

---

### 7. Reports & Analytics (3 screens)

#### Screen: `/hr/reports/builder`
**Status:** NOT IMPLEMENTED
**Functionality:**
- Custom report builder
- Select fields
- Apply filters
- Save templates

**UI Components:**
- Report type selector:
  - Employee
  - Attendance
  - Leave
  - Payroll
  - Performance
- Field selector (drag-drop)
- Filter builder
- Preview pane
- Save template
- Export options

**Data Needed:**
- POST /api/hr/reports/build

---

#### Screen: `/hr/reports/analytics`
**Status:** NOT IMPLEMENTED
**Functionality:**
- HR analytics dashboard
- Key metrics
- Trends
- Visualizations

**UI Components:**
- Metrics cards:
  - Headcount
  - Attrition rate
  - Avg tenure
  - Time to hire
- Charts:
  - Headcount trend
  - Department distribution
  - Gender diversity
  - Age distribution
- Date range filter
- Export dashboard

**Data Needed:**
- GET /api/hr/analytics

---

#### Screen: `/hr/reports/exports`
**Status:** NOT IMPLEMENTED
**Functionality:**
- Data export center
- Scheduled exports
- Download history

**UI Components:**
- Export templates list
- Create new export:
  - Select data type
  - Select format (CSV, Excel, PDF)
  - Schedule (one-time/recurring)
- Download history table
- File storage usage

**Data Needed:**
- GET /api/hr/exports
- POST /api/hr/exports

---

## 🔴 ADMIN APP - 25 Missing Screens

### 1. System Management (3 screens)

#### Screen: `/admin/system/health`
**Status:** NOT IMPLEMENTED
**Functionality:**
- System health monitoring
- Server metrics
- Database status
- Error logs

**UI Components:**
- Health status cards:
  - API Status: Healthy
  - Database: Connected
  - Storage: 45% used
  - Memory: 60% used
- Real-time metrics graphs:
  - CPU usage
  - Memory usage
  - Response times
  - Error rates
- Recent errors list
- Alert configuration

**Data Needed:**
- GET /api/admin/system/health

---

#### Screen: `/admin/system/performance`
**Status:** NOT IMPLEMENTED
**Functionality:**
- Performance monitoring
- Slow queries
- API response times
- Optimization suggestions

**UI Components:**
- Performance metrics:
  - Avg response time
  - 95th percentile
  - Error rate
  - Throughput
- Slowest endpoints list
- Database query analysis
- Cache hit rates
- Optimization recommendations

**Data Needed:**
- GET /api/admin/system/performance

---

#### Screen: `/admin/system/settings`
**Status:** NOT IMPLEMENTED
**Functionality:**
- System configuration
- Company settings
- Email settings
- Integration settings

**UI Components:**
- Tabs: General | Email | Integrations | Security
- General:
  - Company name
  - Logo upload
  - Timezone
  - Date format
- Email:
  - SMTP settings
  - From email
  - Templates
- Integrations:
  - API keys
  - Webhook URLs

**Data Needed:**
- GET /api/admin/settings
- PUT /api/admin/settings

---

### 2. Role & Permission Management (4 screens)

#### Screen: `/admin/roles`
**Status:** NOT IMPLEMENTED
**Functionality:**
- List all roles
- Create/edit roles
- Assign permissions
- View role usage

**UI Components:**
- Roles grid:
  - Role name
  - Description
  - Permission count
  - User count
  - Actions (Edit, Delete)
- "Create Role" button
- Default roles badge

**Data Needed:**
- GET /api/admin/roles

---

#### Screen: `/admin/roles/create`
**Status:** NOT IMPLEMENTED
**Functionality:**
- Create new role
- Define permissions
- Set as default

**UI Components:**
- Role form:
  - Name
  - Description
  - Is default toggle
- Permission matrix:
  - Module: Employees
    - View (checkbox)
    - Create (checkbox)
    - Edit (checkbox)
    - Delete (checkbox)
  - Module: Payroll
    - View
    - Process
  - (etc. for all modules)
- Save button

**Data Needed:**
- POST /api/admin/roles

---

#### Screen: `/admin/roles/:id`
**Status:** NOT IMPLEMENTED
**Functionality:**
- Edit role
- View assigned users
- Clone role

**UI Components:**
- Edit form (same as create)
- Users with this role list
- Clone button
- Delete button (if not default)

**Data Needed:**
- PUT /api/admin/roles/:id

---

#### Screen: `/admin/roles/permissions`
**Status:** NOT IMPLEMENTED
**Functionality:**
- Permission matrix view
- Bulk edit permissions
- Compare roles

**UI Components:**
- Matrix table:
  - Rows: All permissions
  - Columns: Roles
  - Cells: Checkboxes
- Filter by module
- Save changes button

**Data Needed:**
- GET /api/admin/permissions
- PUT /api/admin/permissions

---

### 3. Organization Structure (4 screens)

#### Screen: `/admin/structure/departments`
**Status:** NOT IMPLEMENTED
**Functionality:**
- Manage departments
- Hierarchical structure
- Assign heads
- Move employees

**UI Components:**
- Department tree:
  - Engineering
    - Frontend
    - Backend
    - DevOps
  - Marketing
    - Digital
    - Content
- Add department button
- Edit department modal:
  - Name
  - Parent department
  - Department head
  - Description
- Drag-drop to reorder

**Data Needed:**
- GET /api/admin/departments
- POST /api/admin/departments

---

#### Screen: `/admin/structure/designations`
**Status:** NOT IMPLEMENTED
**Functionality:**
- Manage job titles
- Define levels
- Set career paths

**UI Components:**
- Designations list:
  - Title
  - Level
  - Department
  - Employee count
- Add designation form:
  - Title
  - Level (1-10)
  - Department
  - Description
  - Responsibilities

**Data Needed:**
- GET /api/admin/designations
- POST /api/admin/designations

---

#### Screen: `/admin/structure/locations`
**Status:** NOT IMPLEMENTED
**Functionality:**
- Manage office locations
- Address details
- Timezone settings

**UI Components:**
- Locations map/list
- Location cards:
  - Office name
  - Address
  - City, Country
  - Timezone
  - Employee count
- Add location form

**Data Needed:**
- GET /api/admin/locations
- POST /api/admin/locations

---

#### Screen: `/admin/structure/hierarchy`
**Status:** NOT IMPLEMENTED
**Functionality:**
- Organization hierarchy
- Reporting structure
- Matrix organization
- Export org chart

**UI Components:**
- Interactive org chart
- Zoom/pan controls
- Search employee
- Export (PDF, PNG)
- Edit reporting lines

**Data Needed:**
- GET /api/admin/hierarchy

---

### 4. Workflow Automation (3 screens)

#### Screen: `/admin/automation/workflows`
**Status:** NOT IMPLEMENTED
**Functionality:**
- Approval workflows
- Automated rules
- Notification triggers

**UI Components:**
- Workflow list:
  - Name
  - Trigger
  - Status
  - Last run
- Workflow builder canvas:
  - Trigger nodes
  - Condition nodes
  - Action nodes
  - Connect with lines
- Templates gallery

**Data Needed:**
- GET /api/admin/workflows
- POST /api/admin/workflows

---

#### Screen: `/admin/automation/rules`
**Status:** NOT IMPLEMENTED
**Functionality:**
- Business rules
- Auto-assignments
- Escalation rules

**UI Components:**
- Rules table:
  - Rule name
  - Condition
  - Action
  - Status
- Rule builder:
  - IF condition (dropdown)
  - THEN action (dropdown)
  - Priority level

**Data Needed:**
- GET /api/admin/rules
- POST /api/admin/rules

---

#### Screen: `/admin/automation/templates`
**Status:** NOT IMPLEMENTED
**Functionality:**
- Email templates
- Notification templates
- Document templates

**UI Components:**
- Template categories:
  - Email
  - SMS
  - Push
  - Documents
- Template editor:
  - Subject line
  - Rich text editor
  - Variable placeholders
  - Preview

**Data Needed:**
- GET /api/admin/templates
- POST /api/admin/templates

---

### 5. Integrations (3 screens)

#### Screen: `/admin/integrations/apis`
**Status:** NOT IMPLEMENTED
**Functionality:**
- API key management
- Rate limits
- Usage analytics

**UI Components:**
- API keys list:
  - Key name
  - Created date
  - Last used
  - Status
- Generate new key button
- Key details:
  - Full key (hidden)
  - Copy button
  - Regenerate
  - Revoke
- Usage chart

**Data Needed:**
- GET /api/admin/api-keys
- POST /api/admin/api-keys

---

#### Screen: `/admin/integrations/webhooks`
**Status:** NOT IMPLEMENTED
**Functionality:**
- Webhook configuration
- Event subscriptions
- Delivery logs

**UI Components:**
- Webhooks list:
  - Name
  - URL
  - Events
  - Status
- Add webhook form:
  - Name
  - Endpoint URL
  - Events to subscribe
  - Secret key
- Delivery logs:
  - Timestamp
  - Event
  - Status
  - Retry count

**Data Needed:**
- GET /api/admin/webhooks
- POST /api/admin/webhooks

---

#### Screen: `/admin/integrations/third-party`
**Status:** NOT IMPLEMENTED
**Functionality:**
- Third-party integrations
- Connect services
- Sync settings

**UI Components:**
- Integration cards:
  - Slack (Connect/Connected)
  - Google Calendar
  - Zoom
  - Dropbox
  - SAP/Oracle
- Each card shows:
  - Logo
  - Description
  - Status
  - Configure button

**Data Needed:**
- GET /api/admin/integrations
- POST /api/admin/integrations/connect

---

### 6. AI Configuration (3 screens)

#### Screen: `/admin/ai/models`
**Status:** NOT IMPLEMENTED
**Functionality:**
- AI model settings
- Feature toggles
- Performance tuning

**UI Components:**
- AI features list:
  - Attrition Prediction (toggle)
  - Resume Ranking (toggle)
  - Chatbot (toggle)
- Model settings:
  - Confidence threshold
  - Training frequency
  - Data retention
- Feature usage stats

**Data Needed:**
- GET /api/admin/ai/settings
- PUT /api/admin/ai/settings

---

#### Screen: `/admin/ai/training`
**Status:** NOT IMPLEMENTED
**Functionality:**
- Training data management
- Model retraining
- Accuracy metrics

**UI Components:**
- Training jobs list:
  - Model name
  - Status
  - Accuracy
  - Last trained
- Upload training data
- Retrain button
- Accuracy over time chart

**Data Needed:**
- GET /api/admin/ai/training
- POST /api/admin/ai/training

---

#### Screen: `/admin/ai/prompts`
**Status:** NOT IMPLEMENTED
**Functionality:**
- Chatbot prompt editing
- Response templates
- Tone settings

**UI Components:**
- Prompt editor:
  - System prompt textarea
  - Response templates
  - Tone selector (Professional, Friendly, etc.)
- Test chat window
- Save changes

**Data Needed:**
- GET /api/admin/ai/prompts
- PUT /api/admin/ai/prompts

---

### 7. Security & Compliance (5 screens)

#### Screen: `/admin/security/audit-logs`
**Status:** NOT IMPLEMENTED
**Functionality:**
- System audit trail
- User activity logs
- Data access logs
- Export logs

**UI Components:**
- Filter bar:
  - Date range
  - User
  - Action type
  - Entity
- Audit log table:
  - Timestamp
  - User
  - Action
  - Entity
  - IP Address
  - Details
- Export to CSV
- Retention settings

**Data Needed:**
- GET /api/admin/audit-logs

---

#### Screen: `/admin/security/access-logs`
**Status:** NOT IMPLEMENTED
**Functionality:**
- Login history
- Failed attempts
- Session management
- IP tracking

**UI Components:**
- Login attempts chart
- Access log table:
  - User
  - Login time
  - IP address
  - Device
  - Status (Success/Failed)
- Block IP button
- Session list with revoke

**Data Needed:**
- GET /api/admin/access-logs

---

#### Screen: `/admin/security/settings`
**Status:** NOT IMPLEMENTED
**Functionality:**
- Security policies
- Password rules
- 2FA enforcement
- Session timeout

**UI Components:**
- Password policy:
  - Min length
  - Complexity requirements
  - Expiration days
- 2FA settings:
  - Optional/Required
  - Methods (SMS, App, Email)
- Session settings:
  - Timeout duration
  - Concurrent sessions limit
- Save settings

**Data Needed:**
- GET /api/admin/security/settings
- PUT /api/admin/security/settings

---

#### Screen: `/admin/security/compliance`
**Status:** NOT IMPLEMENTED
**Functionality:**
- Compliance dashboard
- GDPR tools
- Data retention
- Privacy settings

**UI Components:**
- Compliance status:
  - GDPR: Compliant
  - SOC 2: In Progress
  - ISO 27001: Certified
- GDPR tools:
  - Data export request
  - Data deletion request
  - Consent management
- Data retention policies

**Data Needed:**
- GET /api/admin/compliance

---

#### Screen: `/admin/security/backup`
**Status:** NOT IMPLEMENTED
**Functionality:**
- Backup management
- Restore data
- Schedule backups
- Download backups

**UI Components:**
- Backup status:
  - Last backup: 2 hours ago
  - Next scheduled: Tonight
  - Storage used: 45GB
- Backup history list:
  - Date
  - Size
  - Status
  - Actions (Download, Restore)
- Schedule settings:
  - Frequency
  - Retention period
  - Manual backup button

**Data Needed:**
- GET /api/admin/backups
- POST /api/admin/backups

---

## 📊 Summary Table

| App | Implemented | Missing | Total |
|-----|-------------|---------|-------|
| Employee | 11 | 23 | 34 |
| HR | 2 | 34 | 36 |
| Admin | 1 | 25 | 26 |
| **Total** | **14** | **82** | **96** |

---

*Document Version: 1.0*
*Last Updated: February 2026*
    - Create (checkbox)
    - Edit (checkbox)
    - Delete (checkbox)
  - Module: Payroll
    - View
    - Process
  - (etc. for all modules)
- Save button

**Data Needed:**
- POST /api/admin/roles

---

#### Screen: `/admin/roles/:id`
**Status:** NOT IMPLEMENTED
**Functionality:**
- Edit role
- View assigned users
- Clone role

**UI Components:**
- Edit form (same as create)
- Users with this role list
- Clone button
- Delete button (if not default)

**Data Needed:**
- PUT /api/admin/roles/:id

---

#### Screen: `/admin/roles/permissions`
**Status:** NOT IMPLEMENTED
**Functionality:**
- Permission matrix view
- Bulk edit permissions
- Compare roles

**UI Components:**
- Matrix table:
  - Rows: All permissions
  - Columns: Roles
  - Cells: Checkboxes
- Filter by module
- Save changes button

**Data Needed:**
- GET /api/admin/permissions
- PUT /api/admin/permissions

---

### 3. Organization Structure (4 screens)

#### Screen: `/admin/structure/departments`
**Status:** NOT IMPLEMENTED
**Functionality:**
- Manage departments
- Hierarchical structure
- Assign heads
- Move employees

**UI Components:**
- Department tree:
  - Engineering
    - Frontend
    - Backend
    - DevOps
  - Marketing
    - Digital
    - Content
- Add department button
- Edit department modal:
  - Name
  - Parent department
  - Department head
  - Description
- Drag-drop to reorder

**Data Needed:**
- GET /api/admin/departments
- POST /api/admin/departments

---

#### Screen: `/admin/structure/designations`
**Status:** NOT IMPLEMENTED
**Functionality:**
- Manage job titles
- Define levels
- Set career paths

**UI Components:**
- Designations list:
  - Title
  - Level
  - Department
  - Employee count
- Add designation form:
  - Title
  - Level (1-10)
  - Department
  - Description
  - Responsibilities

**Data Needed:**
- GET /api/admin/designations
- POST /api/admin/designations

---

#### Screen: `/admin/structure/locations`
**Status:** NOT IMPLEMENTED
**Functionality:**
- Manage office locations
- Address details
- Timezone settings

**UI Components:**
- Locations map/list
- Location cards:
  - Office name
  - Address
  - City, Country
  - Timezone
  - Employee count
- Add location form

**Data Needed:**
- GET /api/admin/locations
- POST /api/admin/locations

---

#### Screen: `/admin/structure/hierarchy`
**Status:** NOT IMPLEMENTED
**Functionality:**
- Organization hierarchy
- Reporting structure
- Matrix organization
- Export org chart

**UI Components:**
- Interactive org chart
- Zoom/pan controls
- Search employee
- Export (PDF, PNG)
- Edit reporting lines

**Data Needed:**
- GET /api/admin/hierarchy

---

### 4. Workflow Automation (3 screens)

#### Screen: `/admin/automation/workflows`
**Status:** NOT IMPLEMENTED
**Functionality:**
- Approval workflows
- Automated rules
- Notification triggers

**UI Components:**
- Workflow list:
  - Name
  - Trigger
  - Status
  - Last run
- Workflow builder canvas:
  - Trigger nodes
  - Condition nodes
  - Action nodes
  - Connect with lines
- Templates gallery

**Data Needed:**
- GET /api/admin/workflows
- POST /api/admin/workflows

---

#### Screen: `/admin/automation/rules`
**Status:** NOT IMPLEMENTED
**Functionality:**
- Business rules
- Auto-assignments
- Escalation rules

**UI Components:**
- Rules table:
  - Rule name
  - Condition
  - Action
  - Status
- Rule builder:
  - IF condition (dropdown)
  - THEN action (dropdown)
  - Priority level

**Data Needed:**
- GET /api/admin/rules
- POST /api/admin/rules

---

#### Screen: `/admin/automation/templates`
**Status:** NOT IMPLEMENTED
**Functionality:**
- Email templates
- Notification templates
- Document templates

**UI Components:**
- Template categories:
  - Email
  - SMS
  - Push
  - Documents
- Template editor:
  - Subject line
  - Rich text editor
  - Variable placeholders
  - Preview

**Data Needed:**
- GET /api/admin/templates
- POST /api/admin/templates

---

### 5. Integrations (3 screens)

#### Screen: `/admin/integrations/apis`
**Status:** NOT IMPLEMENTED
**Functionality:**
- API key management
- Rate limits
- Usage analytics

**UI Components:**
- API keys list:
  - Key name
  - Created date
  - Last used
  - Status
- Generate new key button
- Key details:
  - Full key (hidden)
  - Copy button
  - Regenerate
  - Revoke
- Usage chart

**Data Needed:**
- GET /api/admin/api-keys
- POST /api/admin/api-keys

---

#### Screen: `/admin/integrations/webhooks`
**Status:** NOT IMPLEMENTED
**Functionality:**
- Webhook configuration
- Event subscriptions
- Delivery logs

**UI Components:**
- Webhooks list:
  - Name
  - URL
  - Events
  - Status
- Add webhook form:
  - Name
  - Endpoint URL
  - Events to subscribe
  - Secret key
- Delivery logs:
  - Timestamp
  - Event
  - Status
  - Retry count

**Data Needed:**
- GET /api/admin/webhooks
- POST /api/admin/webhooks

---

#### Screen: `/admin/integrations/third-party`
**Status:** NOT IMPLEMENTED
**Functionality:**
- Third-party integrations
- Connect services
- Sync settings

**UI Components:**
- Integration cards:
  - Slack (Connect/Connected)
  - Google Calendar
  - Zoom
  - Dropbox
  - SAP/Oracle
- Each card shows:
  - Logo
  - Description
  - Status
  - Configure button

**Data Needed:**
- GET /api/admin/integrations
- POST /api/admin/integrations/connect

---

### 6. AI Configuration (3 screens)

#### Screen: `/admin/ai/models`
**Status:** NOT IMPLEMENTED
**Functionality:**
- AI model settings
- Feature toggles
- Performance tuning

**UI Components:**
- AI features list:
  - Attrition Prediction (toggle)
  - Resume Ranking (toggle)
  - Chatbot (toggle)
- Model settings:
  - Confidence threshold
  - Training frequency
  - Data retention
- Feature usage stats

**Data Needed:**
- GET /api/admin/ai/settings
- PUT /api/admin/ai/settings

---

#### Screen: `/admin/ai/training`
**Status:** NOT IMPLEMENTED
**Functionality:**
- Training data management
- Model retraining
- Accuracy metrics

**UI Components:**
- Training jobs list:
  - Model name
  - Status
  - Accuracy
  - Last trained
- Upload training data
- Retrain button
- Accuracy over time chart

**Data Needed:**
- GET /api/admin/ai/training
- POST /api/admin/ai/training

---

#### Screen: `/admin/ai/prompts`
**Status:** NOT IMPLEMENTED
**Functionality:**
- Chatbot prompt editing
- Response templates
- Tone settings

**UI Components:**
- Prompt editor:
  - System prompt textarea
  - Response templates
  - Tone selector (Professional, Friendly, etc.)
- Test chat window
- Save changes

**Data Needed:**
- GET /api/admin/ai/prompts
- PUT /api/admin/ai/prompts

---

### 7. Security & Compliance (5 screens)

#### Screen: `/admin/security/audit-logs`
**Status:** NOT IMPLEMENTED
**Functionality:**
- System audit trail
- User activity logs
- Data access logs
- Export logs

**UI Components:**
- Filter bar:
  - Date range
  - User
  - Action type
  - Entity
- Audit log table:
  - Timestamp
  - User
  - Action
  - Entity
  - IP Address
  - Details
- Export to CSV
- Retention settings

**Data Needed:**
- GET /api/admin/audit-logs

---

#### Screen: `/admin/security/access-logs`
**Status:** NOT IMPLEMENTED
**Functionality:**
- Login history
- Failed attempts
- Session management
- IP tracking

**UI Components:**
- Login attempts chart
- Access log table:
  - User
  - Login time
  - IP address
  - Device
  - Status (Success/Failed)
- Block IP button
- Session list with revoke

**Data Needed:**
- GET /api/admin/access-logs

---

#### Screen: `/admin/security/settings`
**Status:** NOT IMPLEMENTED
**Functionality:**
- Security policies
- Password rules
- 2FA enforcement
- Session timeout

**UI Components:**
- Password policy:
  - Min length
  - Complexity requirements
  - Expiration days
- 2FA settings:
  - Optional/Required
  - Methods (SMS, App, Email)
- Session settings:
  - Timeout duration
  - Concurrent sessions limit
- Save settings

**Data Needed:**
- GET /api/admin/security/settings
- PUT /api/admin/security/settings

---

#### Screen: `/admin/security/compliance`
**Status:** NOT IMPLEMENTED
**Functionality:**
- Compliance dashboard
- GDPR tools
- Data retention
- Privacy settings

**UI Components:**
- Compliance status:
  - GDPR: Compliant
  - SOC 2: In Progress
  - ISO 27001: Certified
- GDPR tools:
  - Data export request
  - Data deletion request
  - Consent management
- Data retention policies

**Data Needed:**
- GET /api/admin/compliance

---

#### Screen: `/admin/security/backup`
**Status:** NOT IMPLEMENTED
**Functionality:**
- Backup management
- Restore data
- Schedule backups
- Download backups

**UI Components:**
- Backup status:
  - Last backup: 2 hours ago
  - Next scheduled: Tonight
  - Storage used: 45GB
- Backup history list:
  - Date
  - Size
  - Status
  - Actions (Download, Restore)
- Schedule settings:
  - Frequency
  - Retention period
  - Manual backup button

**Data Needed:**
- GET /api/admin/backups
- POST /api/admin/backups

---

## 📊 Summary Table

| App | Implemented | Missing | Total |
|-----|-------------|---------|-------|
| Employee | 11 | 23 | 34 |
| HR | 2 | 34 | 36 |
| Admin | 1 | 25 | 26 |
| **Total** | **14** | **82** | **96** |

---

*Document Version: 1.0*
*Last Updated: February 2026*

