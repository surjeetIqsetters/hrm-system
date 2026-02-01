import { NextResponse } from 'next/server';
import { mockUsers } from '@/lib/mock-data';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, code } = body;

    await new Promise(resolve => setTimeout(resolve, 500));

    // Mock MFA verification - accept any 6-digit code
    if (!code || code.length !== 6 || !/^\d+$/.test(code)) {
      return NextResponse.json(
        { message: 'Invalid verification code' },
        { status: 400 }
      );
    }

    const user = mockUsers.find(u => u.email === email);
    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    const token = `mock_token_${user.id}_${Date.now()}_mfa`;

    return NextResponse.json({
      user,
      token,
    });
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
