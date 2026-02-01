# HRM System - API Documentation

## 📚 Overview

This document provides comprehensive documentation for all API endpoints in the HRM System.

**Base URL:** `https://api.hrm.company.com` or `http://localhost:3000/api`

**Authentication:** JWT Bearer Token in HTTP-only cookie

---

## 🔐 Authentication

All protected endpoints require a valid JWT token stored in an HTTP-only cookie named `token`.

### Auth Endpoints

#### POST `/api/auth/login`
Authenticate user and create session.

**Request:**
```json
{
  "email": "john.doe@company.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "john.doe@company.com",
      "role": "EMPLOYEE",
      "profile": {
        "firstName": "John",
        "lastName": "Doe",
        "department": "Engineering"
      }
    },
    "token": "jwt-token"
  }
}
```

**Error (401):**
```json
{
  "success": false,
  "error": {
    "code": "INVALID_CREDENTIALS",
    "message": "Invalid email or password"
  }
}
```

---

#### POST `/api/auth/logout`
Logout user and invalidate session.

**Response (200):**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

#### GET `/api/auth/verify`
Verify current session validity.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "john.doe@company.com",
      "role": "EMPLOYEE"
    }
  }
}
```

---

#### POST `/api/auth/forgot-password`
Request password reset email.

**Request:**
```json
{
  "email": "john.doe@company.com"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Password reset email sent"
}
```

---

#### POST `/api/auth/reset-password`
Reset password with token.

**Request:**
```json
{
  "token": "reset-token",
  "password": "newpassword123"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Password reset successfully"
}
```

---

## 👤 Employees

### GET `/api/employees`
List all employees (HR/Admin only).

**Query Parameters:**
| Param | Type | Description |
|-------|------|-------------|
| `page` | number | Page number (default: 1) |
| `limit` | number | Items per page (default: 20) |
| `department` | string | Filter by department |
| `status` | string | Filter by status |
| `search` | string | Search by name/email |

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "email": "john@company.com",
      "role": "EMPLOYEE",
      "status": "ACTIVE",
      "profile": {
        "firstName": "John",
        "lastName": "Doe",
        "employeeId": "EMP001",
        "department": "Engineering",
        "designation": "Software Engineer",
        "joinDate": "2024-01-15"
      }
    }
  ],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "totalPages": 8
  }
}
```

---

### POST `/api/employees`
Create new employee (HR/Admin only).

**Request:**
```json
{
  "email": "jane@company.com",
  "password": "tempPassword123",
  "role": "EMPLOYEE",
  "profile": {
    "firstName": "Jane",
    "lastName": "Smith",
    "employeeId": "EMP002",
    "department": "Marketing",
    "designation": "Marketing Manager",
    "joinDate": "2024-02-01",
    "salary": 75000
  }
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "email": "jane@company.com",
    "role": "EMPLOYEE",
    "profile": {
      "firstName": "Jane",
      "lastName": "Smith",
      "employeeId": "EMP002"
    }
  },
  "message": "Employee created successfully"
}
```

---

### GET `/api/employees/:id`
Get employee details.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "email": "john@company.com",
    "role": "EMPLOYEE",
    "status": "ACTIVE",
    "profile": {
      "firstName": "John",
      "lastName": "Doe",
      "employeeId": "EMP001",
      "department": "Engineering",
      "designation": "Software Engineer",
      "joinDate": "2024-01-15",
      "salary": 80000,
      "phone": "+1-555-0123",
      "address": "123 Main St, City"
    },
    "attendance": {
      "thisMonth": {
        "present": 18,
        "absent": 1,
        "late": 2
      }
    },
    "leaveBalances": [
      {
        "type": "CASUAL",
        "totalDays": 12,
        "usedDays": 3,
        "remainingDays": 9
      }
    ]
  }
}
```

---

### PUT `/api/employees/:id`
Update employee details.

**Request:**
```json
{
  "profile": {
    "phone": "+1-555-0199",
    "address": "456 New St, City"
  }
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "profile": {
      "phone": "+1-555-0199",
      "address": "456 New St, City"
    }
  },
  "message": "Employee updated successfully"
}
```

---

### DELETE `/api/employees/:id`
Delete employee (Admin only).

**Response (200):**
```json
{
  "success": true,
  "message": "Employee deleted successfully"
}
```

---

## 📅 Attendance

### GET `/api/attendance/today/:employeeId`
Get today's attendance status.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "date": "2026-02-01",
    "status": "PRESENT",
    "checkIn": "2026-02-01T09:00:00Z",
    "checkOut": null,
    "workHours": null,
    "location": "Office"
  }
}
```

---

### POST `/api/attendance/check-in`
Mark attendance check-in.

