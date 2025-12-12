
"use client";

import { doc, setDoc, Firestore, serverTimestamp } from 'firebase/firestore';
import { errorEmitter } from './error-emitter';
import { FirestorePermissionError } from './errors';
import type { User } from 'firebase/auth';
import { DEFAULT_AVATAR_ID } from '@/lib/avatars';

// Define a type for the user profile data for stronger type safety.
interface UserProfileData {
    nickname?: string | null;
    avatarId?: string;
    // Add other profile fields here as needed
}

/**
 * Creates a new user profile document in a non-blocking way upon sign-up.
 *
 * @param firestore - The Firestore instance.
 * @param user - The newly created Firebase Auth user object.
 */
export function createNewUserProfile(firestore: Firestore, user: User) {
    const profileRef = doc(firestore, 'users', user.uid);
    
    const newUserProfile = {
        id: user.uid,
        username: user.email?.split('@')[0] || `user_${user.uid.substring(0,5)}`,
        email: user.email,
        nickname: user.displayName || '',
        dateJoined: serverTimestamp(),
        lastLogin: serverTimestamp(),
        penpalIds: [],
        avatarId: DEFAULT_AVATAR_ID,
    };

    // Use setDoc to create the new document.
    setDoc(profileRef, newUserProfile)
        .catch(error => {
            console.error("Error creating user profile:", error);
            const permissionError = new FirestorePermissionError({
                path: profileRef.path,
                operation: 'create',
                requestResourceData: newUserProfile,
            });
            errorEmitter.emit('permission-error', permissionError);
        });
}

/**
 * Updates a user's profile document in a non-blocking way.
 * 
 * @param firestore - The Firestore instance.
 * @param userId - The ID of the user whose profile is to be updated.
 * @param data - The data to update in the user's profile.
 */
export function updateUserProfile(firestore: Firestore, userId: string, data: UserProfileData) {
    const profileRef = doc(firestore, 'users', userId);

    const dataToUpdate = {
        ...data,
        updatedAt: serverTimestamp(),
    };

    return setDoc(profileRef, dataToUpdate, { merge: true })
        .catch(error => {
            console.error("Error updating user profile:", error);
            const permissionError = new FirestorePermissionError({
                path: profileRef.path,
                operation: 'update',
                requestResourceData: dataToUpdate,
            });
            errorEmitter.emit('permission-error', permissionError);
            // Re-throw the error to be caught by the calling function
            throw error;
        });
}
