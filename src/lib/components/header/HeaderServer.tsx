import HeaderClient from './HeaderClient';
import { createClient } from '@/lib/providers/supabase/server';
import type { User } from '@supabase/supabase-js';

export default async function HeaderServer() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const user = data.user as User | null;

  return <HeaderClient initialUser={user} />;
}