<template>
  <v-app>
    <v-container class="fill-height">
      <MenuComponent :title="title" />
      <v-row align="center" justify="center">
        <v-col cols="12" md="4" class="text-center">
          
          <h2 class="mt-4">{{ userStore.user?.nickname }}</h2>
        </v-col>
      </v-row>
      <router-view />
    </v-container>
  </v-app>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { useUserStore } from "../stores/users.stores";
import { ref, onMounted } from "vue";
import MenuComponent from "@components/shared/MenuComponent.vue";

const userStore = useUserStore();
const route = useRoute();
let routeTitle: string | undefined = route.meta.title as string | undefined;
const title = ref<string | undefined>(
  `${routeTitle?.charAt(0).toLocaleUpperCase()}${routeTitle?.substring(1)}`
);

onMounted(() => {
  if (!userStore.isAuthenticated) {
    window.location.href = "/login";
  }
  document.title = ` FinTrack | ${title.value}`;
});
</script>
