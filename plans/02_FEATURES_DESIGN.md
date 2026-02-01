# HRM System - Features & Design Documentation

## 📋 Overview

Comprehensive documentation of all features, user flows, and design specifications for the HRM System.

---

## 🏢 Application Structure

### 1. Employee App (34 Screens)
**Purpose:** Self-service portal for employees - clarity, zero HR dependency

#### Core Modules

| Module | Features | Status | Screens |
|--------|----------|--------|---------|
| **Authentication** | Login, MFA, Forgot/Reset Password | ✅ Complete | 4 |
| **Dashboard** | Quick navigation, announcements preview, stats | ✅ Complete | 1 |
| **My Profile** | Personal info, job details, documents, settings | ✅ Complete | 4 |
| **Attendance** | Check-in/out, calendar view, history, status | ✅ Complete | 3 |
| **Leave Management** | Apply leave, view balances, track requests, holidays | ✅ Complete | 4 |
| **Payroll** | Payslips, salary details, tax declarations | ✅ Complete | 3 |
| **Performance** | Goals, reviews, feedback, AI insights | ✅ Complete | 4 |
| **Announcements** | Company news and updates | ✅ Complete | 1 |
| **Helpdesk** | Support tickets, FAQs | 🔄 Planned | 3 |
| **Onboarding** | First-time employee setup | 🔄 Planned | 4 |
| **Documents** | Upload, view, e-signatures | 🔄 Planned | 3 |

#### Employee App Navigation Structure
```
/employee
├── /dashboard              # Overview with quick actions
├── /profile
│   ├── /personal          # Personal information
│   ├── /job               # Job details, department
│   ├── /documents         # My documents
│   └── /settings          # Account settings
├── /attendance
│   ├── /                  # Today's status, check-in/out
│   ├── /history           # Past records
│   └── /calendar          # Monthly calendar view
├── /leave
│   ├── /                  # Balances, quick apply
│   ├── /apply             # Leave application form
│   ├── /requests          # My leave requests
│   └── /holidays          # Company holidays
├── /payroll
│   ├── /                  # Overview, recent payslips
│   ├── /payslips          # All payslips
│   └── /tax               # Tax declarations
├── /performance
│   ├── /                  # Goals overview
│   ├── /goals             # Detailed goals
│   ├── /reviews           # Performance reviews
│   └── /ai-insights       # AI-generated insights
├── /announcements         # Company announcements
├── /helpdesk
│   ├── /                  # Helpdesk home
│   ├── /tickets           # My support tickets
│   └── /faq               # Frequently asked questions
├── /documents             # Document management
└── /training              # Training & courses
```

---

### 2. HR App (36 Screens)
**Purpose:** People operations, approvals, visibility, compliance

#### Core Modules

| Module | Features | Status | Screens |
|--------|----------|--------|---------|
| **Dashboard** | KPIs, quick actions, pending approvals, stats | ✅ Complete | 1 |
| **Employees** | Directory, profiles, lifecycle management | 🔄 Partial | 6 |
| **Attendance** | Monitoring, approvals, reports | 🔄 Planned | 4 |
| **Leave** | Policy management, approval queue | 🔄 Partial | 4 |
| **Payroll** | Processing, compliance, reports | 🔄 Planned | 5 |
| **Performance** | Review cycles, feedback, 360 reviews | 🔄 Planned | 5 |
| **Hiring** | Requisitions, ATS, interviews, offers | 🔄 Planned | 6 |
| **AI Insights** | Attrition predictions, recommendations | ✅ Complete | 2 |
| **Reports** | Generate and export analytics | 🔄 Planned | 3 |
| **Engagement** | Surveys, feedback, culture | 🔄 Planned | 3 |

