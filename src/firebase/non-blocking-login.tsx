
'use client';
import {
  Auth,
  signInAnonymously,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  OAuthProvider,
  updateProfile,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { createNewUserProfile } from './user-profile';


/** Initiate anonymous sign-in. */
export function initiateAnonymousSignIn(authInstance: Auth): Promise<void> {
  return signInAnonymously(authInstance).then(() => {});
}

/** Initiate email/password sign-up. */
export async function initiateEmailSignUp(authInstance: Auth, email: string, password: string, name: string): Promise<void> {
  const userCredential = await createUserWithEmailAndPassword(authInstance, email, password);
  const user = userCredential.user;

  // Update the user's display name in Firebase Auth
  if (name) {
    await updateProfile(user, { displayName: name });
  }

  // Create the user's profile in Firestore
  const firestore = getFirestore(authInstance.app);
  await createNewUserProfile(firestore, user);
}

/** Initiate email/password sign-in. */
export function initiateEmailSignIn(authInstance: Auth, email: string, password: string): Promise<void> {
  return signInWithEmailAndPassword(authInstance, email, password).then(() => {});
}

/** Initiate Google Sign-In with popup. */
export function initiateGoogleSignIn(authInstance: Auth): Promise<void> {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(authInstance, provider).then(async (result) => {
    const firestore = getFirestore(authInstance.app);
    // You could check if user profile exists here, but our rules and logic handle it.
    // For simplicity, we can just ensure profile exists on any social sign-in
    await createNewUserProfile(firestore, result.user);
  });
}

/** Initiate Apple Sign-In with popup. */
export function initiateAppleSignIn(authInstance: Auth): Promise<void> {
  const provider = new OAuthProvider('apple.com');
  return signInWithPopup(authInstance, provider).then(async (result) => {
    const firestore = getFirestore(authInstance.app);
    await createNewUserProfile(firestore, result.user);
  });
}
