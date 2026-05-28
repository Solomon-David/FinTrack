<script setup lang="ts">
import { provide } from "vue";
import { useDisplay } from "vuetify";

const { mobile } = useDisplay();
provide("isMobile", mobile);
</script>

<template>
  <router-view />
</template>

<style scoped>
:root {
  width: 100vw;
}
</style>
