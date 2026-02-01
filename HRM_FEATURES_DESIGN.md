# HRM System - Features & Design Documentation

## 📋 Overview

A comprehensive, enterprise-grade Human Resource Management System built with Next.js 16, TypeScript, Redux, and shadcn/ui. This system includes 90+ screens across 3 applications with AI-powered features.

---

## 🏢 Application Structure

### 1. Employee App (34 Screens)
**Purpose:** Self-service portal for employees - clarity, zero HR dependency

#### Core Modules

| Module | Features | Status |
|--------|----------|--------|
| **Authentication** | Login, MFA, Forgot/Reset Password | ✅ Complete |
| **Dashboard** | Quick navigation, announcements preview, stats | ✅ Complete |
| **My Profile** | Personal info, job details, documents, settings | ✅ Complete |
| **Attendance** | Check-in/out, calendar view, history, status | ✅ Complete |
| **Leave Management** | Apply leave, view balances, track requests, holidays | ✅ Complete |
| **Payroll** | Payslips, salary details, tax declarations | ✅ Complete |
| **Performance** | Goals, reviews, feedback, AI insights | ✅ Complete |
| **Announcements** | Company news and updates | ✅ Complete |
| **Helpdesk** | Support tickets, FAQs | 🔄 Planned |
| **Onboarding** | First-time employee setup | 🔄 Planned |

#### Employee App Navigation
```
/employee
├── /profile          - Personal details, job info, documents
├── /attendance       - Check-in/out, calendar, history
├── /leave           - Apply leave, balances, holidays
├── /payroll         - Payslips, tax declarations
├── /performance     - Goals, reviews, training
├── /announcements   - Company announcements
└── /helpdesk        - Support and FAQs
```

---

### 2. HR App (36 Screens)
**Purpose:** People operations, approvals, visibility, compliance

#### Core Modules

| Module | Features | Status |
|--------|----------|--------|
| **Dashboard** | KPIs, quick actions, pending approvals, stats | ✅ Complete |
| **Employees** | Directory, profiles, lifecycle management | 🔄 Partial |
| **Attendance** | Monitoring, approvals, reports | 🔄 Planned |
| **Leave** | Policy management, approval queue | 🔄 Partial |
| **Payroll** | Processing, compliance, reports | 🔄 Planned |
| **Performance** | Review cycles, feedback, 360 reviews | 🔄 Planned |
| **Hiring** | Requisitions, ATS, interviews, offers | 🔄 Planned |
| **AI Insights** | Attrition predictions, recommendations | ✅ Complete |
| **Reports** | Generate and export analytics | 🔄 Planned |
| **Engagement** | Surveys, feedback, culture | 🔄 Planned |

#### HR App Navigation
```
/hr
├── /dashboard       - Overview, stats, approvals
├── /employees      - Directory, profiles, lifecycle
├── /attendance     - Monitoring, approvals
├── /leave         - Policy, approval queue
├── /payroll       - Processing, compliance
├── /performance   - Reviews, cycles, feedback
├── /hiring        - Requisitions, ATS, interviews
├── /engagement    - Surveys, culture
├── /reports       - Generate and export
└── /ai            - AI insights and predictions
```

---

### 3. Admin App (26 Screens)
**Purpose:** System control, automation, security

#### Core Modules

| Module | Features | Status |
|--------|----------|--------|
| **Dashboard** | System health, monitoring, statistics | ✅ Complete |
| **System** | Health checks, performance monitoring | 🔄 Planned |
| **Roles** | RBAC, permissions, user groups | 🔄 Planned |
| **Structure** | Departments, designations, org chart | 🔄 Planned |
| **Automation** | Workflows, approval chains | 🔄 Planned |
| **Integrations** | API keys, third-party connections | 🔄 Planned |
| **AI Config** | Model settings, training data | 🔄 Planned |
| **Security** | Audit logs, access logs, settings | 🔄 Planned |

#### Admin App Navigation
```
/admin
├── /dashboard       - System overview, health
├── /system          - Health, monitoring
├── /roles          - RBAC, permissions
├── /structure      - Departments, designations
├── /automation     - Workflows, approvals
├── /integrations   - API keys, third-party
├── /ai             - AI configuration
└── /security       - Audit logs, settings
```

---

## 🤖 AI Features

### Implemented

| Feature | Description | Location |
|---------|-------------|----------|
| **Attrition Risk Score** | AI-powered prediction of employee turnover risk | HR Dashboard, AI Insights page |
| **Risk Levels** | Low, Medium, High, Critical classifications | Risk badges and filters |
| **Factor Analysis** | Key reasons for attrition risk | Detailed employee view |
| **Recommendations** | Actionable retention strategies | AI insights panel |
| **Performance Insights** | Comprehensive performance analysis | Employee Performance page |

