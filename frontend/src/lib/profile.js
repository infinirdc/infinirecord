import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from './firebase';

export async function ensureProfile(user, role = 'fan') {
  if (!user) return null;
  const profileRef = doc(db, 'profiles', user.uid);
  const existing = await getDoc(profileRef);
  if (!existing.exists()) {
    const profile = {
      userId: user.uid,
      name: user.displayName || user.email?.split('@')[0] || 'Membre Infini',
      email: user.email || '',
      avatar: user.photoURL || '',
      role,
      createdAt: serverTimestamp(),
    };
    await setDoc(profileRef, profile);
    return profile;
  }
  return existing.data();
}
