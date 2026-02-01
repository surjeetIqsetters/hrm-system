import { NextResponse } from 'next/server';
import { mockUsers, mockCredentials } from '@/lib/mock-data/mockUsers';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Validate credentials
    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Check credentials (in production, this would be against a database)
    const user = mockUsers.find(u => u.email === email);
    const storedCreds = mockCredentials[email];

    if (!user || !storedCreds || storedCreds.password !== password) {
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Generate mock token (in production, use JWT)
    const token = `mock_token_${user.id}_${Date.now()}`;

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
