import { NextResponse } from 'next/server';
import { mockUsers } from '@/lib/mock-data/mockUsers';

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { message: 'No token provided' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);

    // Extract user ID from mock token
    const userIdMatch = token.match(/mock_token_(\d+)_/);
    if (!userIdMatch) {
      return NextResponse.json(
        { message: 'Invalid token' },
        { status: 401 }
      );
    }

    const userId = userIdMatch[1];
    const user = mockUsers.find(u => u.id === userId);

    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 401 }
      );
    }

    return NextResponse.json({ user, token });
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
