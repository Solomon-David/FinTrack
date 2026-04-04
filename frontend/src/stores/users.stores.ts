import { defineStore } from 'pinia';
import type { User } from '../types';
import axiosInstance from '@/utils/axios';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as User | null,
    isLoading: false,
    error: null as string | null,
    message: '',
  }),
  actions: {
    // Initialize user from localStorage
    initializeUser() {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          this.user = JSON.parse(storedUser);
        } catch (err) {
          console.error('Failed to parse stored user', err);
          localStorage.removeItem('user');
        }
      }
    },
    // end of initialize user

    // Save user to localStorage
    saveUserToStorage(user: User) {
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', user.token || '');
    },
    // end of save user to storage

    // Clear user from localStorage
    clearUserFromStorage() {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
    // end of clear user from storage

    // signUp
    async signUp(email: string, password: string, firstName: string, lastName: string) {
      this.isLoading = true;
      this.error = null;
      this.message = '';
      try {
        const response = await axiosInstance.post('/auth/signup', {
          email,
          password,
          firstName,
          lastName,
        });
        const newUser: User = response.data;
        this.user = newUser;
        this.saveUserToStorage(newUser);
        this.message = 'Account created successfully! Please verify your email.';
        return newUser;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        this.error = message;
        throw err;
      } finally {
        this.isLoading = false;
      }
    },
    //end of signUp

    //login
    async login(email: string, password: string) {
      this.isLoading = true;
      this.error = null;
      this.message = '';
      try {
        const response = await axiosInstance.post('/auth/login', {
          email,
          password,
        });

        const loggedInUser: User = response.data;
        this.user = loggedInUser;
        this.saveUserToStorage(loggedInUser);
        this.message = 'Login successful!';
        return loggedInUser;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        this.error = message;
        throw err;
      } finally {
        this.isLoading = false;
      }
    },
    //end of login

    //logout
    logout() {
      this.user = null;
      this.clearUserFromStorage();
      this.message = 'Logged out successfully.';
    },
    // end of logout

    //refresh token
    async refreshToken() {
      if (!this.user) return;
      this.message = '';
      try {
        await axiosInstance.post('/auth/refresh-token', {
          userId: this.user.id,
        });
        this.message = 'Token refreshed successfully.';
      } catch (err) {
        console.error('Failed to refresh token', err);
        this.error = err instanceof Error ? err.message : 'Unknown error';
      }
    },
      //end of refresh token

    //resend verification code
    async resendVerificationCode(email: string) {
      this.isLoading = true;
      this.error = null;
      this.message = '';
      try {
        const resp = await axiosInstance.post('/auth/resend-code', {
          email
        });
        this.message = resp.data.message || 'Verification code resent to your email!';
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Unknown error';
        this.message = '';
      } finally {
        this.isLoading = false;
      }
    },
    // end of resend verification code

    // verify account
    async verifyAccount(email: string, code: string) {
      this.isLoading = true;
      this.error = null;
      this.message = '';
      try {
        const resp = await axiosInstance.post('/auth/verify-account', {
          email,
          code
        });
        this.message = resp.data.message || 'Account verified successfully!';
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Unknown error';
        this.message = '';
      } finally {
        this.isLoading = false;
      }
    }
      // end of verify account
  },
});
