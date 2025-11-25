// app/api/create-demo-user/route.ts
import { createClient } from '@/utils/supabase/server';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const { email, name, role } = await request.json();
  const supabase = createClient();

  // This creates user with CORRECT password hashing
  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password: 'demo123',
    email_confirm: true,
    user_metadata: { full_name: name, role },
  });

  return Response.json({ success: true, data, error });
}