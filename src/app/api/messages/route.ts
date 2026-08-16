import { connectDB } from "@/lib/db";
import Message from "@/models/Message";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        await connectDB();
        const body = await request.json();
        const { conversationId, senderId, content } = body;
        if (!conversationId || !senderId || !content) {
            return NextResponse.json(
                {
                    message: "conversationId,senderId,content are required"
                },
                { status: 400 }
            );
        }
        const message = await Message.create(
            {
                conversationId, senderId, content
            }
        );
        return NextResponse.json(
            {
                message: "message sent successfully",
                data:message,
            },
            { status: 201}
        );
    } catch (error) {
        console.error("Message creation error:", error);
        return NextResponse.json(
            {
                message: "failed to create message",
            },
            { status: 500 }
        );
    }
}

export async function GET(request: Request) {
    try {
        await connectDB();
        const { searchParams } = new URL(request.url);
        const conversationId = searchParams.get("conversationId");
        if (!conversationId) {
            return NextResponse.json({
                message: "conversationId is required",
            },
                { status: 400 });
        }
        const messages = await Message.find({
            conversationId,

        }).sort({ createdAt: 1 });
        return NextResponse.json({
            messages,
        });
    } catch (error) {
        console.error("message fetching error", error);
        return NextResponse.json(
            {
                message: "failed to fetch messages,"
            },
            { status: 500 }
        );
    }
}