import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const mockRoles = [
      {
        id: '1',
        name: 'Employee',
        description: 'Standard employee with self-service access',
        permissions: [
          { id: '1', module: 'attendance', action: 'read', description: 'View own attendance' },
          { id: '2', module: 'leave', action: 'write', description: 'Apply for leave' },
          { id: '3', module: 'payroll', action: 'read', description: 'View payslips' },
        ],
        createdAt: '2022-01-01T00:00:00Z',
      },
      {
        id: '2',
        name: 'HR',
        description: 'HR manager with people operations access',
        permissions: [
          { id: '4', module: 'employees', action: 'read', description: 'View employee data' },
          { id: '5', module: 'attendance', action: 'approve', description: 'Approve attendance' },
          { id: '6', module: 'leave', action: 'approve', description: 'Approve leaves' },
        ],
        createdAt: '2022-01-01T00:00:00Z',
      },
      {
        id: '3',
        name: 'Admin',
        description: 'System administrator with full access',
        permissions: [
          { id: '7', module: 'system', action: 'write', description: 'Full system access' },
          { id: '8', module: 'users', action: 'delete', description: 'Manage users' },
        ],
        createdAt: '2022-01-01T00:00:00Z',
      },
    ];

    return NextResponse.json(mockRoles);
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
