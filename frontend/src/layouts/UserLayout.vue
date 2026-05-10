<template>
  <v-app>
    <!-- Header -->
    <NavComponent :title="title" />

    <!-- Body -->
    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>

    <!-- Footer -->
    <v-footer
      app
      height="60"
      class="d-flex justify-center align-center border-t-thin border-accent"
    >
      <span class="text-caption text-medium-emphasis">
        &copy; Solos {{ new Date().getFullYear() }}
      </span>
    </v-footer>
  </v-app>
</template>
<script setup lang="ts">
import { useRoute } from "vue-router";
import { useUserStore } from "../stores/users.stores";
import { ref, onMounted } from "vue";
import NavComponent from "@components/shared/NavComponent.vue";

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
