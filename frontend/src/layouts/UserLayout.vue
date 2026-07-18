<template>
  <v-app class="w-100">
    <ScreenLoader v-if="isLoading" />

    <!-- Header -->
    <NavComponent :title="titleTxt" />

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
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "../stores/users.stores";
import { ref, onMounted, onUnmounted, watch, computed } from "vue";
import NavComponent from "@components/shared/NavComponent.vue";
import ScreenLoader from "@components/shared/ScreenLoader.vue";

const userStore = useUserStore();
const route = useRoute();
const router = useRouter();
const routeTitle = ref<string | undefined>(route.meta.title as string | undefined);
const isLoading = ref(false);

const titleTxt = computed(() => {
  const title = routeTitle.value;
  if (!title) return "";
  return `${title.charAt(0).toLocaleUpperCase()}${title.substring(1)}`;
});

watch(
  () => route.meta.title,
  (title: unknown) => {
    const titleStr = typeof title === "string" ? title : undefined;
    document.title = titleStr
      ? `${titleStr.charAt(0).toUpperCase() + titleStr.slice(1)} | FinTrack`
      : "FinTrack";
    routeTitle.value = titleStr;
  },
  { immediate: true }
);

let removeBeforeGuard: (() => void) | undefined;
let removeAfterHook: (() => void) | undefined;
let removeErrorHook: (() => void) | undefined;

onMounted(() => {
  if (!userStore.isAuthenticated) {
    window.location.href = "/login";
  }
  document.title = ` FinTrack | ${titleTxt.value}`;

  removeBeforeGuard = router.beforeEach((to, from, next) => {
    if (to.fullPath !== from.fullPath) {
      isLoading.value = true;
    }
    next();
  });

  removeAfterHook = router.afterEach(() => {
    isLoading.value = false;
  });

  removeErrorHook = router.onError(() => {
    isLoading.value = false;
  });
});

onUnmounted(() => {
  removeBeforeGuard?.();
  removeAfterHook?.();
  removeErrorHook?.();
});
</script>