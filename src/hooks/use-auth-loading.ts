
"use client";

import { useState, useEffect } from 'react';
import { useUser } from '@/firebase';

const MIN_DISPLAY_TIME = 4000; // 4 seconds, reduced for better UX after fix

export function useAuthLoadingState() {
  const { isUserLoading: isAuthLoading } = useUser();
  const [minTimePassed, setMinTimePassed] = useState(false);

  useEffect(() => {
    // This effect now only controls the minimum display time of the boot screen.
    const timer = setTimeout(() => {
      setMinTimePassed(true);
    }, MIN_DISPLAY_TIME);

    return () => clearTimeout(timer);
  }, []);

  // isLoading is now true if either auth is loading OR the minimum time hasn't passed.
  // This ensures the boot screen shows for a minimum duration but also waits for auth.
  const isLoading = isAuthLoading || !minTimePassed;

  return isLoading;
}
