<template>
  <v-container
    class="d-flex flex-column flex-sm-row flex-fill justify-xs-space-between align-center justify-sm-center"
  >
    <!-- logo -->
    <v-card
      class="w-md-50 d-flex flex-column gap-4 align-center justify-center mb-10 mb-sm-0"
      color="transparent"
      variant="flat"
    >
      <v-img
        class="border-round w-50 w-sm-33"
        cover
        src="/src/assets/logo_dark.png"
        alt="logo"
      />
      <p class="text-capitalize text-h5 mt-5 mt-sm-10">welcome to fintrack</p>
    </v-card>

    <!-- form -->
    <v-card class="w-md-50 w-75 glass rounded-lg py-5" variant="flat">
      <router-view></router-view>
    </v-card>
  </v-container>
</template>

<style scoped>
.glass {
  background: linear-gradient(rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1));
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
</style>
