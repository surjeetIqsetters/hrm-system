import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/admin/departments - List all departments
export async function GET() {
  try {
    const departments = await prisma.department.findMany({
      include: {
        children: true,
        _count: {
          select: {
            profiles: true,
          },
        },
      },
      orderBy: {
        name: 'asc',
      },
    });

    return NextResponse.json({
      success: true,
      data: departments,
    });
  } catch (error) {
    console.error('Error fetching departments:', error);
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to fetch departments' } },
      { status: 500 }
    );
  }
}

// POST /api/admin/departments - Create new department
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, parentId, headId } = body;

    // Check if department name already exists
    const existingDept = await prisma.department.findUnique({
      where: { name },
    });

    if (existingDept) {
      return NextResponse.json(
        { success: false, error: { code: 'CONFLICT', message: 'Department name already exists' } },
        { status: 409 }
      );
    }

    const department = await prisma.department.create({
      data: {
        name,
        description,
        parentId: parentId || null,
        headId: headId || null,
      },
      include: {
        _count: {
          select: {
            profiles: true,
          },
        },
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: department,
        message: 'Department created successfully',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating department:', error);
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to create department' } },
      { status: 500 }
    );
  }
}
