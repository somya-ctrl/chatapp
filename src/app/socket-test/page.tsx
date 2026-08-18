"use client"

import { useEffect } from "react";
import { socket } from "@/lib/socket";
export default function SocketTest() {
    useEffect(() => {
        
        socket.on("connect", () => {
            console.log("Connected to socket server:", socket.id);
        });
        return () => {
            socket.off("connect");
        };
    }, []);
    return (
        <div>
            <h1>Socket test</h1>
            <p>Open the browser console.</p>
        </div>
    );
}