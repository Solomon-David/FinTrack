<template>
  <v-container fluid class="pa-0">
    <SearchComponent :filters="filters" :on-search-fn="handleSearch" />

    <div class="px-4 pt-2 d-flex flex-column" style="height: calc(100vh - 180px)">
      <div class="d-flex align-center justify-space-between mb-2">
        <v-spacer />
        <h2 class="text-h6 font-weight-bold">Records</h2>
        <v-spacer />
        <v-btn
          icon="mdi-refresh"
          variant="text"
          size="small"
          color="secondary"
          :loading="billTypeStore.isLoading"
          @click="load"
        />
      </div>

      <div ref="listContainer" class="overflow-y-auto flex-grow-1">
        <BillItem
          v-for="bill in filteredBills"
          :key="bill._id"
          :bill="bill"
          @edit="openEdit"
          @duplicate="openDuplicate"
          @delete="confirmDelete"
        />

        <div
          v-if="!billTypeStore.isLoading && filteredBills.length === 0"
          class="text-center py-10"
        >
          <v-icon size="48" color="grey-lighten-1"
            >mdi-receipt-text-remove-outline</v-icon
          >
          <p class="text-medium-emphasis mt-2">No bill types found</p>
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
        <v-card-title class="text-body-1 font-weight-bold">Delete Bill Type</v-card-title>
        <v-card-text>
          Are you sure? This will remove the bill type and all its payment history.
        </v-card-text>
        <v-card-actions class="justify-end ga-2">
          <v-btn variant="text" @click="deleteDialog = false">Cancel</v-btn>
          <v-btn
            color="error"
            variant="flat"
            rounded="lg"
            :loading="billTypeStore.isLoading"
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
import {
  ref,
  computed,
  onMounted,
  defineAsyncComponent,
  shallowRef,
  watch,
  nextTick,
} from "vue";
import { useBillTypeStore } from "@/stores/billtype.store";
import type { BillType } from "@/stores/billtype.store";
import type { BillTypeEntry } from "@/types";
import BillItem from "@/components/bills/billItems.vue";
import BillEditDialog from "@/components/bills/BillEditDialog.vue";
import SearchComponent from "@/components/shared/SearchComponent.vue";
import LoadingDialog from "@/components/shared/LoadingDialog.vue";

const billTypeStore = useBillTypeStore();

const listContainer = ref<HTMLElement | null>(null);

const addDialog = ref(false);
const editDialog = ref(false);
const deleteDialog = ref(false);
const selectedBill = ref<BillType | null>(null);
const duplicateEntry = ref<Partial<BillTypeEntry> | undefined>(undefined);
const searchQuery = ref("");
const searchFilter = ref("Name");

const filters = ["Name", "Type", "Status"];

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

function openDuplicate(bill: BillType) {
  if (!CreateBillTypeDialog.value) {
    CreateBillTypeDialog.value = defineAsyncComponent({
      loader: () => import("@/components/bills/CreateBillTypeDialog.vue"),
      loadingComponent: LoadingDialog,
      delay: 0,
    });
  }
  duplicateEntry.value = {
    name: bill.name,
    type: bill.type,
    total: bill.total,
    currency: bill.currency,
    recurrence: bill.recurrence,
    dueEvery: bill.dueEvery,
    remark: bill.remark,
  };
  addDialog.value = true;
}

watch(addDialog, (isOpen) => {
  if (!isOpen) duplicateEntry.value = undefined;
});

async function load() {
  await billTypeStore.getBillTypes();
}

const filteredBills = computed(() => {
  const q = searchQuery.value.toLowerCase().trim();
  if (!q) return billTypeStore.billTypes;

  return billTypeStore.billTypes.filter((bill) => {
    if (searchFilter.value === "Name") return bill.name.toLowerCase().includes(q);
    if (searchFilter.value === "Type") return bill.type.toLowerCase().includes(q);
    if (searchFilter.value === "Status") return bill.status.toLowerCase().includes(q);
    return true;
  });
});

function handleSearch(query: string, filter: string) {
  searchQuery.value = query;
  searchFilter.value = filter;
}

function openEdit(bill: BillType) {
  selectedBill.value = bill;
  editDialog.value = true;
}

function confirmDelete(bill: BillType) {
  selectedBill.value = bill;
  deleteDialog.value = true;
}

async function handleDelete() {
  if (!selectedBill.value) return;
  await billTypeStore.deleteBillType(selectedBill.value._id);
  deleteDialog.value = false;
  selectedBill.value = null;
}

function scrollToEnd() {
  nextTick(() => {
    const el = listContainer.value;
    if (el) el.scrollTop = el.scrollHeight;
  });
}

// to automatically scroll to the end
watch(
  filteredBills,
  () => {
    scrollToEnd();
  },
  { deep: true }
);

onMounted(() => {
  load().then(scrollToEnd);
});
</script>
