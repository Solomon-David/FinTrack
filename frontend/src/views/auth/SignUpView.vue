<template>
  <v-container
    class="d-flex flex-column flex-sm-row flex-fill justify-start align-center justify-sm-center"
  >
    <!-- logo -->
    <v-card
      class="w-sm-33 d-flex flex-column gap-4 align-center justify-center"
      color="transparent"
      variant="flat"
    >
      <v-img
        class="border-round w-50 w-sm-75"
        cover
        src="/src/assets/logo-dark.png"
        alt="logo"
      />
      <p class="text-capitalize text-h5 mt-5 mt-sm-10">welcome to fintrack</p>
    </v-card>

    <v-spacer></v-spacer>

    <!-- form -->
    <v-card class="w-sm-50 w-75 glass" variant="flat">
      <v-card-title class="text-center text-light my-5"> Sign Up </v-card-title>
      <v-form class="d-flex flex-column">
        <!-- first and last name -->
        <v-card-text class="d-flex flex-row">
          <v-text-field
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
            name="lastname"
            label="Last Name"
            id="lname"
            color="light"
            base-color="light"
            class="text-light text-bold w-33"
            variant="underlined"
          ></v-text-field>
        </v-card-text>
        <!-- Email -->
        <v-card-text>
          <v-text-field
            label="Email"
            type="email"
            color="light"
            base-color="light"
            variant="underlined"
            class="text-light"
          ></v-text-field>
        </v-card-text>
        <!-- password -->
        <v-card-text>
          <v-text-field
            label="Password"
            :type="isPassword ? 'password' : 'text'"
            color="light"
            base-color="light"
            variant="underlined"
            class="text-light"
            :inner-icon="{
              name: 'mdi-eye',
              clickable: true,
              color: 'light',
              size: 20,
              click: () => (isPassword = !isPassword),
            }"
          ></v-text-field>
        </v-card-text>
      </v-form>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue";
const isPassword = ref(true);
</script>

<style scoped>
.glass {
  background: linear-gradient(rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.2));
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
</style>
