import { connectDB } from "@/lib/db";
import Conversation from "@/models/Conversation";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        await connectDB();
        const body = await request.json();
        const { type, members, name, createdBy } = body;
        if (!type || !members || members.length < 2) {
            return NextResponse.json(
                {
                    message: "Type and at least two members are required",
                },
                { status: 400 }
            );
        }
        const conversation = await Conversation.create({
            type,
            members,
            name,
            createdBy,
        });
        return NextResponse.json({
            message: "Conversation created successfully",
            conversation,
        },
            { status: 201 });
        
    } catch (error) {
        console.error("Conversation creation error:", error);
        return NextResponse.json({

            message: "Failed to create conversation",
        },
            { status: 500 });
    }
}
