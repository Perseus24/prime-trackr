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

export async function getUserData() {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser()
    const { data: userTable } = await supabase.from('user')
        .select('*')
        .eq('auth_user_uuid', user?.id)
        .single();

    return { user, userTable };
}

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

    const { user, userTable } = await getUserData();
    const { data: taskData, error } = await supabase.from('task')
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
        .select()
        .single();

    if (error) {
        console.error('Error creating project:', error);
    }

    // add log entry
    const { error: logError } = await supabase.from('log')
        .insert([
            {
                action: 'created',
                entity_type: 'task',
                user_id: userTable?.id,
                project_id:projectId,
                task_id: taskData.id,
                description:`${userTable.name} created task '${taskData.title}'`
            }
        ])

    if (logError) {
        console.error('Error creating log entry:', logError);
    }

    revalidatePath(`/project/${projectId}`)
    redirect(`/project/${projectId}`)
}

export async function moveTask(prevStatus: string, newStatus: string, taskId: number, projectId: number) {
    const supabase = await createClient();
    const { user, userTable } = await getUserData();
    
    const { data: taskTable, error: taskError } = await supabase.from('task')
        .update({ status: newStatus })
        .eq('id', taskId)
        .select()
        .single();

    if (taskError) {
        console.error('Error moving task:', taskError);
    }

    // fetch the title of the project for logging
    const { data: projectData, error: projectError } = await supabase
        .from('project')
        .select('title')
        .eq('id', projectId)
        .single();

    if (projectError) {
        console.error('Error fetching project:', projectError);
    }

    // add log entry
    const { error: logError } = await supabase.from('log')
        .insert([
            {
                action: 'updated',
                entity_type: 'task',
                user_id: userTable?.id,
                project_id:projectId,
                task_id: taskId,
                description:`${userTable.name} moved the task '${taskTable.title}' from the project '${projectData?.title}' to ${newStatus}'`,
                changes: {
                    status: {
                        from: prevStatus,
                        to: newStatus
                    }
                }
            }
        ])

    if (logError) {
        console.error('Error creating log entry:', logError);
    }

    revalidatePath(`/project/${projectId}`)
    return { success: true };

}