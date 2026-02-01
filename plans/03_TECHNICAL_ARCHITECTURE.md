# HRM System - Technical Architecture

## 📐 System Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                                │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐              │
│  │  Employee    │  │     HR       │  │    Admin     │              │
│  │     App      │  │     App      │  │     App      │              │
│  │  (Next.js)   │  │  (Next.js)   │  │  (Next.js)   │              │
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
│  │   Prisma     │  │   SQLite     │  │  File Store  │              │
│  │    ORM       │  │  (Dev/Test)  │  │   (S3/Local) │              │
│  └──────────────┘  └──────────────┘  └──────────────┘              │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 🗂 Project Structure

```
hrm-system/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── api/                      # API Routes
│   │   │   ├── auth/                 # Authentication endpoints
│   │   │   │   ├── login/
│   │   │   │   ├── logout/
│   │   │   │   ├── verify/
│   │   │   │   └── ...
│   │   │   ├── employees/            # Employee CRUD
│   │   │   ├── attendance/           # Attendance endpoints
│   │   │   ├── leave/                # Leave management
│   │   │   ├── payroll/              # Payroll endpoints
│   │   │   ├── performance/          # Performance API
│   │   │   ├── hr/                   # HR-specific APIs
│   │   │   ├── admin/                # Admin APIs
│   │   │   └── ai/                   # AI feature APIs
│   │   ├── (auth)/                   # Auth group routes
│   │   │   └── login/
│   │   │       └── page.tsx
│   │   ├── employee/                 # Employee App
│   │   │   ├── page.tsx              # Dashboard
│   │   │   ├── profile/
│   │   │   ├── attendance/
│   │   │   ├── leave/
│   │   │   ├── payroll/
│   │   │   ├── performance/
│   │   │   └── ...
│   │   ├── hr/                       # HR App
│   │   │   ├── page.tsx              # HR Dashboard
│   │   │   ├── employees/
│   │   │   ├── attendance/
│   │   │   ├── leave/
│   │   │   ├── payroll/
│   │   │   ├── hiring/
│   │   │   └── ...
│   │   ├── admin/                    # Admin App
│   │   │   ├── page.tsx              # Admin Dashboard
│   │   │   ├── roles/
│   │   │   ├── structure/
│   │   │   └── ...
│   │   ├── layout.tsx                # Root layout
│   │   ├── globals.css               # Global styles
│   │   └── providers.tsx             # App providers
│   │
│   ├── components/                   # React Components
│   │   ├── ui/                       # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   └── ... (50+ components)
│   │   ├── layout/                   # Layout components
│   │   │   ├── dashboard-layout.tsx
│   │   │   ├── sidebar.tsx
│   │   │   └── header.tsx
│   │   ├── forms/                    # Form components
│   │   ├── tables/                   # Table components
│   │   ├── charts/                   # Chart components
│   │   └── modals/                   # Modal components
│   │
│   ├── lib/                          # Utility Libraries
│   │   ├── prisma.ts                 # Prisma client
│   │   ├── auth.ts                   # Auth utilities
│   │   ├── api-client.ts             # API client
│   │   ├── utils.ts                  # General utilities
│   │   ├── constants.ts              # App constants
│   │   ├── ai/                       # AI utilities
│   │   │   ├── resume-parser.ts
│   │   │   ├── scoring.ts
│   │   │   └── chat-service.ts
│   │   └── validations/              # Zod schemas
│   │       ├── auth.schema.ts
│   │       ├── employee.schema.ts
│   │       └── ...
│   │
│   ├── hooks/                        # Custom React Hooks
│   │   ├── use-auth.ts
│   │   ├── use-employee.ts
│   │   ├── use-attendance.ts
│   │   └── ...
│   │
│   ├── store/                        # Redux Store
│   │   ├── index.ts                  # Store configuration
│   │   ├── slices/
│   │   │   ├── auth.slice.ts
│   │   │   ├── employee.slice.ts
│   │   │   ├── attendance.slice.ts
│   │   │   ├── leave.slice.ts
│   │   │   ├── payroll.slice.ts
│   │   │   ├── performance.slice.ts
│   │   │   ├── hr.slice.ts
│   │   │   ├── admin.slice.ts
│   │   │   └── ai.slice.ts
│   │   └── middleware/
│   │       └── logger.ts
│   │
│   ├── services/                     # Business Logic Services
│   │   ├── auth.service.ts
│   │   ├── employee.service.ts
│   │   ├── attendance.service.ts
│   │   ├── leave.service.ts
│   │   ├── payroll.service.ts
│   │   └── ...
│   │
│   └── types/                        # TypeScript Types
│       ├── auth.types.ts
│       ├── employee.types.ts
│       ├── api.types.ts
│       └── ...
│
├── prisma/
│   ├── schema.prisma                 # Database schema
│   └── migrations/                   # Database migrations
│
├── public/                           # Static assets
│   ├── logo.svg
│   └── ...
│
├── tests/                            # Test files
│   ├── unit/
│   ├── integration/
│   └── e2e/
│
├── docs/                             # Documentation
│   └── ...
│
├── .env                              # Environment variables
├── .env.example                      # Env example
├── next.config.ts                    # Next.js config
├── tailwind.config.ts                # Tailwind config
├── tsconfig.json                     # TypeScript config
├── eslint.config.mjs                 # ESLint config
└── package.json                      # Dependencies
```

