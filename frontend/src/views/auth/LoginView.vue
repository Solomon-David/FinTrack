<template>
  <v-card-title class="text-center text-light mt-5 text-h5"> Login </v-card-title>
  <v-form class="d-flex flex-column gap-3 px-5" @submit.prevent="handleLogin">
    <!-- Email -->

    <v-text-field
      v-model="email"
      label="Email"
      type="email"
      color="light"
      base-color="light"
      variant="underlined"
      class="text-light"
    ></v-text-field>

    <!-- password -->
    <v-text-field
      v-model="password"
      label="Password"
      :type="isPassword ? 'password' : 'text'"
      color="light"
      base-color="light"
      variant="underlined"
      class="text-light"
      :append-inner-icon="isPassword ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
      @click:append-inner="() => (isPassword = !isPassword)"
    >
    </v-text-field>

    <!-- yellow button for login -->
    <v-btn
      class="text-bold text-none bg-primary text-light py-5 mt-5"
      variant="flat"
      rounded
      block
      type="submit"
    >
      Login
    </v-btn>
    <v-alert v-if="showAlert" :type="status ? 'success' : 'error'" class="mt-4">
      {{ message }}
    </v-alert>
    <!-- link to sign up -->
    <p class="text-center text-caption text-light mt-5">
      Don't have an account?
      <a href="" class="text-primary text-bold" @click.prevent="router.push('/signup')">
        Sign Up</a
      >
    </p>
  </v-form>
</template>

<script setup lang="ts">
defineEmits({
  switch: () => false,
});

import { ref } from "vue";
import { useUserStore } from "../../stores/users.stores";
import { useRouter } from "vue-router";

const router = useRouter();

const userStore = useUserStore();
const isPassword = ref(true);
const email = ref("");
const password = ref("");
const message = ref<string | null>(null);
const status = ref(false);
const showAlert = ref(false);

const handleLogin = async () => {
  try {
    await userStore.login(email.value, password.value);
    if (userStore.error) {
      throw new Error(userStore.error);
    }

    status.value = userStore.status;
    console.log(message.value);
    message.value = userStore.message;
    status.value = true;
    router.push("/dashboard");
  } catch (error) {
    message.value = userStore.error || "Login failed";
    console.log(message.value);
    status.value = false;
  }

  showAlert.value = true;
  setTimeout(() => {
    showAlert.value = false;
  }, 10000);
};
</script>
