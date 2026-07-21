import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { User } from "../types";
import * as userApi from "@/api/users.api";

export const useUserStore = defineStore("user", () => {
  const user = ref<User | null>(null);
  const photoData = computed(() => user.value?.photoData ?? "");
  const isLoading = ref(false);
  const error = ref<string | null>(null);
  const message = ref("");
  const status = ref(false);
  const billsSummary = ref<Record<string, number>>({});
  const plansSummary = ref<Record<string, number>>({});

  const isAuthenticated = computed(
    () => !!user.value && !!user.value.tokens?.accessToken
  );

  function initializeUser(): boolean {
    try {
      const storedUser = localStorage.getItem("user");
      const storedToken = localStorage.getItem("token");
      if (storedUser && storedToken) {
        const parsed = JSON.parse(storedUser);
        if (parsed && parsed.id && parsed.tokens?.accessToken === storedToken) {
          user.value = parsed;
          const storedBills = localStorage.getItem("billsSummary");
          const storedPlans = localStorage.getItem("plansSummary");
          if (storedBills) billsSummary.value = JSON.parse(storedBills);
          if (storedPlans) plansSummary.value = JSON.parse(storedPlans);
          return true;
        }
      }
    } catch (err) {
      console.warn("Failed to initialize user from storage:", err);
    }
    clearUserFromStorage();
    return false;
  }

  function saveUserToStorage(u: User | null) {
    localStorage.setItem("user", JSON.stringify(u));
    if (u?.tokens?.accessToken) {
      localStorage.setItem("token", u?.tokens.accessToken);
    }
  }

  function saveSummariesToStorage() {
    localStorage.setItem("billsSummary", JSON.stringify(billsSummary.value));
    localStorage.setItem("plansSummary", JSON.stringify(plansSummary.value));
  }

  function clearUserFromStorage() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("billsSummary");
    localStorage.removeItem("plansSummary");
  }

  async function signUp(
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) {
    isLoading.value = true;
    error.value = null;
    message.value = "";
    try {
      const response = await userApi.signUp({ email, password, firstName, lastName });
      const newUser: User = response.data;
      user.value = newUser;
      saveUserToStorage(newUser);
      message.value =
        response.data.message ||
        "Account created successfully! Please verify your email.";
      return newUser;
    } catch (err: any) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Signup failed";
      error.value = msg;
      throw new Error(msg);
    } finally {
      isLoading.value = false;
    }
  }

  async function login(email: string, password: string) {
    isLoading.value = true;
    error.value = null;
    message.value = "";
    status.value = false;
    try {
      const response = await userApi.login(email, password);
      const loggedInUser: User = response.data.user;
      billsSummary.value = loggedInUser.billsSummary ?? {};
      plansSummary.value = loggedInUser.plansSummary ?? {};
      user.value = loggedInUser;
      saveUserToStorage(loggedInUser);
      saveSummariesToStorage();
      message.value = response.data.message || "Login successful!";
      status.value = response.data.status;
      return loggedInUser;
    } catch (err: any) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Login failed";
      error.value = msg;
      throw new Error(msg);
    } finally {
      isLoading.value = false;
    }
  }

  function logout() {
    user.value = null;
    clearUserFromStorage();
    message.value = "Logged out successfully.";
  }

  async function refreshToken() {
    if (!user.value?.tokens?.refreshToken)
      return { success: false, message: "No refresh token available" };
    try {
      const response = await userApi.refreshToken(user.value.tokens.refreshToken);
      if (response.data.accessToken) {
        user.value.tokens.accessToken = response.data.accessToken;
        saveUserToStorage(user.value);
      }
      message.value = response.data.message || "Token refreshed successfully.";
      return { success: true, message: message.value };
    } catch (err: any) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Token refresh failed";
      error.value = msg;
      return { success: false, message: msg };
    }
  }

  async function resendVerificationCode(email: string) {
    isLoading.value = true;
    error.value = null;
    message.value = "";
    try {
      const response = await userApi.resendVerificationCode(email);
      message.value = response.data.message || "Verification code resent to your email!";
    } catch (err: any) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Failed to resend verification code";
      error.value = msg;
      throw new Error(msg);
    } finally {
      isLoading.value = false;
    }
  }

  async function verifyAccount(email: string, code: string) {
    isLoading.value = true;
    error.value = null;
    message.value = "";
    try {
      const response = await userApi.verifyAccount(email, code);
      message.value = response.data.message || "Account verified successfully!";
    } catch (err: any) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Account verification failed";
      error.value = msg;
      throw new Error(msg);
    } finally {
      isLoading.value = false;
    }
  }

  async function forgotPassword(email: string) {
    isLoading.value = true;
    error.value = null;
    message.value = "";
    try {
      const response = await userApi.forgotPassword(email);
      message.value = response.data.message || "Password reset link sent to your email!";
      return { status: response.data.success, message: message.value };
    } catch (err: any) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Failed to send reset link";
      error.value = msg;
      return { status: false, message: msg };
    } finally {
      isLoading.value = false;
    }
  }

  async function resetPassword(email: string, code: string, newPassword: string) {
    isLoading.value = true;
    error.value = null;
    message.value = "";
    try {
      const response = await userApi.resetPassword(email, code, newPassword);
      message.value = response.data.message || "Password reset successfully!";
      return { status: response.data.success, message: message.value };
    } catch (err: any) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Failed to reset password";
      error.value = msg;
      return { status: false, message: msg };
    } finally {
      isLoading.value = false;
    }
  }

  async function getUserPhoto(userId: string): Promise<string> {
    try {
      const response = await userApi.getUserPhoto(userId);
      return response.data.photoUrl || "";
    } catch (err) {
      console.log("Photo not found:", err);
      return "";
    }
  }

  async function getUserDetails() {
  isLoading.value = true;
  error.value = null;

  try {
    const response = await userApi.getUserDetails();

    const data = response.data.data;

    if (user.value) {
      user.value = {
        ...user.value,
        ...data,
      };

      saveUserToStorage(user.value);
    }

    billsSummary.value = data.billsSummary ?? {};
    plansSummary.value = data.plansSummary ?? {};

    saveSummariesToStorage();

    return data;
  } catch (err: any) {
     const msg =
      err.response?.data?.message || err.message || "Failed to fetch user details";
      error.value = msg;
  } finally {
    isLoading.value = false;
  }
}

  async function updateProfile(
    payload: Partial<{
      firstName: string;
      lastName: string;
      nickname?: string;
      email: string;
      dob?: string;
    }>
  ) {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await userApi.updateProfile(payload);
      // Patch the store user with updated fields
      if (user.value) {
        user.value = { ...user.value, ...response.data.user };
        saveUserToStorage(user.value);
      }
      message.value = response.data.message || "Profile updated successfully!";
      await getUserDetails();
    } catch (err: any) {
      const msg =
        err.response?.data?.message || err.message || "Failed to update profile";
      error.value = msg;
      throw new Error(msg);
    } finally {
      isLoading.value = false;
    }
  }

  async function uploadProfilePicture(file: File): Promise<string> {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await userApi.uploadProfilePicture(file);
      const { photoData, photoUrl } = response.data;

      // Update stored photoData on the user object
      if (user.value) {
        user.value.photoData = photoData;
        saveUserToStorage(user.value);
      }

      message.value = response.data.message || "Profile picture updated successfully!";

      // Return the ready-to-use URL so the component can update the preview
      return photoUrl;
    } catch (err: any) {
      const msg =
        err.response?.data?.message || err.message || "Failed to upload profile picture";
      error.value = msg;
      throw new Error(msg);
    } finally {
      isLoading.value = false;
    }
  }

  async function changePassword(currentPassword: string, newPassword: string) {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await userApi.changePassword(currentPassword, newPassword);
      message.value = response.data.message || "Password changed successfully!";
    } catch (err: any) {
      const msg =
        err.response?.data?.message || err.message || "Failed to change password";
      error.value = msg;
      throw new Error(msg);
    } finally {
      isLoading.value = false;
    }
  }

  return {
    user,
    isLoading,
    error,
    message,
    status,
    billsSummary,
    plansSummary,
    photoData,
    isAuthenticated,
    initializeUser,
    saveUserToStorage,
    clearUserFromStorage,
    signUp,
    login,
    logout,
    refreshToken,
    resendVerificationCode,
    verifyAccount,
    forgotPassword,
    resetPassword,
    getUserPhoto,
    getUserDetails,
    updateProfile,
    uploadProfilePicture,
    changePassword,
  };
});