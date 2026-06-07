<template>
  <v-container fluid class="pa-0">
    <!-- Search -->
    <SearchComponent :filters="filters" :on-search-fn="handleSearch" />

    <!-- Records -->
    <div class="px-4 d-flex flex-column" style="height: 55vh">
      <div class="d-flex align-center justify-space-between mb-2">
        <v-spacer />
        <h2 class="text-h6 font-weight-bold">Records</h2>
        <v-spacer />
        <v-btn
          icon="mdi-refresh"
          variant="text"
          size="small"
          color="secondary"
          :loading="incomeStore.isLoading"
          @click="load"
        />
      </div>

      <!-- Scrollable list -->
      <div class="overflow-y-auto flex-grow-1 bg-bluegrey">
        <div v-for="(group, date) in groupedIncomes" :key="date" class="mb-4">
          <IncomeItem
            v-for="income in group"
            :key="income._id"
            :income="income"
            @edit="openEdit"
            @duplicate="openDuplicate"
            @delete="confirmDelete"
          />
          <div class="text-center text-caption font-weight-bold py-1">
            Total: ₦{{ groupTotal(group) }}
          </div>
        </div>

        <!-- Empty state -->
        <div
          v-if="!incomeStore.isLoading && filteredIncomes.length === 0"
          class="text-center py-10"
        >
          <v-icon size="48" color="grey-lighten-1">mdi-cash-remove</v-icon>
          <p class="text-medium-emphasis mt-2">No income records found</p>
        </div>
      </div>
    </div>

    <!-- Summaries button -->
    <div class="d-flex justify-center mt-4 mb-6">
      <v-btn color="secondary" variant="flat" rounded="lg" :to="{ name: 'summaries' }">
        Summaries
      </v-btn>
    </div>

    <!-- Floating Action Button -->
    <v-btn
      icon="mdi-plus"
      color="primary"
      size="large"
      elevation="4"
      rounded="lg"
      style="position: fixed; bottom: 25vh; right: 16px;"
      @click="openAddDialog"
    />

    <!-- Add Income Dialog — only mounted after first FAB click -->
    <component
      :is="AddIncomeDialog"
      v-if="AddIncomeDialog"
      v-model="addDialog"
    />

    <!-- Add alongside AddIncomeDialog -->
    <IncomeEditDialog v-model="editDialog" :income="selectedIncome" @updated="load" />

    <!-- Delete Confirmation -->
    <v-dialog v-model="deleteDialog" max-width="300">
      <v-card rounded="lg" class="pa-4">
        <v-card-title class="text-body-1 font-weight-bold">Delete Income</v-card-title>
        <v-card-text>Are you sure you want to delete this record?</v-card-text>
        <v-card-actions class="justify-end ga-2">
          <v-btn variant="text" @click="deleteDialog = false">Cancel</v-btn>
          <v-btn
            color="error"
            variant="flat"
            rounded="lg"
            :loading="incomeStore.isLoading"
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
import { ref, computed, onMounted, defineAsyncComponent, shallowRef } from "vue";
import { useIncomeStore } from "@/stores/income.store";
import type { Income } from "@/stores/income.store";
import IncomeItem from "@/components/income/IncomeItem.vue";
import SearchComponent from "@/components/shared/SearchComponent.vue";
import IncomeEditDialog from "@/components/income/IncomeEditDialog.vue";
import LoadingDialog from "@/components/shared/LoadingDialog.vue";

const incomeStore = useIncomeStore();

const addDialog = ref(false);
const editDialog = ref(false);
const deleteDialog = ref(false);
const selectedIncome = ref<Income | null>(null);
const searchQuery = ref("");
const searchFilter = ref("Sender");

const filters = ["Sender", "Purpose", "Amount", "Date"];

// Lazy load AddIncomeDialog only when FAB is clicked
const AddIncomeDialog = shallowRef<ReturnType<typeof defineAsyncComponent> | null>(null);

function openAddDialog() {
  if (!AddIncomeDialog.value) {
    AddIncomeDialog.value = defineAsyncComponent({
      loader: () => import("@/components/income/AddIncomeDialog.vue"),
      loadingComponent: LoadingDialog,
      delay: 0,
    });
  }
  addDialog.value = true;
}

onMounted(() => load());

async function load() {
  await incomeStore.getIncomes();
}

const filteredIncomes = computed(() => {
  const q = searchQuery.value.toLowerCase().trim();
  if (!q) return incomeStore.incomes;

  return incomeStore.incomes.filter((income) => {
    if (searchFilter.value === "Sender") return income.sender.toLowerCase().includes(q);
    if (searchFilter.value === "Purpose") return income.purpose?.toLowerCase().includes(q);
    if (searchFilter.value === "Amount") return String(income.amount).includes(q);
    if (searchFilter.value === "Date") {
      const date = new Date(income.date);
      const full = date.toLocaleDateString("en-GB");
      const monthYear = `${String(date.getMonth() + 1).padStart(2, "0")}/${date.getFullYear()}`;
      return full.includes(q) || monthYear.includes(q);
    }
    return true;
  });
});

const groupedIncomes = computed(() => {
  return filteredIncomes.value.reduce((groups, income) => {
    const date = new Date(income.date).toLocaleDateString("en-GB");
    if (!groups[date]) groups[date] = [];
    groups[date].push(income);
    return groups;
  }, {} as Record<string, Income[]>);
});

function groupTotal(group: Income[]) {
  return group.reduce((sum, i) => sum + i.amount, 0).toLocaleString("en-NG");
}

function handleSearch(query: string, filter: string) {
  searchQuery.value = query;
  searchFilter.value = filter;
}

function openEdit(income: Income) {
  selectedIncome.value = income;
  editDialog.value = true;
}

function confirmDelete(income: Income) {
  selectedIncome.value = income;
  deleteDialog.value = true;
}

async function handleDelete() {
  if (!selectedIncome.value) return;
  await incomeStore.deleteIncome(selectedIncome.value._id);
  deleteDialog.value = false;
  selectedIncome.value = null;
}
</script>