**Request:**
```json
{
  "location": "Office",
  "notes": "Working on project X"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "date": "2026-02-01",
    "checkIn": "2026-02-01T09:00:00Z",
    "status": "PRESENT"
  },
  "message": "Checked in successfully"
}
```

---

### POST `/api/attendance/check-out`
Mark attendance check-out.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "checkOut": "2026-02-01T18:00:00Z",
    "workHours": 9.0,
    "status": "PRESENT"
  },
  "message": "Checked out successfully"
}
```

---

### GET `/api/attendance/monthly/:employeeId`
Get monthly attendance records.

**Query Parameters:**
| Param | Type | Description |
|-------|------|-------------|
| `month` | number | Month (1-12) |
| `year` | number | Year |

**Response (200):**
```json
{
  "success": true,
  "data": {
    "month": 2,
    "year": 2026,
    "summary": {
      "totalDays": 20,
      "present": 18,
      "absent": 1,
      "late": 1,
      "workFromHome": 0
    },
    "records": [
      {
        "date": "2026-02-01",
        "status": "PRESENT",
        "checkIn": "2026-02-01T09:00:00Z",
        "checkOut": "2026-02-01T18:00:00Z",
        "workHours": 9.0
      }
    ]
  }
}
```

---

## 🏖 Leave

### GET `/api/leave/balances/:employeeId`
Get leave balances.

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "type": "CASUAL",
      "year": 2026,
      "totalDays": 12,
      "usedDays": 3,
      "pendingDays": 2,
      "remainingDays": 7
    },
    {
      "type": "SICK",
      "year": 2026,
      "totalDays": 10,
      "usedDays": 1,
      "pendingDays": 0,
      "remainingDays": 9
    }
  ]
}
```

---

### GET `/api/leave/requests/:employeeId`
Get leave requests history.

**Query Parameters:**
| Param | Type | Description |
|-------|------|-------------|
| `status` | string | Filter by status |
| `year` | number | Filter by year |

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "type": "CASUAL",
      "startDate": "2026-02-10",
      "endDate": "2026-02-12",
      "days": 3,
      "reason": "Personal work",
      "status": "APPROVED",
      "approvedBy": "HR Manager",
      "approvedAt": "2026-01-25T10:00:00Z"
    }
  ]
}
```

---

### POST `/api/leave/apply`
Apply for leave.

**Request:**
```json
{
  "type": "CASUAL",
  "startDate": "2026-02-15",
  "endDate": "2026-02-16",
  "reason": "Family function"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "type": "CASUAL",
    "startDate": "2026-02-15",
    "endDate": "2026-02-16",
    "days": 2,
    "reason": "Family function",
    "status": "PENDING"
  },
  "message": "Leave application submitted successfully"
}
```

---

### PUT `/api/leave/:id/approve`
Approve leave request (HR only).

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "status": "APPROVED",
    "approvedBy": "HR Manager",
    "approvedAt": "2026-02-01T10:00:00Z"
  },
  "message": "Leave approved successfully"
}
```

---

### PUT `/api/leave/:id/reject`
Reject leave request (HR only).

**Request:**
```json
{
  "reason": "Insufficient team coverage"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "status": "REJECTED",
    "rejectionReason": "Insufficient team coverage"
  },
  "message": "Leave rejected successfully"
}
```

---

### GET `/api/leave/holidays`
Get company holidays.

**Query Parameters:**
| Param | Type | Description |
|-------|------|-------------|
| `year` | number | Year (default: current) |

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "date": "2026-01-01",
      "name": "New Year's Day",
      "type": "PUBLIC"
    },
    {
      "date": "2026-12-25",
      "name": "Christmas",
      "type": "PUBLIC"
    }
  ]
}
```

---

### GET `/api/leave/pending-approvals`
Get pending leave approvals (HR only).

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "employee": {
        "id": "uuid",
        "name": "John Doe",
        "department": "Engineering"
      },
      "type": "SICK",
      "startDate": "2026-02-05",
      "endDate": "2026-02-06",
      "days": 2,
      "reason": "Not feeling well",
      "appliedAt": "2026-02-01T08:00:00Z"
    }
  ]
}
```

---

## 💰 Payroll

### GET `/api/payroll/payslips/:employeeId`
Get employee payslips.

