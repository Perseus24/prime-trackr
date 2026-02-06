'use client';

import { useActionState, useEffect, useState } from "react";
import {
    Avatar,
    AvatarBadge,
    AvatarFallback,
    AvatarGroup,
    AvatarGroupCount,
    AvatarImage,
} from "@/components/ui/avatar"
import { Loader, SquareKanban } from "lucide-react";
import Link from 'next/link'
import AddProject from "../components/addProject";
import TaskList from "../components/taskList";
import CatLoadingIndicator from "../components/catLoadingIndicator";


export default function ClientHome({ projects, user, tasks }: { projects: any, user: any, tasks: any}) {
    const [openProjectId, setOpenProjectId] = useState(null)
    const [isLoadingToNavigate, setIsLoadingToNavigate] = useState(false)

    return (
        <div className="flex flex-col">
            {
                isLoadingToNavigate && CatLoadingIndicator()
            }
            {
                projects && projects.length > 0 ? (
                    <div className="min-h-screen h-full w-full flex flex-col gap-6 p-8">
                        <div className="flex flex-col mt-24 gap-6">
                            <AddProject />
                            <div className="grid grid-cols-4 gap-6">
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
                                            <div className="p-3 flex justify-end gap-5 text-xs border-t-2 border-neutral-300">
                                                <Link 
                                                    onClick={() => {
                                                        setIsLoadingToNavigate(true)
                                                        setOpenProjectId(project.id)
                                                    }}
                                                    href={`/project/${project.id}`} 
                                                    className={`bg-black text-white py-2 px-4 rounded-md flex items-center gap-3 
                                                        cursor-pointer text-sm ${openProjectId === project.id ? 'pointer-events-none opacity-50' : ''}`}
                                                    >
                                                    {
                                                        openProjectId === project.id && (
                                                            <Loader  className="h-4 w-4 animate-spin" />
                                                        )
                                                    }
                                                    open
                                                </Link>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                            
                            {/* kanban board here */}
                            <div className="w-full grid grid-cols-4 gap-6 mt-5">
                                <div className="bg-neutral-100 flex flex-col p-3 rounded-lg">
                                    <div className="flex justify-between items-center">
                                        <p>to-do</p>
                                        {/* <Dialog>
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
                                        </Dialog> */}
                                    </div>
                                    <TaskList
                                        isLocatedInDashboard={true}
                                        tasks={tasks.filter((task: any) => task.status === "to-do")}
                                    />
                                </div>
                                <div className="bg-neutral-100 flex flex-col p-3 rounded-lg">
                                    <div className="flex justify-between items-center">
                                        <p>ongoing</p>
                                    </div>
                                    <TaskList
                                        isLocatedInDashboard={true}
                                        tasks={tasks.filter((task: any) => task.status === "ongoing")}
                                    />
                                </div>
                                <div className="bg-neutral-100 flex flex-col p-3 rounded-lg">
                                    <div className="flex justify-between items-center">
                                        <p>completed</p>
                                    </div>
                                    <TaskList
                                        isLocatedInDashboard={true}
                                        tasks={tasks.filter((task: any) => task.status === "completed")}
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
                ) : (
                    <div className="min-h-screen h-full w-full flex flex-col gap-6 justify-center items-center">
                        <p>No projects yet</p>
                        <AddProject />
                    </div>
                )
            }
        </div>
    );
}