#### HR App Navigation Structure
```
/hr
├── /dashboard              # HR overview, KPIs, approvals
├── /employees
│   ├── /                  # Employee directory (list)
│   ├── /[id]              # Employee detail view
│   ├── /org-chart         # Organization chart
│   ├── /bulk-actions      # Bulk operations
│   └── /lifecycle         # Employee lifecycle
├── /attendance
│   ├── /monitor           # Daily monitoring
│   ├── /approvals         # Attendance approvals
│   ├── /reports           # Attendance reports
│   └── /settings          # Attendance settings
├── /leave
│   ├── /approvals         # Leave approval queue
│   ├── /policy            # Leave policies
│   ├── /calendar          # Team leave calendar
│   └── /reports           # Leave reports
├── /payroll
│   ├── /process           # Payroll processing
│   ├── /payslips          # Generate payslips
│   ├── /compliance        # Compliance reports
│   ├── /history           # Payroll history
│   └── /settings          # Payroll settings
├── /performance
│   ├── /cycles            # Review cycles
│   ├── /reviews           # Performance reviews
│   ├── /feedback          # 360 feedback
│   ├── /calibration       # Calibration sessions
│   └── /reports           # Performance reports
├── /hiring
│   ├── /jobs              # Job requisitions
│   ├── /jobs/[id]         # Job detail
│   ├── /candidates        # Candidate pipeline
│   ├── /candidates/[id]   # Candidate profile
│   ├── /interviews        # Interview scheduling
│   └── /offers            # Offer management
├── /ai
│   ├── /                  # AI insights dashboard
│   ├── /attrition         # Attrition risk analysis
│   └── /predictions       # Other predictions
├── /reports
│   ├── /builder           # Custom report builder
│   ├── /analytics         # Analytics dashboard
│   └── /exports           # Data exports
└── /engagement
    ├── /surveys           # Employee surveys
    ├── /feedback          # Culture feedback
    └── /analytics         # Engagement analytics
```

---

### 3. Admin App (26 Screens)
**Purpose:** System control, automation, security

#### Core Modules

| Module | Features | Status | Screens |
|--------|----------|--------|---------|
| **Dashboard** | System health, monitoring, statistics | ✅ Complete | 1 |
| **System** | Health checks, performance monitoring | 🔄 Planned | 3 |
| **Roles** | RBAC, permissions, user groups | 🔄 Planned | 4 |
| **Structure** | Departments, designations, org chart | 🔄 Planned | 4 |
| **Automation** | Workflows, approval chains | 🔄 Planned | 3 |
| **Integrations** | API keys, third-party connections | 🔄 Planned | 3 |
| **AI Config** | Model settings, training data | 🔄 Planned | 3 |
| **Security** | Audit logs, access logs, settings | 🔄 Planned | 5 |

#### Admin App Navigation Structure
```
/admin
├── /dashboard              # System overview, health metrics
├── /system
│   ├── /health            # System health
│   ├── /performance       # Performance monitoring
│   └── /settings          # System settings
├── /roles
│   ├── /                  # Role list
│   ├── /create            # Create role
│   ├── /[id]              # Edit role
│   └── /permissions       # Permission matrix
├── /structure
│   ├── /departments       # Department management
│   ├── /designations      # Designation management
│   ├── /locations         # Office locations
│   └── /hierarchy         # Organization hierarchy
├── /automation
│   ├── /workflows         # Workflow builder
│   ├── /rules             # Automation rules
│   └── /templates         # Email templates
├── /integrations
│   ├── /apis              # API key management
│   ├── /webhooks          # Webhook configuration
│   └── /third-party       # Third-party integrations
├── /ai
│   ├── /models            # AI model settings
│   ├── /training          # Training data
│   └── /prompts           # Prompt configuration
└── /security
    ├── /audit-logs        # System audit logs
    ├── /access-logs       # User access logs
    ├── /settings          # Security settings
    ├── /compliance        # Compliance settings
    └── /backup            # Backup & restore
```

---

## 🤖 AI Features

### Implemented AI Features

| Feature | Description | Location | Status |
|---------|-------------|----------|--------|
| **Attrition Risk Score** | AI-powered prediction of employee turnover risk | HR Dashboard, AI Insights | ✅ |
| **Risk Levels** | Low, Medium, High, Critical classifications | Risk badges and filters | ✅ |
| **Factor Analysis** | Key reasons for attrition risk | Detailed employee view | ✅ |
| **Recommendations** | Actionable retention strategies | AI insights panel | ✅ |
| **Performance Insights** | Comprehensive performance analysis | Employee Performance | ✅ |

### AI Data Points Used
- Workload analysis (hours, projects)
- Engagement metrics (survey scores)
- Tenure and career progression
- Compensation benchmarking
- Manager relationship scores
- Attendance patterns
- Leave utilization

