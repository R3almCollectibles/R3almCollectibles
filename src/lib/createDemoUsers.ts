// src/lib/createDemoUsers.ts
import { supabase } from './supabaseClient'

const DEMO_USERS = [
  { email: 'collector@demo.com', password: '123456', role: 'collector', name: 'Alex Collector' },
  { email: 'creator@demo.com', password: '123456', role: 'creator', name: 'Maya Artist' },
  { email: 'investor@demo.com', password: '123456', role: 'investor', name: 'Jordan Investor' },
  { email: 'admin@demo.com', password: '123456', role: 'admin', name: 'Admin User' },
]

export async function createDemoUsersIfNeeded() {
  // Skip in production
  if (import.meta.env.PROD) return

  for (const user of DEMO_USERS) {
    // Try to sign in first
    const { data, error } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: user.password,
    })

    if (data.user) {
      console.log(`Demo user ready: ${user.email}`)
      continue
    }

    if (error?.status === 400) {
      console.log(`Creating demo user: ${user.email}`)

      // Use normal signup + auto-confirm via Supabase setting
      const { error: signUpError } = await supabase.auth.signUp({
        email: user.email,
        password: user.password,
        options: {
          data: { name: user.name, role: user.role },
        },
      })

      if (signUpError) {
        console.warn(`Failed to create ${user.email}:`, signUpError.message)
      } else {
        console.log(`Demo user created: ${user.email}`)
      }
    }
  }
}