### AI Data Points
- Workload analysis
- Engagement metrics
- Tenure and career progression
- Compensation benchmarking
- Manager relationship scores

### Planned AI Features

| Feature | Description | Priority |
|---------|-------------|----------|
| **Leave Anomaly Detection** | Identify unusual leave patterns | High |
| **Resume Ranking Engine** | AI-powered candidate scoring | Medium |
| **HR Policy Chatbot** | Natural language policy queries | Medium |
| **Sentiment Analysis** | Employee feedback analysis | Low |

---

## 🎨 Design System

### Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| `--primary` | Blue/Indigo shades | Primary actions, branding |
| `--success` | Green | Success states, approvals |
| `--warning` | Yellow/Orange | Warnings, pending states |
| `--danger` | Red | Errors, rejections, critical |
| `--info` | Blue | Information, tips |
| `--background` | Slate/Gray | Page backgrounds |
| `--foreground` | Dark slate | Text, icons |
| `--muted` | Gray | Secondary text |
| `--border` | Light gray | Borders, dividers |

### Typography

| Element | Font | Size | Weight |
|---------|------|------|--------|
| H1 | System UI | 2rem (32px) | Bold (700) |
| H2 | System UI | 1.5rem (24px) | Bold (700) |
| H3 | System UI | 1.25rem (20px) | Semibold (600) |
| Body | System UI | 1rem (16px) | Regular (400) |
| Small | System UI | 0.875rem (14px) | Regular (400) |
| Muted | System UI | 0.875rem (14px) | Regular (400) |
| Code | Monospace | 0.875rem (14px) | Regular (400) |

### Spacing Scale

| Token | Value | Usage |
|-------|-------|-------|
| `space-1` | 0.25rem (4px) | Tight spacing |
| `space-2` | 0.5rem (8px) | Default padding |
| `space-3` | 0.75rem (12px) | Component padding |
| `space-4` | 1rem (16px) | Section padding |
| `space-6` | 1.5rem (24px) | Large gaps |
| `space-8` | 2rem (32px) | Section margins |

### Component Standards

#### Cards
- Border radius: `rounded-lg` (0.5rem)
- Shadow: `shadow-sm` default, `shadow-md` on hover
- Padding: `p-6` (1.5rem)
- Background: White or card background

#### Buttons
- Primary: Solid background, white text
- Secondary: Outline style
- Ghost: Transparent with hover background
- Sizes: `sm`, `default`, `lg`
- Border radius: `rounded-md` (0.375rem)

#### Forms
- Input height: 2.5rem (40px)
- Border radius: `rounded-md`
- Focus ring: Primary color, 2px
- Label spacing: 0.5rem below label
- Error state: Red border, error message below

#### Tables
- Header: Light background, semibold text
- Row hover: Subtle background change
- Border: Horizontal only
- Padding: `py-3 px-4`

---

## 🔐 Authentication & Security

### Role-Based Access Control

| Role | Access Level |
|------|--------------|
| **Employee** | Self-service only (own data) |
| **HR** | All employee data, approvals, reports |
| **Admin** | System configuration, user management |

### Authentication Flow
1. Email/password login
2. Session token generation
3. Role verification on route access
4. Protected route middleware
5. Automatic logout on token expiry

### Demo Accounts
```
Employee: john.doe@company.com / password123
HR:       jane.smith@company.com / password123
Admin:    admin@company.com / admin123
```

---

## 📊 State Management

### Redux Store Structure

```
store/
├── auth/           - Authentication state
│   ├── user        - Current user data
│   ├── token       - Session token
│   └── isLoading   - Auth loading state
├── employee/       - Employee data
│   ├── profile     - Personal information
│   ├── attendance  - Attendance records
│   └── documents   - Employee documents
├── attendance/     - Attendance module
│   ├── today       - Today's status
│   ├── history     - Past records
│   └── stats       - Monthly stats
├── leave/          - Leave management
│   ├── balances    - Leave balances
│   ├── requests    - Leave requests
│   └── holidays    - Company holidays
├── payroll/        - Payroll module
│   ├── payslips    - Payslip history
│   └── tax         - Tax declarations
├── performance/    - Performance data
│   ├── goals       - Employee goals
│   ├── reviews     - Performance reviews
│   └── feedback    - 360 feedback
├── hr/             - HR management
│   ├── employees   - Employee directory
│   ├── approvals   - Pending approvals
│   └── reports     - HR reports
├── admin/          - Admin configuration
│   ├── system      - System settings
│   ├── roles       - Role definitions
│   └── audit       - Audit logs
└── ai/             - AI features data
    ├── attrition   - Risk predictions
    └── insights    - AI-generated insights
```