### Planned AI Features

| Feature | Description | Priority | Complexity |
|---------|-------------|----------|------------|
| **Resume Ranking Engine** | AI-powered candidate scoring | High | Medium |
| **HR Policy Chatbot** | Natural language policy queries | High | Medium |
| **Leave Anomaly Detection** | Identify unusual leave patterns | Medium | Low |
| **Sentiment Analysis** | Employee feedback analysis | Medium | Medium |
| **Smart Scheduling** | Optimal interview scheduling | Low | Medium |
| **Payroll Anomaly Detection** | Detect unusual payroll patterns | Low | Low |

---

## 🎨 Design System

### Color Palette

| Token | Light Mode | Dark Mode | Usage |
|-------|------------|-----------|-------|
| `--background` | #ffffff | #0f172a | Page background |
| `--foreground` | #0f172a | #f8fafc | Primary text |
| `--card` | #ffffff | #1e293b | Card backgrounds |
| `--card-foreground` | #0f172a | #f8fafc | Card text |
| `--primary` | #3b82f6 | #60a5fa | Primary actions |
| `--primary-foreground` | #ffffff | #0f172a | Text on primary |
| `--secondary` | #f1f5f9 | #334155 | Secondary elements |
| `--muted` | #f1f5f9 | #334155 | Muted backgrounds |
| `--muted-foreground` | #64748b | #94a3b8 | Secondary text |
| `--accent` | #f1f5f9 | #334155 | Accent elements |
| `--destructive` | #ef4444 | #ef4444 | Errors, danger |
| `--border` | #e2e8f0 | #334155 | Borders |
| `--input` | #e2e8f0 | #334155 | Input borders |
| `--ring` | #3b82f6 | #60a5fa | Focus rings |

### Semantic Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--success` | #22c55e | Success states, approvals |
| `--warning` | #f59e0b | Warnings, pending |
| `--info` | #3b82f6 | Information |
| `--danger` | #ef4444 | Errors, rejections |

### Typography

| Element | Font | Size | Weight | Line Height |
|---------|------|------|--------|-------------|
| H1 | System UI | 2.25rem (36px) | 700 | 1.2 |
| H2 | System UI | 1.875rem (30px) | 600 | 1.3 |
| H3 | System UI | 1.5rem (24px) | 600 | 1.4 |
| H4 | System UI | 1.25rem (20px) | 600 | 1.4 |
| Body Large | System UI | 1.125rem (18px) | 400 | 1.6 |
| Body | System UI | 1rem (16px) | 400 | 1.6 |
| Body Small | System UI | 0.875rem (14px) | 400 | 1.5 |
| Caption | System UI | 0.75rem (12px) | 400 | 1.4 |
| Code | Monospace | 0.875rem (14px) | 400 | 1.5 |

### Spacing Scale

| Token | Value | Usage |
|-------|-------|-------|
| `space-0` | 0 | No spacing |
| `space-1` | 0.25rem (4px) | Tight spacing |
| `space-2` | 0.5rem (8px) | Default padding |
| `space-3` | 0.75rem (12px) | Component padding |
| `space-4` | 1rem (16px) | Section padding |
| `space-5` | 1.25rem (20px) | Card padding |
| `space-6` | 1.5rem (24px) | Large gaps |
| `space-8` | 2rem (32px) | Section margins |
| `space-10` | 2.5rem (40px) | Large sections |
| `space-12` | 3rem (48px) | Page margins |

### Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `rounded-none` | 0 | Sharp corners |
| `rounded-sm` | 0.125rem | Small elements |
| `rounded` | 0.25rem | Inputs, badges |
| `rounded-md` | 0.375rem | Buttons, small cards |
| `rounded-lg` | 0.5rem | Cards, modals |
| `rounded-xl` | 0.75rem | Large cards |
| `rounded-2xl` | 1rem | Featured sections |
| `rounded-full` | 9999px | Pills, avatars |

### Shadows

