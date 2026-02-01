import { NextResponse } from 'next/server';
import { mockGoals } from '@/lib/mock-data';

export async function GET(
  request: Request,
  { params }: { params: { employeeId: string } }
) {
  try {
    return NextResponse.json(mockGoals);
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
