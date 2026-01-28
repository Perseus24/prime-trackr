'use client';

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { login } from "@/app/login/actions";
import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();

    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);
    
    useEffect(() => {
        const handleMouseMove = (e: { clientX: any; clientY: any; }) => {
        setCursorPos({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const [formData, setFormData] = useState({
        name: '',
        password: ''
    })

    const handleLogin = async () => {
        await login(formData.name, formData.password);
    }

    return (
        <div className="h-screen bg-neutral-50 text-neutral-900 font-mono text-sm flex justify-center items-center">
            <div className="fixed inset-0 pointer-events-none opacity-50" 
                style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' /%3E%3C/svg%3E")'}}></div>
            <div 
                className="fixed w-8 h-8 border border-orange-600 rounded-full pointer-events-none z-50 transition-transform duration-200"
                style={{
                left: `${cursorPos.x}px`,
                top: `${cursorPos.y}px`,
                transform: 'translate(-50%, -50%)'
                }}
            ></div>

            <div className="bg-black w-90 rounded-lg text-white p-8">
                <p className="text-base text-center">Login</p>
                <input onChange={(e) => setFormData({...formData, name: e.target.value})} type="text" placeholder="username" className="w-full bg-white rounded-md p-2 my-2 text-black mt-12" />
                <input onChange={(e) => setFormData({...formData, password: e.target.value})} type="password" placeholder="password" className="w-full bg-white rounded-md p-2 my-2 text-black mt-2" />
                <Button onClick={handleLogin} className="w-full bg-white rounded-lg p-2 my-2 text-black mt-12 hover:bg-gray-200 cursor-pointer">Login</Button>
            </div>
        </div>
    );
}

