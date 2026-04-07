<template>
  <v-container class="fill-height">
    <v-row align="center" justify="center">
      <v-col cols="12" md="4" class="text-center">
        <UserPhoto />
        <h2 class="mt-4">{{ userStore.user?.nickname }}</h2>
      </v-col>
    </v-row>
    <router-view />
  </v-container>
</template>

<script setup lang="ts">
import { useUserStore } from "../stores/users.stores";
import { onMounted } from "vue";
import UserPhoto from "../components/user/UserPhoto.vue";

const userStore = useUserStore();

onMounted(() => {
  if (!userStore.isAuthenticated) {
    window.location.href = "/login";
  }
});
</script>
