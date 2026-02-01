import { NextResponse } from 'next/server';
import { mockDashboardStats } from '@/lib/mock-data';

export async function GET() {
  try {
    return NextResponse.json(mockDashboardStats);
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
