<template>
  <MenuDrawerComponent v-model="openMenu" />
  <v-app-bar height="100" class="text-secondary px-2 pt-2" elevation="0" align="start">
    <v-app-bar-nav-icon class="text-h5" @click="openMenu = !openMenu" />

    <v-spacer></v-spacer>

    <v-app-bar-title class="font-weight-bold text-h5 text-black text-center">{{
      props.title
    }}</v-app-bar-title>

    <v-spacer></v-spacer>

    <!-- This container holds the Avatar -->
    <div>
      <template v-if="userStore.isAuthenticated">
        <Avatar />
      </template>
      <v-btn v-else icon="mdi-logout" variant="plain" color="accent" class="text-h6" />
    </div>
  </v-app-bar>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useUserStore } from "@/stores/users.stores";
import Avatar from "@components/user/Avatar.vue";
import MenuDrawerComponent from "@components/shared/MenuDrawerComponent.vue";
const props = defineProps<{ title?: string | undefined }>();

const openMenu = ref(false);
const userStore = useUserStore();
</script>

<style scoped></style>
