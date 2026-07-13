<template>
  <v-container fluid class="pa-0">
    <SearchComponent :filters="availableFilters" :on-search-fn="handleSearch" />

    <div class="px-4 d-flex flex-column" style="height: calc(100vh - 180px)">
      <div class="d-flex align-center justify-center mb-2 position-relative">
        <h2 class="text-h6 font-weight-bold">Records</h2>
        <v-btn
          icon="mdi-refresh"
          variant="text"
          size="small"
          color="secondary"
          :loading="summaryStore.isLoading"
          class="position-absolute"
          style="right: 0"
          @click="load"
        />
      </div>

      <div ref="listContainer" class="overflow-y-auto flex-grow-1">
        <div
          v-if="!summaryStore.isLoading && filteredSummaries.length === 0"
          class="text-center py-10"
        >
          <v-icon size="48" color="grey-lighten-1">mdi-chart-box-outline</v-icon>
          <p class="text-medium-emphasis mt-2">No summaries found</p>
        </div>
        <div v-else>
          <SummaryItem
            v-for="summary in filteredSummaries"
            :key="summary.id"
            :summary="summary"
            @export="(s) => summaryStore.exportSummary(s)"
            @delete="
              (s) => {
                selectedSummary.value = s;
                deleteDialog = true;
              }
            "
          />
        </div>
      </div>
    </div>

    <!-- Action buttons -->
    <div class="d-flex justify-center ga-3 mt-4 mb-6">
      <v-btn color="secondary" variant="tonal" rounded="xl" @click="instantDialog = true">
        Instant Summary
      </v-btn>
      <v-btn
        color="secondary"
        variant="flat"
        rounded="xl"
        :loading="summaryStore.isGenerating"
        @click="generateDialog = true"
      >
        Generate Summary
      </v-btn>
    </div>

    <!-- Instant Summary Dialog -->
    <GenerateSummaryDialog v-model="instantDialog" />

    <!-- Generate & Save Summary Dialog -->
    <v-dialog v-model="generateDialog" class="w-xs-75 w-sm-66">
      <v-card rounded="lg" class="pa-4">
        <v-card-title class="font-weight-bold text-body-1 pa-0 mb-4"
          >Generate Summary</v-card-title
        >
        <v-card-text class="pa-0 text-body-2 text-medium-emphasis mb-4">
          Select a timeframe or set custom date range to generate and save a summary.
        </v-card-text>

        <!-- Timeframe buttons -->
        <div class="mb-4">
          <p class="text-caption text-medium-emphasis mb-2">Quick Select:</p>
          <v-row dense>
            <v-col v-for="type in availableFilters" :key="type" cols="6">
              <v-btn
                :color="
                  selectedType === type && !useCustomDates ? 'secondary' : 'default'
                "
                :variant="selectedType === type && !useCustomDates ? 'flat' : 'outlined'"
                block
                rounded="lg"
                class="text-none"
                @click="selectTimeframe(type)"
              >
                {{ type }}
              </v-btn>
            </v-col>
          </v-row>
        </div>

        <!-- Custom Date Range Toggle -->
        <v-checkbox
          v-model="useCustomDates"
          label="Use Custom Date Range"
          density="compact"
          class="mb-3"
        />

        <!-- Custom Date Range Inputs -->
        <v-expand-transition>
          <div v-if="useCustomDates" class="mb-4">
            <v-row dense>
              <v-col cols="6">
                <v-text-field
                  v-model="customStartDate"
                  type="date"
                  label="Start Date"
                  variant="outlined"
                  density="compact"
                />
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="customEndDate"
                  type="date"
                  label="End Date"
                  variant="outlined"
                  density="compact"
                />
              </v-col>
            </v-row>
          </div>
        </v-expand-transition>

        <v-card-actions class="justify-end ga-2 pa-0 mt-4">
          <v-btn variant="text" @click="resetGenerateDialog">Cancel</v-btn>
          <v-btn
            color="secondary"
            variant="flat"
            rounded="lg"
            :disabled="!isGenerateValid"
            :loading="summaryStore.isGenerating"
            @click="handleGenerate"
          >
            Generate
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Delete Confirmation -->
    <v-dialog v-model="deleteDialog" max-width="300">
      <v-card rounded="lg" class="pa-4">
        <v-card-title class="text-body-1 font-weight-bold">Delete Summary</v-card-title>
        <v-card-text>Are you sure you want to delete this summary?</v-card-text>
        <v-card-actions class="justify-end ga-2">
          <v-btn variant="text" @click="deleteDialog = false">Cancel</v-btn>
          <v-btn color="error" variant="flat" rounded="lg" @click="handleDelete">
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Snackbar -->
    <v-snackbar
      v-model="snackbar.show"
      :color="snackbar.color"
      rounded="lg"
      timeout="3000"
    >
      {{ snackbar.message }}
    </v-snackbar>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed, reactive, onMounted, watch, nextTick } from "vue";
