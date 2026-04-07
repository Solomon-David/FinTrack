/* * UserPhoto.vue * Component to display user's profile picture * Fetches photo from
backend and displays it * If no photo, shows default avatar */
<template>
  <v-avatar size="50">
    <template v-if="photoUrl">
      <v-img :src="photoUrl" alt="User Photo" />
    </template>
    <template v-else>
      <v-icon size="55">mdi-account-circle</v-icon>
    </template>
  </v-avatar>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useUserStore } from "../../stores/users.stores";

const userStore = useUserStore();
const photoUrl = ref("");

onMounted(async () => {
  if (userStore.user && userStore.user.id) {
    try {
      photoUrl.value = await userStore.getUserPhoto(userStore.user.id);
    } catch (error) {
      console.error("Error fetching user photo:", error);
      // Optionally set a default photo URL here
      photoUrl.value = ""; // Path to default avatar
    }
  }
});
</script>
