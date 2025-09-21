'use server';

import { createClient } from '@/lib/providers/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

export type LoginValues = {
  email: string;
  password: string;
};

export type LoginResult = { error: string } | undefined;

export const login = async (values: LoginValues): Promise<LoginResult> => {
  const supabase = await createClient();
  const { email, password } = values;

  const {
    data: { session },
    error,
  } = await supabase.auth.signInWithPassword({ email, password });

  if (error || !session) {
    return { error: 'Invalid login credentials' };
  }

  await supabase.auth.setSession(session);

  const hdrs = await headers();
  const referer = hdrs.get('referer') ?? '';
  const match = referer.match(/\/(en|ru)(?:\/|$)/);
  const locale = match?.[1] ?? 'en';

  revalidatePath(`/${locale}`, 'layout');
  redirect(`/${locale}`);
};

