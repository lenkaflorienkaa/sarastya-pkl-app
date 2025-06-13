// FILE: /app/api/auth/signin/route.ts

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-key';

export async function POST(request: Request) {
  try {
    const { login, password } = await request.json();

    const user = await prisma.user.findUnique({ where: { email: login } });

    // FIX: Added a check to ensure user and user.password are not null.
    // The bcrypt.compareSync function requires a string and will error if it receives null.
    if (!user || !user.password || !bcrypt.compareSync(password, user.password)) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1d' });

    return NextResponse.json({ token, user: { role: 'employee' } }); // Assuming all users are 'employee' for now
  } catch (error) {
    console.error("Sign-in error:", error);
    return NextResponse.json({ message: 'An error occurred during sign-in' }, { status: 500 });
  }
}
