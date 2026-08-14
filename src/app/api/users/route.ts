import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const user = await User.create({
      name: body.name,
      email: body.email,
      password: body.password,
    });

    return NextResponse.json(
      {
        message: "User created successfully",
        user,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("User creation error:", error);

    return NextResponse.json(
      {
        message: "Failed to create User",
      },
      {
        status: 500,
      },
    );
  }
}
