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
          :loading="billStore.isLoading"
          @click="load"
        />
      </div>

      <div class="overflow-y-auto flex-grow-1">
        <div v-for="(group, date) in groupedBills" :key="date" class="mb-4">
          <BillItem
            v-for="bill in group"
            :key="bill._id"
            :bill="bill"
            @edit="openEdit"
            @duplicate="openDuplicate"
            @delete="confirmDelete"
          />
          <div class="text-center text-caption font-weight-bold py-1">
            Total: ₦{{ groupTotal(group) }}
          </div>
        </div>

        <div
          v-if="!billStore.isLoading && filteredBills.length === 0"
          class="text-center py-10"
        >
          <v-icon size="48" color="grey-lighten-1"
            >mdi-receipt-text-remove-outline</v-icon
          >
          <p class="text-medium-emphasis mt-2">No bill records found</p>
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
      :is="CreateBillTypeDialog"
      v-if="CreateBillTypeDialog"
      v-model="addDialog"
      :initial-entry="duplicateEntry"
    />

    <BillEditDialog v-model="editDialog" :bill="selectedBill" @updated="load" />

    <v-dialog v-model="deleteDialog" max-width="300">
      <v-card rounded="lg" class="pa-4">
        <v-card-title class="text-body-1 font-weight-bold">Delete Bill</v-card-title>
        <v-card-text>Are you sure you want to delete this record?</v-card-text>
        <v-card-actions class="justify-end ga-2">
          <v-btn variant="text" @click="deleteDialog = false">Cancel</v-btn>
          <v-btn
            color="error"
            variant="flat"
            rounded="lg"
            :loading="billStore.isLoading"
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
import { useBillStore } from "@/stores/bill.store";
import type { Bill } from "@/stores/bill.store";
import type { BillEntry } from "@/types";
import BillItem from "@/components/bills/BillItem.vue";
import BillEditDialog from "@/components/bills/BillEditDialog.vue";
import SearchComponent from "@/components/shared/SearchComponent.vue";
import LoadingDialog from "@/components/shared/LoadingDialog.vue";
import { useBillTypeStore } from "@/stores/billtype.store";

const billTypeStore = useBillTypeStore();
// Replace billStore.bills references with billTypeStore.billTypes
// Replace CreateBillTypeDialog import/usage with CreateBillTypeDialog

const billStore = useBillStore();

const addDialog = ref(false);
const editDialog = ref(false);
const deleteDialog = ref(false);
const selectedBill = ref<Bill | null>(null);
const duplicateEntry = ref<Partial<BillEntry> | undefined>(undefined);
const searchQuery = ref("");
const searchFilter = ref("Name");

const filters = ["Name", "Type", "Status", "Date"];

const CreateBillTypeDialog = shallowRef<ReturnType<typeof defineAsyncComponent> | null>(
  null
);

function openAddDialog() {
  if (!CreateBillTypeDialog.value) {
    CreateBillTypeDialog.value = defineAsyncComponent({
      loader: () => import("@/components/bills/CreateBillTypeDialog.vue"),
      loadingComponent: LoadingDialog,
      delay: 0,
    });
  }
  duplicateEntry.value = undefined;
  addDialog.value = true;
}

function openDuplicate(bill: Bill) {
  if (!CreateBillTypeDialog.value) {
    CreateBillTypeDialog.value = defineAsyncComponent({
      loader: () => import("@/components/bills/CreateBillTypeDialog.vue"),
      loadingComponent: LoadingDialog,
      delay: 0,
    });
  }
  duplicateEntry.value = {
    date: new Date(bill.date).toISOString().split("T")[0],
    amount: bill.amount,
    currency: bill.currency,
    type: bill.type,
    name: bill.name,
    status: bill.status,
    recurrence: bill.recurrence,
    dueDate: bill.dueDate ? new Date(bill.dueDate).toISOString().split("T")[0] : "",
    remark: bill.remark,
  };
  addDialog.value = true;
}

watch(addDialog, (isOpen) => {
  if (!isOpen) duplicateEntry.value = undefined;
});

onMounted(() => load());

async function load() {
  await billStore.getBills();
}

const filteredBills = computed(() => {
  const q = searchQuery.value.toLowerCase().trim();
  if (!q) return billStore.bills;

  return billStore.bills.filter((bill) => {
    if (searchFilter.value === "Name") return bill.name.toLowerCase().includes(q);
    if (searchFilter.value === "Type") return bill.type.toLowerCase().includes(q);
    if (searchFilter.value === "Status") return bill.status.toLowerCase().includes(q);
    if (searchFilter.value === "Date") {
      const date = new Date(bill.date);
      const full = date.toLocaleDateString("en-GB");
      const monthYear = `${String(date.getMonth() + 1).padStart(
        2,
        "0"
      )}/${date.getFullYear()}`;
      return full.includes(q) || monthYear.includes(q);
    }
    return true;
  });
});

const groupedBills = computed(() => {
  return filteredBills.value.reduce((groups, bill) => {
    const date = new Date(bill.date).toLocaleDateString("en-GB");
    if (!groups[date]) groups[date] = [];
    groups[date].push(bill);
    return groups;
  }, {} as Record<string, Bill[]>);
});

function groupTotal(group: Bill[]) {
  return group.reduce((sum, b) => sum + b.amount, 0).toLocaleString("en-NG");
}

function handleSearch(query: string, filter: string) {
  searchQuery.value = query;
  searchFilter.value = filter;
}

function openEdit(bill: Bill) {
  selectedBill.value = bill;
  editDialog.value = true;
}

function confirmDelete(bill: Bill) {
  selectedBill.value = bill;
  deleteDialog.value = true;
}

async function handleDelete() {
  if (!selectedBill.value) return;
  await billStore.deleteBill(selectedBill.value._id);
  deleteDialog.value = false;
  selectedBill.value = null;
}
</script>
