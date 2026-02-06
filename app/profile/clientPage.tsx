
'use client';

import { useEffect, useState } from "react";
import Header from "../components/header";

interface Props {
    user: any
}

export default function ClientPage({ user }: Props) {
    
    return (
        <div className="flex flex-col pt-24 gap-6 p-8">
            <p>Profile page</p>
        </div>

    )
}
