// FILE: /app/api/auth/register/route.ts

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

// Initialize Prisma Client
const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    // 1. Parse the incoming request data
    const body = await request.json();
    const { name, institution, email, phone, password } = body;

    // 2. Check if a user with this email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: email },
    });

    if (existingUser) {
      // Return an error if the user exists
      return NextResponse.json({ message: 'User with this email already exists.' }, { status: 409 });
    }

    // 3. Hash the password for security
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Create the new user and their associated links record in the database
    const newUser = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
        institution: institution,
        phone: phone,
        // FIX: Changed 'links' to 'link' to match the updated Prisma schema.
        link: {
          // This creates an empty 'link' record connected to the new user
          create: {}, 
        },
      },
      // It's good practice to include the relation in the response
      include: {
        link: true
      }
    });
    
    // 5. Send back a success response (without the password)
    const { password: _, ...userWithoutPassword } = newUser;
    return NextResponse.json({ user: userWithoutPassword }, { status: 201 });

  } catch (error) {
    console.error("Registration Error:", error);
    return NextResponse.json({ message: 'An internal server error occurred.' }, { status: 500 });
  }
}