**Query Parameters:**
| Param | Type | Description |
|-------|------|-------------|
| `year` | number | Filter by year |

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "month": 1,
      "year": 2026,
      "basicSalary": 5000,
      "hra": 2000,
      "allowances": [
        { "name": "Transport", "amount": 500 }
      ],
      "grossSalary": 7500,
      "tax": 500,
      "insurance": 200,
      "totalDeductions": 700,
      "netSalary": 6800,
      "fileUrl": "/payslips/EMP001-2026-01.pdf"
    }
  ]
}
```

---

### GET `/api/payroll/payslip/:employeeId/:payslipId`
Get payslip details.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "month": 1,
    "year": 2026,
    "employee": {
      "id": "uuid",
      "name": "John Doe",
      "employeeId": "EMP001"
    },
    "earnings": {
      "basicSalary": 5000,
      "hra": 2000,
      "allowances": [
        { "name": "Transport", "amount": 500 },
        { "name": "Medical", "amount": 300 }
      ],
      "grossSalary": 7800
    },
    "deductions": {
      "tax": 500,
      "insurance": 200,
      "pf": 600,
      "otherDeductions": [],
      "totalDeductions": 1300
    },
    "netSalary": 6500,
    "fileUrl": "/payslips/EMP001-2026-01.pdf"
  }
}
```

---

### POST `/api/payroll/process`
Process payroll for a period (HR only).

**Request:**
```json
{
  "month": 2,
  "year": 2026,
  "employeeIds": ["uuid1", "uuid2"] // Optional: specific employees
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "processed": 50,
    "failed": 0,
    "payslips": [
      {
        "employeeId": "uuid",
        "status": "GENERATED",
        "payslipId": "uuid"
      }
    ]
  },
  "message": "Payroll processed successfully"
}
```

---

## 📊 Performance

### GET `/api/performance/goals/:employeeId`
Get employee goals.

**Query Parameters:**
| Param | Type | Description |
|-------|------|-------------|
| `status` | string | Filter by status |

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "title": "Complete Project X",
      "description": "Deliver project X by Q1 end",
      "category": "PROFESSIONAL",
      "startDate": "2026-01-01",
      "endDate": "2026-03-31",
      "status": "ACTIVE",
      "progress": 65,
      "weight": 1.0
    }
  ]
}
```

---

### POST `/api/performance/goals`
Create new goal.

**Request:**
```json
{
  "employeeId": "uuid",
  "title": "Learn New Technology",
  "description": "Complete certification in AWS",
  "category": "PROFESSIONAL",
  "startDate": "2026-02-01",
  "endDate": "2026-04-30",
  "weight": 0.5
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "title": "Learn New Technology",
    "status": "ACTIVE",
    "progress": 0
  },
  "message": "Goal created successfully"
}
```

---

### PUT `/api/performance/goals/:id`
Update goal progress.

**Request:**
```json
{
  "progress": 75,
  "status": "ACTIVE"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "progress": 75,
    "status": "ACTIVE"
  },
  "message": "Goal updated successfully"
}
```

---

### GET `/api/performance/reviews/:employeeId`
Get performance reviews.

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "cycle": "Q4 2025",
      "reviewer": {
        "id": "uuid",
        "name": "Manager Name"
      },
      "overallRating": 4,
      "ratings": [
        { "criteria": "Technical Skills", "rating": 4, "comment": "Good" },
        { "criteria": "Communication", "rating": 5, "comment": "Excellent" }
      ],
      "strengths": "Strong technical abilities",
      "improvements": "Could improve documentation",
      "status": "SUBMITTED",
      "submittedAt": "2026-01-15T10:00:00Z"
    }
  ]
}
```

---

## 🤖 AI Features

### GET `/api/ai/attrition-risks`
Get all attrition risks (HR only).

**Query Parameters:**
| Param | Type | Description |
|-------|------|-------------|
| `riskLevel` | string | Filter by risk level |
| `department` | string | Filter by department |

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "employeeId": "uuid",
      "employeeName": "John Doe",
      "department": "Engineering",
      "riskLevel": "HIGH",
      "riskScore": 78,
      "factors": [
        {
          "factor": "Workload",
          "impact": "HIGH",
          "description": "Above average workload for 3 months"
        },
        {
          "factor": "Compensation",
          "impact": "MEDIUM",
          "description": "Below market rate"
        }
      ],
      "recommendations": [
        "Conduct stay interview",
        "Review compensation",
        "Reduce workload"
      ],
      "predictedAt": "2026-02-01T00:00:00Z"
    }
  ]
}
```

---

### GET `/api/ai/attrition-risk/:employeeId`
Get specific employee attrition risk.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "employeeId": "uuid",
    "riskLevel": "MEDIUM",
    "riskScore": 45,
    "factors": [...],
    "recommendations": [...]
  }
}
```

---

