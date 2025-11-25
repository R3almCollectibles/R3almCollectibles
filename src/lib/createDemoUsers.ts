import getSupabaseClient from './supabaseClient'; // Default import: Fixes named 'supabase' mismatch

// Demo users data (roles for R3alm)
const demoUsers = [
  { email: 'collector@demo.r3alm', password: 'demo123', role: 'collector' },
  { email: 'creator@demo.r3alm', password: 'demo123', role: 'creator' },
  { email: 'investor@demo.r3alm', password: 'demo123', role: 'investor' },
];

export const createDemoUsersIfNeeded = async () => {
  const supabase = getSupabaseClient(); // Singleton instance

  try {
    console.log('Initializing demo users...');

    for (const { email, password, role } of demoUsers) {
      // Check if user exists (via profiles table; assume created post-signup)
      const { data: existing } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', email)
        .single();

      if (!existing) {
        // Sign up user
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { role }, // Set role in user_metadata
          },
        });

        if (error) {
          console.error(`Failed to create demo user ${email}:`, error.message);
          continue;
        }

        // Insert profile if signup succeeds (extend with name/avatar later)
        if (data.user) {
          const { error: profileError } = await supabase
            .from('profiles')
            .insert({ id: data.user.id, email, role: data.user.user_metadata.role });

          if (profileError) console.error(`Profile insert failed for ${email}:`, profileError.message);
        }

        console.log(`Demo user created: ${email} (Role: ${role})`);
      } else {
        console.log(`Demo user already exists: ${email}`);
      }
    }

    console.log('Demo users initialized successfully.');
  } catch (error) {
    console.error('Demo users initialization failed:', error);
  }
};