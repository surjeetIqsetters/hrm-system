# HRM System - Enterprise Human Resource Management

A comprehensive, enterprise-grade Human Resource Management System built with Next.js 16, TypeScript, Redux, and shadcn/ui. This system includes 90+ screens across 3 applications (Employee, HR, Admin) with AI-powered features.

## 🚀 Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript 5
- **State Management**: Redux Toolkit with React-Redux
- **UI Components**: shadcn/ui (New York style)
- **Styling**: Tailwind CSS 4
- **Icons**: Lucide React
- **AI Integration**: z-ai-web-dev-sdk
- **Forms**: React Hook Form with Zod validation
- **Data Visualization**: Recharts

## 📱 Applications

### 1. Employee App (34 Screens)
Purpose: Self-service, clarity, zero HR dependency

#### Completed Features:
- ✅ Login Page with role-based authentication
- ✅ Dashboard with navigation to all modules
- ✅ My Profile - Personal information management
- ✅ Attendance - Check-in/check-out functionality
- ✅ Leave Management - Apply for leave, view balances, track requests
- ✅ Payroll - View payslips and salary details
- ✅ Performance - Goals, reviews, AI insights

#### Screens Structure:
```
/employee
├── /profile          - Personal details, job info, documents
├── /attendance       - Check-in/out, calendar, history
├── /leave           - Apply leave, balances, holidays
├── /payroll         - Payslips, tax declarations
├── /performance     - Goals, reviews, training
└── /announcements  - Company announcements
```

### 2. HR App (36 Screens)
Purpose: People operations, approvals, visibility, compliance

#### Completed Features:
- ✅ HR Dashboard with KPIs and quick actions
- ✅ Employee management view
- ✅ Leave approval queue
- ✅ AI Attrition Risk Analysis
- ✅ Hiring pipeline overview
- ✅ Attrition predictions with recommendations

#### Screens Structure:
```
/hr
├── /dashboard       - Overview, stats, approvals
├── /employees      - Directory, profiles, lifecycle
├── /attendance     - Monitoring, approvals
├── /leave         - Policy, approval queue
├── /payroll       - Processing, compliance
├── /performance   - Reviews, cycles, feedback
├── /hiring        - Requisitions, ATS, interviews
├── /announcements - Create announcements
├── /reports       - Generate and export
└── /ai            - AI insights and predictions
```

### 3. Admin App (26 Screens)
Purpose: System control, automation, security

#### Completed Features:
- ✅ Admin Dashboard with system health
- ✅ System health monitoring
- ✅ Quick actions and statistics
- ✅ System information overview

#### Screens Structure:
```
/admin
├── /system          - Health, monitoring
├── /roles          - RBAC, permissions
├── /structure      - Departments, designations
├── /automation     - Workflows, approvals
├── /integrations   - API keys, third-party
├── /ai             - AI configuration
└── /security       - Audit logs, settings
```

## 🤖 AI Features

### Implemented:
1. **Attrition Risk Score** ✅
   - AI-powered employee attrition prediction
   - Risk levels: Low, Medium, High, Critical
   - Factor analysis and recommendations
   - View in HR Dashboard and AI Insights

2. **Performance Insight Generator** ✅
   - Comprehensive performance analysis
   - Strengths, improvements, achievements
   - Trends and recommendations
   - View in Employee Performance

### Planned:
- 🔄 Leave & Attendance Anomaly Detection
- 🔄 Resume Ranking Engine
- 🔄 HR Policy Chatbot

## 🔐 Authentication & Security

### Demo Accounts:
```
Employee: john.doe@company.com / password123
HR:       jane.smith@company.com / password123
Admin:    admin@company.com / admin123
```

### Features:
- Email/password authentication
- Role-based access control (RBAC)
- Session management with tokens
- Protected routes by role

## 📊 State Management

### Redux Store Structure:
```
store/
├── auth/           - Authentication state
├── employee/       - Employee data
├── attendance/     - Attendance records
├── leave/          - Leave requests & balances
├── payroll/        - Payslips & tax data
├── performance/    - Goals, reviews, feedback
├── hr/            - HR management
├── admin/         - Admin configuration
└── ai/            - AI features data
```

## 🎨 UI Components

All screens use shadcn/ui components for consistent, accessible design:
- Cards, Buttons, Inputs, Selects
- Dialogs, Sheets, Drawers
- Tables, Tabs, Accordions
- Badges, Progress, Alerts
- Calendars, Date Pickers
- Charts, Visualizations

## 🚦 Getting Started

