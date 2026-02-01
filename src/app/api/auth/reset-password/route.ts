import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { token, newPassword } = body;

    await new Promise(resolve => setTimeout(resolve, 500));

    // In production, verify token and update password in database
    return NextResponse.json({ message: 'Password reset successful' });
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
