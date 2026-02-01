import { NextResponse } from 'next/server';
import { mockAttritionRisks } from '@/lib/mock-data';

export async function GET() {
  try {
    return NextResponse.json(mockAttritionRisks);
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
