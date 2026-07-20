<template>
  <MenuDrawerComponent v-model="openMenu" />
  <v-app-bar height="100" class="text-secondary px-2 py-0" elevation="0" align="start">
    <v-app-bar-nav-icon class="text-h5" @click="openMenu = !openMenu" />

    <v-app-bar-title
      class="text-title-medium text-md-title font-weight-bold text-black text-center flex-grow-1"
      style="white-space: normal"
      >{{ props.title }}</v-app-bar-title
    >

    <!-- This container holds the Avatar -->
    <!-- <div>
      <template v-if="userStore.isAuthenticated">
        <Avatar />
      </template>
      <v-btn v-else icon="mdi-logout" variant="plain" color="accent" class="text-h6" />
    </div> -->
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
