<template>
  <v-card-title class="text-center text-light mt-5 text-h5"> Sign Up </v-card-title>
  <v-form class="d-flex flex-column gap-3 px-5">
    <!-- first and last name -->
    <div class="d-flex flex-row">
      <v-text-field
        v-model="firstName"
        name="firstname"
        label="First Name"
        id="fname"
        color="light"
        base-color="light"
        class="text-light text-bold w-33"
        variant="underlined"
      ></v-text-field>

      <v-spacer></v-spacer>

      <v-text-field
        v-model="lastName"
        name="lastname"
        label="Last Name"
        id="lname"
        color="light"
        base-color="light"
        class="text-light text-bold w-33"
        variant="underlined"
      ></v-text-field>
    </div>
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
    <!-- yellow button for sign up -->
    <v-btn
      class="text-bold text-none bg-primary text-light py-5 mt-5"
      variant="flat"
      rounded
      block
      :loading="userStore.isLoading"
      @click="handleSignUp"
    >
      Sign Up
    </v-btn>
    <p v-if="userStore.error" class="text-center text-error mt-2">
      {{ userStore.error }}
    </p>
    <!-- link to login -->
    <p class="text-center text-caption text-light mt-5">
      Already have an account?
      <a href="" class="text-primary text-bold" @click.prevent="router.push('/login')"
        >Login</a
      >
    </p>
  </v-form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useUserStore } from "../../stores/users.stores";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const isPassword = ref(true);
const firstName = ref("");
const lastName = ref("");
const email = ref("");
const password = ref("");

const router = useRouter();

const handleSignUp = async () => {
    await userStore.signUp(email.value, password.value, firstName.value, lastName.value);
    // Handle success, maybe redirect
    router.push({
      path: "/verify",
      query: { email: email.value },
    });
    
};

defineEmits({
  switch: () => true,
});
</script>
