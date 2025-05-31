import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { readUsers, writeUsers } from '@/lib/users';

export async function PUT(request: Request) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const { name, email } = await request.json();

    // Validate input
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if email is already taken by another user
    if (email !== session.user.email) {
      const users = readUsers();
      const existingUser = users.find(u => u.email === email);
      if (existingUser) {
        return NextResponse.json(
          { error: 'Email already in use' },
          { status: 400 }
        );
      }
    }

    // Update user
    const users = readUsers();
    const userIndex = users.findIndex(u => u.email === session.user.email);
    
    if (userIndex === -1) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    users[userIndex] = {
      ...users[userIndex],
      name,
      email,
    };

    writeUsers(users);

    return NextResponse.json({
      id: users[userIndex].id,
      name,
      email,
      role: users[userIndex].role,
    });
  } catch (error) {
    console.error('Update profile error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 