### GET `/api/ai/performance-insight/:employeeId`
Get AI-generated performance insights.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "employeeId": "uuid",
    "summary": "Strong performer with consistent delivery",
    "strengths": [
      "Technical expertise",
      "Problem-solving abilities",
      "Team collaboration"
    ],
    "improvements": [
      "Documentation practices",
      "Time estimation"
    ],
    "achievements": [
      "Completed 5 major projects",
      "Mentored 2 junior developers"
    ],
    "trends": "Upward trajectory in Q4",
    "recommendations": [
      "Consider for senior role",
      "Assign leadership opportunities"
    ],
    "generatedAt": "2026-02-01T00:00:00Z"
  }
}
```

---

### POST `/api/ai/rank-resumes`
Rank candidates against job requirements (HR only).

**Request:**
```json
{
  "jobId": "uuid",
  "candidateIds": ["uuid1", "uuid2", "uuid3"]
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "jobId": "uuid",
    "jobTitle": "Software Engineer",
    "rankings": [
      {
        "candidateId": "uuid1",
        "name": "Candidate A",
        "score": 92,
        "skillsMatch": 95,
        "experienceMatch": 90,
        "educationMatch": 85,
        "rank": 1
      },
      {
        "candidateId": "uuid2",
        "name": "Candidate B",
        "score": 78,
        "skillsMatch": 80,
        "experienceMatch": 75,
        "educationMatch": 90,
        "rank": 2
      }
    ]
  }
}
```

---

### POST `/api/ai/chat`
HR Policy chatbot.

**Request:**
```json
{
  "sessionId": "uuid",
  "message": "How many casual leaves do I have?"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "message": "According to the company policy, you are entitled to 12 casual leaves per year. Your current balance shows 7 remaining casual leaves for 2026.",
    "sources": [
      {
        "policy": "Leave Policy",
        "section": "Casual Leave",
        "url": "/policies/leave#casual"
      }
    ],
    "suggestions": [
      "How do I apply for leave?",
      "What is the leave approval process?"
    ]
  }
}
```

---

## ⚙️ Admin

### GET `/api/admin/dashboard/stats`
Get system statistics (Admin only).

**Response (200):**
```json
{
  "success": true,
  "data": {
    "users": {
      "total": 150,
      "active": 142,
      "newThisMonth": 5
    },
    "system": {
      "uptime": "99.9%",
      "responseTime": "120ms",
      "errors24h": 3
    },
    "storage": {
      "database": "2.5GB",
      "files": "15GB"
    },
    "activity": {
      "loginsToday": 120,
      "apiCalls24h": 50000
    }
  }
}
```

---

### GET `/api/admin/roles`
List all roles (Admin only).

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "name": "HR Manager",
      "description": "Full HR access",
      "permissions": [
        "employees:read",
        "employees:write",
        "payroll:process",
        "leave:approve"
      ],
      "userCount": 3
    }
  ]
}
```

---

### POST `/api/admin/roles`
Create new role (Admin only).

**Request:**
```json
{
  "name": "Team Lead",
  "description": "Department team lead",
  "permissions": [
    "employees:read",
    "attendance:read",
    "leave:approve"
  ]
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "Team Lead",
    "permissions": [...]
  },
  "message": "Role created successfully"
}
```

---

### GET `/api/admin/audit-logs`
Get audit logs (Admin only).

**Query Parameters:**
| Param | Type | Description |
|-------|------|-------------|
| `page` | number | Page number |
| `limit` | number | Items per page |
| `userId` | string | Filter by user |
| `action` | string | Filter by action |
| `startDate` | date | Filter start |
| `endDate` | date | Filter end |

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "userId": "uuid",
      "userName": "John Doe",
      "action": "EMPLOYEE_UPDATE",
      "entity": "Profile",
      "entityId": "uuid",
      "oldValue": { "phone": "old" },
      "newValue": { "phone": "new" },
      "ipAddress": "192.168.1.1",
      "createdAt": "2026-02-01T10:00:00Z"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 1000
  }
}
```

---

## ❌ Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `UNAUTHORIZED` | 401 | Invalid or missing token |
| `FORBIDDEN` | 403 | Insufficient permissions |
| `NOT_FOUND` | 404 | Resource not found |
| `VALIDATION_ERROR` | 400 | Invalid input data |
| `CONFLICT` | 409 | Resource already exists |
| `RATE_LIMITED` | 429 | Too many requests |
| `INTERNAL_ERROR` | 500 | Server error |
| `SERVICE_UNAVAILABLE` | 503 | Service temporarily unavailable |

---

## 📊 Rate Limits

| Endpoint Type | Limit | Window |
|---------------|-------|--------|
| Authentication | 5 requests | 1 minute |
| General API | 100 requests | 1 minute |
| AI Features | 20 requests | 1 minute |
| File Upload | 10 requests | 1 minute |

---

*Document Version: 1.0*
*Last Updated: February 2026*
