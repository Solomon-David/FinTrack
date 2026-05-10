<template>
  <v-container fluid class="pa-4">
    <!-- 1. Welcome Section -->
    <v-row align="center" justify="space-between" class="mb-6 ga-4 border-b-sm">
      <!-- Left: Avatar + Welcome text -->
      <v-col class="d-flex align-center ga-3">
        <UserPhoto size="75" />
        <div class="d-flex flex-column">
          <span class="text-large">Welcome back</span>
          <span class="font-weight-medium text-h6">{{ userStore.user?.nickname }}</span>
        </div>
      </v-col>
      <v-spacer></v-spacer>
      <!-- Right: Edit + Settings icons -->
      <v-col>
        <v-row>
          <v-col cols="12">
            <v-btn
              icon="mdi-pencil-outline"
              variant="outlined"
              rounded="lg"
              color="secondary"
              size="small"
              :to="{ name: 'profile' }"
            />
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="12">
            <v-btn
              icon="mdi-cog-outline"
              variant="outlined"
              rounded="lg"
              color="secondary"
              size="small"
              :to="{ name: 'preferences' }"
            />
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <!-- 2. Quick Summary -->
    <v-row justify="center" class="mb-2">
      <v-col cols="12" class="text-center pb-0">
        <h2 class="font-weight-bold text-h6">Quick Summary</h2>
      </v-col>
    </v-row>
    <v-row justify="space-around" class="mb-6 border-b-sm">
      <v-col cols="auto" class="text-center">
        <div class="text-h6">
          <span
            class="font-weight-bold"
            :class="
              userStore.billSummary?.paid < userStore.billSummary?.total ||
              userStore.billSummary?.total == 0
                ? 'text-success'
                : 'text-error'
            "
            >{{ userStore.billsSummary.paid }}</span
          >
          <span class="text-medium-emphasis">/{{ userStore.billsSummary.total }}</span>
        </div>
        <div class="text-caption text-medium-emphasis">Bills Paid</div>
      </v-col>
      <v-col cols="auto" class="text-center">
        <div class="text-h6 font-weight-bold">
          {{ userStore.plansSummary.total ?? 0 }}
        </div>
        <div class="text-caption text-medium-emphasis">Plans</div>
      </v-col>
    </v-row>

    <!-- 3. Quick Actions -->
    <v-row justify="center" class="mb-2">
      <v-col cols="12" class="text-center pb-0">
        <h2 class="font-weight-bold text-h6">Quick Actions</h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="action in quickActions" :key="action.label" cols="6" align="center">
        <v-btn
          :color="action.color"
          :prepend-icon="action.icon"
          class="w-75 text-white text-caption font-weight-light px-2"
          height="52"
          rounded="lg"
          @click="openDialog(action.label)"
        >
          <span v-html="action.label.replace(' ', '<br/>')"></span>
        </v-btn>
      </v-col>
    </v-row>

    <!-- Quick Action Dialog -->
    <v-dialog v-model="dialog" max-width="320">
      <v-card rounded="lg">
        <v-card-title class="text-center pt-4 font-weight-bold">
          {{ dialogTitle }}
        </v-card-title>
        <v-card-actions class="justify-center pb-4">
          <v-btn color="secondary" variant="tonal" @click="dialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useUserStore } from "@/stores/users.stores";
import UserPhoto from "@/components/user/UserPhoto.vue";

const userStore = useUserStore();

const quickActions = [
  { label: "Record Expense", icon: "mdi-arrow-up", color: "#1B5E20" },
  { label: "Record Income", icon: "mdi-arrow-down", color: "#880E4F" },
  { label: "Create Plan", icon: "mdi-check", color: "#1565C0" },
  { label: "Record RC-Data", icon: "mdi-phone-outline", color: "#6A1B9A" },
  { label: "Generate Summary", icon: "mdi-trending-up", color: "#B71C1C" },
  { label: "Search Records", icon: "mdi-magnify", color: "#4A148C" },
];

const dialog = ref(false);
const dialogTitle = ref("");

function openDialog(label: string) {
  dialogTitle.value = label;
  dialog.value = true;
}
</script>
