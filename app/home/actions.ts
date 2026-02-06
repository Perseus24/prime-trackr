'use server'
import { createClient } from '@/app/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { CreateProjectSchema } from './schema'

type State = {
    errors?: {
        title?: string;
        description?: string;
    }
    message?: string
} | null

export async function createProject(prevState: State, formData: FormData): Promise<State> {
    const supabase = await createClient();
    
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    
    const validatedFields = CreateProjectSchema.safeParse({
        title: title,
        description: description,
    })

    if (!validatedFields.success) {
        const fieldErrors = validatedFields.error.flatten().fieldErrors;
        return {
            errors: {
                title: fieldErrors.title?.[0],
                description: fieldErrors.description?.[0],
            },
            message: "Failed to create project"
        };
    }
    
    const { data: { user } } = await supabase.auth.getUser()
    const { data: userTable } = await supabase.from('user')
        .select('*')
        .eq('auth_user_uuid', user?.id)
        .single();


    const { data: projectData, error } = await supabase.from('project')
        .insert([
            {
                title: title,
                description: description,
                author_id: userTable?.id
            }
        ])
        .select()
        .single();


    if (error) {
        return {
            errors: {
                title: error.message,
                description: error.message,
            },
            message: "Failed to create project"
        }
    }

    // add log entry
    const { error: logError } = await supabase.from('log')
        .insert([
            {
                action: 'created',
                entity_type: 'project',
                user_id: userTable?.id,
                project_id: projectData.id,
                description:`${userTable.name} created project '${projectData.title}'`
            }
        ])

    if (logError) {
        console.error('Error creating log entry:', logError);
    }
    
    revalidatePath('/home')
    redirect('/home')
}