---

## 🗄 Database Schema

### Core Entities

```prisma
// User & Authentication
model User {
  id            String    @id @default(uuid())
  email         String    @unique
  password      String    // Hashed with bcrypt
  role          UserRole  @default(EMPLOYEE)
  status        UserStatus @default(ACTIVE)
  emailVerified DateTime?
  lastLoginAt   DateTime?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  
  // Relations
  profile       Profile?
  sessions      Session[]
  attendance    Attendance[]
  leaveRequests LeaveRequest[]
  payslips      Payslip[]
  goals         Goal[]
  reviews       PerformanceReview[]
  
  @@map("users")
}

model Session {
  id        String   @id @default(uuid())
  userId    String
  token     String   @unique
  expiresAt DateTime
  createdAt DateTime @default(now())
  
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@map("sessions")
}

// Employee Profile
model Profile {
  id            String   @id @default(uuid())
  userId        String   @unique
  
  // Personal Info
  firstName     String
  lastName      String
  dateOfBirth   DateTime?
  gender        Gender?
  phone         String?
  address       String?
  
  // Job Info
  employeeId    String   @unique
  department    String
  designation   String
  joinDate      DateTime
  employmentType EmploymentType @default(FULL_TIME)
  
  // Compensation
  salary        Decimal? @db.Decimal(10, 2)
  currency      String   @default("USD")
  
  // Relations
  user          User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  documents     Document[]
  
  @@map("profiles")
}

// Attendance
model Attendance {
  id          String           @id @default(uuid())
  userId      String
  date        DateTime
  checkIn     DateTime?
  checkOut    DateTime?
  status      AttendanceStatus @default(PRESENT)
  workHours   Float?
  location    String?
  notes       String?
  
  user        User             @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@unique([userId, date])
  @@map("attendance")
}

// Leave Management
model LeaveRequest {
  id          String        @id @default(uuid())
  userId      String
  type        LeaveType
  startDate   DateTime
  endDate     DateTime
  days        Float
  reason      String
  status      RequestStatus @default(PENDING)
  approvedBy  String?
  approvedAt  DateTime?
  rejectionReason String?
  
  user        User          @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@map("leave_requests")
}

model LeaveBalance {
  id          String    @id @default(uuid())
  userId      String
  type        LeaveType
  year        Int
  totalDays   Float
  usedDays    Float     @default(0)
  pendingDays Float     @default(0)
  
  @@unique([userId, type, year])
  @@map("leave_balances")
}

// Payroll
model Payslip {
  id              String   @id @default(uuid())
  userId          String
  month           Int
  year            Int
  
  // Earnings
  basicSalary     Decimal  @db.Decimal(10, 2)
  hra             Decimal  @default(0) @db.Decimal(10, 2)
  allowances      Json     // [{name, amount}]
  grossSalary     Decimal  @db.Decimal(10, 2)
  
  // Deductions
  tax             Decimal  @default(0) @db.Decimal(10, 2)
  insurance       Decimal  @default(0) @db.Decimal(10, 2)
  otherDeductions Json     // [{name, amount}]
  totalDeductions Decimal  @db.Decimal(10, 2)
  
  // Net
  netSalary       Decimal  @db.Decimal(10, 2)
  
  // File
  fileUrl         String?
  
  user            User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@unique([userId, month, year])
  @@map("payslips")
}

// Performance Management
model Goal {
  id          String     @id @default(uuid())
  userId      String
  title       String
  description String?
  category    GoalCategory
  startDate   DateTime
  endDate     DateTime
  status      GoalStatus @default(ACTIVE)
  progress    Int        @default(0) // 0-100
  weight      Float      @default(1.0)
  
  user        User       @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@map("goals")
}

model PerformanceReview {
  id          String   @id @default(uuid())
  userId      String
  reviewerId  String
  cycleId     String
  
  // Ratings
  overallRating Int?   // 1-5
  ratings       Json   // [{criteria, rating, comment}]
  
  // Feedback
  strengths     String? @db.Text
  improvements  String? @db.Text
  comments      String? @db.Text
  
  status        ReviewStatus @default(DRAFT)
  submittedAt   DateTime?
  
  user          User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@map("performance_reviews")
}

// Documents
model Document {
  id          String       @id @default(uuid())
  profileId   String
  name        String
  type        DocumentType
  fileUrl     String
  fileSize    Int
  uploadedAt  DateTime     @default(now())
  
  profile     Profile      @relation(fields: [profileId], references: [id], onDelete: Cascade)
  
  @@map("documents")
}

// Hiring/ATS
model Job {
  id            String    @id @default(uuid())
  title         String
  department    String
  description   String    @db.Text
  requirements  String[]  // Required skills
  experienceMin Int
  experienceMax Int?
  location      String
  salaryMin     Decimal?  @db.Decimal(10, 2)
  salaryMax     Decimal?  @db.Decimal(10, 2)
  status        JobStatus @default(OPEN)
  postedAt      DateTime  @default(now())
  
  candidates    Candidate[]
  
  @@map("jobs")
}

model Candidate {
  id          String          @id @default(uuid())
  jobId       String
  name        String
  email       String
  phone       String?
  resumeUrl   String
  resumeText  String?         @db.Text
  skills      String[]
  experience  Int             // Years
  education   Json?
  score       Float?
  status      CandidateStatus @default(APPLIED)
  appliedAt   DateTime        @default(now())
  
  job         Job             @relation(fields: [jobId], references: [id], onDelete: Cascade)
  
  @@map("candidates")
}

// AI Features
model AttritionRisk {
  id          String    @id @default(uuid())
  userId      String    @unique
  riskLevel   RiskLevel
  riskScore   Float     // 0-100
  factors     Json      // [{factor, impact, description}]
  recommendations String[]
  predictedAt DateTime  @default(now())
  
  @@map("attrition_risks")
}

// Audit Logs
model AuditLog {
  id          String   @id @default(uuid())
  userId      String?
  action      String
  entity      String
  entityId    String?
  oldValue    Json?
  newValue    Json?
  ipAddress   String?
  userAgent   String?
  createdAt   DateTime @default(now())
  
  @@map("audit_logs")
}

// Enums
enum UserRole {
  EMPLOYEE
  HR
  ADMIN
}

enum UserStatus {
  ACTIVE
  INACTIVE
  SUSPENDED
}

enum Gender {
  MALE
  FEMALE
  OTHER
  PREFER_NOT_TO_SAY
}

enum EmploymentType {
  FULL_TIME
  PART_TIME
  CONTRACT
  INTERN
}

enum AttendanceStatus {
  PRESENT
  ABSENT
  LATE
  HALF_DAY
  WORK_FROM_HOME
  ON_LEAVE
}

enum LeaveType {
  CASUAL
  SICK
  EARNED
  UNPAID
  MATERNITY
  PATERNITY
  BEREAVEMENT
}

enum RequestStatus {
  PENDING
  APPROVED
  REJECTED
  CANCELLED
}

enum GoalCategory {
  PROFESSIONAL
  PERSONAL
  TEAM
  COMPANY
}

enum GoalStatus {
  ACTIVE
  COMPLETED
  CANCELLED
}

enum ReviewStatus {
  DRAFT
  SUBMITTED
  ACKNOWLEDGED
}

enum DocumentType {
  ID_PROOF
  ADDRESS_PROOF
  EDUCATION
  EXPERIENCE
  PAYSLIP
  OTHER
}

enum JobStatus {
  OPEN
  CLOSED
  ON_HOLD
}

enum CandidateStatus {
  APPLIED
  SCREENING
  INTERVIEW
  OFFERED
  HIRED
  REJECTED
}

enum RiskLevel {
  LOW
  MEDIUM
  HIGH
  CRITICAL
}
```

