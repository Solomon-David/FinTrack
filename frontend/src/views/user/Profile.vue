<template>
  <v-container fluid class="pa-4">
    <!-- Avatar Section -->
    <v-row justify="center" class="mb-6">
      <v-col cols="auto" class="text-center">
        <div class="position-relative d-inline-block">
          <v-avatar size="100" color="secondary" class="border border-md">
            <v-img v-if="photoUrl" :src="photoUrl" />
            <v-icon v-else size="60" color="secondary">mdi-account</v-icon>
            <div
              v-if="photoUploading"
              class="position-absolute d-flex align-center justify-center"
              style="inset: 0; background: rgba(0, 0, 0, 0.45); border-radius: 50%"
            >
              <v-progress-circular indeterminate color="white" size="32" width="3" />
            </div>
          </v-avatar>
          <v-btn
            icon="mdi-camera-outline"
            color="secondary"
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
    <v-form ref="formRef">
      <v-row dense>
        <!-- Full Name -->
        <v-col cols="12">
          <v-text-field
            v-model="form.firstName"
            :label="fullNameLabel"
            variant="outlined"
            density="comfortable"
            color="secondary"
            :rules="[required]"
            :readonly="activeField !== 'firstName'"
            @focus="activateField('firstName')"
          >
            <template #prepend-inner>
              <v-icon color="secondary" size="20">mdi-account-outline</v-icon>
            </template>
            <template #append-inner>
              <transition name="slide-x">
                <div v-if="activeField === 'firstName'" class="d-flex ga-1">
                  <v-btn
                    icon="mdi-check"
                    color="success"
                    size="x-small"
                    variant="tonal"
                    @click.stop="saveField('firstName')"
                  />
                  <v-btn
                    icon="mdi-close"
                    color="error"
                    size="x-small"
                    variant="tonal"
                    @click.stop="cancelField('firstName')"
                  />
                </div>
                <v-btn
                  v-else
                  icon="mdi-pencil"
                  color="secondary"
                  size="x-small"
                  variant="text"
                  @click.stop="activateField('firstName')"
                />
              </transition>
            </template>
          </v-text-field>
        </v-col>

        <!-- Nickname -->
        <v-col cols="12">
          <v-text-field
            v-model="form.nickname"
            label="Nickname"
            variant="outlined"
            density="comfortable"
            color="secondary"
            :readonly="activeField !== 'nickname'"
            @focus="activateField('nickname')"
          >
            <template #prepend-inner>
              <v-icon color="secondary" size="20">mdi-heart-outline</v-icon>
            </template>
            <template #append-inner>
              <transition name="slide-x">
                <div v-if="activeField === 'nickname'" class="d-flex ga-1">
                  <v-btn
                    icon="mdi-check"
                    color="success"
                    size="x-small"
                    variant="tonal"
                    @click.stop="saveField('nickname')"
                  />
                  <v-btn
                    icon="mdi-close"
                    color="error"
                    size="x-small"
                    variant="tonal"
                    @click.stop="cancelField('nickname')"
                  />
                </div>
                <v-btn
                  v-else
                  icon="mdi-pencil"
                  color="secondary"
                  size="x-small"
                  variant="text"
                  @click.stop="activateField('nickname')"
                />
              </transition>
            </template>
          </v-text-field>
        </v-col>

        <!-- Date of Birth -->
        <v-col cols="12">
          <v-text-field
            v-model="form.dob"
            label="Birth Date"
            variant="outlined"
            density="comfortable"
            color="secondary"
            type="date"
            :readonly="activeField !== 'dob'"
            @focus="activateField('dob')"
          >
            <template #prepend-inner>
              <v-icon color="secondary" size="20">mdi-calendar-outline</v-icon>
            </template>
            <template #append-inner>
              <transition name="slide-x">
                <div v-if="activeField === 'dob'" class="d-flex ga-1">
                  <v-btn
                    icon="mdi-check"
                    color="success"
                    size="x-small"
                    variant="tonal"
                    @click.stop="saveField('dob')"
                  />
                  <v-btn
                    icon="mdi-close"
                    color="error"
                    size="x-small"
                    variant="tonal"
                    @click.stop="cancelField('dob')"
                  />
                </div>
                <v-btn
                  v-else
                  icon="mdi-pencil"
                  color="secondary"
                  size="x-small"
                  variant="text"
                  @click.stop="activateField('dob')"
                />
              </transition>
            </template>
          </v-text-field>
        </v-col>

        <!-- Email -->
        <v-col cols="12">
          <v-text-field
            v-model="form.email"
            label="Email"
            variant="outlined"
            density="comfortable"
            color="secondary"
            type="email"
            :rules="[required]"
            :readonly="activeField !== 'email'"
            @focus="activateField('email')"
          >
            <template #prepend-inner>
              <v-icon color="secondary" size="20">mdi-email-outline</v-icon>
            </template>
            <template #append-inner>
              <transition name="slide-x">
                <div v-if="activeField === 'email'" class="d-flex ga-1">
                  <v-btn
                    icon="mdi-check"
                    color="success"
                    size="x-small"
                    variant="tonal"
                    @click.stop="saveField('email')"
                  />
                  <v-btn
                    icon="mdi-close"
                    color="error"
                    size="x-small"
                    variant="tonal"
                    @click.stop="cancelField('email')"
                  />
                </div>
                <v-btn
                  v-else
                  icon="mdi-pencil"
                  color="secondary"
                  size="x-small"
                  variant="text"
                  @click.stop="activateField('email')"
                />
              </transition>
            </template>
          </v-text-field>
        </v-col>
      </v-row>
    </v-form>

    <!-- Change Password -->
    <v-row justify="center" class="mt-2">
      <v-col cols="auto">
        <v-btn
          variant="text"
          color="secondary"
          size="small"
          class="text-decoration-underline"
          @click="changePasswordDialog = true"
        >
          Change Password
        </v-btn>
        <ChangePasswordDialog v-model="changePasswordDialog" />
      </v-col>
    </v-row>

    <!-- Email Verification Dialog -->
    <v-dialog v-model="emailDialog" max-width="340" persistent>
      <v-card rounded="lg" class="pa-4">
        <v-card-title class="font-weight-bold text-body-1 pa-0 mb-4"
          >Verify new email</v-card-title
        >
        <v-card-text class="text-center text-body-2 text-medium-emphasis pa-0 mb-4">
          A verification code has been sent to <strong>{{ form.email }}</strong
          >. Enter it below to confirm.
        </v-card-text>
        <v-otp-input
          v-model="verificationCode"
          length="6"
          variant="outlined"
          color="secondary"
          @finish="confirmEmailChange"
        />
        <v-card-text class="text-center pa-0 mt-1">
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
        <v-card-actions class="justify-center pa-0 mt-4 ga-2">
          <v-btn variant="tonal" color="error" rounded="lg" @click="cancelEmailChange"
            >Cancel</v-btn
          >
          <v-btn
            variant="flat"
            color="secondary"
            rounded="lg"
            :loading="verifying"
            @click="confirmEmailChange"
            >Confirm</v-btn
          >
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
import { ref, reactive, computed, onMounted } from "vue";
import { useUserStore } from "@/stores/users.stores";
import ChangePasswordDialog from "@/components/auth/ChangePasswordDialog.vue";