| Token | Value | Usage |
|-------|-------|-------|
| `shadow-none` | none | Flat design |
| `shadow-sm` | 0 1px 2px rgba(0,0,0,0.05) | Subtle elevation |
| `shadow` | 0 1px 3px rgba(0,0,0,0.1) | Default cards |
| `shadow-md` | 0 4px 6px rgba(0,0,0,0.1) | Hover states |
| `shadow-lg` | 0 10px 15px rgba(0,0,0,0.1) | Modals, dropdowns |
| `shadow-xl` | 0 20px 25px rgba(0,0,0,0.15) | Overlays |

---

## 🧩 Component Standards

### Cards

```tsx
// Standard Card
<Card className="p-6 rounded-lg shadow-sm">
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description text</CardDescription>
  </CardHeader>
  <CardContent>
    {/* Content */}
  </CardContent>
  <CardFooter>
    {/* Actions */}
  </CardFooter>
</Card>

// Stats Card
<Card className="p-6">
  <div className="flex items-center justify-between">
    <div>
      <p className="text-sm text-muted-foreground">Label</p>
      <p className="text-2xl font-bold">Value</p>
    </div>
    <Icon className="h-8 w-8 text-primary" />
  </div>
</Card>
```

### Buttons

| Variant | Usage | Example |
|---------|-------|---------|
| `default` | Primary actions | Save, Submit |
| `secondary` | Secondary actions | Cancel, Back |
| `outline` | Tertiary actions | Edit, View |
| `ghost` | Subtle actions | Close, Menu |
| `destructive` | Dangerous actions | Delete, Remove |
| `link` | Navigation | Learn more |

### Forms

```tsx
// Standard Form Field
<FormField
  control={form.control}
  name="email"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Email</FormLabel>
      <FormControl>
        <Input placeholder="email@example.com" {...field} />
      </FormControl>
      <FormDescription>We'll never share your email.</FormDescription>
      <FormMessage />
    </FormItem>
  )}
/>
```

**Form Standards:**
- Input height: 2.5rem (40px)
- Label spacing: 0.5rem below label
- Error state: Red border + error message
- Required fields: Red asterisk
- Helper text: Muted color, 0.875rem

### Tables

```tsx
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Status</TableHead>
      <TableHead className="text-right">Actions</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>John Doe</TableCell>
      <TableCell><Badge>Active</Badge></TableCell>
      <TableCell className="text-right">
        <Button variant="ghost" size="sm">Edit</Button>
      </TableCell>
    </TableRow>
  </TableBody>
</Table>
```

**Table Standards:**
- Header: Light background, semibold text
- Row hover: Subtle background change
- Border: Horizontal only
- Padding: `py-3 px-4`
- Actions: Right-aligned, icon buttons

---

## 📱 Responsive Design

### Breakpoints

| Name | Min Width | Max Width | Target |
|------|-----------|-----------|--------|
| `sm` | 640px | - | Mobile landscape |
| `md` | 768px | - | Tablet |
| `lg` | 1024px | - | Desktop |
| `xl` | 1280px | - | Large desktop |
| `2xl` | 1536px | - | Extra large |

### Responsive Patterns

#### Sidebar Navigation
```tsx
// Mobile: Hidden, hamburger menu
// Desktop: Fixed sidebar
<Sidebar className="hidden lg:block" />
<MobileNav className="lg:hidden" />
```

#### Grid Layouts
```tsx
// Cards grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
  {items.map(item => <Card key={item.id} />)}
</div>

// Form layout
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <Input />
  <Input />
</div>
```

#### Tables
```tsx
// Mobile: Card view or horizontal scroll
// Desktop: Full table
<div className="overflow-x-auto">
  <Table>...</Table>
</div>
```

---

## 🎯 User Flows

### Employee Flow: Apply for Leave

```
1. Employee clicks "Apply Leave" on dashboard
   ↓
2. System shows leave application form
   - Leave type dropdown
   - Date range picker
   - Reason text area
   - Balance preview
   ↓
3. Employee fills form and submits
   ↓
4. System validates:
   - Sufficient balance?
   - No conflicts?
   - Valid date range?
   ↓
5. Success: Request submitted, pending approval
   ↓
6. HR receives notification
   ↓
7. HR approves/rejects
   ↓
8. Employee receives notification
```

### HR Flow: Process Payroll