import { useSummaryStore } from "@/stores/summary.store";
import type { Summary } from "@/stores/summary.store";
import SummaryItem from "@/components/summaries/SummaryItem.vue";
import GenerateSummaryDialog from "@/components/summaries/GenerateSummaryDialog.vue";
import SearchComponent from "@/components/shared/SearchComponent.vue";

const props = defineProps<{ filter?: string[] | null }>();
const emit = defineEmits<{ "filter-change": [filter: string | null] }>();

const summaryStore = useSummaryStore();

const listContainer = ref<HTMLElement | null>(null);

const deleteDialog = ref(false);
const instantDialog = ref(false);
const generateDialog = ref(false);
const selectedSummary = ref<Summary | null>(null);
const selectedType = ref<string | null>(null);
const useCustomDates = ref(false);
const customStartDate = ref("");
const customEndDate = ref("");
const searchQuery = ref("");
const searchCategory = ref<string | null>(null);
const activeFilter = ref<string | null>(null);
const snackbar = reactive({ show: false, message: "", color: "success" });

const summaryFilters = ["Daily", "Weekly", "Monthly", "Yearly"];
const availableFilters = computed(() =>
  props.filter?.length ? props.filter : summaryFilters
);

const isGenerateValid = computed(() => {
  if (useCustomDates.value) {
    return selectedType.value && customStartDate.value && customEndDate.value;
  }
  return selectedType.value;
});

async function load() {
  await summaryStore.getSummaries();
}

// helper: get ISO week number
function getISOWeek(date: Date) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  return weekNo;
}

const filteredSummaries = computed(() => {
  let results = summaryStore.summaries;
  const categoryToFilter = searchCategory.value ?? activeFilter.value;

  // Category filter — filter by timeframe
  if (categoryToFilter) {
    results = results.filter((s) => s.timeframe === categoryToFilter);
  }

  // Search filter — match against period dates (include weeks)
  const q = searchQuery.value.trim();
  if (!q) return results;

  return results.filter((summary) => {
    const start = new Date(summary.period.start);
    const full = start.toLocaleDateString("en-GB");
    const monthYear = `${String(start.getMonth() + 1).padStart(
      2,
      "0"
    )}/${start.getFullYear()}`;
    const year = `${start.getFullYear()}`;
    const week = String(getISOWeek(start)).padStart(2, "0");
    const weekYear = `W${week}/${start.getFullYear()}`;
    return (
      full.includes(q) ||
      monthYear.includes(q) ||
      year.includes(q) ||
      weekYear.includes(q) ||
      week.includes(q)
    );
  });
});

function applyFilter(filter: string | null) {
  activeFilter.value = filter;
  emit("filter-change", filter);
}

function selectTimeframe(type: string) {
  if (!useCustomDates.value) {
    selectedType.value = selectedType.value === type ? null : type;
  } else {
    selectedType.value = type;
  }
}

function resetGenerateDialog() {
  generateDialog.value = false;
  selectedType.value = null;
  useCustomDates.value = false;
  customStartDate.value = "";
  customEndDate.value = "";
}

function handleSearch(query: string, selectedFilter: string) {
  searchQuery.value = query;
  searchCategory.value = selectedFilter || null;
  applyFilter(selectedFilter || null);
}

async function handleGenerate() {
  if (!selectedType.value) return;
  try {
    let startDate: Date | undefined;
    let endDate: Date | undefined;

    if (useCustomDates.value && customStartDate.value && customEndDate.value) {
      startDate = new Date(customStartDate.value);
      endDate = new Date(customEndDate.value);
    }

    await summaryStore.generateSummary(
      selectedType.value as "Daily" | "Weekly" | "Monthly" | "Yearly",
      startDate,
      endDate
    );
    snackbar.message = `${selectedType.value} summary generated successfully!`;
    snackbar.color = "success";
    resetGenerateDialog();
    applyFilter(selectedType.value);
  } catch {
    snackbar.message = "Failed to generate summary.";
    snackbar.color = "error";
  } finally {
    snackbar.show = true;
  }
}

async function handleDelete() {
  if (!selectedSummary.value) return;
  await summaryStore.deleteSummary(selectedSummary.value._id);
  deleteDialog.value = false;
  selectedSummary.value = null;
}

function scrollToEnd() {
  nextTick(() => {
    const el = listContainer.value;
    if (el) el.scrollTop = el.scrollHeight;
  });
}

// to automatically scroll to the end
watch(
  filteredSummaries,
  () => {
    scrollToEnd();
  },
  { deep: true }
);

onMounted(() => {
  load().then(scrollToEnd);
});
</script>
