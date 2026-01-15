'use client';
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function Header(){
    const [time, setTime] = useState(new Date());
    const pathName = usePathname();
    
    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const activeLink = (link: string) => pathName === link ? 'text-orange-400' : 'text-white';
    
    return (
        <div className="fixed top-0 w-full z-40 bg-black px-8 py-3">
            <div className="flex justify-between items-center text-white">
                <div className="flex gap-3">
                    <p className="text-orange-400">{">"}_</p>
                    <p>~{pathName}</p>
                    <span className="text-neutral-600">|</span>
                    <span className="text-neutral-500">{time.toLocaleTimeString('en-US', { hour12: false })}</span>
                </div>
                <div className="flex gap-5">
                    <a href="/home" className={activeLink('/home')}>home</a>
                    <a>projects</a>
                    <a href="/users" className={activeLink('/users')}>users</a>
                    <a>thots</a>
                </div>
            </div>
        </div>
    )
}