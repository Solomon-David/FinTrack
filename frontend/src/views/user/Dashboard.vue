<template>In the dashbaord</template>

<script setup lang="ts">
import { useUserStore } from "../../stores/users.stores";
import { ref, onMounted } from "vue";

const userStore = useUserStore();

onMounted(() => {
  console.log(userStore.isAuthenticated);
  console.table(userStore.user);
});
</script>
