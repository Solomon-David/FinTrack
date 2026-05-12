<template>
  <v-dialog v-model="open" class="w-75 w-md-50" scrim="true">
    <v-container class="px-1 py-5 bg-light rounded-lg d-flex flex-column gap-3">
      <!-- Header -->
      <v-card class="bg-transparent" flat elevation="0">
        <v-card-title class="d-flex flex-row align-items-baseline">
          <v-spacer />
          <span class="text-h5">Change Password</span>
          <v-spacer />
          <v-btn icon size="small" variant="flat" @click="open = false">
            <v-icon color="dark">mdi-close</v-icon>
          </v-btn>
        </v-card-title>
      </v-card>

      <!-- Form -->
      <v-card-text>
        <v-form class="d-flex flex-column gap-3 mx-5" @submit.prevent="handleSubmit">
          <p>Enter your current password</p>
          <v-text-field
            v-model="currentPassword"
            label="Current Password"
            :type="showCurrent ? 'text' : 'password'"
            color="black"
            base-color="black"
            variant="underlined"
            :append-inner-icon="showCurrent ? 'mdi-eye-off' : 'mdi-eye'"
            @click:appendInner="showCurrent = !showCurrent"
          />

          <p>Enter your new password</p>
          <v-text-field
            v-model="newPassword"
            label="New Password"
            :type="showNew ? 'text' : 'password'"
            color="black"
            base-color="black"
            variant="underlined"
            :append-inner-icon="showNew ? 'mdi-eye-off' : 'mdi-eye'"
            @click:appendInner="showNew = !showNew"
          />

          <p>Confirm your new password</p>
          <v-text-field
            v-model="confirmPassword"
            label="Confirm New Password"
            :type="showConfirm ? 'text' : 'password'"
            color="black"
            base-color="black"
            variant="underlined"
            :append-inner-icon="showConfirm ? 'mdi-eye-off' : 'mdi-eye'"
            @click:appendInner="showConfirm = !showConfirm"
          />

          <v-alert v-if="showAlert" :type="alertState ? 'success' : 'error'" class="mt-4">
            {{ message }}
          </v-alert>

          <!-- Replace the Change Password v-btn in UserProfile.vue with: -->
          <v-btn
            variant="text"
            color="secondary"
            size="small"
            @click="changePasswordDialog = true"
          >
            <span style="text-decoration: underline">Change password</span>
          </v-btn>

          <ChangePasswordDialog v-model="changePasswordDialog" />
        </v-form>
      </v-card-text>
    </v-container>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useUserStore } from "@/stores/users.stores";

const open = defineModel<boolean>({ required: true });

const userStore = useUserStore();

const currentPassword = ref("");
const newPassword = ref("");
const confirmPassword = ref("");

const showCurrent = ref(false);
const showNew = ref(false);
const showConfirm = ref(false);

const showAlert = ref(false);
const alertState = ref(false);
const message = ref("");

function reset() {
  currentPassword.value = "";
  newPassword.value = "";
  confirmPassword.value = "";
  showAlert.value = false;
}

async function handleSubmit() {
  showAlert.value = false;

  if (!currentPassword.value || !newPassword.value || !confirmPassword.value) {
    message.value = "Please fill in all fields.";
    alertState.value = false;
    showAlert.value = true;
    return;
  }

  if (newPassword.value !== confirmPassword.value) {
    message.value = "New passwords do not match.";
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
