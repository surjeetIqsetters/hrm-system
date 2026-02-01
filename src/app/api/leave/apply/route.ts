import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { employeeId, employeeName, leaveType, startDate, endDate, days, reason } = body;

    await new Promise(resolve => setTimeout(resolve, 500));

    const leaveRequest = {
      id: Date.now().toString(),
      employeeId,
      employeeName,
      leaveType,
      startDate,
      endDate,
      days,
      reason,
      status: 'pending',
      appliedAt: new Date().toISOString(),
    };

    return NextResponse.json(leaveRequest);
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
