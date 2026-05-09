<template>
  <!-- align-end pushes the nickname and the avatar group to the right edge -->
  <div class="d-flex flex-column align-end justify-end">
    <!-- Top Row: Avatar and Arrow -->
    <div class="d-flex align-center">
      <v-avatar size="55">
        <v-img v-if="photoUrl" :src="photoUrl" />
        <v-icon v-else size="55" color="secondary">mdi-account-circle</v-icon>
      </v-avatar>

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
import { ref, onMounted } from "vue";
import { useUserStore } from "../../stores/users.stores";

const userStore = useUserStore();
const photoUrl = ref("");

onMounted(async () => {
  if (userStore.user && userStore.user.id) {
    photoUrl.value = (await userStore.getUserPhoto(userStore.user.id)) || "";
  }
});
</script>
