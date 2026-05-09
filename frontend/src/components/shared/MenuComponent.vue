<template>
  <v-app-bar height="100" class="text-secondary d-flex flex-column justify-space-around px-3 pt-2 " elevation="0" align="start">
    <v-app-bar-nav-icon class="text-h5" @click="openMenu = !openMenu" />

    <v-spacer></v-spacer>

    <v-app-bar-title class="font-weight-bold text-h5 text-black">{{ props.title }}</v-app-bar-title>

    <v-spacer></v-spacer>

    <!-- This container holds the UserPhoto -->
    <div>
      <template v-if="userStore.isAuthenticated">
        <UserPhoto />
      </template>
      <v-btn v-else icon="mdi-logout" variant="flat" color="secondary" />
    </div>
  </v-app-bar>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useUserStore } from "@/stores/users.stores";
import UserPhoto from "@components/user/UserPhoto.vue";
const props = defineProps<{ title?: string | undefined }>();

const openMenu = ref(false);
const userStore = useUserStore();
</script>

<style scoped></style>
