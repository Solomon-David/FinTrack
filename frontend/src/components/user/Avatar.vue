<template>
  <div class="d-flex flex-column gap-3 justify-end">
    <!-- Top Row: Avatar and Arrow -->
    <div class="d-flex align-center" style="cursor: pointer" @click="menu = !menu">
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
          style="cursor: pointer"
          v-html="userStore.user?.nickname?.replaceAll(' ', '<br>')"
        />
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
import { ref } from "vue";
import { useUserStore } from "../../stores/users.stores";
import { useRouter } from "vue-router";
import UserPhoto from "./UserPhoto.vue";

const userStore = useUserStore();
const router = useRouter();
const menu = ref(false);

async function handleLogout() {
  await userStore.logout();
  router.push({ name: "login" });
}
</script>
