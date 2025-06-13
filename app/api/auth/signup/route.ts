// FILE: /app/api/auth/signup/route.ts

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { name, email, password, institution, phone } = await request.json();

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 409 });
    }

    // Hash the password
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Create the new user and their associated links record in a single transaction
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        institution,
        phone,
        // FIX: Changed 'links' to 'link' to match the updated Prisma schema.
        link: {
          create: {}, // Creates an empty link record associated with this user
        },
      },
      include: {
        // FIX: Changed 'links' to 'link' here as well.
        link: true // Include the new link record in the response
      }
    });

    // Don't send the password back in the response
    const { password: _, ...userWithoutPassword } = newUser;

    return NextResponse.json({ user: userWithoutPassword }, { status: 201 });

  } catch (error) {
    console.error("Signup Error:", error);
    return NextResponse.json({ message: 'An error occurred during sign-up' }, { status: 500 });
  }
}
