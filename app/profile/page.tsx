import { createClient } from "../lib/supabase/server";
import ClientPage from './clientPage'

export default async function Home() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser()
    const { data: userTable } = await supabase.from('user')
        .select('*')
        .eq('auth_user_uuid', user?.id)
        .single();

    // get all th projects authored by the user
    const { data: projects } = await supabase.from('project')
        .select('*')
        .eq('author_id', userTable?.id);

    // must also get all the projects that are shared with the user 
    // in the future

    // get all the tasks by the user regardless of which project
    // provides an overview
    // for now, it fetches the tasks that were created by the author

    const { data: tasks, error: taskError } = await supabase.from("task")
        .select(
            `
                *,
                project(
                    id,
                    title
                )
            `
        )
        .eq('author_id', userTable?.id);

    if (taskError) {
        console.error('Error fetching tasks:', taskError);
    }


    return (
        <ClientPage user={userTable}/>
    )
}

