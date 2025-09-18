'use server'

import { createClient } from '@/lib/providers/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

type LoginValues = { email: string; password: string }

export async function login(values: LoginValues) {
  const supabase = await createClient()

  const { email, password } = values

  const {
    data: { session },
    error,
  } = await supabase.auth.signInWithPassword({ email, password })

  if (error || !session) {
    console.error(error)
    redirect('/error')
  }

  await supabase.auth.setSession(session)

  revalidatePath('/', 'layout')
  redirect('/')
}
