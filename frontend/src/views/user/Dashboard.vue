<template>
  <v-container fluid>
    <!-- 1. Welcome Section -->
    <v-row align="center" justify="space-between" class="mb-6 border-b-sm">
      <!-- Photo and name-->
      <v-col class="d-flex align-center align-xs-start ga-3 ga-xs-1">
        <UserPhoto :size="display.xs ? '60' : '75'" />
        <div class="d-flex flex-column">
          <span class="text-body-1 w-100 w-xs-50 text-xs-caption text-no-wrap"
            >Welcome back</span
          >
          <span class="font-weight-bold text-body-1 text-xs-caption">
            {{ userStore.user?.firstName }} {{ userStore.user?.lastName }}
          </span>
        </div>
      </v-col>
      <v-spacer />
      <!-- Profile and settings buttons -->
      <v-col cols="auto" class="d-flex flex-column align-center ga-2">
        <v-btn
          icon="mdi-pencil-outline"
          variant="outlined"
          rounded="lg"
          color="secondary"
          size="small"
          :to="{ name: 'profile' }"
        />
        <v-spacer />
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
              userStore.billsSummary?.paid < userStore.billsSummary?.total ||
              userStore.billsSummary?.total == 0
                ? 'text-error'
                : 'text-success'
            "
            >{{ userStore.billsSummary?.paid ?? 0 }}</span
          >
          <span class="text-medium-emphasis"
            >/{{ userStore.billsSummary?.total ?? 0 }}</span
          >
        </div>
        <div class="text-caption text-medium-emphasis">Bills Paid</div>
      </v-col>
      <v-col cols="auto" class="text-center">
        <div class="text-h6 font-weight-bold">
          {{ userStore.plansSummary?.total ?? 0 }}
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
      <v-col
        v-for="action in quickActions"
        :key="action.label"
        cols="6"
        align="center"
        class="mb-4"
      >
        <v-btn
          :color="action.color"
          :prepend-icon="action.icon"
          class="w-100 text-white font-weight-light px-2 text-capitalize"
          height="44"
          rounded="lg"
          @click="openDialog(action.label)"
          style="font-size: clamp(0.6rem, 2vw, 0.75rem)"
        >
          {{ action.label }}
        </v-btn>
      </v-col>
    </v-row>

    <!-- Dynamic Dialog -->
    <component :is="dialogComponent" v-if="dialogComponent" v-model="dialog" />
  </v-container>
</template>

<script setup lang="ts">
import { ref, shallowRef, defineAsyncComponent } from "vue";
import { useUserStore } from "@/stores/users.stores";
import UserPhoto from "@/components/user/UserPhoto.vue";
import LoadingDialog from "@/components/shared/LoadingDialog.vue";
import { useDisplay } from "vuetify";

const userStore = useUserStore();
const display = useDisplay();

const quickActions = [
  {
    label: "Record Expense",
    icon: "mdi-arrow-up",
    color: "#1B5E20",
    component: () => import("@/components/expenses/AddExpenseDialog.vue"),
  },
  {
    label: "Record Income",
    icon: "mdi-arrow-down",
    color: "#880E4F",
    component: () => import("@/components/income/AddIncomeDialog.vue"),
  },
  {
    label: "Create A Plan",
    icon: "mdi-check",
    color: "#1565C0",
    component: () => import("@/components/income/AddIncomeDialog.vue"),
  },
  {
    label: "Record RC-Data",
    icon: "mdi-phone-outline",
    color: "#6A1B9A",
    component: () => import("@/components/rcdata/AddRCDataDialog.vue"),
  },
  {
    label: "Get Summary",
    icon: "mdi-trending-up",
    color: "#B71C1C",
    component: () => import("@/components/summaries/GenerateSummaryDialog.vue"),
  },
  {
    label: "Search Records",
    icon: "mdi-magnify",
    color: "#4A148C",
    component: () => import("@/components/income/AddIncomeDialog.vue"),
  },
];

const dialog = ref(false);
const dialogComponent = shallowRef<ReturnType<typeof defineAsyncComponent> | null>(null);

function openDialog(label: string) {
  const action = quickActions.find((a) => a.label === label);
  if (!action) return;

  dialogComponent.value = defineAsyncComponent({
    loader: action.component,
    loadingComponent: LoadingDialog,
    delay: 0,
  });

  dialog.value = true;
}
</script>
