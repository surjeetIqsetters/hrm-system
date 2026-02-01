import { NextResponse } from 'next/server';
import { mockAttendanceRecords } from '@/lib/mock-data';

export async function GET(
  request: Request,
  { params }: { params: { employeeId: string } }
) {
  try {
    const today = new Date().toISOString().split('T')[0];
    const todayRecord = mockAttendanceRecords.find(
      r => r.employeeId === params.employeeId && r.date === today
    );

    return NextResponse.json(todayRecord || {
      id: '',
      employeeId: params.employeeId,
      date: today,
      checkInTime: undefined,
      checkOutTime: undefined,
      status: 'absent',
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
