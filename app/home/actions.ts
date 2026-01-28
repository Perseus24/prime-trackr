'use server'
import { createClient } from '@/app/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createProject(formData: FormData){
    const supabase = await createClient();
    
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;

    const { data: { user } } = await supabase.auth.getUser()
    const { data: userTable } = await supabase.from('user')
        .select('*')
        .eq('auth_user_uuid', user?.id)
        .single();


    const { error } = await supabase.from('project')
        .insert([
            {
                title: title,
                description: description,
                author_id: userTable?.id
            }
        ])

    if (error) {
        console.error('Error creating project:', error);
    }

    revalidatePath('/home')
    redirect('/home')
}