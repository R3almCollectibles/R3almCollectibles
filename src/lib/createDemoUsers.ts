// src/lib/createDemoUsers.ts
import { supabase } from './supabaseClient'  // ← was "../supabaseClient" → now "./supabaseClient"

const DEMO_USERS = [
  {
    email: 'collector@demo.com',
    password: '123456',
    data: { name: 'Alex Collector', role: 'collector' },
  },
  {
    email: 'creator@demo.com',
    password: '123456',
    data: { name: 'Maya Artist', role: 'creator' },
  },
  {
    email: 'investor@demo.com',
    password: '123456',
    data: { name: 'Jordan Investor', role: 'investor' },
  },
  {
    email: 'admin@demo.com',
    password: '123456',
    data: { name: 'Admin Manager', role: 'admin' },
  },
]

export async function createDemoUsersIfNotExist() {
  if (import.meta.env.PROD) return

  for (const user of DEMO_USERS) {
    const { data: existing } = await supabase
      .from('profiles')
      .select('id')
      .eq('email', user.email)
      .single()

    if (!existing) {
      console.log(`Creating demo user: ${user.email}`)
      const { error } = await supabase.auth.signUp({
        email: user.email,
        password: user.password,
        options: { data: user.data },
      })
      if (error) console.warn(error.message)
      else console.log(`Created: ${user.email}`)
    }
  }
}