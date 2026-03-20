<script setup lang="ts">
import { provide, watchEffect } from "vue";
import { useDisplay } from "vuetify";

const { mobile, name } = useDisplay();

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
