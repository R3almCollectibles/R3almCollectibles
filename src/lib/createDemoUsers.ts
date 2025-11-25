// src/lib/createDemoUsers.ts
import { supabase } from './supabaseClient'

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

export async function createDemoUsersIfNeeded() {
  // Only run in development (remove this line if you want it in production too)
  if (import.meta.env.PROD) return

  for (const user of DEMO_USERS) {
    // Check if user already exists
    const { data: existingUser } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: user.password,
    })

    if (existingUser.user) {
      console.log(`Demo user already exists: ${user.email}`)
      continue
    }

    // If not, create + auto-confirm via admin API trick
    console.log(`Creating & auto-confirming: ${user.email}`)

    const { data, error } = await supabase.auth.admin.createUser({
      email: user.email,
      password: user.password,
      user_metadata: user.data,
      email_confirm: true, // This bypasses confirmation!
    })

    if (error) {
      console.warn(`Failed to create ${user.email}:`, error.message)
    } else {
      console.log(`Demo user ready: ${user.email}`)
    }
  }
}