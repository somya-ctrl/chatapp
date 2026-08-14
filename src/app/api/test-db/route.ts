import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    return NextResponse.json({
      message: "MongoDB connected successfully",
    });
  } catch (error) {
    console.error("Database error:", error);

    return NextResponse.json(
      {
        message: "Database connection failed",
      },
      { status: 500 }
    );
  }
}