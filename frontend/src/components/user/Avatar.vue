<template>
  <div class="d-flex flex-column gap-3 justify-end">
    <!-- Top Row: Avatar and Arrow -->
    <div
      class="d-flex align-end justify-end"
      style="cursor: pointer"
      @click="menu = !menu"
    >
      <UserPhoto />
      <v-icon color="grey" class="ml-n1">mdi-menu-down</v-icon>
    </div>

    <v-spacer></v-spacer>

    <!-- Bottom Row: Nickname + Menu anchor -->
    <v-menu v-model="menu" location="bottom start" :close-on-content-click="true">
      <template #activator="{ props: menuProps }">
        <span
          v-bind="menuProps"
          class="text-caption font-weight-bold text-left"
          style="cursor: pointer; white-space: pre-line"
        >
          {{ displayNickname }}
        </span>
      </template>

      <v-list rounded="lg" elevation="3" min-width="180" class="pa-1">
        <v-list-item
          prepend-icon="mdi-account-outline"
          title="Edit Profile"
          rounded="lg"
          color="secondary"
          :to="{ name: 'profile' }"
        />
        <v-list-item
          prepend-icon="mdi-logout"
          title="Logout"
          rounded="lg"
          base-color="error"
          @click="handleLogout"
        />
      </v-list>
    </v-menu>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useUserStore } from "../../stores/users.stores";
import { useRouter } from "vue-router";
import UserPhoto from "./UserPhoto.vue";
import axiosInstance from "@/utils/axios";

const userStore = useUserStore();
const router = useRouter();
const menu = ref(false);

// Replaced v-html + replaceAll('<br>') with plain text interpolation and
// `white-space: pre-line` on the span, which achieves the same visual line
// break on spaces without injecting raw HTML. This avoids v-html ever
// receiving `undefined` (when nickname hasn't loaded yet right after
// login), which was producing malformed DOM during render — the likely
// cause of the "Failed to execute 'setAttribute'" crash seen on mobile.
const displayNickname = computed(() => userStore?.user?.nickname ?? "");

async function handleLogout() {
  try {
    await axiosInstance.post("/users/logout");
  } catch (err) {
    console.error("Logout error:", err);
  } finally {
    userStore.logout();
    router.push({ name: "login" });
  }
}
</script>
