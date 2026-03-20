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
