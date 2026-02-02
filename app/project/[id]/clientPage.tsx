'use client';

import { useActionState, useEffect, useState } from "react";
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
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useFormStatus } from 'react-dom';
import { Loader } from "lucide-react";
import SubmitButton from "@/app/components/submitButton";

interface TaskListProps {
    tasks: any,
    projectDataId: number
}



function TaskList({ tasks, projectDataId }: TaskListProps) {

    const priorityTagStyle = (priority: string) => {
        switch(priority) {
            case 'high':
                return 'text-red-600 bg-red-200';
            case 'medium':
                return 'text-yellow-600 bg-yellow-200';
            case 'low':
                return 'text-green-600 bg-green-200';
        }
    }
    
    return (
        <div>
            {
                tasks.map((task: any) => (
                    <ContextMenu  key={task.id} >
                        <ContextMenuTrigger className="rounded-lg bg-white flex flex-col gap-3 p-3 mt-5">
                            <div className="flex flex-wrap gap-2">
                                <div className={`rounded-sm py-1 px-1.5 text-xs ${priorityTagStyle(task.priority)}`}>{task.priority}</div>
                            </div>
                            <p className="font-semibold">{task.title}</p>
                            <p className="text-sm">{task.description}</p>
                        </ContextMenuTrigger >
                        <ContextMenuContent className="w-48 font-mono">
                            <ContextMenuGroup>
                                {
                                    task.status == 'to-do' && (
                                        <ContextMenuItem
                                            onClick={() => moveTask("ongoing", task.id, projectDataId)}>
                                            Mark as ongoing
                                        </ContextMenuItem>
                                    )
                                }
                                {
                                    task.status == 'ongoing' && (
                                        <ContextMenuItem
                                            onClick={() => moveTask("completed", task.id, projectDataId)}>
                                            Mark as completed
                                        </ContextMenuItem>
                                    )
                                }
                                
                            </ContextMenuGroup>
                        </ContextMenuContent>
                    </ContextMenu>
                    
                ))
            }
        </div>
    )
        
}
export default function ClientPage({ user, projectData, tasks }: { user: any, projectData: any, tasks: any }) {
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
    const [state, formAction] = useActionState(createNewTask, null);
    
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
                        <div className="bg-neutral-100 flex flex-col p-3 rounded-lg min-h-screen">
                            <div className="flex justify-between items-center mb-3">
                                <p>to-do</p>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button className="cursor-pointer">+</Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-106.25 font-mono">
                                        <form action={formAction}>
                                            <DialogHeader>
                                                <DialogTitle>Create Task</DialogTitle>
                                            </DialogHeader>
                                            <div className="flex flex-col gap-4 text-sm text-neutral-600 mt-3 mb-6">
                                                <input type="hidden" readOnly name="projectId" value={projectData.id} />
                                                <div className="flex flex-col gap-2 mt-2">
                                                    <label htmlFor="title">title <span className="text-red-600">*</span></label>
                                                    <input type="text" id="title" className="p-2 border border-gray-300 rounded-sm" name="title" />
                                                    {
                                                        state?.errors?.title && <p className="text-xs text-red-600">{state?.errors?.title}</p>
                                                    }
                                                </div>
                                                <div className="flex flex-col gap-2 mt-2">
                                                    <label htmlFor="description">description</label>
                                                    <textarea 
                                                        rows={4}
                                                        id="description" 
                                                        className="p-2 border border-gray-300 rounded-sm" 
                                                        name="description" />
                                                    {
                                                        state?.errors?.description && <p className="text-xs text-red-600">{state?.errors?.description}</p>
                                                    }
                                                </div>
                                                <div className="flex flex-col gap-2 mt-2">
                                                    <label htmlFor="priority">priority <span className="text-red-600">*</span></label>
                                                    <Select name="priority">
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue placeholder="Select a priority" />
                                                        </SelectTrigger>
                                                        <SelectContent className="font-mono">
                                                            <SelectGroup>
                                                                <SelectItem value="high">High</SelectItem>
                                                                <SelectItem value="medium">Medium</SelectItem>
                                                                <SelectItem value="low">Low</SelectItem>
                                                            </SelectGroup>
                                                        </SelectContent>
                                                    </Select>
                                                    {
                                                        state?.errors?.priority && <p className="text-xs text-red-600">{state?.errors?.priority}</p>
                                                    }
                                                </div>
                                            </div>
                                            <DialogFooter>
                                                <DialogClose asChild>
                                                <Button variant="outline">cancel</Button>
                                                </DialogClose>
                                                <SubmitButton message="create task" loadingMessage="creating task" />
                                            </DialogFooter>
                                        </form>
                                    </DialogContent>
                                </Dialog>
                            </div>
                            <TaskList
                                tasks={tasks.filter((task: any) => task.status === "to-do")}
                                projectDataId={projectData.id}
                            />
                        </div>
                        <div className="bg-neutral-100 flex flex-col p-3 rounded-lg">
                            <div className="flex justify-between items-center">
                                <p>ongoing</p>
                            </div>
                            <TaskList
                                tasks={tasks.filter((task: any) => task.status === "ongoing")}
                                projectDataId={projectData.id}
                            />
                        </div>
                        <div className="bg-neutral-100 flex flex-col p-3 rounded-lg">
                            <div className="flex justify-between items-center">
                                <p>completed</p>
                            </div>
                            <TaskList
                                tasks={tasks.filter((task: any) => task.status === "completed")}
                                projectDataId={projectData.id}
                            />
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