---

## 🔐 Authentication Flow

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│    User     │     │   Client    │     │   Server    │
└──────┬──────┘     └──────┬──────┘     └──────┬──────┘
       │                   │                   │
       │  1. Enter creds   │                   │
       │──────────────────>│                   │
       │                   │                   │
       │                   │  2. POST /login   │
       │                   │──────────────────>│
       │                   │                   │
       │                   │                   │ 3. Validate
       │                   │                   │    credentials
       │                   │                   │
       │                   │                   │ 4. Generate JWT
       │                   │                   │
       │                   │ 5. Return token   │
       │                   │<──────────────────│
       │                   │                   │
       │  6. Store token   │                   │
       │<──────────────────│                   │
       │                   │                   │
       │  7. Access page   │                   │
       │──────────────────>│                   │
       │                   │                   │
       │                   │ 8. Request + JWT  │
       │                   │──────────────────>│
       │                   │                   │
       │                   │                   │ 9. Verify JWT
       │                   │                   │
       │                   │ 10. Return data   │
       │                   │<──────────────────│
       │                   │                   │
       │  11. Show data    │                   │
       │<──────────────────│                   │
       │                   │                   │
```

### JWT Token Structure

```typescript
// Payload
interface JWTPayload {
  sub: string;        // User ID
  email: string;      // User email
  role: UserRole;     // EMPLOYEE | HR | ADMIN
  iat: number;        // Issued at
  exp: number;        // Expiration (24h)
}

