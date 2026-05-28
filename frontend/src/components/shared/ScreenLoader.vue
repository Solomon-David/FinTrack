<template>
  <div class="screen-loader">
    <img class="screen-loader__logo" :src="logo" alt="App logo" />
    <div class="screen-loader__spinner" aria-label="Loading"></div>
  </div>
</template>

<script setup lang="ts">
import logo from "@/assets/logo_dark.png";
</script>

<style scoped>
.screen-loader {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100vw;
  padding: 2rem;
  gap: 1.5rem;
  background: rgba(255, 255, 255, 0.95);
}

.screen-loader__logo {
  width: 96px;
  height: auto;
  max-width: 100%;
}

.screen-loader__spinner {
  width: 64px;
  height: 64px;
  border: 8px solid rgba(0, 0, 0, 0.12);
  border-top-color: rgba(0, 0, 0, 0.65);
  border-radius: 50%;
  animation: spinner-rotate 1s linear infinite;
}

@keyframes spinner-rotate {
  to {
    transform: rotate(360deg);
  }
}
</style>
