'use client';

import { useEffect, useState } from "react";
import Header from "../components/header";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Avatar,
    AvatarBadge,
    AvatarFallback,
    AvatarGroup,
    AvatarGroupCount,
    AvatarImage,
} from "@/components/ui/avatar"
import { createProject } from "./actions";
import { SquareKanban } from "lucide-react";

export default function ClientHome({ projects, user }: { projects: any, user: any}) {
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

    return (
        <div className="min-h-screen bg-neutral-50 text-neutral-900 font-mono text-sm">
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

            {/* top bar */}
            <Header />
            <div className="flex flex-col">
                {
                    projects && projects.length > 0 ? (
                        <div className="min-h-screen h-full w-full flex flex-col gap-6 p-8">
                            <div className="grid grid-cols-4 mt-24">
                                {
                                    projects.map((project: any) => (
                                        <div key={project.id} className="bg-neutral-200 rounded-lg flex flex-col">
                                            <div className="flex justify-between items-center py-3 px-3 text-black border-b-2 border-neutral-300">
                                                <div className="flex gap-5 items-center">
                                                    <div className="flex justify-center items-center h-8 w-8 rounded-full bg-black text-white">
                                                        <SquareKanban className="h-4 w-4" />
                                                    </div>
                                                    <p>{project.title}</p>
                                                </div>
                                            </div>
                                            <div className="p-5 flex gap-5 text-xs w-full overflow-hidden">
                                                <div className="flex-1 flex-col gap-4 ">
                                                    <p className="font-medium text-gray-600">Author</p>
                                                    <div className="flex gap-3 mt-3 items-center">
                                                        <Avatar>
                                                            <AvatarImage
                                                                src="https://github.com/evilrabbit.png"
                                                                alt="@evilrabbit"
                                                                />
                                                                <AvatarFallback>ER</AvatarFallback>
                                                        </Avatar>
                                                        <p className="text-wrap overflow-hidden">{user.name}</p>
                                                    </div>
                                                    <div className="flex flex-col gap-3 mt-6">
                                                        <p className="font-medium text-gray-600">Created at</p>
                                                        <p>{new Date(project.created_at).toLocaleDateString('en-US', {
                                                            month: 'long',
                                                            day: 'numeric',
                                                            year: 'numeric',
                                                            })}</p>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    ) : (
                        <div className="min-h-screen h-full w-full flex flex-col gap-6 justify-center items-center">
                            <p>No projects yet</p>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button className="cursor-pointer">create project</Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-106.25 font-mono">
                                    <form action={createProject}>
                                        <DialogHeader>
                                            <DialogTitle>Create project</DialogTitle>
                                        </DialogHeader>
                                        <div className="flex flex-col gap-4 text-sm text-neutral-600 mt-3 mb-6">
                                            <div className="flex flex-col gap-2 mt-2">
                                                <label htmlFor="title">project title</label>
                                                <input type="text" id="title" className="p-2 border border-gray-300 rounded-sm" name="title" />
                                            </div>
                                            <div className="flex flex-col gap-2 mt-2">
                                                <label htmlFor="description">project description</label>
                                                <textarea 
                                                    rows={4}
                                                    id="description" 
                                                    className="p-2 border border-gray-300 rounded-sm" 
                                                    name="description" />
                                            </div>
                                        </div>
                                        <DialogFooter>
                                            <DialogClose asChild>
                                            <Button variant="outline">cancel</Button>
                                            </DialogClose>
                                            <Button type="submit">create</Button>
                                        </DialogFooter>
                                    </form>
                                </DialogContent>
                            </Dialog>
                        </div>
                    )
                }
            </div>
            {/* // <div className="flex flex-col gap-8 px-8">
            //     <div className="grid grid-cols-3 mt-32 w-full">
            //         <div className="flex flex-col gap-3">
            //             <p>to-do</p>
            //         </div>
            //         <div className="flex flex-col gap-3">
            //             <p>in-progress</p>
            //         </div>
            //         <div className="flex flex-col gap-3">
            //             <p>completed</p>
            //         </div>
            //     </div>
            // </div> */}
        </div>
    );
}

