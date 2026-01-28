'use client';

import { useEffect, useState } from "react";
import Header from "../components/header";
import { createUser, getAllUsersTable } from "../lib/supabase/supabase";
import { Users } from "@/lib/types/user";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export default function Home() {
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
    const [users, setUsers] = useState<Users[]>();

    const fetchUsers = async () => {
        const response = await getAllUsersTable();
        console.log("response", response);
        if (response.data) setUsers(response.data);
    };

    useEffect(() => {
        fetchUsers();
    }, []);
    
    useEffect(() => {
        const handleMouseMove = (e: { clientX: any; clientY: any; }) => {
        setCursorPos({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const [formData, setFormData] = useState({
        name: '',
        password: ''
    });

    const handleInputChange = (field: any, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleCreateUser = async (e: any) => {
        e.preventDefault();

        const { data, error } = await createUser(formData.name, formData.password);
        if (error) {
            console.error('Error creating user:', error);
        }

        // fetchUsers();
    }
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

            <Header />
            <div className="flex flex-col gap-8 px-8">
                <p className="mt-32">User Management Tab</p>
                <div className="flex flex-col gap-4 w-1/2">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="text-left">Name</TableHead>
                                <TableHead className="text-left">Email</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                users?.map((user: any) => (
                                    <TableRow key={user.id}> 
                                        <TableCell className="font-medium">{user.name}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </div>
                <div className="mt-32 flex flex-col w-full items-center gap-5">
                    <p className="font-semibold">add user</p>
                    <div className="flex flex-col gap-2 w-64">
                        <label>name</label>
                        <input  
                            onChange={(e) => handleInputChange('name', e.target.value)} 
                            id="name"
                            className="w-full py-2 rounded-md px-3 focus:outline-gray-400 border border-gray-300" 
                            placeholder="name" />
                    </div>
                    <div className="flex flex-col gap-2 w-64">
                        <label>password</label>
                        <input 
                            id="password" 
                            onChange={(e) => handleInputChange('password', e.target.value)} 
                            type="password" 
                            className="w-full py-2 rounded-md px-3 focus:outline-gray-400 border border-gray-300" 
                            placeholder="password" />
                    </div>
                    <Button onClick={handleCreateUser} className="bg-black text-white cursor-pointer">Create user</Button>
                </div>
            </div>
        </div>
    );
}