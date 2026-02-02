'use server'
import { createClient } from '@/app/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { CreateTaskSchema } from './schema';

type State = {
    errors?: {
        title?: string;
        description?: string;
        priority?: string;
    };
    message?: string;
} | null;


export async function createNewTask(prevState: State, formData: FormData): Promise<State> {
    const supabase = await createClient();

    const projectId = formData.get('projectId');
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const priority = formData.get('priority') as string;

    const validatedFields = CreateTaskSchema.safeParse({
        title: title,
        description: description,
        priority: priority
    })

    if (!validatedFields.success) {
        const fieldErrors = validatedFields.error.flatten().fieldErrors;
        return {
            errors: {
                title: fieldErrors.title?.[0],
                description: fieldErrors.description?.[0],
                priority: fieldErrors.priority?.[0],
            },
            message: "Failed to create task"
        };
    }

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