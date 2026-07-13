<template>
  <v-container fluid class="pa-0">
    <SearchComponent :filters="filters" :on-search-fn="handleSearch" />

    <div class="px-4 pt-2 d-flex flex-column" style="height: calc(100vh - 180px)">
      <div class="d-flex align-center justify-space-between mb-2">
        <v-spacer />
        <h2 class="text-h6 font-weight-bold">Plans</h2>
        <v-spacer />
        <v-btn
          icon="mdi-refresh"
          variant="text"
          size="small"
          color="secondary"
          :loading="planStore.isLoading"
          @click="load"
        />
      </div>

      <div class="overflow-y-auto flex-grow-1">
        <div v-for="(group, status) in groupedPlans" :key="status" class="mb-4">
          <div class="text-caption font-weight-bold text-medium-emphasis mb-1">
            {{ status }} ({{ group.length }})
          </div>
          <PlanItem
            v-for="plan in group"
            :key="plan._id"
            :plan="plan"
            @edit="openEdit"
            @duplicate="openDuplicate"
            @delete="confirmDelete"
          />
        </div>

        <div v-if="!planStore.isLoading && filteredPlans.length === 0" class="text-center py-10">
          <v-icon size="48" color="grey-lighten-1">mdi-bag-checked</v-icon>
          <p class="text-medium-emphasis mt-2">No plans found</p>
        </div>
      </div>
    </div>

    <div class="d-flex justify-center mt-4 mb-6">
      <v-btn color="secondary" variant="flat" rounded="xl" :to="{ name: 'summaries' }">
        Summaries
      </v-btn>
    </div>

    <v-btn
      icon="mdi-plus"
      color="primary"
      size="large"
      elevation="4"
      rounded="lg"
      style="position: fixed; bottom: 25vh; right: 16px"
      @click="openAddDialog"
    />

    <component
      :is="AddPlanDialog"
      v-if="AddPlanDialog"
      v-model="addDialog"
      :initial-entry="duplicateEntry"
    />

    <PlanEditDialog v-model="editDialog" :plan="selectedPlan" @updated="load" />

    <v-dialog v-model="deleteDialog" max-width="300">
      <v-card rounded="lg" class="pa-4">
        <v-card-title class="text-body-1 font-weight-bold">Delete Plan</v-card-title>
        <v-card-text>Are you sure you want to delete this plan?</v-card-text>
        <v-card-actions class="justify-end ga-2">
          <v-btn variant="text" @click="deleteDialog = false">Cancel</v-btn>
          <v-btn
            color="error"
            variant="flat"
            rounded="lg"
            :loading="planStore.isLoading"
            @click="handleDelete"
          >
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, defineAsyncComponent, shallowRef, watch } from "vue";
import { usePlanStore } from "@/stores/plan.store";
import type { Plan } from "@/stores/plan.store";
import type { PlanEntry } from "@/types";
import PlanItem from "@/components/plans/PlanItem.vue";
import PlanEditDialog from "@/components/plans/PlanEditDialog.vue";
import SearchComponent from "@/components/shared/SearchComponent.vue";
import LoadingDialog from "@/components/shared/LoadingDialog.vue";

const planStore = usePlanStore();

const addDialog = ref(false);
const editDialog = ref(false);
const deleteDialog = ref(false);
const selectedPlan = ref<Plan | null>(null);
const duplicateEntry = ref<Partial<PlanEntry> | undefined>(undefined);
const searchQuery = ref("");
const searchFilter = ref("Name");

const filters = ["Name", "Status", "Due Date"];

const AddPlanDialog = shallowRef<ReturnType<typeof defineAsyncComponent> | null>(null);

function openAddDialog() {
  if (!AddPlanDialog.value) {
    AddPlanDialog.value = defineAsyncComponent({
      loader: () => import("@/components/plans/AddPlanDialog.vue"),
      loadingComponent: LoadingDialog,
      delay: 0,
    });
  }
  duplicateEntry.value = undefined;
  addDialog.value = true;
}

function openDuplicate(plan: Plan) {
  if (!AddPlanDialog.value) {
    AddPlanDialog.value = defineAsyncComponent({
      loader: () => import("@/components/plans/AddPlanDialog.vue"),
      loadingComponent: LoadingDialog,
      delay: 0,
    });
  }
  duplicateEntry.value = {
    name: plan.name,
    description: plan.description,
    progress: plan.progress,
    targetAmount: plan.targetAmount,
    dueDate: plan.dueDate ? new Date(plan.dueDate).toISOString().split("T")[0] : "",
    currency: plan.currency,
  };
  addDialog.value = true;
}

watch(addDialog, (isOpen) => {
  if (!isOpen) duplicateEntry.value = undefined;
});

onMounted(() => load());

async function load() {
  await planStore.getPlans();
}

const filteredPlans = computed(() => {
  const q = searchQuery.value.toLowerCase().trim();
  if (!q) return planStore.plans;

  return planStore.plans.filter((plan) => {
    if (searchFilter.value === "Name") return plan.name.toLowerCase().includes(q);
    if (searchFilter.value === "Status") return plan.status.toLowerCase().includes(q);
    if (searchFilter.value === "Due Date") {
      if (!plan.dueDate) return false;
      const date = new Date(plan.dueDate);
      const full = date.toLocaleDateString("en-GB");
      const monthYear = `${String(date.getMonth() + 1).padStart(2, "0")}/${date.getFullYear()}`;
      return full.includes(q) || monthYear.includes(q);
    }
    return true;
  });
});

// Group by status so "In Progress", "Completed", and "Overdue" plans are
// visually separated, similar to how bills/expenses group by date.
const groupedPlans = computed(() => {
  const order = ["In Progress", "Overdue", "Completed"];
  const groups = filteredPlans.value.reduce((acc, plan) => {
    if (!acc[plan.status]) acc[plan.status] = [];
    acc[plan.status].push(plan);
    return acc;
  }, {} as Record<string, Plan[]>);

  // Return groups in a stable, meaningful order
  const ordered: Record<string, Plan[]> = {};
  for (const status of order) {
    if (groups[status]) ordered[status] = groups[status];
  }
  return ordered;
});

function handleSearch(query: string, filter: string) {
  searchQuery.value = query;
  searchFilter.value = filter;
}

function openEdit(plan: Plan) {
  selectedPlan.value = plan;
  editDialog.value = true;
}

function confirmDelete(plan: Plan) {
  selectedPlan.value = plan;
  deleteDialog.value = true;
}

async function handleDelete() {
  if (!selectedPlan.value) return;
  await planStore.deletePlan(selectedPlan.value._id);
  deleteDialog.value = false;
  selectedPlan.value = null;
}
</script>