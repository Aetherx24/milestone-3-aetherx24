import { NextResponse } from 'next/server';
import { findUserByEmail, addUser, logUsers } from '@/lib/users';

export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json();
    console.log('Registration attempt:', { email, name });

    // Validate input
    if (!email || !password || !name) {
      console.log('Missing fields:', { email: !!email, password: !!password, name: !!name });
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = findUserByEmail(email);
    if (existingUser) {
      console.log('User already exists:', email);
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      );
    }

    // Create new user
    const newUser = addUser({
      email,
      password,
      name,
      role: 'user'
    });
    console.log('New user created:', { id: newUser.id, email: newUser.email, role: newUser.role });
    logUsers();

    // Return success without the password
    const { password: _, ...userWithoutPassword } = newUser;
    return NextResponse.json(userWithoutPassword, { status: 201 });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 