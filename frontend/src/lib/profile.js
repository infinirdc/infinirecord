import { requireSupabase } from './supabase';

export async function ensureProfile(user, role = 'fan') {
  if (!user) return null;
  const client = requireSupabase();
  const { data: existing, error: readError } = await client.from('profiles').select('*').eq('id', user.id).maybeSingle();
  if (readError) throw readError;
  if (existing) return existing;
  const profile = { id: user.id, user_id: user.id, name: user.user_metadata?.name || user.email?.split('@')[0] || 'Membre Infini', email: user.email || '', avatar: user.user_metadata?.avatar_url || '', role };
  const { data, error } = await client.from('profiles').insert(profile).select().single();
  if (error) throw error;
  return data;
}

export async function getProfile(uid) {
  if (!uid) return null;
  const { data, error } = await requireSupabase().from('profiles').select('*').eq('id', uid).maybeSingle();
  if (error) throw error;
  return data;
}

export async function updateProfileDocument(uid, data) {
  if (!uid) return;
  const { error } = await requireSupabase().from('profiles').update(data).eq('id', uid);
  if (error) throw error;
}
