'use client';
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
    Avatar,
    AvatarBadge,
    AvatarFallback,
    AvatarGroup,
    AvatarGroupCount,
    AvatarImage,
} from "@/components/ui/avatar";
import Link from 'next/link'
import CatLoadingIndicator from "./catLoadingIndicator";


export default function Header(){
    const [time, setTime] = useState(new Date());
    const pathName = usePathname();
    const [isLoadingToNavigate, setIsLoadingToNavigate] = useState(false)
    
    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        setTimeout(() => setIsLoadingToNavigate(false), 1000);
    }, [pathName])

    const activeLink = (link: string) => pathName === link ? 'text-orange-400' : 'text-white';
    return (
        <div className="fixed top-0 w-full z-40 bg-black px-8 py-3">
            {
                isLoadingToNavigate && CatLoadingIndicator()
            }
            <div className="flex justify-between items-center text-white">
                <div className="flex gap-3">
                    <p className="text-orange-400">{">"}_</p>
                    <p>~{pathName}</p>
                    <span className="text-neutral-600">|</span>
                    <span className="text-neutral-500">{time.toLocaleTimeString('en-US', { hour12: false })}</span>
                </div>
                <div className="flex gap-5 items-center">
                    <Link onClick={() => setIsLoadingToNavigate(true)} href="/home" className={activeLink('/home')}>home</Link>
                    <Link onClick={() => setIsLoadingToNavigate(true)} href="#">projects</Link>
                    <Link onClick={() => setIsLoadingToNavigate(true)} href="/users" className={activeLink('/users')}>users</Link>
                    <Link onClick={() => setIsLoadingToNavigate(true)} href="#">thots</Link>
                    <Link onClick={() => setIsLoadingToNavigate(true)} href="/profile">
                        <Avatar>
                            <AvatarImage
                                src="https://github.com/evilrabbit.png"
                                alt="@evilrabbit"
                                />
                            <AvatarFallback>ER</AvatarFallback>
                        </Avatar>
                    </Link>
                </div>
            </div>
        </div>
    )
}