// Token stored in HTTP-only cookie
// Refresh token rotation for security
```

---

## 📡 API Design

### RESTful Endpoints

#### Authentication
```
POST   /api/auth/login              # Login with credentials
POST   /api/auth/logout             # Logout user
GET    /api/auth/verify             # Verify session
POST   /api/auth/forgot-password    # Request password reset
POST   /api/auth/reset-password     # Reset password
POST   /api/auth/verify-mfa         # Verify MFA code
```

#### Employees
```
GET    /api/employees               # List employees (HR/Admin only)
POST   /api/employees               # Create employee (HR/Admin only)
GET    /api/employees/:id           # Get employee details
PUT    /api/employees/:id           # Update employee
DELETE /api/employees/:id           # Delete employee (Admin only)
GET    /api/employees/:id/attendance # Get attendance history
GET    /api/employees/:id/leave     # Get leave history
GET    /api/employees/:id/payslips  # Get payslips
GET    /api/employees/:id/goals     # Get performance goals
```

#### Attendance
```
GET    /api/attendance/today/:id     # Today's attendance
POST   /api/attendance/check-in     # Check in
POST   /api/attendance/check-out    # Check out
GET    /api/attendance/monthly/:id  # Monthly records
GET    /api/attendance/report       # Generate report (HR only)
```

#### Leave
```
GET    /api/leave/balances/:id      # Leave balances
GET    /api/leave/requests/:id      # Leave requests
POST   /api/leave/apply             # Apply for leave
PUT    /api/leave/:id/approve       # Approve leave (HR only)
PUT    /api/leave/:id/reject        # Reject leave (HR only)
GET    /api/leave/holidays          # Company holidays
GET    /api/leave/pending-approvals # Pending approvals (HR only)
```

#### Payroll
```
GET    /api/payroll/payslips/:id    # List payslips
GET    /api/payroll/payslip/:id/:payslipId  # Get payslip details
POST   /api/payroll/process         # Process payroll (HR only)
GET    /api/payroll/compliance      # Compliance report (HR only)
```

#### Performance
```
GET    /api/performance/goals/:id   # Get goals
POST   /api/performance/goals       # Create goal
PUT    /api/performance/goals/:id   # Update goal
GET    /api/performance/reviews/:id # Get reviews
POST   /api/performance/reviews     # Submit review
```

#### HR
```
GET    /api/hr/dashboard/stats      # Dashboard statistics
GET    /api/hr/employees            # Employee directory
GET    /api/hr/approvals/pending    # Pending approvals
```

#### Admin
```
GET    /api/admin/dashboard/stats   # System stats
GET    /api/admin/roles             # List roles
POST   /api/admin/roles             # Create role
PUT    /api/admin/roles/:id         # Update role
DELETE /api/admin/roles/:id         # Delete role
GET    /api/admin/audit-logs        # Audit logs
GET    /api/admin/system/health     # System health
```

#### AI
```
GET    /api/ai/attrition-risks      # All attrition risks
GET    /api/ai/attrition-risk/:id   # Employee risk
GET    /api/ai/performance-insight/:id  # Performance insights
POST   /api/ai/rank-resumes         # Rank candidates
POST   /api/ai/chat                 # HR policy chat
```

### API Response Format

```typescript
// Success Response
interface ApiResponse<T> {
  success: true;
  data: T;
  message?: string;
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Error Response
interface ApiError {
  success: false;
  error: {
    code: string;
    message: string;
    details?: Record<string, string[]>;
  };
}

// Example Success
{
  "success": true,
  "data": {
    "id": "123",
    "name": "John Doe",
    "email": "john@company.com"
  },
  "message": "Employee retrieved successfully"
}

// Example Error
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": {
      "email": ["Email is required"],
      "password": ["Password must be at least 8 characters"]
    }
  }
}
```

---

## 🏪 Redux Store Architecture

### Store Structure

```typescript
// store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth.slice';
import employeeReducer from './slices/employee.slice';
import attendanceReducer from './slices/attendance.slice';
import leaveReducer from './slices/leave.slice';
import payrollReducer from './slices/payroll.slice';
import performanceReducer from './slices/performance.slice';
import hrReducer from './slices/hr.slice';
import adminReducer from './slices/admin.slice';
import aiReducer from './slices/ai.slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    employee: employeeReducer,
    attendance: attendanceReducer,
    leave: leaveReducer,
    payroll: payrollReducer,
    performance: performanceReducer,
    hr: hrReducer,
    admin: adminReducer,
    ai: aiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

