<template>
  <v-avatar :size="size">
    <v-img v-if="photoUrl" :src="photoUrl" />
    <v-icon v-else :size="size" color="secondary">mdi-account-circle</v-icon>
  </v-avatar>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useUserStore } from "@/stores/users.stores";

const props = withDefaults(defineProps<{ size?: string }>(), {
  size: "45",
});

const userStore = useUserStore();
const photoUrl = ref("");

onMounted(async () => {
  if (userStore.user && userStore.user.id) {
    photoUrl.value = (await userStore.getUserPhoto(userStore.user.id)) || "";
  }
});
</script>