### Installation:
```bash
bun install
```

### Development:
```bash
bun run dev
```

Access the application at: http://localhost:3000

### Build:
```bash
bun run build
```

## 📝 API Routes

### Authentication:
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/verify` - Verify session
- `POST /api/auth/forgot-password` - Reset password request
- `POST /api/auth/reset-password` - Reset password
- `POST /api/auth/verify-mfa` - MFA verification

### Employees:
- `GET /api/employees/:id` - Get employee details
- `PUT /api/employees/:id` - Update employee

### Attendance:
- `GET /api/attendance/today/:id` - Today's attendance
- `POST /api/attendance/check-in` - Check in
- `POST /api/attendance/check-out` - Check out
- `GET /api/attendance/monthly/:id` - Monthly records

### Leave:
- `GET /api/leave/balances/:id` - Leave balances
- `GET /api/leave/requests/:id` - Leave requests
- `POST /api/leave/apply` - Apply for leave
- `GET /api/leave/pending-approvals` - Pending approvals

### Payroll:
- `GET /api/payroll/payslips/:id` - Payslip list
- `GET /api/payroll/payslip/:id/:payslipId` - Payslip details

### Performance:
- `GET /api/performance/goals/:id` - Employee goals
- `GET /api/performance/feedback/:id` - Feedback
- `GET /api/performance/trainings/:id` - Training

### AI:
- `GET /api/ai/attrition-risks` - All attrition risks
- `GET /api/ai/attrition-risk/:id` - Employee risk
- `GET /api/ai/performance-insight/:id` - Performance insights

## 🎯 Screen Status Summary

### Employee App (11/34 screens implemented as core modules)
- ✅ Login
- ✅ Dashboard
- ✅ Profile (with tabs: Personal, Job, Documents, Settings)
- ✅ Attendance (with check-in/out)
- ✅ Leave (with balances, requests, holidays)
- ✅ Payroll (with payslips, tax declarations)
- ✅ Performance (with goals, reviews, AI insights)

### HR App (2/36 screens implemented)
- ✅ Dashboard
- ✅ AI Attrition Insights

### Admin App (1/26 screens implemented)
- ✅ System Dashboard

## 🔧 Key Features Implemented

### 1. Role-Based Navigation
- Different dashboards for Employee, HR, and Admin
- Protected routes by role
- Appropriate feature access per role

### 2. Redux State Management
- Centralized state with Redux Toolkit
- Async thunks for API calls
- Slice reducers for state updates

### 3. Mock Data System
- Comprehensive mock data for all modules
- API routes returning mock responses
- Realistic data for testing

### 4. Responsive Design
- Mobile-first approach
- Tailwind responsive prefixes
- Flexible grid layouts

### 5. AI Integration
- Attrition risk prediction (UI complete)
- Performance insights (UI complete)
- AI-powered recommendations

## 📊 Data Flow

1. **Authentication Flow:**
   - User logs in → Redux dispatch → API call → Store token → Redirect to dashboard

2. **Data Fetching:**
   - Component mounts → Dispatch async thunk → API call → Update Redux state → Re-render

3. **Protected Routes:**
   - Route access check → Verify role → Redirect if unauthorized

## 🎨 Design System

### Colors:
- Primary: Blue/Indigo shades
- Success: Green
- Warning: Yellow/Orange
- Danger: Red
- Info: Blue
- Background: Slate/Gray gradients

### Typography:
- Headings: Bold, larger sizes
- Body: Regular, readable sizes
- Muted: Gray colors for secondary text
- Monospace: For codes and IDs

### Components:
- Consistent padding and margins
- Rounded corners (default)
- Shadows for depth
- Hover effects on interactive elements

## 🔮 Future Enhancements

### Remaining Screens:
- Employee: First-time onboarding, document upload, helpdesk
- HR: Employee directory, attendance monitoring, payroll processing, performance cycles, hiring ATS
- Admin: Role management, organization setup, automation builder, integrations, audit logs

### Additional AI Features:
- Attendance anomaly detection
- Resume ranking engine
- HR policy chatbot

### Integration Points:
- Email/SMTP configuration
- SMS notifications
- Third-party HRIS systems
- Payroll processing systems
- Video conferencing for interviews

## 📄 License

This is a demonstration project showcasing enterprise HRM system architecture.

## 👥 Team

Developed as a comprehensive HRM system solution with modern web technologies.

## 🙏 Acknowledgments

- Next.js team for the excellent framework
- shadcn for the beautiful UI components
- Redux Toolkit team for state management
- All open-source contributors