---

## 🌐 API Routes

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/login | User login |
| POST | /api/auth/logout | User logout |
| GET | /api/auth/verify | Verify session |
| POST | /api/auth/forgot-password | Password reset request |
| POST | /api/auth/reset-password | Reset password |
| POST | /api/auth/verify-mfa | MFA verification |

### Employees
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/employees/:id | Get employee details |
| PUT | /api/employees/:id | Update employee |
| GET | /api/hr/employees | List all employees |

### Attendance
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/attendance/today/:id | Today's attendance |
| POST | /api/attendance/check-in | Check in |
| POST | /api/attendance/check-out | Check out |
| GET | /api/attendance/monthly/:id | Monthly records |

### Leave
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/leave/balances/:id | Leave balances |
| GET | /api/leave/requests/:id | Leave requests |
| POST | /api/leave/apply | Apply for leave |
| GET | /api/leave/holidays | Company holidays |
| GET | /api/leave/pending-approvals | Pending approvals |

### Payroll
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/payroll/payslips/:id | Payslip list |
| GET | /api/payroll/payslip/:id/:payslipId | Payslip details |

### Performance
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/performance/goals/:id | Employee goals |
| GET | /api/performance/feedback/:id | Feedback |
| GET | /api/performance/trainings/:id | Training |

### AI
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/ai/attrition-risks | All attrition risks |
| GET | /api/ai/attrition-risk/:id | Employee risk |
| GET | /api/ai/performance-insight/:id | Performance insights |

### Admin
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/admin/roles | List roles |
| POST | /api/admin/roles | Create role |
| GET | /api/admin/dashboard/stats | System stats |

---

## 📱 Responsive Breakpoints

| Breakpoint | Width | Usage |
|------------|-------|-------|
| `sm` | 640px | Mobile landscape |
| `md` | 768px | Tablet |
| `lg` | 1024px | Desktop |
| `xl` | 1280px | Large desktop |
| `2xl` | 1536px | Extra large screens |

### Responsive Patterns
- **Mobile First:** Base styles for mobile, scale up
- **Sidebar:** Hidden on mobile, visible on lg+
- **Tables:** Horizontal scroll on mobile, full on desktop
- **Cards:** Single column on mobile, grid on desktop
- **Navigation:** Hamburger menu on mobile, full nav on desktop

---

## 🎯 Key Features Summary

### Implemented ✅
- [x] Role-based authentication
- [x] Employee self-service portal
- [x] Attendance tracking (check-in/out)
- [x] Leave management (apply, balances, requests)
- [x] Payroll viewing (payslips)
- [x] Performance management (goals, reviews)
- [x] AI attrition risk prediction
- [x] AI performance insights
- [x] HR dashboard with KPIs
- [x] Admin system monitoring
- [x] Responsive design
- [x] Redux state management

### In Progress 🔄
- [ ] Full employee directory
- [ ] Leave approval workflow
- [ ] Advanced reporting
- [ ] Hiring/ATS module

### Planned 📋
- [ ] Email/SMS notifications
- [ ] Document management
- [ ] Advanced analytics
- [ ] Third-party integrations
- [ ] Mobile app
- [ ] API webhooks

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Bun or npm
- Git

### Installation
```bash
# Clone repository
git clone <repo-url>

# Install dependencies
bun install

# Setup database
bun run db:push

# Start development server
bun run dev
```

### Access
- Application: http://localhost:3000
- Employee login: john.doe@company.com / password123
- HR login: jane.smith@company.com / password123
- Admin login: admin@company.com / admin123

---

## 📈 Future Roadmap

### Phase 1: Core HR (Current)
- Basic employee management
- Attendance & leave
- Simple payroll viewing

### Phase 2: Advanced HR
- Full ATS implementation
- Advanced reporting
- Performance cycles
- Bulk operations

### Phase 3: Enterprise
- Multi-tenant support
- Advanced integrations
- Custom workflows
- Mobile applications

### Phase 4: AI-First
- Predictive analytics
- Automated insights
- Natural language queries
- Smart recommendations

---

## 📝 Notes

- **Total Lines of Code:** 18,796
- **Framework:** Next.js 16 with App Router
- **Styling:** Tailwind CSS 4 + shadcn/ui
- **State:** Redux Toolkit
- **Database:** SQLite with Prisma ORM
- **AI SDK:** z-ai-web-dev-sdk

---

*Last Updated: February 2026*
*Version: 0.2.0*
