import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { User } from '@/types/user';
import { APP_PERFORMANCE_KEY } from '@/constants';

import { UserStore } from './user';

interface AppStore {
  user: UserStore;
  setUserData: (data: User | null) => void;
  resetState: () => void;
}

const initialState = {
  user: {
    data: null,
  },
};

/**
 * PLEASE READ CAREFULLY!!
 *
 * ANY FUNCTION SHOULD NOT DEFINED INSIDE THE SUB-OBJECT
 *
 * ONLY ALLOW TO ADD FUNCTION AT THE ROOT OF THE OBJECT
 *
 * THIS IS TO PREVENT ZUSTAND PERSIST KNOWN ISSUE WITH FUNCTION
 */
export const useStore = create<AppStore>()(
  persist(
    (set) => ({
      ...initialState,
      setUserData: (data: User | null) =>
        set((state) => ({
          user: {
            ...state.user,
            data,
          },
        })),
      resetState: () => set(initialState),
    }),
    {
      name: APP_PERFORMANCE_KEY,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
      }),
    },
  ),
);
