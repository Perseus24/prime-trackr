"use client"
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";

export function AddAttendance({bloc}: any) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const handleSubmit = async (event: any) => {
        event.preventDefault();
        setIsSubmitting(true);
        const formData = new FormData(event.currentTarget);

        const body = {
            date: formData.get("date"),
            dateReadable: formData.get("dateReadable"),
            bloc: bloc,
            studentsAbsent: [],
            studentsExcused: []
        }

        await fetch(`http://localhost:3001/api/attendance`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });
        setIsSubmitting(false);
        window.location.reload();
    }

    return (
        <form 
            onSubmit={handleSubmit}
            className="flex flex-col gap-2 w-60 p-4 border rounded-lg text-[13px]">
            <label htmlFor="date">date</label>
            <input id="date" className="p-2 border border-gray-300 rounded-sm mb-3" name="date" />
            <label htmlFor="dateReadable">dateReadable</label>
            <input id="dateReadable" className="p-2 border border-gray-300 rounded-sm mb-5" name="dateReadable" />
            <Button type="submit" className="cursor-pointer">
                { isSubmitting &&
                    <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                }
                add
            </Button>
        </form>
    )   
}