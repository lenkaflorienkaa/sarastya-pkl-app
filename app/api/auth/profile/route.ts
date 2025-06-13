// FILE: /app/api/profile/route.ts

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-key';

// This function will get the userId from the token
const getUserId = (request: Request) => {
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) return null;

    const token = authHeader.substring(7);
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
        return decoded.userId;
    } catch (error) {
        return null;
    }
}

// GET function to fetch profile
export async function GET(request: Request) {
  const userId = getUserId(request);
  if (!userId) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  const user = await prisma.user.findUnique({
      where: { id: userId },
      // FIX: Changed 'links' to 'link' to match the updated Prisma schema.
      include: { link: true } 
  });

  return NextResponse.json(user);
}

// PUT function to update profile
export async function PUT(request: Request) {
  const userId = getUserId(request);
  if (!userId) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  const { name, phone, about, links } = await request.json();

  const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
          name,
          phone,
          about,
          // FIX: Changed 'links' to 'link' to match the updated Prisma schema.
          link: {
              update: {
                  linkedin_url: links.linkedin,
                  github_url: links.github,
                  portfolio_url: links.portfolio,
              }
          }
      },
      // FIX: Changed 'links' to 'link' here as well.
      include: { link: true }
  });

  return NextResponse.json(updatedUser);
}
