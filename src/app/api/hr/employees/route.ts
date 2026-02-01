import { NextResponse } from 'next/server';
import { mockEmployees } from '@/lib/mock-data';

export async function GET() {
  try {
    return NextResponse.json(mockEmployees);
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
