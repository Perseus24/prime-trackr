import { createClient } from "../../lib/supabase/server";
import ClientPage from './clientPage'

export default async function Home({ params }: { params: Promise<{ id: string }> }) {
    const supabase = await createClient();
    const { id } = await params;

    const { data: { user } } = await supabase.auth.getUser()
    const { data: userTable } = await supabase.from('user')
        .select('*')
        .eq('auth_user_uuid', user?.id)
        .single();

    const { data: projectData } = await supabase.from('project')
        .select('*')
        .eq('id', id)
        .single();

    if (!projectData) {
        return <div>Project not found</div>
    }

    const { data: tasks } = await supabase.from('task')
        .select('*')
        .eq('project_id', id);

    return (
        <ClientPage user={userTable} projectData={projectData} tasks={tasks}  />
    )
}

