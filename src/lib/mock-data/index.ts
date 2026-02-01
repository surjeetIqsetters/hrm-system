export { mockUsers, mockCredentials } from './mockUsers';
export { mockEmployees } from './mockEmployees';

// Mock Attendance Records
export const mockAttendanceRecords = [
  {
    id: '1',
    employeeId: 'EMP001',
    date: '2025-01-06',
    checkInTime: '09:00',
    checkOutTime: '18:00',
    status: 'present' as const,
    workingHours: 9,
    shiftStart: '09:00',
    shiftEnd: '18:00',
    overtimeHours: 0,
    isRegularized: false,
  },
  {
    id: '2',
    employeeId: 'EMP001',
    date: '2025-01-05',
    checkInTime: '09:15',
    checkOutTime: '18:30',
    status: 'late' as const,
    workingHours: 9.25,
    shiftStart: '09:00',
    shiftEnd: '18:00',
    overtimeHours: 0.25,
    isRegularized: false,
  },
  {
    id: '3',
    employeeId: 'EMP001',
    date: '2025-01-04',
    checkInTime: undefined,
    checkOutTime: undefined,
    status: 'absent' as const,
    workingHours: 0,
    shiftStart: '09:00',
    shiftEnd: '18:00',
    overtimeHours: 0,
    isRegularized: false,
    notes: 'Sick leave',
  },
];

// Mock Leave Balances
export const mockLeaveBalances = [
  { leaveType: 'casual' as const, total: 12, used: 4, balance: 8, pending: 1 },
  { leaveType: 'sick' as const, total: 10, used: 2, balance: 8, pending: 0 },
  { leaveType: 'earned' as const, total: 15, used: 5, balance: 10, pending: 0 },
  { leaveType: 'maternity' as const, total: 90, used: 0, balance: 90, pending: 0 },
  { leaveType: 'paternity' as const, total: 15, used: 0, balance: 15, pending: 0 },
];

// Mock Leave Requests
export const mockLeaveRequests = [
  {
    id: '1',
    employeeId: 'EMP001',
    employeeName: 'John Doe',
    leaveType: 'casual' as const,
    startDate: '2025-01-20',
    endDate: '2025-01-22',
    days: 3,
    reason: 'Family vacation',
    status: 'pending' as const,
    appliedAt: '2025-01-06T10:00:00Z',
  },
  {
    id: '2',
    employeeId: 'EMP001',
    employeeName: 'John Doe',
    leaveType: 'sick' as const,
    startDate: '2025-01-04',
    endDate: '2025-01-04',
    days: 1,
    reason: 'Fever',
    status: 'approved' as const,
    appliedAt: '2025-01-04T08:00:00Z',
    approvedBy: 'Jane Smith',
    approvedAt: '2025-01-04T09:00:00Z',
  },
];

// Mock Payslips
export const mockPayslips = [
  {
    id: '1',
    employeeId: 'EMP001',
    month: 'December',
    year: 2024,
    daysWorked: 22,
    totalDays: 22,
    lossOfPay: 0,
    earnings: {
      basic: 4000,
      hra: 2000,
      da: 800,
      specialAllowance: 1200,
      medicalAllowance: 500,
      conveyance: 600,
      lta: 0,
      bonus: 0,
      overtime: 100,
      total: 9200,
    },
    deductions: {
      epf: 480,
      esi: 125,
      pt: 200,
      tds: 600,
      lossOfPay: 0,
      otherDeductions: 0,
      total: 1405,
    },
    grossSalary: 9200,
    totalDeductions: 1405,
    netSalary: 7795,
    generatedAt: '2025-01-01T00:00:00Z',
  },
];

// Mock Goals
export const mockGoals = [
  {
    id: '1',
    employeeId: 'EMP001',
    title: 'Complete React certification',
    description: 'Complete advanced React course and pass certification exam',
    category: 'Learning',
    weightage: 20,
    progress: 60,
    status: 'in-progress' as const,
    dueDate: '2025-03-31',
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-15T00:00:00Z',
  },
  {
    id: '2',
    employeeId: 'EMP001',
    title: 'Deliver Q1 features',
    description: 'Complete all features assigned for Q1 2025',
    category: 'Project Delivery',
    weightage: 40,
    progress: 30,
    status: 'in-progress' as const,
    dueDate: '2025-03-31',
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-15T00:00:00Z',
  },
];

