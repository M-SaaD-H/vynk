import { ApiResponse } from '@/lib/apiResponse';
import { connectToDB } from '@/lib/db';
import { User } from '@/models/user.model';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();

    if(!name || !email || !password) {
      return NextResponse.json(
        new ApiResponse(404, null, 'Email or password or name not found'),
        { status: 404 }
      )
    }

    await connectToDB();

    const existingUser = await User.findOne({ email });

    if(existingUser) {
      return NextResponse.json(
        new ApiResponse(409, existingUser, 'Email already registered'),
        { status: 409 }
      )
    }

    const user = await User.create({
      name,
      email,
      password
    });

    if(!user) {
      return NextResponse.json(
        new ApiResponse(500, null, 'Failed to register user'),
        { status: 500 }
      )
    }

    return NextResponse.json(
      new ApiResponse(201, user, 'User registered successfully'),
      { status: 201 }
    )
  } catch(error) {
    console.error('Error while registering user E:', error);
    return NextResponse.json(
      new ApiResponse(501, null, (error as Error).message),
      { status: 501 }
    )
  }
}