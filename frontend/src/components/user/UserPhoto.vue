<template>
  <v-avatar :size="size" color="secondary">
    <v-img v-if="userStore.photoData" :src="userStore.photoData" />
    <v-icon v-else :size="iconSize" color="white">mdi-account</v-icon>
  </v-avatar>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useUserStore } from "@/stores/users.stores";

const props = withDefaults(defineProps<{ size?: string | number }>(), {
  size: "45",
});

const userStore = useUserStore();

// Scale the icon slightly smaller than the avatar so it fits with padding
const iconSize = computed(() => Number(props.size) * 0.75);
</script>
