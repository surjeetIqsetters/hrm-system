# HRM System - Complete Specification Document

## 📋 Executive Summary

### Project Vision
Build a comprehensive, enterprise-grade Human Resource Management System that streamlines HR operations, empowers employee self-service, and leverages AI for predictive insights.

### Current State
- **Lines of Code:** 18,796
- **Screens Implemented:** 14/96 (15%)
- **Screens Missing:** 82/96 (85%)
- **Backend Status:** Mock data only
- **AI Features:** Attrition prediction, Performance insights (UI only)

### Target State
A production-ready HRM serving 3 user roles across 96 screens with real backend, AI-powered features, and enterprise-grade security.

---

## 🎯 Goals & Success Metrics

### Primary Goals

| Goal | Metric | Target |
|------|--------|--------|
| **Reduce HR Admin Time** | Hours spent on manual tasks | -50% |
| **Improve Employee Satisfaction** | Self-service adoption rate | >80% |
| **Data-Driven Decisions** | Reports generated monthly | >100 |
| **System Reliability** | Uptime SLA | 99.9% |
| **Performance** | Page load time | <2 seconds |

### Success Metrics by Role

**For Employees:**
- Zero HR dependency for routine tasks
- 24/7 access to personal data
- Clear visibility into leave, payroll, performance

**For HR Managers:**
- Centralized employee data
- Automated approval workflows
- Predictive attrition alerts
- Streamlined hiring process

**For Admins:**
- Complete system visibility
- Granular access control
- Compliance tracking
- Audit trail

---

## 🏢 Architecture Overview

### System Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                                │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐              │
│  │  Employee    │  │     HR       │  │    Admin     │              │
│  │     App      │  │     App      │  │     App      │              │
│  │  (34 Screens)│  │  (36 Screens)│  │  (26 Screens)│              │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘              │
└─────────┼─────────────────┼─────────────────┼──────────────────────┘
          │                 │                 │
          └─────────────────┼─────────────────┘
                            │
