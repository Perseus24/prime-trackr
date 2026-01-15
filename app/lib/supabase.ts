import { createClient } from '@supabase/supabase-js';
import { createBrowserClient } from "@supabase/ssr"
import { use } from 'react';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function getAllUsers() {
    const { data, error } = await supabase.from('users').select('*');
    return { data, error };
}
