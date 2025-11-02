'use client'

import { useState, useEffect } from 'react';
import { USER_HAS_SEEN_INTRO } from '@/constants';

export function useAppIntro() {
  const [hasSeenIntro, setHasSeenIntro] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const seen = localStorage.getItem(USER_HAS_SEEN_INTRO) === 'true';
    setHasSeenIntro(seen);
    setIsLoading(false);
  }, []);

  const markIntroAsSeen = () => {
    localStorage.setItem(USER_HAS_SEEN_INTRO, 'true');
    setHasSeenIntro(true);
  };

  return { hasSeenIntro, markIntroAsSeen, isLoading };
}