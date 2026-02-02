'use client'

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
import { Button } from "@/components/ui/button";

import { createProject } from "../home/actions";
import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { Loader } from "lucide-react";
import SubmitButton from "./submitButton";


export default function AddProject() {
    const [state, formAction] = useActionState(createProject, null);
    
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="cursor-pointer w-min">create project</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-106.25 font-mono">
                <form action={formAction}>
                    <DialogHeader>
                        <DialogTitle>Create project</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col gap-4 text-sm text-neutral-600 mt-3 mb-6">
                        <div className="flex flex-col gap-2 mt-2">
                            <label htmlFor="title">project title</label>
                            <input type="text" id="title" className="p-2 border border-gray-300 rounded-sm" name="title" />
                            {
                                state?.errors?.title && <p className="text-xs text-red-600">{state?.errors?.title}</p>
                            }
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
                        <SubmitButton message="create project" loadingMessage="creating project" />
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}