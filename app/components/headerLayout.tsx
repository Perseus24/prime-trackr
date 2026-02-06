'use client';

import { usePathname } from "next/navigation";
import Header from "./header";
import MouseCursor from "./mouseCursor";

export default function HeaderLayout ({ children, geistSans, geistMono }: Readonly<{ children: React.ReactNode, geistSans: any, geistMono: any }>) {
    const pathname = usePathname();

    const isAuthPage = pathname === '/';
    if (isAuthPage) {
        return (
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                {children}
            </body>
        )
    }
    
    return (
        <body className={`min-h-screen bg-neutral-50 text-neutral-900 font-mono text-sm ${geistSans.variable} ${geistMono.variable} antialiased`}>
            <div className="fixed inset-0 pointer-events-none opacity-50" 
                style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' /%3E%3C/svg%3E")'}}></div>
            <MouseCursor />
            {/* top bar */}
            <Header />
            {children}
        </body>
    )
}