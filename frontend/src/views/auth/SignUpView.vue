<template>
  <v-container
    class="d-flex flex-column flex-sm-row flex-fill justify-xs-space-between align-center justify-sm-center py-10"
  >
    <!-- logo -->
    <v-card
      class="w-md-50 d-flex flex-column gap-4 align-center justify-center mb-10 mb-sm-0"
      color="transparent"
      variant="flat"
    >
      <v-img
        class="border-round w-75 w-sm-33"
        cover
        src="/src/assets/logo_dark.png"
        alt="logo"
      />
      <p class="text-capitalize text-h5 text-md-h4 mt-5 mt-sm-10">welcome to fintrack</p>
    </v-card>

    <!-- form -->
    <v-card class="w-md-50 w-75 glass rounded-lg py-5" variant="flat">
      <!-- Sign up component -->
      <template v-if="!isLogin">
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
          <v-text-field            v-model="password"            label="Password"
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
          <p v-if="userStore.error" class="text-center text-error mt-2">{{ userStore.error }}</p>
          <!-- link to login -->
          <p class="text-center text-caption text-light mt-5">
            Already have an account?
            <a href="" class="text-light text-bold" @click.prevent="isLogin = true"
              >Login</a
            >
          </p>
        </v-form>
      </template>

      <!-- Login component -->
      <template v-else>
        <v-card-title class="text-center text-light mt-5 text-h5"> Login </v-card-title>
        <v-form class="d-flex flex-column gap-3 px-5">
          <!-- Email -->

          <v-text-field
            label="Email"
            type="email"
            color="light"
            base-color="light"
            variant="underlined"
            class="text-light"
          ></v-text-field>

          <!-- password -->
          <v-text-field
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
          >
            Login
          </v-btn>
          <!-- link to sign up -->
          <p class="text-center text-caption text-light mt-5">
            Don't have an account?
            <a href="" class="text-light text-bold" @click.prevent="isLogin = false"
              >Sign Up</a
            >
          </p>
        </v-form>
      </template>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useUserStore } from "../../stores/users.stores";

const userStore = useUserStore();
const isPassword = ref(true);
const isLogin = ref(false);
const firstName = ref("");
const lastName = ref("");
const email = ref("");
const password = ref("");

const handleSignUp = async () => {
  try {
    const name = `${firstName.value} ${lastName.value}`.trim();
    await userStore.signUp(email.value, password.value, name);
    // Handle success, maybe redirect
  } catch (error) {
    // Error is handled in store
  }
};
</script>

<style scoped>
.glass {
  background: linear-gradient(rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1));
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
</style>