### Slice Example: Auth

```typescript
// store/slices/auth.slice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from '@/services/auth.service';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

// Async thunks
export const login = createAsyncThunk(
  'auth/login',
  async (credentials: LoginCredentials) => {
    const response = await authService.login(credentials);
    return response.data;
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async () => {
    await authService.logout();
  }
);

export const fetchCurrentUser = createAsyncThunk(
  'auth/fetchCurrentUser',
  async () => {
    const response = await authService.getCurrentUser();
    return response.data;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Login failed';
      })
      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      })
      // Fetch current user
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
```

---

## 🔒 Security Implementation

### Authentication
- JWT tokens with 24h expiration
- HTTP-only cookies for token storage
- Refresh token rotation
- Password hashing with bcrypt (salt rounds: 12)
- Rate limiting on auth endpoints

### Authorization
- Role-based access control (RBAC)
- Middleware for route protection
- API-level permission checks
- Resource-level authorization (user can only access own data)

### Data Protection
- Input validation with Zod schemas
- SQL injection prevention (Prisma ORM)
- XSS protection (React escaping)
- CSRF tokens for state-changing operations
- HTTPS enforcement

### Audit & Monitoring
- Comprehensive audit logging
- Failed login attempt tracking
- Suspicious activity detection
- IP-based rate limiting

---

## 🧪 Testing Strategy

### Unit Tests
```
tests/unit/
├── services/
│   ├── auth.service.test.ts
│   ├── employee.service.test.ts
│   └── ...
├── components/
│   ├── button.test.tsx
│   ├── form.test.tsx
│   └── ...
└── utils/
    ├── validations.test.ts
    └── helpers.test.ts
```

### Integration Tests
```
tests/integration/
├── api/
│   ├── auth.routes.test.ts
│   ├── employee.routes.test.ts
│   └── ...
└── workflows/
    ├── leave-workflow.test.ts
    └── payroll-workflow.test.ts
```

### E2E Tests
```
tests/e2e/
├── employee/
│   ├── login.spec.ts
│   ├── attendance.spec.ts
│   └── leave.spec.ts
├── hr/
│   ├── dashboard.spec.ts
│   └── approvals.spec.ts
└── admin/
    └── system.spec.ts
```

---

## 🚀 Deployment Architecture

### Production Setup

```
┌─────────────────────────────────────────────────────────────┐
│                        CDN (Cloudflare)                     │
│                   Static Assets, Caching                    │
└───────────────────────────┬─────────────────────────────────┘
                            │
┌───────────────────────────▼─────────────────────────────────┐
│                    Vercel Edge Network                      │
│              Next.js Application (Serverless)               │
└───────────────────────────┬─────────────────────────────────┘
                            │
┌───────────────────────────▼─────────────────────────────────┐
│                   PostgreSQL Database                       │
│              (Supabase / AWS RDS / Neon)                    │
└───────────────────────────┬─────────────────────────────────┘
                            │
┌───────────────────────────▼─────────────────────────────────┐
│                     AWS S3 Storage                          │
│              File Uploads, Documents                        │
└─────────────────────────────────────────────────────────────┘
```

### Environment Configuration

```bash
# .env.production
NODE_ENV=production
NEXTAUTH_URL=https://hrm.company.com
NEXTAUTH_SECRET=your-secret-key

DATABASE_URL=postgresql://...

AWS_S3_BUCKET=hrm-documents
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...

SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASSWORD=...

AI_API_KEY=...
```

---

## 📊 Performance Optimization

### Frontend
- Code splitting by route
- Lazy loading for heavy components
- Image optimization with Next.js Image
- Font optimization
- CSS optimization with Tailwind

### Backend
- Database query optimization
- Connection pooling
- Redis caching for frequently accessed data
- API response caching
- CDN for static assets

### Database
- Proper indexing on foreign keys
- Query optimization
- Connection pooling
- Read replicas for heavy read operations

---

*Document Version: 1.0*
*Last Updated: February 2026*
