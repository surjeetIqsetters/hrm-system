import { NextResponse } from 'next/server';
import { mockPayslips } from '@/lib/mock-data';

export async function GET(
  request: Request,
  { params }: { params: { employeeId: string } }
) {
  try {
    return NextResponse.json(mockPayslips);
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
