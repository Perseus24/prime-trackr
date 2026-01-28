'use client';

import { useEffect, useState } from "react";
import Header from "../../components/header";
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
    ContextMenu,
    ContextMenuCheckboxItem,
    ContextMenuContent,
    ContextMenuGroup,
    ContextMenuItem,
    ContextMenuLabel,
    ContextMenuRadioGroup,
    ContextMenuRadioItem,
    ContextMenuSeparator,
    ContextMenuShortcut,
    ContextMenuSub,
    ContextMenuSubContent,
    ContextMenuSubTrigger,
    ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { createNewTask, moveTask } from "./actions";

export default function ClientPage({ user, projectData, tasks }: { user: any, projectData: any, tasks: any }) {
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
            <div className="min-h-screen h-full w-full flex flex-col gap-6 p-8">
                <div className="mt-16 flex flex-col">
                    <div className="flex justify-between items-center">
                        <p className="text-xl">{projectData.title}</p>
                    </div>
                    <div className="w-full grid grid-cols-4 gap-6 mt-5">
                        <div className="bg-neutral-100 flex flex-col p-3 rounded-lg">
                            <div className="flex justify-between items-center mb-3">
                                <p>to-do</p>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button>+</Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-106.25 font-mono">
                                        <form action={createNewTask}>
                                            <DialogHeader>
                                                <DialogTitle>Create Task</DialogTitle>
                                            </DialogHeader>
                                            <div className="flex flex-col gap-4 text-sm text-neutral-600 mt-3 mb-6">
                                                <input type="hidden" readOnly name="projectId" value={projectData.id} />
                                                <div className="flex flex-col gap-2 mt-2">
                                                    <label htmlFor="title">title</label>
                                                    <input type="text" id="title" className="p-2 border border-gray-300 rounded-sm" name="title" />
                                                </div>
                                                <div className="flex flex-col gap-2 mt-2">
                                                    <label htmlFor="description">description</label>
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
                            {
                                tasks.filter((task: any) => task.status === "to-do").map((task: any) => (
                                    <ContextMenu  key={task.id} >
                                        <ContextMenuTrigger className="rounded-lg bg-white flex flex-col gap-3 p-2 mt-5">
                                            <div className="flex flex-wrap gap-2">
                                                <div className="rounded-sm py-1 px-1.5 text-red-600 bg-red-200 text-xs">high</div>
                                            </div>
                                            <p className="font-semibold">{task.title}</p>
                                            <p className="text-sm">{task.description}</p>
                                        </ContextMenuTrigger >
                                        <ContextMenuContent className="w-48 font-mono">
                                            <ContextMenuGroup>
                                                <ContextMenuItem    
                                                    onClick={() => moveTask("ongoing", task.id, projectData.id)}
                                                >
                                                    Move to ongoing
                                                </ContextMenuItem>
                                            </ContextMenuGroup>
                                        </ContextMenuContent>
                                    </ContextMenu>
                                    
                                ))
                            }
                        </div>
                        <div className="bg-neutral-100 flex flex-col p-3 rounded-lg">
                            <div className="flex justify-between items-center">
                                <p>ongoing</p>
                            </div>
                            {
                                tasks.filter((task: any) => task.status === "ongoing").map((task: any) => (
                                    <ContextMenu  key={task.id} >
                                        <ContextMenuTrigger className="rounded-lg bg-white flex flex-col gap-3 p-2 mt-5">
                                            <div className="flex flex-wrap gap-2">
                                                <div className="rounded-sm py-1 px-1.5 text-red-600 bg-red-200 text-xs">high</div>
                                            </div>
                                            <p className="font-semibold">{task.title}</p>
                                            <p className="text-sm">{task.description}</p>
                                        </ContextMenuTrigger >
                                        <ContextMenuContent className="w-48 font-mono">
                                            <ContextMenuGroup>
                                                {/* <ContextMenuItem    
                                                    onClick={() => moveTask("ongoing", task.id, projectData.id)}
                                                >
                                                    Move to ongoing
                                                </ContextMenuItem> */}
                                            </ContextMenuGroup>
                                        </ContextMenuContent>
                                    </ContextMenu>
                                    
                                ))
                            }
                        </div>
                        <div className="bg-neutral-100 flex flex-col p-3 rounded-lg">
                            <div className="flex justify-between items-center">
                                <p>completed</p>
                            </div>
                        </div>
                        <div className="bg-neutral-100 flex flex-col p-3 rounded-lg">
                            <div className="flex justify-between items-center">
                                <p>review</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}