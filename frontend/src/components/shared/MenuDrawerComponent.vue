<template>
  <v-navigation-drawer
    v-model="drawerModel"
    width="300"
    temporary
    style="top: 0; height: 100%; border-radius: 0 16px 16px 0"
  >
    <!-- Logo + App Name -->
    <div class="d-flex align-center ga-3 px-4 py-10">
      <v-avatar size="60" rounded="lg">
        <v-img :src="Logo" alt="FinTrack Logo" />
      </v-avatar>
      <span class="font-weight-black text-h6 text-secondary">FinTrack</span>
      <v-spacer />
      <v-btn
        icon="mdi-arrow-left"
        variant="text"
        color="secondary"
        base-color="white"
        size="small"
        @click="drawerModel = false"
      />
    </div>

    <v-list nav density="compact" class="px-2" color="secondary">
      <!-- Home -->
      <v-list-item
        prepend-icon="mdi-home-outline"
        title="Home"
        rounded="lg"
        :to="{ name: 'dashboard' }"
      />
      <v-divider class="my-2" />

      <!-- Records Section -->
      <v-list-subheader class="text-caption font-weight-medium mt-2"
        >Records</v-list-subheader
      >

      <v-list-item
        prepend-icon="mdi-arrow-up"
        title="Expenses"
        value="expenses"
        rounded="lg"
        :to="{ name: 'expenses' }"
      />
      <v-list-item
        prepend-icon="mdi-arrow-down"
        title="Income"
        rounded="lg"
        :to="{ name: 'income' }"
      />
      <v-list-item
        prepend-icon="mdi-cellphone"
        title="RC-Data"
        value="rc-data"
        rounded="lg"
        :to="{ name: 'rc-data' }"
      />

      <v-divider class="my-2" />

      <!-- Others Section -->
      <v-list-subheader class="text-caption font-weight-medium">Others</v-list-subheader>

      <v-list-item
        prepend-icon="mdi-trending-up"
        title="Summaries"
        rounded="lg"
        :to="{ name: 'summaries' }"
      />
      <v-list-item
        prepend-icon="mdi-calendar-month-outline"
        title="Bills"
        value="bills"
        rounded="lg"
        :to="{ name: 'bills' }"
      />
      <v-list-item
        prepend-icon="mdi-bag-checked"
        title="Plans"
        rounded="lg"
        :to="{ name: 'plans' }"
      />

      <v-divider class="my-2" />

      <!-- Account Section -->
      <v-list-subheader class="text-caption font-weight-medium">Account</v-list-subheader>

      <v-list-item
        prepend-icon="mdi-account-circle-outline"
        title="Profile"
        rounded="lg"
        :to="{ name: 'profile' }"
      />
      <v-list-item
        prepend-icon="mdi-cog-outline"
        title="Preferences"
        rounded="lg"
        :to="{ name: 'preferences' }"
      />

      <v-divider class="my-2" />

      <v-list-item
        prepend-icon="mdi-logout"
        title="Logout"
        rounded="lg"
        @click="handleLogout"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useUserStore } from "@/stores/users.stores";
import { useRouter } from "vue-router";
import Logo from "@/assets/logo_dark.png";
import axiosInstance from "@/utils/axios";

const props = defineProps<{ modelValue: boolean }>();
const emit = defineEmits<{ "update:modelValue": [value: boolean] }>();

const drawerModel = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
});

const userStore = useUserStore();
const router = useRouter();

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

<style scoped>
:deep(.v-list-item--active) {
  color: white !important;
  background-color: rgb(var(--v-theme-secondary-translucent)) !important;
}

:deep(.v-list-item .v-list-item__prepend .v-icon) {
  color: rgb(var(--v-theme-secondary)) !important;
}

:deep(.v-list-item--active .v-list-item__prepend .v-icon) {
  color: white !important;
}
</style>