```
1. HR navigates to Payroll > Process
   ↓
2. System shows payroll period selector
   ↓
3. HR selects month/year
   ↓
4. System calculates:
   - Basic salary
   - Allowances
   - Deductions
   - Tax
   - Net salary
   ↓
5. HR reviews calculations
   ↓
6. HR generates payslips
   ↓
7. System sends email notifications
   ↓
8. Employees can view payslips
```

### Admin Flow: Create Role

```
1. Admin navigates to Roles > Create
   ↓
2. System shows role creation form
   - Role name
   - Description
   - Permission matrix
   ↓
3. Admin configures permissions:
   - Employee: View, Edit, Delete
   - Leave: Approve, View All
   - Payroll: Process, View
   ↓
4. Admin saves role
   ↓
5. Role available for assignment
```

---

## 📊 Dashboard Widgets

### Employee Dashboard

| Widget | Data | Refresh |
|--------|------|---------|
| **Attendance Card** | Today's status, check-in/out | Real-time |
| **Leave Balance** | Available days by type | Daily |
| **Upcoming Holidays** | Next 3 holidays | Weekly |
| **Recent Payslip** | Last month salary | Monthly |
| **Performance Goals** | Progress on active goals | Weekly |
| **Announcements** | Latest 3 announcements | Real-time |

### HR Dashboard

| Widget | Data | Refresh |
|--------|------|---------|
| **Employee Count** | Total, active, new this month | Daily |
| **Pending Approvals** | Leave, attendance, expenses | Real-time |
| **Attendance Overview** | Present, absent, late today | Real-time |
| **Attrition Risk** | High-risk employees | Weekly |
| **Hiring Pipeline** | Open positions, candidates | Daily |
| **Quick Actions** | Common HR tasks | Static |

### Admin Dashboard

| Widget | Data | Refresh |
|--------|------|---------|
| **System Health** | CPU, memory, disk usage | Real-time |
| **Active Users** | Currently online | Real-time |
| **API Requests** | Requests/minute | Real-time |
| **Error Rate** | Errors in last 24h | Hourly |
| **Storage Usage** | Database, file storage | Daily |
| **Security Alerts** | Failed logins, anomalies | Real-time |

---

## 🔐 Permission Matrix

| Feature | Employee | HR | Admin |
|---------|----------|-----|-------|
| **Profile** | View/Edit own | View all, Edit all | View all, Edit all |
| **Attendance** | Check-in/out, View own | View all, Approve | View all |
| **Leave** | Apply, View own | Approve, View all | View all |
| **Payroll** | View own payslips | Process, View all | View all |
| **Performance** | View own, Set goals | Manage cycles, Review | View all |
| **Hiring** | View jobs | Full ATS access | View all |
| **Reports** | None | Generate all | Generate all |
| **Settings** | Account only | Department settings | System settings |
| **Roles** | None | None | Full CRUD |
| **Integrations** | None | None | Full CRUD |

---

## 📈 Analytics & Metrics

### Key Performance Indicators

| Metric | Target | Measurement |
|--------|--------|-------------|
| **Employee Adoption** | >80% | Daily active users |
| **HR Efficiency** | -50% time | Tasks completed per hour |
| **System Uptime** | 99.9% | Monitoring |
| **Page Load Time** | <2s | Performance monitoring |
| **User Satisfaction** | >4.0/5 | Monthly survey |
| **Data Accuracy** | >99% | Audit checks |

### Tracked Events

| Event | Category | Purpose |
|-------|----------|---------|
| `page_view` | Engagement | Track feature usage |
| `leave_applied` | Leave | Monitor leave patterns |
| `attendance_marked` | Attendance | Track punctuality |
| `payslip_viewed` | Payroll | Employee engagement |
| `goal_updated` | Performance | Goal progress |
| `report_generated` | Reports | Report popularity |
| `login` | Security | Authentication tracking |
| `error_occurred` | System | Error monitoring |

---

## 📝 Notes

- **Total Lines of Code:** 18,796
- **Framework:** Next.js 16 with App Router
- **Styling:** Tailwind CSS 4 + shadcn/ui
- **State:** Redux Toolkit
- **Database:** SQLite with Prisma ORM
- **AI SDK:** z-ai-web-dev-sdk

---

*Document Version: 1.0*
*Last Updated: February 2026*
