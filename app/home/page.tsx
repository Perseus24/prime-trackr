import { createClient } from "../lib/supabase/server";
import ClientHome from './clientHome'

export default async function Home() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser()
    const { data: userTable } = await supabase.from('user')
        .select('*')
        .eq('auth_user_uuid', user?.id)
        .single();

    const { data: projects } = await supabase.from('project')
        .select('*')
        .eq('author_id', userTable?.id);

    return (
        <ClientHome projects={projects} user={userTable}  />
    )
}

