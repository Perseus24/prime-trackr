
'use client';

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
import { useEffect, useState } from "react";
import { CirclePlus, X } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { AddAttendance } from "./actions";


const attendance3A = [
    { date: '1/22', dateReadable: 'jan_22' },
    { date: '1/29', dateReadable: 'jan_29' },
    { date: '2/5', dateReadable: 'feb_5' },
    { date: '2/12', dateReadable: 'feb_12' },
    { date: '2/19', dateReadable: 'feb_19' },
    { date: '2/26', dateReadable: 'feb_26' },
]

const attendance3B = [
    { date: '1/21', dateReadable: 'jan_21' },
    { date: '1/28', dateReadable: 'jan_28' },
    { date: '2/4', dateReadable: 'feb_4' },
    { date: '2/11', dateReadable: 'feb_11' },    
    { date: '2/18', dateReadable: 'feb_18' },
    { date: '2/25', dateReadable: 'feb_25' },
]

export default function ClientPage() {
    const [attendanceData, setAttendanceData] = useState([]);
    const [currentClass, setCurrentClass] = useState('3A');
    const [currentClassData, setCurrentClassData] = useState([]);
    const [action, setSelectedAction] = useState('');
    
    const fetchAttendance = async (currentClass: string) => {
        try {
            const response = await fetch(`http://localhost:3001/api/attendance/${currentClass}`);
            const data = await response.json();
            setAttendanceData(data);
        } catch (error) {
            console.error('Error fetching attendance:', error);
        }
    }

    const fetchClassData = async (currentClass: string) => {
        try {
            const response = await fetch(`http://localhost:3001/api/class/${currentClass}`);
            const data = await response.json();
            console.log("data", data);
            setCurrentClassData(data);
        } catch (error) {
            console.error('Error fetching class:', error);
        }
    }
    useEffect(() => {
        fetchAttendance(currentClass);
        fetchClassData(currentClass);
    }, [currentClass]);

    const updateAbsences = async (studentId: number, dateReadable: string) => {
        const body = {
            dateReadable: dateReadable,
            studentId: studentId,
            bloc: currentClass
        }

        await fetch(`http://localhost:3001/api/attendance/update-absences`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        fetchAttendance(currentClass);
    }

    return (
        <div className="flex flex-col pt-24 gap-6 p-8">
            <div className="flex justify-between">
                <div className="flex flex-1 gap-2 items-center">
                    <p>Class: {currentClass}</p>
                </div>
                <Select 
                    value={currentClass}
                    onValueChange={(value) => setCurrentClass(value)}
                    name="class">
                    <SelectTrigger className="w-40">
                        <SelectValue placeholder="Select a class" />
                    </SelectTrigger>
                    <SelectContent  className="font-mono">
                        <SelectGroup>
                            <SelectItem value="3A">3A</SelectItem>
                            <SelectItem value="3B">3B</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <p>Total students: {currentClassData.length}</p>
            <div className="flex flex-col gap-2">
                <div className="flex flex-wrap gap-5 items-center">
                    <div onClick={() => setSelectedAction('add-attendance')} className="px-3 py-2 rounded-2xl text-xs bg-amber-800 text-white cursor-pointer hover:bg-amber-900">
                        add attendance
                    </div>
                </div>
            </div>
            <div>
                {
                    action === 'add-attendance' ? <AddAttendance bloc={currentClass} /> : null
                }
            </div>
            {/* <table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>last name</th>
                        <th>first name</th>
                        <th>jan 22</th>
                        <th>jan 29</th>
                        <th>feb 5</th>
                        <th>feb 12</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        attendance.map((student) => (
                            <tr className="border" key={student.id}>
                                <td className="py-3">{student.id}</td>
                                <td>{student.last_name}</td>
                                <td>{student.first_name}</td>
                                <td>{
                                        student.jan_22 == 'absent' ? <X className="text-red-500" /> : null
                                    }
                                </td>
                                <td>{
                                        student.jan_29 == 'absent' ? 
                                        <div className="flex justify-center items-center h-full w-full">
                                            <X className="text-red-500" />
                                        </div> : null
                                    }
                                </td>
                                <td>{
                                        student.feb_5 == 'absent' ? 
                                        <div className="flex justify-center items-center h-full w-full">
                                            <X className="text-red-500" />
                                        </div> : null
                                    }
                                </td>
                                <td>{
                                        student.feb_12 == 'absent' ? 
                                        <div className="flex justify-center items-center h-full w-full">
                                            <X className="text-red-500" />
                                        </div> : null
                                    }
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table> */}
            <div className="flex flex-col">
                {/* header */}
                <div className="flex">
                    <div className="flex p-2 border max-w-40 w-40">
                        <p>last name</p>
                    </div>
                    <div className="flex p-2 border max-w-40 w-40">
                        <p>first name</p>
                    </div>
                    {
                        (currentClass === '3A' ? attendance3A : attendance3B).map((date: any) => (
                            <div key={date.date} className="flex p-2 border w-12">
                                <p>{date.date}</p>
                            </div>
                        ))
                    }
                </div>
                {/* body */}
                {
                    currentClassData.map((student: any) => (
                        <div key={student.id} className="flex">
                            <div className="flex p-2 border max-w-40 w-40">
                                <p>{student.last_name}</p>
                            </div>
                            <div className="flex p-2 border max-w-40 w-40">
                                <p>{student.first_name}</p>
                            </div>
                            {
                                (currentClass === '3A' ? attendance3A : attendance3B).map((date: any) => (
                                    <ContextMenu
                                        key={date}
                                    >
                                        <ContextMenuTrigger className={`
                                            ${(attendanceData as any).find((item: any) => item.dateReadable === date.dateReadable)?.studentsAbsent.includes(student.id) ? 'bg-red-500' : '' }
                                            flex p-2 border w-12
                                        `}></ContextMenuTrigger>
                                        <ContextMenuContent className="w-48 font-mono">
                                            <ContextMenuGroup>
                                                <ContextMenuItem
                                                    onClick={() => updateAbsences(student.id, date.dateReadable)}
                                                    >
                                                    Mark as absent
                                                </ContextMenuItem>
                                            </ContextMenuGroup>
                                        </ContextMenuContent>
                                    </ContextMenu>
                                    
                                ))
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
