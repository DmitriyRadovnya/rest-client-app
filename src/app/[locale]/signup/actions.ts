'use server';

import { createClient } from '@/lib/providers/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { SignUpValues } from '@/lib/validation/auth.schema';

export const signup = async (values: SignUpValues) => {
  const supabase = await createClient();
  const { username, email, password } = values;

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { username } },
  });

  if (error) {
    return { error: error.message };
  }

  const head = await headers();
  const referer = head.get('referer') ?? '';
  const match = referer.match(/\/(en|ru)(?:\/|$)/);
  const locale = match?.[1] ?? 'en';

  revalidatePath(`/${locale}`, 'layout');
  redirect(`/${locale}`);
};
