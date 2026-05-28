<template>
  <v-dialog v-model="open" class="w-75 w-md-50" scrim="true">
    <v-container class="px-5 pb-5 pt-1 bg-light rounded-lg d-flex flex-column gap-4">
      <!-- Header -->
      <div class="d-flex flex-column align-center justify-end gap-1 pb-6 pt-n4">
        <v-btn
          icon
          size="x-small"
          variant="text"
          class="align-self-end"
          @click="open = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <span class="text-label font-weight-bold">Change Password</span>
      </div>

      <!-- Form -->
      <v-form class="d-flex flex-column gap-2" @submit.prevent="handleSubmit">
        <v-text-field
          v-model="currentPassword"
          label="Old Password"
          :type="showCurrent ? 'text' : 'password'"
          color="secondary"
          base-color="secondary"
          variant="outlined"
          density="comfortable"
          :append-inner-icon="showCurrent ? 'mdi-eye-off' : 'mdi-eye'"
          @click:appendInner="showCurrent = !showCurrent"
        />

        <v-text-field
          v-model="newPassword"
          label="New Password"
          :type="showNew ? 'text' : 'password'"
          color="secondary"
          base-color="secondary"
          variant="outlined"
          density="comfortable"
          :append-inner-icon="showNew ? 'mdi-eye-off' : 'mdi-eye'"
          @click:appendInner="showNew = !showNew"
        />

        <v-alert
          v-if="showAlert"
          :type="alertState ? 'success' : 'error'"
          class="mb-2"
          density="compact"
        >
          {{ message }}
        </v-alert>

        <v-btn
          type="submit"
          color="primary"
          variant="flat"
          rounded="xl"
          height="40"
          class="font-weight-bold text-button text-none mt-2"
          :loading="userStore.isLoading"
        >
          Submit
        </v-btn>
      </v-form>

      <!-- Forgot Password -->
      <div class="text-center mt-1">
        <v-btn variant="text" color="secondary" size="small" @click="openForgotPassword">
          <span style="text-decoration: underline">Forgot password</span>
        </v-btn>
      </div>
    </v-container>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useUserStore } from "@/stores/users.stores";

const open = defineModel<boolean>({ required: true });
const emit = defineEmits<{ forgotPassword: [] }>();

const userStore = useUserStore();

const currentPassword = ref("");
const newPassword = ref("");

const showCurrent = ref(false);
const showNew = ref(false);

const showAlert = ref(false);
const alertState = ref(false);
const message = ref("");

function reset() {
  currentPassword.value = "";
  newPassword.value = "";
  showAlert.value = false;
}

function openForgotPassword() {
  reset();
  open.value = false;
  emit("forgotPassword");
}

async function handleSubmit() {
  showAlert.value = false;

  if (!currentPassword.value || !newPassword.value) {
    message.value = "Please fill in all fields.";
    alertState.value = false;
    showAlert.value = true;
    return;
  }

  if (newPassword.value === currentPassword.value) {
    message.value = "New password must be different from your current password.";
    alertState.value = false;
    showAlert.value = true;
    return;
  }

  try {
    await userStore.changePassword(currentPassword.value, newPassword.value);
    message.value = "Password changed successfully.";
    alertState.value = true;
    showAlert.value = true;
    setTimeout(() => {
      reset();
      open.value = false;
    }, 1500);
  } catch (error: any) {
    message.value = error.message || "Failed to change password. Please try again.";
    alertState.value = false;
    showAlert.value = true;
    setTimeout(() => {
      showAlert.value = false;
    }, 3000);
  }
}
</script>
