// User and Authentication Types
export type UserRole = 'employee' | 'hr' | 'admin';
export type AuthStatus = 'idle' | 'loading' | 'authenticated' | 'unauthenticated' | 'error';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  employeeId: string;
  avatar?: string;
  department?: string;
  designation?: string;
  managerId?: string;
  location?: string;
  isOnboarded: boolean;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  status: AuthStatus;
  error: string | null;
}

// Employee Types
export interface PersonalDetails {
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  maritalStatus: 'single' | 'married' | 'divorced' | 'widowed';
  bloodGroup?: string;
  nationality: string;
  languages: string[];
}

export interface ContactDetails {
  phone: string;
  alternatePhone?: string;
  personalEmail: string;
  address: Address;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
}

export interface JobDetails {
  employeeId: string;
  designation: string;
  department: string;
  location: string;
  reportingTo: string;
  dateOfJoining: string;
  employmentType: 'full-time' | 'part-time' | 'contract' | 'intern';
  workMode: 'onsite' | 'remote' | 'hybrid';
}

export interface BankDetails {
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  accountType: 'savings' | 'current';
}

export interface Document {
  id: string;
  name: string;
  type: 'kyc' | 'contract' | 'education' | 'experience' | 'other';
  uploadDate: string;
  status: 'pending' | 'approved' | 'rejected';
  fileUrl: string;
}

export interface Employee extends User {
  personalDetails: PersonalDetails;
  contactDetails: ContactDetails;
  emergencyContacts: EmergencyContact[];
  jobDetails: JobDetails;
  bankDetails?: BankDetails;
  documents: Document[];
}

// Attendance Types
export type AttendanceStatus = 'present' | 'absent' | 'late' | 'half-day' | 'holiday' | 'weekend';
export type CheckInStatus = 'checked-in' | 'checked-out' | 'not-started';

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  date: string;
  checkInTime?: string;
  checkOutTime?: string;
  status: AttendanceStatus;
  workingHours: number;
  shiftStart: string;
  shiftEnd: string;
  overtimeHours: number;
  isRegularized: boolean;
  notes?: string;
}

export interface Shift {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  gracePeriod: number;
  isDefault: boolean;
}

export interface AttendanceRegularization {
  id: string;
  employeeId: string;
  date: string;
  reason: string;
  checkInTime?: string;
  checkOutTime?: string;
  status: 'pending' | 'approved' | 'rejected';
  approvedBy?: string;
  approvedAt?: string;
  comments?: string;
}

// Leave Types
export type LeaveStatus = 'pending' | 'approved' | 'rejected' | 'cancelled';
export type LeaveType = 'casual' | 'sick' | 'earned' | 'maternity' | 'paternity' | 'compensatory' | 'without-pay';

export interface LeaveBalance {
  leaveType: LeaveType;
  total: number;
  used: number;
  balance: number;
  pending: number;
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  leaveType: LeaveType;
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: LeaveStatus;
  appliedAt: string;
  approvedBy?: string;
  approvedAt?: string;
  rejectReason?: string;
}

export interface Holiday {
  id: string;
  name: string;
  date: string;
  isOptional: boolean;
  type: 'national' | 'state' | 'company';
}

// Payroll Types
export interface SalaryStructure {
  id: string;
  designation: string;
  department?: string;
  basic: number;
  hra: number;
  da: number;
  specialAllowance: number;
  medicalAllowance: number;
  conveyance: number;
  lta: number;
  bonus?: number;
  variablePay?: number;
  grossSalary: number;
  epf: number;
  esi: number;
  pt: number;
  tds: number;
  netSalary: number;
}

export interface Payslip {
  id: string;
  employeeId: string;
  month: string;
  year: number;
  daysWorked: number;
  totalDays: number;
  lossOfPay: number;
  earnings: PayslipEarnings;
  deductions: PayslipDeductions;
  grossSalary: number;
  totalDeductions: number;
  netSalary: number;
  generatedAt: string;
}

export interface PayslipEarnings {
  basic: number;
  hra: number;
  da: number;
  specialAllowance: number;
  medicalAllowance: number;
  conveyance: number;
  lta: number;
  bonus: number;
  overtime: number;
  total: number;
}

export interface PayslipDeductions {
  epf: number;
  esi: number;
  pt: number;
  tds: number;
  lossOfPay: number;
  otherDeductions: number;
  total: number;
}

