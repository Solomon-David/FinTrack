<template>
  <v-container fluid class="pa-0">
    <SearchComponent :filters="filters" :on-search-fn="handleSearch" />

    <div class="px-4 d-flex flex-column" style="height: calc(100vh - 180px)">
      <div class="d-flex align-center justify-space-between mb-2">
        <v-spacer />
        <h2 class="text-h6 font-weight-bold">Records</h2>
        <v-btn
          icon="mdi-refresh"
          variant="text"
          size="small"
          color="secondary"
          :loading="expenseStore.isLoading"
          @click="load"
        />
      </div>

      <div class="overflow-y-auto flex-grow-1">
        <div v-for="(group, date) in groupedExpenses" :key="date" class="mb-4">
          <ExpenseItem
            v-for="expense in group"
            :key="expense._id"
            :expense="expense"
            @edit="openEdit"
            @duplicate="openDuplicate"
            @delete="confirmDelete"
          />
          <div class="text-center text-caption font-weight-bold py-1">
            Total: ₦{{ groupTotal(group) }}
          </div>
        </div>

        <div v-if="!expenseStore.isLoading && filteredExpenses.length === 0" class="text-center py-10">
          <v-icon size="48" color="grey-lighten-1">mdi-cash-remove</v-icon>
          <p class="text-medium-emphasis mt-2">No expense records found</p>
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
      :is="AddExpenseDialog"
      v-if="AddExpenseDialog"
      v-model="addDialog"
      :initial-entry="duplicateEntry"
    />

    <ExpenseEditDialog v-model="editDialog" :expense="selectedExpense" @updated="load" />

    <v-dialog v-model="deleteDialog" max-width="300">
      <v-card rounded="lg" class="pa-4">
        <v-card-title class="text-body-1 font-weight-bold">Delete Expense</v-card-title>
        <v-card-text>Are you sure you want to delete this record?</v-card-text>
        <v-card-actions class="justify-end ga-2">
          <v-btn variant="text" @click="deleteDialog = false">Cancel</v-btn>
          <v-btn
            color="error"
            variant="flat"
            rounded="lg"
            :loading="expenseStore.isLoading"
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
import { useExpenseStore } from "@/stores/expense.store";
import type { Expense } from "@/stores/expense.store";
import type { ExpenseEntry } from "@/types";
import ExpenseItem from "@/components/expenses/ExpenseItem.vue";
import SearchComponent from "@/components/shared/SearchComponent.vue";
import ExpenseEditDialog from "@/components/expenses/ExpenseEditDialog.vue";
import LoadingDialog from "@/components/shared/LoadingDialog.vue";

const expenseStore = useExpenseStore();

const addDialog = ref(false);
const editDialog = ref(false);
const deleteDialog = ref(false);
const selectedExpense = ref<Expense | null>(null);
const duplicateEntry = ref<Partial<ExpenseEntry> | undefined>(undefined);
const searchQuery = ref("");
const searchFilter = ref("Item");

const filters = ["Item", "Vendor", "Amount", "Date"];

const AddExpenseDialog = shallowRef<ReturnType<typeof defineAsyncComponent> | null>(null);

function openAddDialog() {
  if (!AddExpenseDialog.value) {
    AddExpenseDialog.value = defineAsyncComponent({
      loader: () => import("@/components/expenses/AddExpenseDialog.vue"),
      loadingComponent: LoadingDialog,
      delay: 0,
    });
  }
  duplicateEntry.value = undefined;
  addDialog.value = true;
}

function openDuplicate(expense: Expense) {
  if (!AddExpenseDialog.value) {
    AddExpenseDialog.value = defineAsyncComponent({
      loader: () => import("@/components/expenses/AddExpenseDialog.vue"),
      loadingComponent: LoadingDialog,
      delay: 0,
    });
  }
  duplicateEntry.value = {
    date: new Date(expense.date).toISOString().split("T")[0],
    amount: expense.amount,
    item: expense.item,
    vendor: expense.vendor?.name ?? "",
    isBill: expense.isBill,
    currency: expense.currency,
  };
  addDialog.value = true;
}

watch(addDialog, (isOpen) => {
  if (!isOpen) duplicateEntry.value = undefined;
});

onMounted(() => load());

async function load() {
  await expenseStore.getExpenses();
}

const filteredExpenses = computed(() => {
  const q = searchQuery.value.toLowerCase().trim();
  if (!q) return expenseStore.expenses;

  return expenseStore.expenses.filter((expense) => {
    if (searchFilter.value === "Item") return expense.item.toLowerCase().includes(q);
    if (searchFilter.value === "Vendor") return expense.vendor?.name.toLowerCase().includes(q);
    if (searchFilter.value === "Amount") return String(expense.amount).includes(q);
    if (searchFilter.value === "Date") {
      const date = new Date(expense.date);
      const full = date.toLocaleDateString("en-GB");
      const monthYear = `${String(date.getMonth() + 1).padStart(2, "0")}/${date.getFullYear()}`;
      return full.includes(q) || monthYear.includes(q);
    }
    return true;
  });
});

const groupedExpenses = computed(() => {
  return filteredExpenses.value.reduce((groups, expense) => {
    const date = new Date(expense.date).toLocaleDateString("en-GB");
    if (!groups[date]) groups[date] = [];
    groups[date].push(expense);
    return groups;
  }, {} as Record<string, Expense[]>);
});

function groupTotal(group: Expense[]) {
  return group.reduce((sum, e) => sum + e.amount, 0).toLocaleString("en-NG");
}

function handleSearch(query: string, filter: string) {
  searchQuery.value = query;
  searchFilter.value = filter;
}

function openEdit(expense: Expense) {
  selectedExpense.value = expense;
  editDialog.value = true;
}

function confirmDelete(expense: Expense) {
  selectedExpense.value = expense;
  deleteDialog.value = true;
}

async function handleDelete() {
  if (!selectedExpense.value) return;
  await expenseStore.deleteExpense(selectedExpense.value._id);
  deleteDialog.value = false;
  selectedExpense.value = null;
}
</script>