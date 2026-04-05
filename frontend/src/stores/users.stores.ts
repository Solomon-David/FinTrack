import { defineStore } from 'pinia';
import type { User } from '../types';
import axiosInstance from '@/utils/axios';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as User | null,
    isLoading: false,
    error: null as string | null,
    message: '',
    status: false,
  }),
  getters: {
    isAuthenticated: (state) => !!state.user && !!state.user.tokens?.accessToken,
  },
  actions: {
    // Initialize user from localStorage
    initializeUser() {
      try {
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('token');

        if (storedUser && storedToken) {
          const user = JSON.parse(storedUser);
          // Validate that user has required fields and token matches
          if (user && user.id && user.tokens?.accessToken === storedToken) {
            this.user = user;
            return true;
          }
        }
      } catch (err) {
        console.warn('Failed to initialize user from storage:', err);
      }

      // Clear invalid data
      this.clearUserFromStorage();
      return false;
    },
    // end of initialize user

    // Save user to localStorage
    saveUserToStorage(user: User) {
      localStorage.setItem('user', JSON.stringify(user));
      if (user.tokens?.accessToken) {
        localStorage.setItem('token', user.tokens.accessToken);
      }
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
        this.message = response.data.message || 'Account created successfully! Please verify your email.';
        return newUser;
      } catch (err: any) {
        const message = err.response?.data?.message || err.response?.data?.error || err.message || 'Signup failed';
        this.error = message;
        throw new Error(message);
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
      this.status = false;
      try {
        const response = await axiosInstance.post('/auth/login', {
          email,
          password,
        });

        const loggedInUser: User = response.data.user;
        this.user = loggedInUser;
        this.saveUserToStorage(loggedInUser);
        this.message = response.data.message || 'Login successful!';
        this.status = response.data.status;
        return loggedInUser;
      } catch (err: any) {
        // Extract error message from server response
        const message = err.response?.data?.message || err.response?.data?.error || err.message || 'Login failed';
        this.error = message;
        throw new Error(message);
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
      if (!this.user) return { success: false, message: 'No user logged in' };

      try {
        const response = await axiosInstance.post('/auth/refresh-token', {
          userId: this.user.id,
        });

        // Update stored token if new token provided
        if (response.data.tokens?.accessToken) {
          this.user.tokens = { ...this.user.tokens, ...response.data.tokens };
          this.saveUserToStorage(this.user);
        }

        this.message = response.data.message || 'Token refreshed successfully.';
        return { success: true, message: this.message };
      } catch (err: any) {
        const message = err.response?.data?.message || err.response?.data?.error || err.message || 'Token refresh failed';
        this.error = message;
        return { success: false, message };
      }
    },
    //end of refresh token

    //resend verification code
    async resendVerificationCode(email: string) {
      this.isLoading = true;
      this.error = null;
      this.message = '';

      try {
        const response = await axiosInstance.post('/auth/resend-code', { email });
        this.message = response.data.message || 'Verification code resent to your email!';
      } catch (error: any) {
        const message = error.response?.data?.message || error.response?.data?.error || error.message || 'Failed to resend verification code';
        this.error = message;
        throw new Error(message);
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
        const response = await axiosInstance.post('/auth/verify-account', { email, code });
        this.message = response.data.message || 'Account verified successfully!';
      } catch (error: any) {
        const message = error.response?.data?.message || error.response?.data?.error || error.message || 'Account verification failed';
        this.error = message;
        throw new Error(message);
      } finally {
        this.isLoading = false;
      }
    }
    // end of verify account
  },
});