┌───────────────────────────▼─────────────────────────────────────────┐
│                      API LAYER (Next.js API Routes)                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐              │
│  │  Auth API    │  │ Employee API │  │   HR API     │              │
│  │  /api/auth/* │  │/api/employee*│  │  /api/hr/*   │              │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐              │
│  │  Admin API   │  │  AI API      │  │  Common API  │              │
│  │ /api/admin/* │  │  /api/ai/*   │  │ /api/*       │              │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘              │
└─────────┼─────────────────┼─────────────────┼──────────────────────┘
          │                 │                 │
          └─────────────────┼─────────────────┘
                            │
┌───────────────────────────▼─────────────────────────────────────────┐
│                   SERVICE LAYER (Business Logic)                    │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐              │
│  │ Auth Service │  │Employee Svc  │  │ Payroll Svc  │              │
│  │  (JWT, RBAC) │  │ (CRUD, Query)│  │(Calc, Export)│              │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐              │
│  │ Leave Service│  │Attendance Svc│  │  AI Service  │              │
│  │(Apply, Approve)│ (Check, Report)│ (Predictions) │              │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘              │
└─────────┼─────────────────┼─────────────────┼──────────────────────┘
          │                 │                 │
          └─────────────────┼─────────────────┘
                            │
┌───────────────────────────▼─────────────────────────────────────────┐
│                      DATA LAYER                                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐              │
│  │   Prisma     │  │   PostgreSQL │  │  File Store  │              │
│  │    ORM       │  │  (Production)│  │   (S3/Local) │              │
│  └──────────────┘  └──────────────┘  └──────────────┘              │
└─────────────────────────────────────────────────────────────────────┘
```

### Three-Application Structure

```
┌─────────────────────────────────────────────────────────────┐
│                     HRM SYSTEM                              │
├─────────────────┬─────────────────┬─────────────────────────┤
│  EMPLOYEE APP   │    HR APP       │     ADMIN APP           │
│  (34 Screens)   │  (36 Screens)   │    (26 Screens)         │
├─────────────────┼─────────────────┼─────────────────────────┤
│ • Profile       │ • Dashboard     │ • System Health         │
│ • Attendance    │ • Employees     │ • Role Management       │
│ • Leave         │ • Attendance    │ • Organization          │
│ • Payroll       │ • Leave         │ • Automation            │
│ • Performance   │ • Payroll       │ • Integrations          │
│ • AI Insights   │ • Performance   │ • Security              │
│ • Helpdesk      │ • Hiring/ATS    │ • AI Configuration      │
│ • Onboarding    │ • AI Insights   │                         │
│                 │ • Reports       │                         │
└─────────────────┴─────────────────┴─────────────────────────┘
```

---

## 📊 Current Status

### Implementation Progress

| Application | Implemented | Missing | Status |
|-------------|-------------|---------|--------|
| **Employee App** | 11/34 | 23 | 🟡 Partial |
| **HR App** | 2/36 | 34 | 🔴 Minimal |
| **Admin App** | 1/26 | 25 | 🔴 Minimal |
| **Total** | **14/96** | **82** | **15%** |

### Completed Features ✅

**Employee App:**
- Login with role-based auth
- Dashboard with navigation
- My Profile (personal, job, documents)
- Attendance (check-in/out, history)
- Leave (apply, balances, requests)
- Payroll (payslip viewing)
- Performance (goals, reviews)
- Announcements

**HR App:**
- Dashboard with KPIs
- AI Attrition Insights

**Admin App:**
- System Dashboard

**AI Features:**
- Attrition Risk Prediction
- Performance Insights

### Missing Critical Features 🔴

1. **Real Backend API** - All routes use mock data
2. **HR Operations** - Employee directory, approvals, payroll processing
3. **Admin Controls** - Role management, audit logs, integrations
4. **Notifications** - Email, in-app, push
5. **File Upload** - Resumes, documents, bulk import
6. **Reporting** - Custom reports, exports, analytics
7. **Search** - Global search, filters, auto-complete

---

## 🎨 Design System

### Color Palette

#### Primary Colors
| Token | Light Mode | Dark Mode | Usage |
|-------|------------|-----------|-------|
| `--background` | #ffffff | #0f172a | Page background |
| `--foreground` | #0f172a | #f8fafc | Primary text |
| `--card` | #ffffff | #1e293b | Card backgrounds |
| `--primary` | #3b82f6 | #60a5fa | Primary actions |
| `--secondary` | #f1f5f9 | #334155 | Secondary elements |
| `--muted` | #f1f5f9 | #334155 | Muted backgrounds |
| `--border` | #e2e8f0 | #334155 | Borders |

#### Semantic Colors
| Token | Value | Usage |
|-------|-------|-------|
| `--success` | #22c55e | Success states |
| `--warning` | #f59e0b | Warnings |
| `--info` | #3b82f6 | Information |
| `--danger` | #ef4444 | Errors, danger |

### Typography

| Element | Size | Weight | Line Height |
|---------|------|--------|-------------|
| H1 | 2.25rem (36px) | 700 | 1.2 |
| H2 | 1.875rem (30px) | 600 | 1.3 |
| H3 | 1.5rem (24px) | 600 | 1.4 |
| Body | 1rem (16px) | 400 | 1.6 |
| Small | 0.875rem (14px) | 400 | 1.5 |
| Caption | 0.75rem (12px) | 400 | 1.4 |

### Component Standards

#### Buttons
```tsx
// Variants: default, secondary, outline, ghost, destructive, link
// Sizes: sm, default, lg
<Button variant="default" size="default">
  Primary Action
</Button>
```

#### Cards
```tsx
// Standard card with header, content, footer
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>
    {/* Content */}
  </CardContent>
  <CardFooter>
    {/* Actions */}
  </CardFooter>