const changePasswordDialog = ref(false);
const userStore = useUserStore();

// Photo
const photoUrl = ref("");
const fileInput = ref<HTMLInputElement | null>(null);
const photoUploading = ref(false);

// Form
const formRef = ref();
type FormField = "firstName" | "nickname" | "dob" | "email";

const form = reactive<Record<FormField, string>>({
  firstName: "",
  nickname: "",
  dob: "",
  email: "",
});

const originalForm = reactive<Record<FormField, string>>({
  firstName: "",
  nickname: "",
  dob: "",
  email: "",
});

const activeField = ref<FormField | null>(null);

const fullNameLabel = computed(() =>
  activeField.value === "firstName"
    ? "First Name"
    : originalForm.firstName
    ? `${originalForm.firstName} ${userStore.user?.lastName ?? ""}`
    : "Name (first and last)"
);

// Email verification
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
  form.nickname = user.nickname ?? "";
  form.dob = user.dob ? new Date(user.dob).toISOString().split("T")[0] : "";
  form.email = user.email ?? "";

  Object.assign(originalForm, { ...form });

  photoUrl.value =
    userStore.photoData || (user.id ? await userStore.getUserPhoto(user.id) : "");
});

function activateField(field: FormField) {
  activeField.value = field;
}

async function saveField(field: FormField) {
  if (!form[field] && (field === "firstName" || field === "email")) {
    showSnackbar("This field is required.", "error");
    return;
  }

  if (form[field] === originalForm[field]) {
    activeField.value = null;
    return;
  }

  // Email change — open verification dialog instead of saving directly
  if (field === "email") {
    try {
      await userStore.resendVerificationCode(form.email);
      emailDialog.value = true;
    } catch {
      showSnackbar("Failed to send verification code.", "error");
    }
    return;
  }

  try {
    await userStore.updateProfile({
      firstName: form.firstName,
      lastName: userStore.user?.lastName ?? "",
      nickname: form.nickname,
      email: originalForm.email,
      dob: form.dob,
    });
    originalForm[field] = form[field];
    activeField.value = null;
    showSnackbar("Updated successfully!", "success");
  } catch {
    showSnackbar("Failed to update.", "error");
  }
}

function cancelField(field: FormField) {
  form[field] = originalForm[field];
  activeField.value = null;
}

// Email verification flow
async function confirmEmailChange() {
  if (!verificationCode.value || verificationCode.value.length < 6) return;
  verifying.value = true;
  try {
    await userStore.verifyAccount(form.email, verificationCode.value);
    await userStore.updateProfile({
      firstName: form.firstName,
      lastName: userStore.user?.lastName ?? "",
      nickname: form.nickname,
      email: form.email,
      dob: form.dob,
    });
    originalForm.email = form.email;
    activeField.value = null;
    emailDialog.value = false;
    verificationCode.value = "";
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
  form.email = originalForm.email;
  verificationCode.value = "";
  activeField.value = null;
  emailDialog.value = false;
}

// Photo
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

function showSnackbar(message: string, color: string) {
  snackbar.message = message;
  snackbar.color = color;
  snackbar.show = true;
}
</script>

<style scoped>
.slide-x-enter-active,
.slide-x-leave-active {
  transition: all 0.2s ease;
}
.slide-x-enter-from {
  opacity: 0;
  transform: translateX(8px);
}
.slide-x-leave-to {
  opacity: 0;
  transform: translateX(8px);
}
</style>
