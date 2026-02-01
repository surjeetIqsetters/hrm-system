import { NextResponse } from 'next/server';
import { mockUsers } from '@/lib/mock-data';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    await new Promise(resolve => setTimeout(resolve, 500));

    const user = mockUsers.find(u => u.email === email);

    // Always return success for security (don't reveal if email exists)
    return NextResponse.json({
      message: 'If an account exists with this email, a password reset link has been sent.',
    });
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
