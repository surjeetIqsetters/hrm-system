import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword } from '@/lib/auth';

// GET /api/hr/employees - List all employees
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const department = searchParams.get('department');
    const status = searchParams.get('status');
    const search = searchParams.get('search');

    const where: any = {};

    if (department) {
      where.profile = { ...where.profile, departmentId: department };
    }

    if (status) {
      where.status = status;
    }

    if (search) {
      where.OR = [
        { email: { contains: search, mode: 'insensitive' } },
        { profile: { firstName: { contains: search, mode: 'insensitive' } } },
        { profile: { lastName: { contains: search, mode: 'insensitive' } } },
        { profile: { employeeId: { contains: search, mode: 'insensitive' } } }
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

    return NextResponse.json({
      success: true,
      data: employees,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching employees:', error);
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to fetch employees' } },
      { status: 500 }
    );
  }
}

// POST /api/hr/employees - Create new employee
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      email,
      password,
      role,
      firstName,
      lastName,
      employeeId,
      departmentId,
      designationId,
      joinDate,
      salary,
      phone,
      address
    } = body;

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return NextResponse.json(
        { success: false, error: { code: 'CONFLICT', message: 'Email already exists' } },
        { status: 409 }
      );
    }

    // Check if employee ID already exists
    const existingEmployeeId = await prisma.profile.findUnique({
      where: { employeeId }
    });

    if (existingEmployeeId) {
      return NextResponse.json(
        { success: false, error: { code: 'CONFLICT', message: 'Employee ID already exists' } },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user with profile
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: role || 'EMPLOYEE',
        status: 'ACTIVE',
        profile: {
          create: {
            firstName,
            lastName,
            employeeId,
            departmentId,
            designationId,
            joinDate: new Date(joinDate),
            salary: salary ? parseFloat(salary) : null,
            phone,
            address
          }
        }
      },
      include: {
        profile: {
          include: {
            department: true,
            designation: true
          }
        }
      }
    });

    // Create leave balances for current year
    const currentYear = new Date().getFullYear();
    const leaveTypes = [
      { type: 'CASUAL', totalDays: 12 },
      { type: 'SICK', totalDays: 10 },
      { type: 'EARNED', totalDays: 20 }
    ];

    await prisma.leaveBalance.createMany({
      data: leaveTypes.map(lt => ({
        userId: user.id,
        type: lt.type as any,
        year: currentYear,
        totalDays: lt.totalDays,
        usedDays: 0,
        pendingDays: 0
      }))
    });

    return NextResponse.json({
      success: true,
      data: user,
      message: 'Employee created successfully'
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating employee:', error);
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to create employee' } },
      { status: 500 }
    );
  }
}
