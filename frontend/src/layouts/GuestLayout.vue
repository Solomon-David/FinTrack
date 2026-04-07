<template>
  <v-app class="guest py-5 w-100 bg-secondary">
    <router-view />
  </v-app>
</template>

<style scoped>
.guest {
  background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    url("../assets/background-art.png");
  background-repeat: repeat;
  background-size: 70%;
}
</style>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { watch } from "vue";
// get the title meta from the route and set it as the document title
const route = useRoute();
watch(
  () => route.meta.title,
  (title: unknown) => {
    let titleStr = typeof title === "string" ? title : null;
    document.title = titleStr
      ? `${titleStr.charAt(0).toUpperCase() + titleStr.slice(1)} | FinTrack`
      : "FinTrack";
  },
  { immediate: true }
);
</script>
