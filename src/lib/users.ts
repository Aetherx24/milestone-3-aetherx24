import fs from 'fs';
import path from 'path';

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: string;
}

const USERS_FILE = path.join(process.cwd(), 'users.json');

// Initialize users file if it doesn't exist
if (!fs.existsSync(USERS_FILE)) {
  const initialUsers = [
    {
      id: "1",
      email: "admin@example.com",
      password: "admin123",
      name: "Admin User",
      role: "admin"
    },
    {
      id: "2",
      email: "user@example.com",
      password: "user123",
      name: "Regular User",
      role: "user"
    }
  ];
  fs.writeFileSync(USERS_FILE, JSON.stringify(initialUsers, null, 2));
}

// Read users from file
export function readUsers(): User[] {
  try {
    const data = fs.readFileSync(USERS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading users file:', error);
    return [];
  }
}

// Write users to file
export function writeUsers(users: User[]) {
  try {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
  } catch (error) {
    console.error('Error writing users file:', error);
  }
}

export function findUserByEmail(email: string) {
  console.log('Finding user by email:', email);
  const users = readUsers();
  console.log('Current users:', users.map(u => ({ id: u.id, email: u.email })));
  const user = users.find(user => user.email === email);
  console.log('Found user:', user ? { id: user.id, email: user.email } : 'No user found');
  return user;
}

export function addUser(user: Omit<User, 'id'>) {
  console.log('Adding new user:', { email: user.email, name: user.name });
  const users = readUsers();
  const newUser = {
    ...user,
    id: (users.length + 1).toString()
  };
  users.push(newUser);
  writeUsers(users);
  console.log('Updated users list:', users.map(u => ({ id: u.id, email: u.email })));
  return newUser;
}

// Helper function to log current users
export function logUsers() {
  const users = readUsers();
  console.log('Current users in store:', users.map(u => ({ id: u.id, email: u.email })));
} 