export interface TaxDeclaration {
  id: string;
  employeeId: string;
  financialYear: string;
  section80C: number;
  section80D: number;
  section80E: number;
  hra: number;
  lta: number;
  other: number;
  totalDeclaration: number;
  status: 'draft' | 'submitted' | 'verified' | 'rejected';
  submittedAt?: string;
  verifiedBy?: string;
  verifiedAt?: string;
}

export interface TaxProof {
  id: string;
  declarationId: string;
  section: string;
  amount: number;
  documentName: string;
  fileUrl: string;
  status: 'pending' | 'approved' | 'rejected';
  uploadedAt: string;
  verifiedBy?: string;
  verifiedAt?: string;
}

// Performance Types
export type GoalStatus = 'not-started' | 'in-progress' | 'completed' | 'on-hold';
export type ReviewStatus = 'draft' | 'submitted' | 'under-review' | 'completed';

export interface Goal {
  id: string;
  employeeId: string;
  title: string;
  description: string;
  category: string;
  weightage: number;
  progress: number;
  status: GoalStatus;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface SelfReview {
  id: string;
  employeeId: string;
  reviewPeriod: string;
  achievements: string[];
  improvements: string[];
  goals: string[];
  overallRating: number;
  comments: string;
  status: ReviewStatus;
  submittedAt?: string;
}

export interface Feedback {
  id: string;
  fromEmployeeId: string;
  toEmployeeId: string;
  reviewPeriod: string;
  rating: number;
  strengths: string[];
  improvements: string[];
  comments: string;
  isAnonymous: boolean;
  createdAt: string;
}

export interface Training {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: number;
  mode: 'online' | 'offline' | 'hybrid';
  status: 'enrolled' | 'in-progress' | 'completed';
  progress: number;
  startDate?: string;
  endDate?: string;
  completedAt?: string;
}

// HR Types
export interface EmployeeLifecycle {
  id: string;
  employeeId: string;
  employeeName: string;
  event: string;
  eventType: 'joining' | 'promotion' | 'transfer' | 'termination' | 'resignation' | 'other';
  eventDate: string;
  description: string;
  documents?: string[];
  createdBy: string;
  createdAt: string;
}

export interface LeavePolicy {
  id: string;
  leaveType: LeaveType;
  daysPerYear: number;
  carryForward: boolean;
  maxCarryForward: number;
  minServiceDays: number;
  requiresApproval: boolean;
  approverRole: UserRole;
  description: string;
}

// Hiring Types
export type JobStatus = 'draft' | 'open' | 'closed' | 'on-hold';
export type ApplicationStatus = 'applied' | 'screening' | 'shortlisted' | 'interview-scheduled' | 'interviewed' | 'offered' | 'accepted' | 'rejected' | 'withdrawn';

export interface JobRequisition {
  id: string;
  title: string;
  department: string;
  designation: string;
  location: string;
  vacancies: number;
  experience: string;
  salaryRange: { min: number; max: number };
  description: string;
  requirements: string[];
  responsibilities: string[];
  status: JobStatus;
  createdBy: string;
  createdAt: string;
  closedAt?: string;
}

export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  resumeUrl: string;
  currentCompany?: string;
  currentDesignation?: string;
  experience: number;
  expectedSalary?: number;
  skills: string[];
  applications: JobApplication[];
  createdAt: string;
}

export interface JobApplication {
  id: string;
  jobId: string;
  candidateId: string;
  candidateName: string;
  jobTitle: string;
  status: ApplicationStatus;
  appliedAt: string;
  notes?: string;
  interviews: Interview[];
  offer?: OfferLetter;
}

export interface Interview {
  id: string;
  applicationId: string;
  round: number;
  roundName: string;
  interviewerId: string;
  interviewerName: string;
  scheduledDate: string;
  scheduledTime: string;
  duration: number;
  location: string;
  link?: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show';
  feedback?: InterviewFeedback;
}

export interface InterviewFeedback {
  id: string;
  interviewId: string;
  rating: number;
  strengths: string[];
  improvements: string[];
  recommendation: 'hire' | 'no-hire' | 'on-hold';
  comments: string;
  submittedAt: string;
}

export interface OfferLetter {
  id: string;
  applicationId: string;
  candidateId: string;
  jobId: string;
  salary: number;
  joiningDate: string;
  location: string;
  status: 'draft' | 'sent' | 'accepted' | 'rejected' | 'expired';
  sentAt?: string;
  expiresAt?: string;
  acceptedAt?: string;
}