</Card>
```

#### Forms
- Input height: 2.5rem (40px)
- Label spacing: 0.5rem
- Error state: Red border + message
- Required fields: Red asterisk

#### Tables
- Header: Light background, semibold
- Row hover: Subtle background change
- Padding: py-3 px-4
- Actions: Right-aligned

---

## 👥 User Flows & Navigation

### Employee App Navigation
```
/employee
├── /dashboard              # Overview with quick actions
├── /profile
│   ├── /personal          # Personal information
│   ├── /job               # Job details
│   ├── /documents         # My documents
│   └── /settings          # Account settings
├── /attendance
│   ├── /                  # Today's status
│   ├── /history           # Past records
│   └── /calendar          # Monthly view
├── /leave
│   ├── /                  # Balances, quick apply
│   ├── /apply             # Application form
│   ├── /requests          # My requests
│   └── /holidays          # Company holidays
├── /payroll
│   ├── /                  # Overview
│   ├── /payslips          # All payslips
│   └── /tax               # Tax declarations
├── /performance
│   ├── /                  # Goals overview
│   ├── /goals             # Detailed goals
│   ├── /reviews           # Performance reviews
│   └── /ai-insights       # AI insights
├── /announcements         # Company news
├── /helpdesk              # Support
└── /training              # Learning
```

### HR App Navigation
```
/hr
├── /dashboard             # KPIs, approvals
├── /employees
│   ├── /                  # Directory
│   ├── /[id]              # Employee detail
│   └── /org-chart         # Organization chart
├── /attendance
│   ├── /monitor           # Daily monitoring
│   └── /reports           # Reports
├── /leave
│   ├── /approvals         # Approval queue
│   └── /policy            # Policies
├── /payroll
│   ├── /process           # Processing
│   └── /compliance        # Compliance
├── /performance
│   ├── /cycles            # Review cycles
│   └── /reviews           # Reviews
├── /hiring
│   ├── /jobs              # Job posts
│   ├── /candidates        # Pipeline
│   └── /interviews        # Scheduling
├── /ai
│   ├── /                  # AI dashboard
│   └── /attrition         # Risk analysis
└── /reports               # Analytics
```

### Admin App Navigation
```
/admin
├── /dashboard             # System health
├── /system
│   ├── /health            # Monitoring
│   └── /settings          # Configuration
├── /roles
│   ├── /                  # Role list
│   └── /[id]              # Edit permissions
├── /structure
│   ├── /departments       # Departments
│   ├── /designations      # Designations
│   └── /locations         # Offices
├── /automation
│   └── /workflows         # Workflow builder
├── /integrations
│   ├── /apis              # API keys
│   └── /webhooks          # Webhooks
├── /ai
│   └── /models            # AI settings
└── /security
    ├── /audit-logs        # Audit trail
    └── /settings          # Security config
```

---

## 🤖 AI Features Specification

### Implemented AI Features

#### 1. Attrition Risk Prediction

**Purpose:** Predict which employees are at risk of leaving

**Input Data:**
- Workload metrics (hours, projects)
- Engagement scores
- Tenure and career progression
- Compensation vs market rate
- Manager relationship scores
- Attendance patterns
- Leave utilization

**Output:**
```typescript
interface AttritionRisk {
  employeeId: string;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  riskScore: number; // 0-100
  factors: Array<{
    factor: string;
    impact: 'LOW' | 'MEDIUM' | 'HIGH';
    description: string;
  }>;
  recommendations: string[];
}
```

**Risk Levels:**
- **LOW (0-25):** Stable employee
- **MEDIUM (26-50):** Some concerns
- **HIGH (51-75):** At risk
- **CRITICAL (76-100):** Likely to leave

#### 2. Performance Insights

**Purpose:** AI-generated performance analysis

**Output:**
```typescript
interface PerformanceInsight {
  employeeId: string;
  summary: string;
  strengths: string[];
  improvements: string[];
  achievements: string[];
  trends: string;
  recommendations: string[];
}
```

### Planned AI Features

#### 3. Resume Ranking Engine

**Purpose:** Automatically rank candidates against job requirements

**Scoring Algorithm:**
```
Overall Score = 
  (Skills Match × 50%) +
  (Experience Match × 25%) +
  (Education Match × 15%) +
  (Keywords Match × 10%)
