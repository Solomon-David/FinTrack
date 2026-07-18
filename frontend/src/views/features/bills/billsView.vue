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
          :loading="billTypeStore.isLoading"
          @click="load"
        />
      </div>

      <div class="overflow-y-auto flex-grow-1">
        <div v-for="(group, status) in groupedBillTypes" :key="status" class="mb-4">
          <div class="text-caption font-weight-bold text-medium-emphasis mb-1">
            {{ status }} ({{ group.length }})
          </div>

          <v-card
            v-for="billType in group"
            :key="billType._id"
            variant="outlined"
            rounded="lg"
            class="px-3 py-2 mb-2"
          >
            <v-row align="center" no-gutters>
              <v-col cols="5" sm="4">
                <div class="font-weight-bold text-body-2">{{ billType.name }}</div>
                <div class="text-caption text-medium-emphasis">{{ billType.type }}</div>
              </v-col>
              <v-col cols="4" sm="4">
                <div class="text-body-2">
                  ₦{{ Number(billType.amountPaid).toLocaleString("en-NG") }} / ₦{{
                    Number(billType.total).toLocaleString("en-NG")
                  }}
                </div>
                <v-progress-linear
                  :model-value="progressPercent(billType)"
                  color="secondary"
                  height="6"
                  rounded
                  class="mt-1"
                />
              </v-col>
              <v-col cols="2" sm="2">
                <span class="text-caption text-medium-emphasis">{{
                  formattedDueDate(billType)
                }}</span>
              </v-col>
              <v-col cols="1" sm="1">
                <v-chip size="x-small" :color="statusColor(billType.status)" label>{{
                  billType.status
                }}</v-chip>
              </v-col>
              <v-col cols="12" sm="1" class="d-flex justify-end">
                <v-menu>
                  <template #activator="{ props: menuProps }">
                    <v-btn
                      icon="mdi-dots-vertical"
                      size="x-small"
                      variant="text"
                      v-bind="menuProps"
                    />
                  </template>
                  <v-list density="compact" rounded="lg" min-width="140">
                    <v-list-item
                      prepend-icon="mdi-pencil-outline"
                      title="Edit"
                      @click="openEdit(billType)"
                    />
                    <v-list-item
                      prepend-icon="mdi-content-copy"
                      title="Duplicate"
                      @click="openDuplicate(billType)"
                    />
                    <v-list-item
                      prepend-icon="mdi-delete-outline"
                      title="Delete"
                      base-color="error"
                      @click="confirmDelete(billType)"
                    />
                  </v-list>
                </v-menu>
              </v-col>
            </v-row>
          </v-card>
        </div>

        <div
          v-if="!billTypeStore.isLoading && filteredBillTypes.length === 0"
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

    <BillEditDialog v-model="editDialog" :bill="selectedBillType" @updated="load" />

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
import { ref, computed, onMounted, defineAsyncComponent, shallowRef, watch } from "vue";
import { useBillTypeStore } from "@/stores/billtype.store";
import type { BillType } from "@/stores/billtype.store";
import type { BillTypeEntry } from "@/types";
import BillEditDialog from "@/components/bills/BillEditDialog.vue";
import SearchComponent from "@/components/shared/SearchComponent.vue";
import LoadingDialog from "@/components/shared/LoadingDialog.vue";

const billTypeStore = useBillTypeStore();

const addDialog = ref(false);
const editDialog = ref(false);
const deleteDialog = ref(false);
const selectedBillType = ref<BillType | null>(null);
const duplicateEntry = ref<Partial<BillTypeEntry> | undefined>(undefined);
const searchQuery = ref("");
const searchFilter = ref("Name");

const filters = ["Name", "Type", "Status", "Due Date"];

// Typed as `any` because the async-loaded dialog component's prop shape
// varies by which quick-action opened it, and Vue's DefineComponent
// generics don't unify cleanly across those shapes for a single ref.
const CreateBillTypeDialog = shallowRef<any>(null);

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

function openDuplicate(billType: BillType) {
  if (!CreateBillTypeDialog.value) {
    CreateBillTypeDialog.value = defineAsyncComponent({
      loader: () => import("@/components/bills/CreateBillTypeDialog.vue"),
      loadingComponent: LoadingDialog,
      delay: 0,
    });
  }
  duplicateEntry.value = {
    name: billType.name,
    type: billType.type,
    total: billType.total,
    currency: billType.currency,
    recurrence: billType.recurrence,
    dueEvery: billType.dueEvery,
    remark: billType.remark,
    // dueDate is server-computed from recurrence/dueEvery, not part of
    // BillTypeEntry, so it's intentionally left out here.
  };
  addDialog.value = true;
}

watch(addDialog, (isOpen) => {
  if (!isOpen) duplicateEntry.value = undefined;
});

onMounted(() => load());

async function load() {
  await billTypeStore.getBillTypes();
}

const filteredBillTypes = computed(() => {
  const q = searchQuery.value.toLowerCase().trim();
  if (!q) return billTypeStore.billTypes;

  return billTypeStore.billTypes.filter((billType) => {
    if (searchFilter.value === "Name") return billType.name.toLowerCase().includes(q);
    if (searchFilter.value === "Type") return billType.type.toLowerCase().includes(q);
    if (searchFilter.value === "Status") return billType.status.toLowerCase().includes(q);
    if (searchFilter.value === "Due Date") {
      if (!billType.dueDate) return false;
      const date = new Date(billType.dueDate);
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

// Group by status so overdue/unpaid bills stand out from paid ones
const groupedBillTypes = computed(() => {
  const order = ["Overdue", "Part", "Unpaid", "Paid"];
  const groups = filteredBillTypes.value.reduce((acc, billType) => {
    if (!acc[billType.status]) acc[billType.status] = [];
    acc[billType.status].push(billType);
    return acc;
  }, {} as Record<string, BillType[]>);

  const ordered: Record<string, BillType[]> = {};
  for (const status of order) {
    if (groups[status]) ordered[status] = groups[status];
  }
  return ordered;
});

function progressPercent(billType: BillType) {
  if (!billType.total) return 0;
  return Math.min(100, Math.max(0, (billType.amountPaid / billType.total) * 100));
}

function formattedDueDate(billType: BillType) {
  return billType.dueDate
    ? new Date(billType.dueDate).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : "—";
}

function statusColor(status: BillType["status"]) {
  const colors: Record<string, string> = {
    Paid: "success",
    Part: "warning",
    Unpaid: "grey",
    Overdue: "error",
  };
  return colors[status] ?? "secondary";
}

function handleSearch(query: string, filter: string) {
  searchQuery.value = query;
  searchFilter.value = filter;
}

function openEdit(billType: BillType) {
  selectedBillType.value = billType;
  editDialog.value = true;
}

function confirmDelete(billType: BillType) {
  selectedBillType.value = billType;
  deleteDialog.value = true;
}

async function handleDelete() {
  if (!selectedBillType.value) return;
  await billTypeStore.deleteBillType(selectedBillType.value._id);
  deleteDialog.value = false;
  selectedBillType.value = null;
}
</script>