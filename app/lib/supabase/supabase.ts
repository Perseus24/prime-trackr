import { createClient } from '@supabase/supabase-js';
import { createBrowserClient } from "@supabase/ssr"
import { use } from 'react';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseAdminKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY_ADMIN!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
const supabaseAdmin = createClient(supabaseUrl, supabaseAdminKey)

export async function getAllUsersTable() {
    const { data, error } = await supabase.from('user').select('*');
    return { data, error };
}

export async function createUser(email: string, password: string) {
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
    });

    if (data) {
        const { data: profileData, error: profileError } = await supabase
            .from('user')
            .insert([
                {
                    email: data.user?.email,
                    name: data.user?.email, // default name is email
                    auth_user_uuid: data.user?.id || '',
                }
            ])

        if (profileError) {
            console.error('Error creating user profile:', profileError);
        }

        return {profileData, profileError };
    }
    return { data, error };
}

