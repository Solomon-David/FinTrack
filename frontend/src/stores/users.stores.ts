import { defineStore } from 'pinia';
import type { User } from '../types/api';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as User | null,
    isLoading: false,
    error: null as string | null,
  }),
  actions: {
    async signUp(email: string, password: string, name: string) {
      this.isLoading = true;
      this.error = null;

      try {
        const response = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password, name }),
        });

        if (!response.ok) {
          throw new Error('Sign up failed');
        }

        const newUser: User = await response.json();
        this.user = newUser;
        return newUser;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        this.error = message;
        throw err;
      } finally {
        this.isLoading = false;
      }
    }
  }
});