// src/utils/createDemoUsersIfNeeded.ts
import { supabase } from '@/lib/supabaseClient';

const DEMO_USERS = [
  { email: 'admin@demo.com', password: 'demo123', role: 'admin' },
  { email: 'creator@demo.com', password: 'demo123', role: 'creator' },
  { email: 'collector@demo.com', password: 'demo123', role: 'collector' },
  { email: 'investor@demo.com', password: 'demo123', role: 'investor' },
];

export async function createDemoUsersIfNeeded() {
  // Prevent running multiple times + rate limiting
  if (sessionStorage.getItem('demo_users_created')) {
    console.log('Demo users already initialized');
    return;
  }

  for (const user of DEMO_USERS) {
    try {
      console.log(`Creating demo user: ${user.email}`);

      const { data, error } = await supabase.auth.signUp({
        email: user.email,
        password: user.password,
        options: {
          data: { role: user.role },
        },
      });

      if (error) {
        if (error.message.includes('User already registered')) {
          console.log(`${user.email} already exists`);
          continue;
        }
        if (error.message.includes('rate limit')) {
          console.warn('Rate limited. Skipping remaining users.');
          break;
        }
        throw error;
      }

      if (data.user) {
        console.log(`✅ Created ${user.email}`);
      }
    } catch (err: any) {
      console.error(`Failed to create ${user.email}:`, err.message);
    }
  }

  // Mark as done for this session
  sessionStorage.setItem('demo_users_created', 'true');
}