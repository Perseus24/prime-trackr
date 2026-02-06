'use client';

import { useActionState, useEffect, useState } from "react";
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
import SubmitButton from "@/app/components/submitButton";
import TaskList from "@/app/components/taskList";

export default function ClientPage({ user, projectData, tasks }: { user: any, projectData: any, tasks: any }) {
    const [state, formAction] = useActionState(createNewTask, null);

    return (
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
                        />
                    </div>
                    <div className="bg-neutral-100 flex flex-col p-3 rounded-lg">
                        <div className="flex justify-between items-center">
                            <p>ongoing</p>
                        </div>
                        <TaskList
                            tasks={tasks.filter((task: any) => task.status === "ongoing")}
                        />
                    </div>
                    <div className="bg-neutral-100 flex flex-col p-3 rounded-lg">
                        <div className="flex justify-between items-center">
                            <p>completed</p>
                        </div>
                        <TaskList
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
    )
}