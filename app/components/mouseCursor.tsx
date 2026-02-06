'use client'

import { useState, useEffect } from "react";

export default function MouseCursor() {
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
    useEffect(() => {
        const handleMouseMove = (e: { clientX: any; clientY: any; }) => {
        setCursorPos({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div 
            className="fixed w-8 h-8 border border-orange-600 rounded-full pointer-events-none z-50 transition-transform duration-200"
            style={{
            left: `${cursorPos.x}px`,
            top: `${cursorPos.y}px`,
            transform: 'translate(-50%, -50%)'
            }}
        ></div>
    )
}