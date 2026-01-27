import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json(
      { error: 'No token provided' },
      { status: 401 }
    );
  }

  const token = authHeader.split(' ')[1];
  console.log('Received token:', token);

  // Mock token validation
  if (token) {
    return NextResponse.json({
      message: 'Access granted!',
      secretData: 'This is protected data 🔐',
      user: { email: 'kuzyuberdin@gmail.com' }
    });
  }

  return NextResponse.json(
    { error: 'Invalid token' },
    { status: 401 }
  );
}