export interface OnboardingTask {
  id: string;
  employeeId: string;
  taskName: string;
  description: string;
  dueDate: string;
  status: 'pending' | 'in-progress' | 'completed';
  completedAt?: string;
  assignee: string;
}

// Admin Types
export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: Permission[];
  createdAt: string;
}

export interface Permission {
  id: string;
  module: string;
  action: 'read' | 'write' | 'delete' | 'approve';
  description: string;
}

export interface Department {
  id: string;
  name: string;
  code: string;
  headId?: string;
  location?: string;
  budget?: number;
  employeeCount: number;
  createdAt: string;
}

export interface Designation {
  id: string;
  title: string;
  level: number;
  departmentId: string;
  minSalary: number;
  maxSalary: number;
  responsibilities: string[];
  createdAt: string;
}

export interface AttendanceRule {
  id: string;
  name: string;
  workingDays: number;
  workingHours: number;
  gracePeriod: number;
  halfDayAfter: number;
  fullDayAfter: number;
  overtimeStartsAfter: number;
  weeklyOff: string[];
  createdAt: string;
}

export interface NotificationTemplate {
  id: string;
  name: string;
  type: 'email' | 'sms' | 'push';
  event: string;
  subject: string;
  body: string;
  variables: string[];
  isActive: boolean;
  createdAt: string;
}

export interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  module: string;
  details: string;
  ipAddress: string;
  timestamp: string;
}

export interface ApiKey {
  id: string;
  name: string;
  key: string;
  permissions: string[];
  isActive: boolean;
  expiresAt?: string;
  lastUsed?: string;
  createdBy: string;
  createdAt: string;
}

export interface Integration {
  id: string;
  name: string;
  type: string;
  status: 'connected' | 'disconnected' | 'error';
  config: Record<string, any>;
  lastSync?: string;
  createdAt: string;
}

// AI Features Types
export interface AttritionRisk {
  employeeId: string;
  employeeName: string;
  department: string;
  riskScore: number;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  factors: string[];
  predictions: string[];
  recommendedActions: string[];
  lastUpdated: string;
}

export interface AttendanceAnomaly {
  id: string;
  employeeId: string;
  employeeName: string;
  anomalyType: 'frequent-late' | 'early-leave' | 'absenteeism' | 'pattern-break' | 'unusual-hours';
  severity: 'low' | 'medium' | 'high';
  description: string;
  dateRange: string;
  count: number;
  recommendations: string[];
  detectedAt: string;
}

export interface ResumeScore {
  candidateId: string;
  candidateName: string;
  jobId: string;
  score: number;
  rank: number;
  matchScore: number;
  skills: { name: string; match: boolean }[];
  experience: { years: number; match: boolean };
  education: { degree: string; match: boolean };
  keywords: string[];
  recommendation: 'highly-recommended' | 'recommended' | 'moderate' | 'not-recommended';
}

export interface PolicyQuery {
  id: string;
  question: string;
  answer: string;
  policies: string[];
  confidence: number;
  timestamp: string;
}

export interface PerformanceInsight {
  employeeId: string;
  employeeName: string;
  department: string;
  period: string;
  overallRating: number;
  trends: {
    attendance: number;
    productivity: number;
    goalCompletion: number;
    peerRating: number;
  };
  strengths: string[];
  improvements: string[];
  achievements: string[];
  risks: string[];
  recommendations: string[];
  generatedAt: string;
}

// Dashboard Types
export interface DashboardStats {
  totalEmployees: number;
  presentToday: number;
  absentToday: number;
  onLeave: number;
  newHiresThisMonth: number;
  resignationsThisMonth: number;
  pendingApprovals: number;
  openPositions: number;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: 'general' | 'policy' | 'event' | 'achievement' | 'other';
  attachments?: string[];
  targetRoles: UserRole[];
  targetDepartments?: string[];
  createdBy: string;
  createdAt: string;
  expiryDate?: string;
}

export interface Ticket {
  id: string;
  employeeId: string;
  employeeName: string;
  category: string;
  subject: string;
  description: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignedTo?: string;
  createdAt: string;
  resolvedAt?: string;
}

export interface Survey {
  id: string;
  title: string;
  description: string;
  questions: SurveyQuestion[];
  targetAudience: UserRole[];
  status: 'draft' | 'active' | 'closed';
  startDate: string;
  endDate: string;
  responseCount: number;
  createdBy: string;
  createdAt: string;
}

export interface SurveyQuestion {
  id: string;
  question: string;
  type: 'rating' | 'text' | 'multiple-choice';
  options?: string[];
  isRequired: boolean;
}
