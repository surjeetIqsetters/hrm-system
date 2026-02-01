import { NextResponse } from 'next/server';
import { mockLeaveBalances } from '@/lib/mock-data';

export async function GET(
  request: Request,
  { params }: { params: { employeeId: string } }
) {
  try {
    return NextResponse.json(mockLeaveBalances);
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
