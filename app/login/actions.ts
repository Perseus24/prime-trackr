'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/app/lib/supabase/server'

export async function login(email: string, password: string) {
    const supabase = await createClient()
    // type-casting here for convenience
    // in practice, you should validate your inputs
    const data = {
        email: email,
        password: password,
    }

    const { error } = await supabase.auth.signInWithPassword(data)
    if (error) {
        redirect('/')
    }
    revalidatePath('/', 'layout')
    redirect('/home')
}