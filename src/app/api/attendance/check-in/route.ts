import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { employeeId, location } = body;

    await new Promise(resolve => setTimeout(resolve, 500));

    const now = new Date();
    const checkInTime = now.toTimeString().slice(0, 5);

    return NextResponse.json({
      id: Date.now().toString(),
      employeeId,
      date: now.toISOString().split('T')[0],
      checkInTime,
      checkOutTime: undefined,
      status: 'present',
      workingHours: 0,
      shiftStart: '09:00',
      shiftEnd: '18:00',
      overtimeHours: 0,
      isRegularized: false,
    });
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
