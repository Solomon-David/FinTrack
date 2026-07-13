<template>
  <v-container fluid class="pa-0">
    <SearchComponent :filters="filters" :on-search-fn="handleSearch" />

    <div class="px-4 pt-2 d-flex flex-column" style="height: calc(100vh - 180px)">
      <div class="d-flex align-center justify-space-between mb-2">
        <v-spacer />
        <h2 class="text-h6 font-weight-bold">Records</h2>
        <v-btn
          icon="mdi-refresh"
          variant="text"
          size="small"
          color="secondary"
          :loading="rcDataStore.isLoading"
          @click="load"
        />
      </div>

      <div ref="listContainer" class="overflow-y-auto flex-grow-1">
        <div v-for="(group, date) in groupedRecords" :key="date" class="mb-4">
          <RCDataItem
            v-for="record in group"
            :key="record._id"
            :record="record"
            @edit="openEdit"
            @duplicate="openDuplicate"
            @delete="confirmDelete"
          />
          <div class="text-center text-caption font-weight-bold py-1">
            Total: {{ groupTotal(group) }}
          </div>
        </div>

        <div
          v-if="!rcDataStore.isLoading && filteredRecords.length === 0"
          class="text-center py-10"
        >
          <v-icon size="48" color="grey-lighten-1">mdi-sim-off</v-icon>
          <p class="text-medium-emphasis mt-2">No RC-Data records found</p>
        </div>
      </div>
    </div>

    <div class="d-flex justify-center mt-4 mb-6">
      <v-btn color="secondary" variant="flat" rounded="xl" @click="generateDialog = true">
        Summaries
      </v-btn>
    </div>

    <!-- Generate Summary Dialog -->
    <GenerateSummaryDialog v-model="generateDialog" type="RCData" />

    <v-btn
      icon="mdi-plus"
      color="primary"
      size="large"
      elevation="4"
      rounded="lg"
      style="position: fixed; bottom: 24vh; right: 16px"
      @click="openAddDialog"
    />

    <component
      :is="AddRCDataDialog"
      v-if="AddRCDataDialog"
      v-model="addDialog"
      :initial-entry="duplicateEntry"
    />

    <RCDataEditDialog v-model="editDialog" :record="selectedRecord" @updated="load" />

    <v-dialog v-model="deleteDialog" max-width="300">
      <v-card rounded="lg" class="pa-4">
        <v-card-title class="text-body-1 font-weight-bold">Delete RC-Data</v-card-title>
        <v-card-text>Are you sure you want to delete this record?</v-card-text>
        <v-card-actions class="justify-end ga-2">
          <v-btn variant="text" @click="deleteDialog = false">Cancel</v-btn>
          <v-btn
            color="error"
            variant="flat"
            rounded="lg"
            :loading="rcDataStore.isLoading"
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
import { useRCDataStore } from "@/stores/rcdata.store";
import type { RCData } from "@/stores/rcdata.store";
import type { RCDataEntry } from "@/types";
import RCDataItem from "@/components/rcdata/RCDataItem.vue";
import RCDataEditDialog from "@/components/rcdata/RCDataEditDialog.vue";
import SearchComponent from "@/components/shared/SearchComponent.vue";
import LoadingDialog from "@/components/shared/LoadingDialog.vue";
import GenerateSummaryDialog from "@/components/summaries/GenerateSummaryDialog.vue";

const rcDataStore = useRCDataStore();

const listContainer = ref<HTMLElement | null>(null);

const addDialog = ref(false);
const editDialog = ref(false);
const deleteDialog = ref(false);
const generateDialog = ref(false);
const selectedRecord = ref<RCData | null>(null);
const duplicateEntry = ref<Partial<RCDataEntry> | undefined>(undefined);
const searchQuery = ref("");
const searchFilter = ref("Sender");

const filters = ["Sender", "Network", "Type", "Date"];

const AddRCDataDialog = shallowRef<ReturnType<typeof defineAsyncComponent> | null>(null);

function openAddDialog() {
  if (!AddRCDataDialog.value) {
    AddRCDataDialog.value = defineAsyncComponent({
      loader: () => import("@/components/rcdata/AddRCDataDialog.vue"),
      loadingComponent: LoadingDialog,
      delay: 0,
    });
  }
  duplicateEntry.value = undefined;
  addDialog.value = true;
}

function openDuplicate(record: RCData) {
  if (!AddRCDataDialog.value) {
    AddRCDataDialog.value = defineAsyncComponent({
      loader: () => import("@/components/rcdata/AddRCDataDialog.vue"),
      loadingComponent: LoadingDialog,
      delay: 0,
    });
  }
  duplicateEntry.value = {
    date: new Date(record.date).toISOString().split("T")[0],
    currency: record.currency,
    sender: { name: record.sender.name, phone: record.sender.phone },
    amount: { ...record.amount },
    type: record.type,
    network: record.network,
    remark: record.remark,
  };
  addDialog.value = true;
}

watch(addDialog, (isOpen) => {
  if (!isOpen) duplicateEntry.value = undefined;
});

async function load() {
  await rcDataStore.getRCData();
}

const filteredRecords = computed(() => {
  const q = searchQuery.value.toLowerCase().trim();
  if (!q) return rcDataStore.records;

  return rcDataStore.records.filter((record) => {
    if (searchFilter.value === "Sender")
      return record.sender.name.toLowerCase().includes(q);
    if (searchFilter.value === "Network") return record.network.toLowerCase().includes(q);
    if (searchFilter.value === "Type") return record.type.toLowerCase().includes(q);
    if (searchFilter.value === "Date") {
      const date = new Date(record.date);
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

const groupedRecords = computed(() => {
  return filteredRecords.value.reduce((groups, record) => {
    const date = new Date(record.date).toLocaleDateString("en-GB");
    if (!groups[date]) groups[date] = [];
    groups[date].push(record);
    return groups;
  }, {} as Record<string, RCData[]>);
});

function groupTotal(group: RCData[]) {
  const airtime = group
    .filter((r) => r.type === "airtime")
    .reduce((sum, r) => sum + r.amount.amount, 0);
  const dataMB = group
    .filter((r) => r.type === "data")
    .reduce(
      (sum, r) =>
        sum + (r.amount.size === "GB" ? r.amount.amount * 1024 : r.amount.amount),
      0
    );
  const dataGB = (dataMB / 1024).toFixed(1);
  const parts = [];
  if (airtime > 0) parts.push(`₦${airtime.toLocaleString("en-NG")}`);
  if (dataMB > 0) parts.push(`${dataGB}GB`);
  return parts.length > 0 ? parts.join(", ") : "—";
}

function handleSearch(query: string, filter: string) {
  searchQuery.value = query;
  searchFilter.value = filter;
}

function openEdit(record: RCData) {
  selectedRecord.value = record;
  editDialog.value = true;
}

function confirmDelete(record: RCData) {
  selectedRecord.value = record;
  deleteDialog.value = true;
}

async function handleDelete() {
  if (!selectedRecord.value) return;
  await rcDataStore.deleteRCData(selectedRecord.value._id);
  deleteDialog.value = false;
  selectedRecord.value = null;
}

function scrollToEnd() {
  nextTick(() => {
    const el = listContainer.value;
    if (el) el.scrollTop = el.scrollHeight;
  });
}

// to automatically scroll to the end
watch(
  filteredRecords,
  () => {
    scrollToEnd();
  },
  { deep: true }
);

onMounted(() => {
  load().then(scrollToEnd);
});
</script>