```

**Process:**
1. Parse resume (PDF/DOCX)
2. Extract skills, experience, education
3. Match against job requirements
4. Calculate weighted score
5. Rank candidates

#### 4. HR Policy Chatbot

**Purpose:** Answer employee questions about company policies

**Architecture:**
```
User Query → Embedding → Vector Search → 
Retrieve Context → Generate Response → Display Answer
```

**Features:**
- Natural language queries
- Source citations
- Conversation history
- Suggested follow-up questions

---

## 📅 Timeline & Budget Estimates

### Phase 1: MVP for Small Startup (2-3 months)

| Week | Focus | Deliverables | Cost |
|------|-------|--------------|------|
| 1-2 | Real Backend | Database, auth, CRUD APIs | $5k-8k |
| 3-4 | Employee App | All 34 screens | $8k-12k |
| 5-6 | HR Core | Directory, attendance, leave | $6k-10k |
| 7-8 | Payroll | Processing, payslips | $5k-8k |
| 9-10 | Notifications | Email, in-app | $3k-5k |
| 11-12 | Polish | Testing, deployment | $3k-7k |
| **Total** | | | **$30k-50k** |

**Outcome:** Usable for small companies (10-50 employees)

### Phase 2: HR Operations (2-3 months)

| Week | Focus | Deliverables | Cost |
|------|-------|--------------|------|
| 13-14 | ATS/Hiring | Job posts, candidate pipeline | $8k-12k |
| 15-16 | Performance | Review cycles, 360 feedback | $6k-10k |
| 17-18 | Reports | Custom reports, analytics | $6k-10k |
| 19-20 | Admin Core | Roles, org structure | $6k-10k |
| 21-22 | Integrations | APIs, webhooks | $5k-8k |
| 23-24 | Security | Audit logs, settings | $5k-8k |
| **Total** | | | **$40k-60k** |

**Outcome:** Ready for medium companies (50-500 employees)

### Phase 3: Enterprise Features (3-4 months)

| Month | Focus | Deliverables | Cost |
|-------|-------|--------------|------|
| 7 | Advanced | Workflow builder, automation | $15k-25k |
| 8 | AI | Resume ranking, chatbot | $20k-35k |
| 9 | Mobile | PWA or React Native app | $20k-35k |
| 10 | Multi-tenancy | Multiple organizations | $25k-55k |
| **Total** | | | **$80k-150k** |

**Outcome:** Enterprise-ready (500+ employees)

### Total Project Estimates

| Metric | Phase 1 | Phase 2 | Phase 3 | **Total** |
|--------|---------|---------|---------|-----------|
| Duration | 3 months | 3 months | 4 months | **10 months** |
| Developers | 2-3 | 3-4 | 4-6 | **-** |
| Screens | 34 | 36 | 26 | **96** |
| API Endpoints | 40 | 40 | 30 | **110** |
| Cost | $30k-50k | $40k-60k | $80k-150k | **$150k-260k** |

### Monthly Infrastructure Costs

| Service | Cost |
|---------|------|
| Vercel Pro | $20-100 |
| PostgreSQL (RDS/Supabase) | $50-200 |
| AWS S3 (Storage) | $10-50 |
| SendGrid (Email) | $20-90 |
| Monitoring | $20-50 |
| **Total** | **$120-490/month** |

---

## ✅ Readiness Checklist

### Small Startup Ready
- [x] Architecture defined
- [x] Design system documented
- [x] 14 screens implemented
- [ ] Real backend with database
- [ ] All Employee app screens
- [ ] Basic HR operations
- [ ] Email notifications
- [ ] File uploads
- [ ] Role-based access

### Enterprise Ready
- [ ] All 96 screens
- [ ] Complete ATS with AI ranking
- [ ] Advanced reporting
- [ ] Workflow automation
- [ ] AI chatbot
- [ ] Mobile app
- [ ] Multi-tenancy
- [ ] SOC 2 compliance
- [ ] 99.9% uptime SLA

---

## 🎯 Next Steps

1. **Review** this specification with stakeholders
2. **Prioritize** Phase 1 features for immediate development
3. **Assign** development team (2-3 developers)
4. **Setup** development environment
5. **Begin** Week 1-2: Backend implementation

---

*Document Version: 1.0*
*Last Updated: February 2026*
*Total Pages: 96 screens | 110 API endpoints | $150k-260k budget*
