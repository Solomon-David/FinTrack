<template>
  <!-- align-end pushes the nickname and the avatar group to the right edge -->
  <div class="d-flex flex-column align-end justify-end">
    <!-- Top Row: Avatar and Arrow -->
    <div class="d-flex align-center">
      <UserPhoto />
      <!-- Negative margin pulls the arrow closer to the avatar -->
      <v-icon color="grey" class="ml-n1">mdi-menu-down</v-icon>
    </div>

    <!-- Bottom Row: Nickname -->
    <span
      class="text-caption font-weight-bold mt-n1 text-right"
      v-html="userStore.user?.nickname?.replaceAll(' ', '<br>')"
    >
    </span>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "../../stores/users.stores";
import UserPhoto from "./UserPhoto.vue";

const userStore = useUserStore();
</script>