// Mock Shifts
export const mockShifts = [
  {
    id: '1',
    name: 'General Shift',
    startTime: '09:00',
    endTime: '18:00',
    gracePeriod: 15,
    isDefault: true,
  },
  {
    id: '2',
    name: 'Morning Shift',
    startTime: '06:00',
    endTime: '15:00',
    gracePeriod: 10,
    isDefault: false,
  },
];

// Mock Holidays
export const mockHolidays = [
  { id: '1', name: 'New Year', date: '2025-01-01', isOptional: false, type: 'national' as const },
  { id: '2', name: 'Republic Day', date: '2025-01-26', isOptional: false, type: 'national' as const },
  { id: '3', name: 'Holi', date: '2025-03-14', isOptional: true, type: 'state' as const },
];

// Mock Dashboard Stats
export const mockDashboardStats = {
  totalEmployees: 150,
  presentToday: 142,
  absentToday: 5,
  onLeave: 3,
  newHiresThisMonth: 5,
  resignationsThisMonth: 2,
  pendingApprovals: 12,
  openPositions: 8,
};

// Mock Announcements
export const mockAnnouncements = [
  {
    id: '1',
    title: 'Annual Performance Review Cycle',
    content: 'The annual performance review cycle will start from February 1st, 2025. Please complete your self-assessments by January 31st.',
    priority: 'high' as const,
    category: 'general' as const,
    targetRoles: ['employee', 'hr', 'admin'],
    createdBy: 'Sarah Williams',
    createdAt: '2025-01-05T10:00:00Z',
  },
];

// Mock Attrition Risks
export const mockAttritionRisks = [
  {
    employeeId: 'EMP001',
    employeeName: 'John Doe',
    department: 'Engineering',
    riskScore: 25,
    riskLevel: 'low' as const,
    factors: ['Good performance', 'Consistent attendance'],
    predictions: ['Likely to stay for next 12 months'],
    recommendedActions: ['Continue current engagement'],
    lastUpdated: '2025-01-05T00:00:00Z',
  },
  {
    employeeId: 'EMP004',
    employeeName: 'Mike Johnson',
    department: 'Engineering',
    riskScore: 72,
    riskLevel: 'high' as const,
    factors: ['Recent absenteeism', 'Decreased productivity', 'Market trend'],
    predictions: ['High probability of leaving in 6 months'],
    recommendedActions: ['Schedule 1:1 with manager', 'Discuss career path', 'Consider counter-offer'],
    lastUpdated: '2025-01-05T00:00:00Z',
  },
];

// Mock Resume Scores
export const mockResumeScores = [
  {
    candidateId: 'CAND001',
    candidateName: 'Alex Turner',
    jobId: 'JOB001',
    score: 85,
    rank: 1,
    matchScore: 85,
    skills: [
      { name: 'React', match: true },
      { name: 'TypeScript', match: true },
      { name: 'Node.js', match: true },
      { name: 'Python', match: false },
    ],
    experience: { years: 5, match: true },
    education: { degree: 'B.Tech', match: true },
    keywords: ['frontend', 'web development', 'JavaScript'],
    recommendation: 'highly-recommended' as const,
  },
];

// Mock Performance Insights
export const mockPerformanceInsights = {
  employeeId: 'EMP001',
  employeeName: 'John Doe',
  department: 'Engineering',
  period: 'Q4 2024',
  overallRating: 4.2,
  trends: {
    attendance: 95,
    productivity: 88,
    goalCompletion: 85,
    peerRating: 4.3,
  },
  strengths: ['Technical skills', 'Problem solving', 'Team collaboration'],
  improvements: ['Documentation', 'Code reviews'],
  achievements: ['Completed React migration', 'Mentored 2 juniors'],
  risks: ['Workload management'],
  recommendations: ['Focus on documentation', 'Consider technical lead role'],
  generatedAt: '2025-01-05T00:00:00Z',
};
