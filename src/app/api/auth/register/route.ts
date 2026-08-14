import { connectDB } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        await connectDB();
        const body = await request.json();
        const { name, email, password } = body;
        if (!name || !email || !password) {
            return NextResponse.json(
                {
                    message: "Name,email and password are required",
                },
                { status: 400 }
            );
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return NextResponse.json({
                message: "User already exists",
            },
                { status: 409 });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });
        return NextResponse.json({
            message: "User registered successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                isOnline: user.isOnline,
            },

        },
            { status: 201 });
    } catch (error) {
        console.error("Registration error:", error);
        return NextResponse.json({
            message: "Registration failed",
        },
            { status: 500 });
    }
}