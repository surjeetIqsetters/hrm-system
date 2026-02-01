# HRM System - Detailed Implementation Guide

## 🎯 Purpose

This guide provides step-by-step implementation details for all missing features, making it easy for developers to start coding immediately.

---

## 📋 Table of Contents

1. [Phase 1: Real Backend Implementation](#phase-1-real-backend-implementation)
2. [Phase 2: Employee App Screens](#phase-2-employee-app-screens)
3. [Phase 3: HR App Screens](#phase-3-hr-app-screens)
4. [Phase 4: Admin App Screens](#phase-4-admin-app-screens)
5. [Phase 5: Shared Features](#phase-5-shared-features)

---

## Phase 1: Real Backend Implementation

### Week 1-2: Database & Authentication

#### Day 1-2: Complete Prisma Schema

**File:** `prisma/schema.prisma`

```prisma
// Add these complete models to your existing schema

// ============================================
// USER & AUTHENTICATION
// ============================================

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
  feedbackGiven PerformanceReview[] @relation("Reviewer")
  chatSessions  ChatSession[]
  auditLogs     AuditLog[]
  
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

// ============================================
// EMPLOYEE PROFILE
// ============================================

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
  emergencyContact Json?  // { name, phone, relation }
  
  // Job Info
  employeeId    String   @unique
  departmentId  String
  department    Department @relation(fields: [departmentId], references: [id])
  designationId String
  designation   Designation @relation(fields: [designationId], references: [id])
  locationId    String?
  location      Location? @relation(fields: [locationId], references: [id])
  joinDate      DateTime
  employmentType EmploymentType @default(FULL_TIME)
  managerId     String?
  manager       User?    @relation(fields: [managerId], references: [id], name: "ManagerRelation")
  
  // Compensation
  salary        Decimal? @db.Decimal(10, 2)
  currency      String   @default("USD")
  
  // Relations
  user          User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  documents     Document[]
  
  @@map("profiles")
}

model Department {
  id          String    @id @default(uuid())
  name        String    @unique
  description String?
  headId      String?
  parentId    String?
  parent      Department? @relation("DepartmentHierarchy", fields: [parentId], references: [id])
  children    Department[] @relation("DepartmentHierarchy")
  profiles    Profile[]
  createdAt   DateTime  @default(now())
  
  @@map("departments")
}

model Designation {
  id          String    @id @default(uuid())
  title       String    @unique
  level       Int       // 1-10 hierarchy level
  description String?
  profiles    Profile[]
  
  @@map("designations")
}

model Location {
  id       String    @id @default(uuid())
  name     String
  address  String
  city     String
  country  String
  profiles Profile[]
  
  @@map("locations")
}

// ============================================
// ATTENDANCE
// ============================================

model Attendance {
  id          String           @id @default(uuid())
  userId      String
  date        DateTime
  checkIn     DateTime?
  checkOut    DateTime?
  status      AttendanceStatus @default(PRESENT)
  workHours   Float?
  location    String?          // GPS coordinates or office location
  notes       String?
  approvedBy  String?
  approvedAt  DateTime?
  
  user        User             @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@unique([userId, date])
  @@index([userId, date])
  @@map("attendance")
}

// ============================================
// LEAVE MANAGEMENT
// ============================================

model LeaveRequest {
  id              String        @id @default(uuid())
  userId          String
  type            LeaveType
  startDate       DateTime
  endDate         DateTime
  days            Float
  reason          String
  status          RequestStatus @default(PENDING)
  approvedBy      String?
  approvedAt      DateTime?
  rejectionReason String?
  attachmentUrl   String?       // Medical certificate, etc.
  
  user            User          @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@index([userId, status])
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
  carriedOver Float     @default(0)
  
  @@unique([userId, type, year])
  @@map("leave_balances")
}

model Holiday {
  id       String   @id @default(uuid())
  date     DateTime
  name     String
  type     HolidayType
  recurring Boolean @default(true)
  
  @@map("holidays")
}

// ============================================
// PAYROLL
// ============================================

model Payslip {
  id              String   @id @default(uuid())
  userId          String
  month           Int
  year            Int
  
  // Earnings
  basicSalary     Decimal  @db.Decimal(10, 2)
  hra             Decimal  @default(0) @db.Decimal(10, 2)
  allowances      Json     // [{name, amount}]
  bonuses         Json     // [{name, amount}]
  grossSalary     Decimal  @db.Decimal(10, 2)
  
  // Deductions
  tax             Decimal  @default(0) @db.Decimal(10, 2)
  insurance       Decimal  @default(0) @db.Decimal(10, 2)
  pf              Decimal  @default(0) @db.Decimal(10, 2)
  otherDeductions Json     // [{name, amount}]
  totalDeductions Decimal  @db.Decimal(10, 2)
  
  // Net
  netSalary       Decimal  @db.Decimal(10, 2)
  
  // File
  fileUrl         String?
  
  // Status
  status          PayslipStatus @default(DRAFT)
  processedBy     String?
  processedAt     DateTime?
  
  user            User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@unique([userId, month, year])
  @@map("payslips")
}

model PayrollPeriod {
  id          String   @id @default(uuid())
  month       Int
  year        Int
  startDate   DateTime
  endDate     DateTime
  status      PayrollPeriodStatus @default(OPEN)
  processedAt DateTime?
  processedBy String?
  
  @@unique([month, year])
  @@map("payroll_periods")
}

// ============================================
// PERFORMANCE MANAGEMENT
// ============================================

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
  
  // Tracking
  milestones  Json[]     // [{title, dueDate, completed}]
  
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt
  
  user        User       @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@map("goals")
}

model PerformanceReview {
  id          String   @id @default(uuid())
  userId      String
  reviewerId  String
  cycleId     String
  
  // Ratings (1-5 scale)
  overallRating Int?
  ratings       Json     // [{criteria, rating, comment}]
  
  // Feedback
  strengths     String? @db.Text
  improvements  String? @db.Text
  achievements  String? @db.Text
  comments      String? @db.Text
  
  status        ReviewStatus @default(DRAFT)
  submittedAt   DateTime?
  acknowledgedAt DateTime?
  
  user          User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  reviewer      User     @relation(fields: [reviewerId], references: [id], name: "Reviewer", onDelete: Cascade)
  cycle         ReviewCycle @relation(fields: [cycleId], references: [id])
  
  @@map("performance_reviews")
}

model ReviewCycle {
  id          String   @id @default(uuid())
  name        String
  startDate   DateTime
  endDate     DateTime
  status      CycleStatus @default(PLANNING)
  
  reviews     PerformanceReview[]
  
  @@map("review_cycles")
}

// ============================================
// DOCUMENTS
// ============================================

model Document {
  id          String       @id @default(uuid())
  profileId   String
  name        String
  type        DocumentType
  category    String       // ID, Education, Experience, etc.
  fileUrl     String
  fileSize    Int
  mimeType    String
  uploadedBy  String
  uploadedAt  DateTime     @default(now())
  
  profile     Profile      @relation(fields: [profileId], references: [id], onDelete: Cascade)
  
  @@map("documents")
}

// ============================================
// HIRING / ATS
// ============================================

model Job {
  id            String    @id @default(uuid())
  title         String
  departmentId  String
  department    Department @relation(fields: [departmentId], references: [id])
  description   String    @db.Text
  requirements  String[]  // Required skills
  responsibilities String[]
  experienceMin Int
  experienceMax Int?
  locationId    String?
  location      Location? @relation(fields: [locationId], references: [id])
  salaryMin     Decimal?  @db.Decimal(10, 2)
  salaryMax     Decimal?  @db.Decimal(10, 2)
  employmentType EmploymentType @default(FULL_TIME)
  status        JobStatus @default(OPEN)
  postedBy      String
  postedAt      DateTime  @default(now())
  closesAt      DateTime?
  
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
  education   Json?           // [{degree, field, institution, year}]
  currentCompany String?
  currentTitle   String?
  expectedSalary Decimal?     @db.Decimal(10, 2)
  score       Float?
  status      CandidateStatus @default(APPLIED)
  stage       InterviewStage  @default(SCREENING)
  source      String          // LinkedIn, Referral, etc.
  appliedAt   DateTime        @default(now())
  
  job         Job             @relation(fields: [jobId], references: [id], onDelete: Cascade)
  interviews  Interview[]
  notes       CandidateNote[]
  
  @@map("candidates")
}

model Interview {
  id          String   @id @default(uuid())
  candidateId String
  candidate   Candidate @relation(fields: [candidateId], references: [id], onDelete: Cascade)
  scheduledAt DateTime
  duration    Int      // Minutes
  type        InterviewType
  interviewerIds String[]
  location    String?  // Video link or physical location
  status      InterviewStatus @default(SCHEDULED)
  feedback    Json?    // {rating, strengths, weaknesses, recommendation}
  notes       String?
  
  @@map("interviews")
}

model CandidateNote {
  id          String   @id @default(uuid())
  candidateId String
  candidate   Candidate @relation(fields: [candidateId], references: [id], onDelete: Cascade)
  content     String
  createdBy   String
  createdAt   DateTime @default(now())
  
  @@map("candidate_notes")
}

// ============================================
// AI FEATURES
// ============================================

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

model PolicyDocument {
  id          String   @id @default(uuid())
  title       String
  category    String   // LEAVE, PAYROLL, CONDUCT, etc.
  content     String   @db.Text
  fileUrl     String?
  createdBy   String
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  chunks      PolicyChunk[]
  
  @@map("policy_documents")
}

model PolicyChunk {
  id          String   @id @default(uuid())
  documentId  String
  document    PolicyDocument @relation(fields: [documentId], references: [id], onDelete: Cascade)
  content     String
  section     String
  embedding   Bytes?   // Vector embedding for search
  
  @@map("policy_chunks")
}

model ChatSession {
  id          String    @id @default(uuid())
  userId      String
  user        User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  messages    ChatMessage[]
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  
  @@map("chat_sessions")
}

model ChatMessage {
  id          String   @id @default(uuid())
  sessionId   String
  session     ChatSession @relation(fields: [sessionId], references: [id], onDelete: Cascade)
  role        String   // user, assistant
  content     String   @db.Text
  sources     Json?    // Referenced policies
  createdAt   DateTime @default(now())
  
  @@map("chat_messages")
}

// ============================================
// ADMIN & SECURITY
// ============================================

model Role {
  id          String   @id @default(uuid())
  name        String   @unique
  description String?
  permissions String[] // ["employees:read", "employees:write", ...]
  isDefault   Boolean  @default(false)
  userCount   Int      @default(0)
  
  @@map("roles")
}

model AuditLog {
  id          String   @id @default(uuid())
  userId      String?
  user        User?    @relation(fields: [userId], references: [id])
  action      String   // CREATE, UPDATE, DELETE, LOGIN, etc.
  entity      String   // Employee, Leave, etc.
  entityId    String?
  oldValue    Json?
  newValue    Json?
  ipAddress   String?
  userAgent   String?
  createdAt   DateTime @default(now())
  
  @@index([userId, createdAt])
  @@index([entity, entityId])
  @@map("audit_logs")
}

model Notification {
  id          String   @id @default(uuid())
  userId      String
  type        NotificationType
  title       String
  message     String
  data        Json?    // Additional context
  read        Boolean  @default(false)
  readAt      DateTime?
  createdAt   DateTime @default(now())
  
  @@index([userId, read])
  @@map("notifications")
}

// ============================================
// ENUMS
// ============================================

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

enum HolidayType {
  PUBLIC
  COMPANY
  OPTIONAL
}

enum PayslipStatus {
  DRAFT
  PROCESSED
  PUBLISHED
}

enum PayrollPeriodStatus {
  OPEN
  PROCESSING
  CLOSED
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

enum CycleStatus {
  PLANNING
  ACTIVE
  COMPLETED
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
  DRAFT
}

enum CandidateStatus {
  APPLIED
  SCREENING
  INTERVIEW
  OFFERED
  HIRED
  REJECTED
  WITHDRAWN
}

enum InterviewStage {
  SCREENING
  PHONE
  TECHNICAL
  CULTURE_FIT
  FINAL
}

enum InterviewType {
  PHONE
  VIDEO
  IN_PERSON
}

enum InterviewStatus {
  SCHEDULED
  COMPLETED
  CANCELLED
  NO_SHOW
}

enum RiskLevel {
  LOW
  MEDIUM
  HIGH
  CRITICAL
}

enum NotificationType {
  LEAVE_APPROVAL
  PAYROLL_PROCESSED
  PERFORMANCE_REVIEW
  ANNOUNCEMENT
  SYSTEM
}
```

#### Day 3-4: Authentication Service

**File:** `src/lib/auth.ts`

```typescript
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from './prisma';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRES_IN = '24h';

export interface JWTPayload {
  sub: string;
  email: string;
  role: string;
}

// Hash password
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

// Verify password
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

// Generate JWT token
export function generateToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

// Verify JWT token
export function verifyToken(token: string): JWTPayload {
  return jwt.verify(token, JWT_SECRET) as JWTPayload;
}

// Create session
export async function createSession(userId: string): Promise<string> {
  const token = generateToken({ sub: userId, email: '', role: '' });
  
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 1);
  
  await prisma.session.create({
    data: {
      userId,
      token,
      expiresAt
    }
  });
  
  // Set cookie
  cookies().set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    expires: expiresAt
  });
  
  return token;
}

// Get current session
export async function getSession() {
  const token = cookies().get('token')?.value;
  
  if (!token) return null;
  
  try {
    const payload = verifyToken(token);
    
    // Check if session exists in database
    const session = await prisma.session.findUnique({
      where: { token },
      include: { user: { include: { profile: true } } }
    });
    
    if (!session || session.expiresAt < new Date()) {
      return null;
    }
    
    return {
      user: {
        id: session.user.id,
        email: session.user.email,
        role: session.user.role,
        profile: session.user.profile
      }
    };
  } catch {
    return null;
  }
}

// Destroy session
export async function destroySession() {
  const token = cookies().get('token')?.value;
  
  if (token) {
    await prisma.session.deleteMany({ where: { token } });
    cookies().delete('token');
  }
}
```

#### Day 5-7: API Services Layer

**File:** `src/services/employee.service.ts`

```typescript
import { prisma } from '@/lib/prisma';
import { hashPassword } from '@/lib/auth';

export class EmployeeService {
  // Create employee
  static async create(data: CreateEmployeeInput) {
    const hashedPassword = await hashPassword(data.password);
    
    const user = await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        role: data.role,
        profile: {
          create: {
            firstName: data.firstName,
            lastName: data.lastName,
            employeeId: data.employeeId,
            departmentId: data.departmentId,
            designationId: data.designationId,
            joinDate: data.joinDate,
            salary: data.salary
          }
        }
      },
      include: { profile: true }
    });
    
    // Create leave balances for current year
    const currentYear = new Date().getFullYear();
    const leaveTypes = ['CASUAL', 'SICK', 'EARNED'];
    
    await prisma.leaveBalance.createMany({
      data: leaveTypes.map(type => ({
        userId: user.id,
        type: type as any,
        year: currentYear,
        totalDays: type === 'CASUAL' ? 12 : type === 'SICK' ? 10 : 20
      }))
    });
    
    return user;
  }
  
  // Get all employees with filters
  static async findAll(params: {
    page?: number;
    limit?: number;
    department?: string;
    status?: string;
    search?: string;
  }) {
    const { page = 1, limit = 20, department, status, search } = params;
    
    const where: any = {};
    
    if (department) {
      where.profile = { departmentId: department };
    }
    
    if (status) {
      where.status = status;
    }
    
    if (search) {
      where.OR = [
        { email: { contains: search, mode: 'insensitive' } },
        { profile: { firstName: { contains: search, mode: 'insensitive' } } },
        { profile: { lastName: { contains: search, mode: 'insensitive' } } }
      ];
    }
    
    const [employees, total] = await Promise.all([
      prisma.user.findMany({
        where,
        include: {
          profile: {
            include: {
              department: true,
              designation: true
            }
          }
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' }
      }),
      prisma.user.count({ where })
    ]);
    
    return {
      data: employees,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  }
  
  // Get employee by ID
  static async findById(id: string) {
    return prisma.user.findUnique({
      where: { id },
      include: {
        profile: {
          include: {
            department: true,
            designation: true,
            documents: true
          }
        },
        attendance: {
          where: {
            date: {
              gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
            }
          }
        },
        leaveRequests: {
          where: { status: 'PENDING' }
        }
      }
    });
  }
  
  // Update employee
  static async update(id: string, data: UpdateEmployeeInput) {
    return prisma.user.update({
      where: { id },
      data: {
        email: data.email,
        role: data.role,
        status: data.status,
        profile: {
          update: {
            firstName: data.firstName,
            lastName: data.lastName,
            departmentId: data.departmentId,
            designationId: data.designationId,
            salary: data.salary,
            phone: data.phone,
            address: data.address
          }
        }
      },
      include: { profile: true }
    });
  }
  
  // Delete employee
  static async delete(id: string) {
    return prisma.user.delete({ where: { id } });
  }
}

// Types
interface CreateEmployeeInput {
  email: string;
  password: string;
  role: string;
  firstName: string;
  lastName: string;
  employeeId: string;
  departmentId: string;
  designationId: string;
  joinDate: Date;
  salary?: number;
}

interface UpdateEmployeeInput {
  email?: string;
  role?: string;
  status?: string;
  firstName?: string;
  lastName?: string;
  departmentId?: string;
  designationId?: string;
  salary?: number;
  phone?: string;
  address?: string;
}
```

---

## Phase 2: Employee App Screens

### Week 3-4: Complete Employee App

#### Screen 1: Employee Dashboard

**File:** `src/app/employee/page.tsx`

```tsx
'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Clock, 
  Calendar, 
  FileText, 
  Target, 
  Bell,
  CheckCircle,
  XCircle
} from 'lucide-react';
import Link from 'next/link';

export default function EmployeeDashboard() {
  const [stats, setStats] = useState({
    attendance: null,
    leaveBalance: [],
    upcomingHolidays: [],
    recentPayslip: null,
    goals: [],
    announcements: []
  });
  
  useEffect(() => {
    fetchDashboardData();
  }, []);
  
  const fetchDashboardData = async () => {
    const response = await fetch('/api/employee/dashboard');
    const data = await response.json();
    setStats(data.data);
  };
  
  const handleCheckIn = async () => {
    await fetch('/api/attendance/check-in', { method: 'POST' });
    fetchDashboardData();
  };
  
  const handleCheckOut = async () => {
    await fetch('/api/attendance/check-out', { method: 'POST' });
    fetchDashboardData();
  };
  
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Welcome back!</h1>
          <p className="text-muted-foreground">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
        <div className="flex gap-2">
          {stats.attendance?.checkIn && !stats.attendance?.checkOut ? (
            <Button onClick={handleCheckOut} variant="outline">
              <Clock className="mr-2 h-4 w-4" />
              Check Out
            </Button>
          ) : (
            <Button onClick={handleCheckIn}>
              <Clock className="mr-2 h-4 w-4" />
              Check In
            </Button>
          )}
        </div>
      </div>
      
      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Attendance Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Attendance</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.attendance?.checkIn ? (
                <span className="text-green-600">
                  {new Date(stats.attendance.checkIn).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              ) : (
                <span className="text-gray-400">Not checked in</span>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              {stats.attendance?.status || 'Pending'}
            </p>
          </CardContent>
        </Card>
        
        {/* Leave Balance Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Leave Balance</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {stats.leaveBalance.slice(0, 2).map((balance: any) => (
                <div key={balance.type} className="flex justify-between text-sm">
                  <span>{balance.type}</span>
                  <span className="font-medium">{balance.remainingDays} days</span>
                </div>
              ))}
            </div>
            <Link href="/employee/leave">
              <Button variant="link" className="p-0 h-auto text-xs">
                View all →
              </Button>
            </Link>
          </CardContent>
        </Card>
        
        {/* Payslip Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Latest Payslip</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${stats.recentPayslip?.netSalary || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              {stats.recentPayslip ? 
                `${stats.recentPayslip.month}/${stats.recentPayslip.year}` : 
                'No payslip available'
              }
            </p>
          </CardContent>
        </Card>
        
        {/* Goals Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Goals</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.goals.length}</div>
            <p className="text-xs text-muted-foreground">
              {stats.goals.filter((g: any) => g.progress === 100).length} completed
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Leave Requests */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link href="/employee/leave/apply">
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="mr-2 h-4 w-4" />
                Apply for Leave
              </Button>
            </Link>
            <Link href="/employee/payroll">
              <Button variant="outline" className="w-full justify-start">
                <FileText className="mr-2 h-4 w-4" />
                View Payslips
              </Button>
            </Link>
            <Link href="/employee/performance">
              <Button variant="outline" className="w-full justify-start">
                <Target className="mr-2 h-4 w-4" />
                Update Goals
              </Button>
            </Link>
          </CardContent>
        </Card>
        
        {/* Announcements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Announcements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {stats.announcements.slice(0, 3).map((announcement: any) => (
                <div key={announcement.id} className="border-b pb-2 last:border-0">
                  <h4 className="font-medium text-sm">{announcement.title}</h4>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {announcement.content}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
```

#### API Route: Employee Dashboard

**File:** `src/app/api/employee/dashboard/route.ts`

```typescript
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET() {
  try {
    const session = await getSession();
    
    if (!session) {
      return NextResponse.json(
        { success: false, error: { code: 'UNAUTHORIZED', message: 'Please login' } },
        { status: 401 }
      );
    }
    
    const userId = session.user.id;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const currentYear = today.getFullYear();
    
    // Fetch all dashboard data in parallel
    const [
      attendance,
      leaveBalance,
      upcomingHolidays,
      recentPayslip,
      goals,
      announcements
    ] = await Promise.all([
      // Today's attendance
      prisma.attendance.findFirst({
        where: {
          userId,
          date: today
        }
      }),
      
      // Leave balances
      prisma.leaveBalance.findMany({
        where: {
          userId,
          year: currentYear
        }
      }),
      
      // Upcoming holidays
      prisma.holiday.findMany({
        where: {
          date: { gte: today }
        },
        orderBy: { date: 'asc' },
        take: 3
      }),
      
      // Recent payslip
      prisma.payslip.findFirst({
        where: { userId },
        orderBy: [
          { year: 'desc' },
          { month: 'desc' }
        ]
      }),
      
      // Active goals
      prisma.goal.findMany({
        where: {
          userId,
          status: 'ACTIVE'
        },
        orderBy: { endDate: 'asc' },
        take: 5
      }),
      
      // Recent announcements
      prisma.announcement?.findMany?.({
        orderBy: { createdAt: 'desc' },
        take: 3
      }) || []
    ]);
    
    return NextResponse.json({
      success: true,
      data: {
        attendance,
        leaveBalance,
        upcomingHolidays,
        recentPayslip,
        goals,
        announcements
      }
    });
    
  } catch (error) {
    console.error('Dashboard error:', error);
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to load dashboard' } },
      { status: 500 }
    );
  }
}
```

---

## Phase 3: HR App Screens

### Week 5-6: HR Core Features

#### Screen: Employee Directory

**File:** `src/app/hr/employees/page.tsx`

```tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Search, Plus, Filter, Download } from 'lucide-react';

export default function EmployeeDirectory() {
  const router = useRouter();
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    department: '',
    status: ''
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0
  });
  
  useEffect(() => {
    fetchEmployees();
    fetchDepartments();
  }, [pagination.page, filters]);
  
  const fetchEmployees = async () => {
    setLoading(true);
    
    const params = new URLSearchParams({
      page: pagination.page.toString(),
      limit: pagination.limit.toString(),
      ...(filters.search && { search: filters.search }),
      ...(filters.department && { department: filters.department }),
      ...(filters.status && { status: filters.status })
    });
    
    const response = await fetch(`/api/employees?${params}`);
    const data = await response.json();
    
    if (data.success) {
      setEmployees(data.data);
      setPagination(prev => ({
        ...prev,
        total: data.meta.total,
        totalPages: data.meta.totalPages
      }));
    }
    
    setLoading(false);
  };
  
  const fetchDepartments = async () => {
    const response = await fetch('/api/departments');
    const data = await response.json();
    if (data.success) {
      setDepartments(data.data);
    }
  };
  
  const exportToCSV = () => {
    // Implementation for CSV export
    const csv = employees.map((e: any) => ({
      Name: `${e.profile.firstName} ${e.profile.lastName}`,
      Email: e.email,
      Department: e.profile.department?.name,
      Designation: e.profile.designation?.title,
      Status: e.status
    }));
    
    // Convert to CSV and download
    // ...
  };
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Employee Directory</h1>
          <p className="text-muted-foreground">
            Manage {pagination.total} employees
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={exportToCSV}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button onClick={() => router.push('/hr/employees/create')}>
            <Plus className="mr-2 h-4 w-4" />
            Add Employee
          </Button>
        </div>
      </div>
      
      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, email..."
                className="pl-10"
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              />
            </div>
            
            <Select
              value={filters.department}
              onValueChange={(value) => setFilters({ ...filters, department: value })}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Departments</SelectItem>
                {departments.map((dept: any) => (
                  <SelectItem key={dept.id} value={dept.id}>
                    {dept.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select
              value={filters.status}
              onValueChange={(value) => setFilters({ ...filters, status: value })}
            >
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Status</SelectItem>
                <SelectItem value="ACTIVE">Active</SelectItem>
                <SelectItem value="INACTIVE">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
      
      {/* Employee Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Employee</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Designation</TableHead>
              <TableHead>Join Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  Loading...
                </TableCell>
              </TableRow>
            ) : employees.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  No employees found
                </TableCell>
              </TableRow>
            ) : (
              employees.map((employee: any) => (
                <TableRow
                  key={employee.id}
                  className="cursor-pointer"
                  onClick={() => router.push(`/hr/employees/${employee.id}`)}
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>
                          {employee.profile.firstName[0]}{employee.profile.lastName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">
                          {employee.profile.firstName} {employee.profile.lastName}
                        </p>
                        <p className="text-sm text-muted-foreground">{employee.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{employee.profile.department?.name}</TableCell>
                  <TableCell>{employee.profile.designation?.title}</TableCell>
                  <TableCell>
                    {new Date(employee.profile.joinDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Badge variant={employee.status === 'ACTIVE' ? 'default' : 'secondary'}>
                      {employee.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        
        {/* Pagination */}
        <div className="flex items-center justify-between p-4 border-t">
          <p className="text-sm text-muted-foreground">
            Showing {(pagination.page - 1) * pagination.limit + 1} to{' '}
            {Math.min(pagination.page * pagination.limit, pagination.total)} of{' '}
            {pagination.total} employees
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={pagination.page === 1}
              onClick={() => setPagination({ ...pagination, page: pagination.page - 1 })}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={pagination.page === pagination.totalPages}
              onClick={() => setPagination({ ...pagination, page: pagination.page + 1 })}
            >
              Next
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
```

---

## Phase 4: Admin App Screens

### Week 7-8: Admin Features

#### Screen: Role Management

**File:** `src/app/admin/roles/page.tsx`

```tsx
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Shield } from 'lucide-react';

const PERMISSIONS = [
  { category: 'Employees', permissions: [
    { id: 'employees:read', label: 'View Employees' },
    { id: 'employees:create', label: 'Create Employees' },
    { id: 'employees:update', label: 'Edit Employees' },
    { id: 'employees:delete', label: 'Delete Employees' }
  ]},
  { category: 'Attendance', permissions: [
    { id: 'attendance:read', label: 'View Attendance' },
    { id: 'attendance:approve', label: 'Approve Attendance' }
  ]},
  { category: 'Leave', permissions: [
    { id: 'leave:read', label: 'View Leave' },
    { id: 'leave:approve', label: 'Approve Leave' }
  ]},
  { category: 'Payroll', permissions: [
    { id: 'payroll:read', label: 'View Payroll' },
    { id: 'payroll:process', label: 'Process Payroll' }
  ]},
  { category: 'Settings', permissions: [
    { id: 'settings:read', label: 'View Settings' },
    { id: 'settings:update', label: 'Edit Settings' }
  ]}
];

export default function RoleManagement() {
  const [roles, setRoles] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRole, setEditingRole] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    permissions: []
  });
  
  useEffect(() => {
    fetchRoles();
  }, []);
  
  const fetchRoles = async () => {
    const response = await fetch('/api/admin/roles');
    const data = await response.json();
    if (data.success) {
      setRoles(data.data);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const url = editingRole 
      ? `/api/admin/roles/${editingRole.id}` 
      : '/api/admin/roles';
    
    const response = await fetch(url, {
      method: editingRole ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    
    if (response.ok) {
      setIsDialogOpen(false);
      setEditingRole(null);
      setFormData({ name: '', description: '', permissions: [] });
      fetchRoles();
    }
  };
  
  const handleDelete = async (roleId: string) => {
    if (!confirm('Are you sure you want to delete this role?')) return;
    
    const response = await fetch(`/api/admin/roles/${roleId}`, {
      method: 'DELETE'
    });
    
    if (response.ok) {
      fetchRoles();
    }
  };
  
  const togglePermission = (permissionId: string) => {
    setFormData(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permissionId)
        ? prev.permissions.filter(p => p !== permissionId)
        : [...prev.permissions, permissionId]
    }));
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Role Management</h1>
          <p className="text-muted-foreground">
            Manage user roles and permissions
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => {
              setEditingRole(null);
              setFormData({ name: '', description: '', permissions: [] });
            }}>
              <Plus className="mr-2 h-4 w-4" />
              Create Role
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingRole ? 'Edit Role' : 'Create New Role'}
              </DialogTitle>
              <DialogDescription>
                Define role permissions and access levels
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Role Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., HR Manager"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Brief description of this role"
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <Label>Permissions</Label>
                {PERMISSIONS.map((category) => (
                  <div key={category.category} className="border rounded-lg p-4">
                    <h4 className="font-medium mb-3">{category.category}</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {category.permissions.map((permission) => (
                        <div key={permission.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={permission.id}
                            checked={formData.permissions.includes(permission.id)}
                            onCheckedChange={() => togglePermission(permission.id)}
                          />
                          <Label htmlFor={permission.id} className="text-sm">
                            {permission.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingRole ? 'Update Role' : 'Create Role'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      
      {/* Roles List */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {roles.map((role: any) => (
          <Card key={role.id}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">{role.name}</CardTitle>
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setEditingRole(role);
                      setFormData({
                        name: role.name,
                        description: role.description,
                        permissions: role.permissions
                      });
                      setIsDialogOpen(true);
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  {!role.isDefault && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(role.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                {role.description || 'No description'}
              </p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  {role.permissions.length} permissions
                </span>
                <span className="text-muted-foreground">
                  {role.userCount} users
                </span>
              </div>
              <div className="mt-3 flex flex-wrap gap-1">
                {role.permissions.slice(0, 3).map((perm: string) => (
                  <Badge key={perm} variant="secondary" className="text-xs">
                    {perm.split(':')[0]}
                  </Badge>
                ))}
                {role.permissions.length > 3 && (
                  <Badge variant="secondary" className="text-xs">
                    +{role.permissions.length - 3}
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
```

---

## Phase 5: Shared Features

### Week 9-10: Notifications & File Upload

#### Notifications System

**File:** `src/lib/notifications.ts`

```typescript
import { prisma } from './prisma';

export class NotificationService {
  // Create notification
  static async create(data: {
    userId: string;
    type: string;
    title: string;
    message: string;
    data?: any;
  }) {
    const notification = await prisma.notification.create({
      data: {
        userId: data.userId,
        type: data.type,
        title: data.title,
        message: data.message,
        data: data.data
      }
    });
    
    // Send email if needed
    await this.sendEmailNotification(data);
    
    return notification;
  }
  
  // Get user notifications
  static async getForUser(userId: string, options?: { unreadOnly?: boolean }) {
    return prisma.notification.findMany({
      where: {
        userId,
        ...(options?.unreadOnly && { read: false })
      },
      orderBy: { createdAt: 'desc' },
      take: 50
    });
  }
  
  // Mark as read
  static async markAsRead(notificationId: string) {
    return prisma.notification.update({
      where: { id: notificationId },
      data: { read: true, readAt: new Date() }
    });
  }
  
  // Mark all as read
  static async markAllAsRead(userId: string) {
    return prisma.notification.updateMany({
      where: { userId, read: false },
      data: { read: true, readAt: new Date() }
    });
  }
  
  // Send email notification
  private static async sendEmailNotification(data: any) {
    // Integration with email service (SendGrid, AWS SES, etc.)
    // Implementation depends on your email provider
  }
}

// Notification templates
export const NotificationTemplates = {
  leaveApproved: (leaveRequest: any) => ({
    type: 'LEAVE_APPROVAL',
    title: 'Leave Request Approved',
    message: `Your leave request from ${leaveRequest.startDate} to ${leaveRequest.endDate} has been approved.`
  }),
  
  leaveRejected: (leaveRequest: any) => ({
    type: 'LEAVE_REJECTION',
    title: 'Leave Request Rejected',
    message: `Your leave request has been rejected. Reason: ${leaveRequest.rejectionReason}`
  }),
  
  payrollProcessed: (payslip: any) => ({
    type: 'PAYROLL_PROCESSED',
    title: 'Payslip Available',
    message: `Your payslip for ${payslip.month}/${payslip.year} is now available.`
  }),
  
  performanceReview: (review: any) => ({
    type: 'PERFORMANCE_REVIEW',
    title: 'Performance Review Submitted',
    message: 'Your manager has submitted your performance review.'
  })
};
```

#### File Upload Component

**File:** `src/components/upload/file-upload.tsx`

```tsx
'use client';

import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, File, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface FileUploadProps {
  onUpload: (files: File[]) => void;
  accept?: Record<string, string[]>;
  maxSize?: number;
  maxFiles?: number;
  uploading?: boolean;
  progress?: number;
}

export function FileUpload({
  onUpload,
  accept = { 'application/pdf': ['.pdf'] },
  maxSize = 5 * 1024 * 1024, // 5MB
  maxFiles = 1,
  uploading = false,
  progress = 0
}: FileUploadProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onUpload(acceptedFiles);
  }, [onUpload]);
  
  const { getRootProps, getInputProps, isDragActive, rejectedFiles } = useDropzone({
    onDrop,
    accept,
    maxSize,
    maxFiles
  });
  
  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
          transition-colors duration-200
          ${isDragActive ? 'border-primary bg-primary/5' : 'border-gray-300'}
          ${uploading ? 'pointer-events-none opacity-50' : ''}
        `}
      >
        <input {...getInputProps()} />
        
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        
        <p className="mt-2 text-sm font-medium">
          {isDragActive ? 'Drop files here' : 'Drag & drop files here'}
        </p>
        <p className="text-xs text-muted-foreground">
          or click to select files
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Max size: {(maxSize / 1024 / 1024).toFixed(0)}MB
        </p>
      </div>
      
      {uploading && (
        <div className="space-y-2">
          <Progress value={progress} />
          <p className="text-sm text-center text-muted-foreground">
            Uploading... {progress}%
          </p>
        </div>
      )}
      
      {rejectedFiles?.length > 0 && (
        <div className="text-sm text-destructive">
          {rejectedFiles.map(({ file, errors }) => (
            <p key={file.name}>
              {file.name}: {errors.map(e => e.message).join(', ')}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
```

---

## 🚀 Deployment Checklist

### Pre-deployment

- [ ] All environment variables set
- [ ] Database migrations run
- [ ] Seed data created
- [ ] Tests passing
- [ ] Build successful

### Environment Variables

```bash
# Database
DATABASE_URL=postgresql://user:pass@localhost:5432/hrm

# Auth
JWT_SECRET=your-super-secret-jwt-key
NEXTAUTH_URL=http://localhost:3000

# Email (SendGrid)
SENDGRID_API_KEY=SG.xxx
FROM_EMAIL=noreply@company.com

# File Storage (AWS S3)
AWS_ACCESS_KEY_ID=AKIA...
AWS_SECRET_ACCESS_KEY=...
AWS_S3_BUCKET=hrm-uploads
AWS_REGION=us-east-1

# AI
AI_API_KEY=...
EMBEDDING_MODEL=Xenova/all-MiniLM-L6-v2
```

### Database Setup

```bash
# Run migrations
npx prisma migrate dev

# Seed initial data
npx prisma db seed

# Generate client
npx prisma generate
```

---

## 📊 Testing Strategy

### Unit Tests

```typescript
// src/services/__tests__/employee.service.test.ts
import { EmployeeService } from '../employee.service';
import { prisma } from '@/lib/prisma';

jest.mock('@/lib/prisma');

describe('EmployeeService', () => {
  describe('create', () => {
    it('should create employee with profile', async () => {
      const mockData = {
        email: 'test@company.com',
        password: 'password123',
        firstName: 'John',
        lastName: 'Doe',
        employeeId: 'EMP001',
        departmentId: 'dept-1',
        designationId: 'desig-1',
        joinDate: new Date()
      };
      
      const result = await EmployeeService.create(mockData);
      
      expect(prisma.user.create).toHaveBeenCalled();
      expect(result).toHaveProperty('id');
    });
  });
});
```

### E2E Tests

```typescript
// tests/e2e/employee.spec.ts
import { test, expect } from '@playwright/test';

test('employee can login and view dashboard', async ({ page }) => {
  await page.goto('/login');
  
  await page.fill('[name="email"]', 'john@company.com');
  await page.fill('[name="password"]', 'password123');
  await page.click('button[type="submit"]');
  
  await expect(page).toHaveURL('/employee/dashboard');
  await expect(page.locator('h1')).toContainText('Welcome');
});
```

---

## 🔧 Common Issues & Solutions

### Issue: JWT token expired
**Solution:** Implement refresh token rotation

### Issue: Database connection pool exhausted
**Solution:** Increase pool size or implement connection retry logic

### Issue: File upload too large
**Solution:** Implement chunked upload or increase server limits

### Issue: Slow query performance
**Solution:** Add database indexes, implement caching with Redis

---

*Document Version: 1.0*
*Last Updated: February 2026*
