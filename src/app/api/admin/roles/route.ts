import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/admin/roles - List all roles
export async function GET() {
  try {
    const roles = await prisma.role.findMany({
      orderBy: {
        name: 'asc',
      },
    });

    return NextResponse.json({
      success: true,
      data: roles,
    });
  } catch (error) {
    console.error('Error fetching roles:', error);
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to fetch roles' } },
      { status: 500 }
    );
  }
}

// POST /api/admin/roles - Create new role
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, permissions } = body;

    // Check if role name already exists
    const existingRole = await prisma.role.findUnique({
      where: { name },
    });

    if (existingRole) {
      return NextResponse.json(
        { success: false, error: { code: 'CONFLICT', message: 'Role name already exists' } },
        { status: 409 }
      );
    }

    const role = await prisma.role.create({
      data: {
        name,
        description,
        permissions: permissions || [],
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: role,
        message: 'Role created successfully',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating role:', error);
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to create role' } },
      { status: 500 }
    );
  }
}
