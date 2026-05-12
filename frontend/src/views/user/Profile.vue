<template>
  <v-container fluid class="pa-4">
    <!-- Avatar Section -->
    <v-row justify="center" class="mb-6">
      <v-col cols="auto" class="text-center">
        <div class="position-relative d-inline-block">
          <v-avatar size="100" color="secondary">
            <v-img v-if="photoUrl" :src="photoUrl" />
            <v-icon v-else size="60" color="white">mdi-account</v-icon>

            <!-- Upload overlay loader -->
            <div
              v-if="photoUploading"
              class="position-absolute d-flex align-center justify-center"
              style="inset: 0; background: rgba(0, 0, 0, 0.45); border-radius: 50%"
            >
              <v-progress-circular indeterminate color="white" size="32" width="3" />
            </div>
          </v-avatar>

          <v-btn
            icon="mdi-camera"
            color="primary"
            size="x-small"
            rounded="xl"
            elevation="2"
            class="position-absolute"
            style="bottom: 0; right: 0"
            :disabled="photoUploading"
            @click="triggerFileInput"
          />
          <input
            ref="fileInput"
            type="file"
            accept="image/*"
            class="d-none"
            @change="onPhotoSelected"
          />
        </div>
      </v-col>
    </v-row>

    <!-- Profile Form -->
    <v-form ref="formRef" @submit.prevent="saveProfile">
      <v-row dense>
        <v-col cols="12">
          <v-text-field
            v-model="form.lastName"
            label="Last name"
            variant="outlined"
            density="comfortable"
            color="secondary"
            :rules="[required]"
          />
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="form.firstName"
            label="First name"
            variant="outlined"
            density="comfortable"
            color="secondary"
            :rules="[required]"
          />
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="form.nickname"
            label="Nickname"
            variant="outlined"
            density="comfortable"
            color="secondary"
          />
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="form.email"
            label="Email"
            variant="outlined"
            density="comfortable"
            color="secondary"
            type="email"
            :rules="[required]"
          />
        </v-col>
      </v-row>

      <!-- Save Button -->
      <v-row class="mt-2">
        <v-col cols="12">
          <v-btn
            type="submit"
            color="secondary"
            variant="flat"
            block
            rounded="lg"
            height="48"
            :loading="userStore.isLoading"
            :disabled="photoUploading"
          >
            Save
          </v-btn>
        </v-col>
      </v-row>
    </v-form>

    <!-- Change Password Link -->
    <v-row justify="center" class="mt-2">
      <v-col cols="auto">
        <v-btn
          variant="text"
          color="secondary"
          size="small"
          @click="changePasswordDialog = true"
        >
          <span style="text-decoration: underline">Change password</span>
        </v-btn>
        <ChangePasswordDialog v-model="changePasswordDialog" />
      </v-col>
    </v-row>

    <!-- Email Verification Dialog -->
    <v-dialog v-model="emailDialog" max-width="340" persistent>
      <v-card rounded="lg" class="pa-2">
        <v-card-title class="text-center font-weight-bold pt-4 text-body-1">
          Verify your new email
        </v-card-title>
        <v-card-text class="text-center text-body-2 text-medium-emphasis">
          A verification code has been sent to <strong>{{ form.email }}</strong
          >. Enter it below to confirm your new email address.
        </v-card-text>
        <v-card-text>
          <v-otp-input
            v-model="verificationCode"
            length="6"
            variant="outlined"
            color="secondary"
            @finish="onOtpComplete"
          />
        </v-card-text>
        <v-card-text class="text-center mt-n4">
          <span class="text-caption text-medium-emphasis">Didn't receive a code? </span>
          <v-btn
            variant="text"
            color="secondary"
            size="x-small"
            :loading="resending"
            @click="resendCode"
          >
            Resend
          </v-btn>
        </v-card-text>
        <v-card-actions class="justify-center pb-4 gap-2">
          <v-btn variant="tonal" color="error" rounded="lg" @click="cancelEmailChange">
            Cancel
          </v-btn>
          <v-btn
            variant="flat"
            color="secondary"
            rounded="lg"
            :loading="verifying"
            @click="confirmEmailChange"
          >
            Confirm
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Snackbar -->
    <v-snackbar
      v-model="snackbar.show"
      :color="snackbar.color"
      rounded="lg"
      timeout="3000"
    >
      {{ snackbar.message }}
    </v-snackbar>
  </v-container>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { useUserStore } from "@/stores/users.stores";
import ChangePasswordDialog from "@/dialogs/ChangePasswordDialog.vue";

const changePasswordDialog = ref(false);
const userStore = useUserStore();

// Photo
const photoUrl = ref("");
const fileInput = ref<HTMLInputElement | null>(null);
const photoUploading = ref(false);

// Form
const formRef = ref();
const form = reactive({
  firstName: "",
  lastName: "",
  nickname: "",
  email: "",
});

const originalEmail = ref("");
const emailDialog = ref(false);
const verificationCode = ref("");
const verifying = ref(false);
const resending = ref(false);
const snackbar = reactive({ show: false, message: "", color: "success" });

const required = (v: string) => !!v || "This field is required";

onMounted(async () => {
  const user = userStore.user;
  if (!user) return;

  form.firstName = user.firstName ?? "";
  form.lastName = user.lastName ?? "";
  form.nickname = user.nickname ?? "";
  form.email = user.email ?? "";
  originalEmail.value = user.email ?? "";

  if (userStore.photoData) {
    photoUrl.value = userStore.photoData;
  } else if (user.id) {
    photoUrl.value = await userStore.getUserPhoto(user.id);
  }
});

function triggerFileInput() {
  fileInput.value?.click();
}

async function onPhotoSelected(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (!file) return;

  photoUrl.value = URL.createObjectURL(file);
  photoUploading.value = true;

  try {
    await userStore.uploadProfilePicture(file);
    photoUrl.value = userStore.photoData;
    showSnackbar("Profile photo updated!", "success");
  } catch {
    showSnackbar("Failed to upload photo.", "error");
    photoUrl.value = userStore.photoData;
  } finally {
    photoUploading.value = false;
  }
}

async function saveProfile() {
  const { valid } = await formRef.value.validate();
  if (!valid) return;

  try {
    if (form.email !== originalEmail.value) {
      await userStore.resendVerificationCode(form.email);
      emailDialog.value = true;
      return;
    }
    await userStore.updateProfile(form);
    showSnackbar("Profile updated successfully!", "success");
  } catch {
    showSnackbar("Failed to update profile.", "error");
  }
}

function onOtpComplete() {
  confirmEmailChange();
}

async function confirmEmailChange() {
  if (!verificationCode.value || verificationCode.value.length < 6) return;
  verifying.value = true;
  try {
    await userStore.verifyAccount(form.email, verificationCode.value);
    await userStore.updateProfile(form);
    originalEmail.value = form.email;
    emailDialog.value = false;
    showSnackbar("Email updated and verified!", "success");
  } catch {
    showSnackbar("Invalid or expired code.", "error");
  } finally {
    verifying.value = false;
  }
}

async function resendCode() {
  resending.value = true;
  try {
    await userStore.resendVerificationCode(form.email);
    showSnackbar("Code resent!", "success");
  } catch {
    showSnackbar("Failed to resend code.", "error");
  } finally {
    resending.value = false;
  }
}

function cancelEmailChange() {
  form.email = originalEmail.value;
  verificationCode.value = "";
  emailDialog.value = false;
}

function showSnackbar(message: string, color: string) {
  snackbar.message = message;
  snackbar.color = color;
  snackbar.show = true;
}
</script>
