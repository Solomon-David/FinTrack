<template>
  <v-card-title class="text-center text-white mt-5 text-h5">
    Verify Your Email
  </v-card-title>
  <v-card-subtitle class="text-center mb-6 text-light"
    >Enter the verification code sent to your email</v-card-subtitle
  >

  <v-form class="d-flex flex-column gap-3 px-5" @submit.prevent="handleVerify">
    <v-text-field
      v-model="code"
      base-color="light"
      color="light"
      label="Verification Code"
      placeholder="Enter 6-digit code"
      maxlength="6"
      required
      variant="underlined"
      class="mb-4 text-light spaced-input text-bold"
      @focus="suggestCodeFromClipboard"
    >
      <template v-slot:details v-if="showClipboardSuggestion">
        <div @click="pasteCodeFromClipboard">Paste from clipboard</div>
      </template>
    </v-text-field>

    <v-btn
      type="submit"
      color="primary"
      block
      variant="flat"
      rounded
      :loading="isLoading"
      class="mb-4 text-light text-none"
    >
      {{ isLoading ? "Verifying..." : "Verify Email" }}
    </v-btn>
  </v-form>

  <v-card-actions class="flex-column">
    <div class="text-center mb-2">
      <span class="text-body-2 text-white">Didn't receive the code?</span>
      <v-btn
        variant="text"
        color="primary"
        @click="handleResend"
        :disabled="isLoading"
        class="ml-1 text-none"
      >
        Resend
      </v-btn>
    </div>
    <v-btn variant="text" class="text-none" color="grey-darken-1" to="/login" block>
      Back to Login
    </v-btn>
  </v-card-actions>

  <v-alert v-if="error" type="error" variant="elevated" class="mt-4">
    {{ error }}
  </v-alert>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useUserStore } from "@/stores/users.stores";
import { useRoute, useRouter } from "vue-router";
const userStore = useUserStore();
const isLoading = ref(userStore.isLoading);
const route = useRoute();
const router = useRouter();
const email = (route.query.email as string) || "";
const code = ref("");
const error = ref("");
const clipboardText = ref("");
const showClipboardSuggestion = ref(false);

async function suggestCodeFromClipboard() {
  try {
    clipboardText.value = await navigator.clipboard.readText();
    console.log("Clipboard text:", clipboardText.value);
    if (/^\d{6}$/.test(clipboardText.value.trim())) {
      showClipboardSuggestion.value = true;
    } else {
      showClipboardSuggestion.value = false;
    }
  } catch (error) {
    showClipboardSuggestion.value = false;
    console.error("Failed to read from clipboard:", error);
  }
}

function pasteCodeFromClipboard() {
  code.value = clipboardText.value.trim();
  showClipboardSuggestion.value = false;
}

async function handleVerify() {
  isLoading.value = true;
  error.value = "";
  try {
    // Simulate API call to verify code
    await userStore.verifyAccount(email, code.value);
    router.push("/dashboard");
  } catch (err) {
    error.value = "Failed to verify code. Please try again.";
  } finally {
    isLoading.value = false;
  }
}

async function handleResend() {
  isLoading.value = true;
  error.value = "";
  try {
    // sending API request to resend verification code
    await userStore.resendVerificationCode(email);
  } catch (err) {
    error.value = "Failed to resend code. Please try again.";
  } finally {
    isLoading.value = false;
  }
}
</script>

<style scoped>
.v-card {
  background-color: transparent !important;
  box-shadow: none !important;
}

.spaced-input :deep(input) {
  letter-spacing: 1em; /* Adjust spacing as needed */
}

.spaced-input :deep(input):placeholder-shown {
  letter-spacing: normal;
}
</style>

// title // subtext // input // button // resend // back to login
