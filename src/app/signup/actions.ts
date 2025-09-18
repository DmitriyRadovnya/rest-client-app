'use server'

import { createClient } from '@/lib/providers/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { SignUpValues } from '@/lib/validation/auth.schema'

export async function signup(values: SignUpValues) {
  const supabase = await createClient()

  const { username, email, password } = values

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { username } },
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  redirect('/')
}