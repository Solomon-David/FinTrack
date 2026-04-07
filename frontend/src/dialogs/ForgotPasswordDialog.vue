<template>
  <v-dialog v-model="open" class="w-75 w-md-50" scrim="true">
    <!-- header with close button -->
    <v-container class="px-1 py-5 bg-light rounded-lg d-flex flex-column gap-3">
      <v-card class="bg-transparent" flat elevation="0">
        <v-card-title flat class="d-flex flex-row align-items-baseline">
          <v-spacer></v-spacer>
          <span class="text-h5">Forgot Password</span>
          <v-spacer></v-spacer>
          <v-btn icon size="small" @click="open = false" class="pb-10" variant="flat">
            <v-icon color="dark">mdi-close</v-icon>
          </v-btn>
        </v-card-title>
      </v-card>

      <!-- form with email input, hidden code input, and submit button -->
      <v-card-text>
        <v-form class="d-flex flex-column gap-3 mx-5" @submit.prevent="handleSubmit">
          <p>Enter your email address</p>
          <v-text-field
            v-model="email"
            label="Email"
            type="email"
            color="black"
            base-color="black"
            variant="underlined"
          ></v-text-field>

          <template v-if="showCode">
            <p>Enter the verification code sent to your email</p>
            <v-text-field
              v-model="code"
              label="Verification Code"
              trim="true"
              type="text"
              color="black"
              base-color="black"
              variant="underlined"
              class="text-black"
            ></v-text-field>

            <p>Enter your new password</p>
            <v-text-field
              v-model="newPassword"
              label="New Password"
              type="password"
              color="black"
              base-color="black"
              variant="underlined"
              class="text-black"
              @click:appendInner="togglePasswordVisibility"
              :append-inner-icon="showPasswordVisibility ? 'mdi-eye-off' : 'mdi-eye'"
            ></v-text-field>
          </template>

          <v-alert v-if="showAlert" :type="alertState ? 'success' : 'error'" class="mt-4">
            {{ message }}
          </v-alert>

          <template v-if="!showCode">
            <v-btn
              class="text-bold text-none bg-primary text-light py-5 mt-5"
              variant="flat"
              rounded
              block
              type="submit"
            >
              Send Reset Code
            </v-btn>
          </template>

          <template v-else>
            <v-btn
              class="text-bold text-none bg-primary text-light py-5 mt-5"
              variant="flat"
              rounded
              block
              type="submit"
            >
              Reset Password
            </v-btn>
          </template>
        </v-form>
      </v-card-text>
    </v-container>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useUserStore } from "@/stores/users.stores";

const open = defineModel({
  type: Boolean,
  required: true,
});

const email = ref("");
const code = ref("");
const newPassword = ref("");
const showAlert = ref(false);
const alertState = ref(false);
const showCode = ref(false);
const togglePasswordVisibility = () => {
  showPasswordVisibility.value = !showPasswordVisibility.value;
};
const showPasswordVisibility = ref(false);
const message = ref("");

const userStore = useUserStore();

async function handleSubmit() {
  showAlert.value = false;
  // Handle form submission logic here
  try {
    if (!email.value) {
      showAlert.value = true;
      message.value = "Please enter your email address.";
      return;
    }
    if (!showCode.value) {
      const forgotPass = await userStore.forgotPassword(email.value);
      if (forgotPass.status) {
        showAlert.value = true;
        setTimeout(() => {
          showAlert.value = false;
          showCode.value = true;
        }, 1500);
        message.value = forgotPass.message || "Reset code sent to your email.";
      } else {
        showAlert.value = true;
        message.value =
          forgotPass.message || "Failed to send reset link. Please try again.";
      }
    } else if (showCode.value) {
      // Handle code verification logic here
      const verifyCode = await userStore.resetPassword(
        email.value,
        code.value,
        newPassword.value
      ); // Pass empty string for new password during verification
      if (verifyCode.status) {
        showCode.value = false;
        newPassword.value = "";
        message.value = verifyCode.message || "Password reset successfully.";
        setTimeout(() => {
          showAlert.value = true;
          open.value = false;
          console.log(open.value);
        }, 1500);
      } else {
        showAlert.value = true;
        message.value = verifyCode.message || "Invalid verification code.";
      }
    }
    alertState.value = true;
  } catch (error) {
    showAlert.value = true;
    message.value = "An error occurred while sending the reset code. Please try again.";
    alertState.value = false;
    console.error("Error occurred while sending resetting password:", error);
    setTimeout(() => {
      showAlert.value = false;
    }, 3000);
  }
}
</script>

<style scoped></style>
