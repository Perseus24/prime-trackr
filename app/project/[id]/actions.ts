'use server'
import { createClient } from '@/app/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createNewTask(formData: FormData){
    const supabase = await createClient();

    const projectId = formData.get('projectId');
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const priority = formData.get('priority') as string;

    const { data: { user } } = await supabase.auth.getUser()
    const { data: userTable } = await supabase.from('user')
        .select('*')
        .eq('auth_user_uuid', user?.id)
        .single();


    const { error } = await supabase.from('task')
        .insert([
            {
                title: title,
                description: description,
                author_id: userTable?.id,
                priority: priority,
                project_id: projectId,
                status: 'to-do'
            }
        ])

    if (error) {
        console.error('Error creating project:', error);
    }

    revalidatePath(`/project/${projectId}`)
    redirect(`/project/${projectId}`)
}

export async function moveTask(newStatus: string, taskId: number, projectId: number) {
    const supabase = await createClient();

    const { error } = await supabase.from('task')
        .update({ status: newStatus })
        .eq('id', taskId)

    if (error) {
        console.error('Error moving task:', error);
    }

    revalidatePath(`/project/${projectId}`)
    return { success: true };

}