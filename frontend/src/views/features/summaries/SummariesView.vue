<template>
  <v-container fluid class="pa-0">
    <SearchComponent :filters="summaryCategories" :on-search-fn="handleSearch" />

    <div class="px-4 d-flex flex-column" style="height: calc(100vh - 180px)">
      <div class="d-flex align-center justify-center mb-2 position-relative">
        <h2 class="text-h6 font-weight-bold">Records</h2>
        <v-spacer/>
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

      <div class="overflow-y-auto flex-grow-1">
        <SummaryItem
          v-for="summary in filteredSummaries"
          :key="summary._id"
          :summary="summary"
          @export="handleExport"
          @delete="confirmDelete"
        />

        <div
          v-if="!summaryStore.isLoading && filteredSummaries.length === 0"
          class="text-center py-10"
        >
          <v-icon size="48" color="grey-lighten-1">mdi-chart-box-outline</v-icon>
          <p class="text-medium-emphasis mt-2">No summaries found</p>
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

    <!-- Generate Summary Dialog — computes and previews only, nothing is saved -->
    <v-dialog v-model="generateDialog" class="w-xs-75 w-sm-66">
      <v-card rounded="lg" class="pa-4">
        <!-- Step 1: pick timeframe + period -->
        <template v-if="!generatedPreview">
          <v-card-title class="font-weight-bold text-body-1 pa-0 mb-4"
            >Generate Summary</v-card-title
          >
          <v-card-text class="pa-0 text-body-2 text-medium-emphasis mb-4">
            This will generate a summary for the selected period and show it
            here. It won't be saved to your records.
          </v-card-text>
          <v-row dense>
            <v-col v-for="type in summaryTypes" :key="type" cols="6">
              <v-btn
                :color="selectedType === type ? 'secondary' : 'default'"
                :variant="selectedType === type ? 'flat' : 'outlined'"
                block
                rounded="lg"
                class="text-none"
                @click="selectedType = type"
              >
                {{ type }}
              </v-btn>
            </v-col>
          </v-row>

          <!-- Custom period selector — the input type adapts to the chosen timeframe:
               dates for Daily/Weekly, a month picker for Monthly, a year for Yearly -->
          <v-row dense v-if="selectedType" class="mt-2">
            <v-col cols="12">
              <v-text-field
                v-if="selectedType === 'Daily' || selectedType === 'Weekly'"
                v-model="selectedDate"
                variant="outlined"
                :label="selectedType === 'Daily' ? 'Date' : 'Any date within the week'"
                type="date"
                density="comfortable"
                color="secondary"
                hint="Pick the day you want to summarize"
                persistent-hint
              />
              <v-text-field
                v-else-if="selectedType === 'Monthly'"
                v-model="selectedDate"
                variant="outlined"
                label="Month"
                type="month"
                density="comfortable"
                color="secondary"
                hint="Pick the month you want to summarize"
                persistent-hint
              />
              <v-text-field
                v-else-if="selectedType === 'Yearly'"
                v-model="selectedDate"
                variant="outlined"
                label="Year"
                type="number"
                density="comfortable"
                color="secondary"
                :min="1970"
                :max="2100"
                hint="Pick the year you want to summarize"
                persistent-hint
              />
            </v-col>
          </v-row>

          <v-card-actions class="justify-end ga-2 pa-0 mt-4">
            <v-btn variant="text" @click="generateDialog = false">Cancel</v-btn>
            <v-btn
              color="secondary"
              variant="flat"
              rounded="lg"
              :disabled="!selectedType || !selectedDate"
              :loading="summaryStore.isGenerating"
              @click="handleGenerate"
            >
              Generate
            </v-btn>
          </v-card-actions>
        </template>

        <!-- Step 2: preview of the just-generated (not saved) summary -->
        <template v-else>
          <div class="d-flex align-center ga-2 mb-3">
            <v-btn
              icon="mdi-arrow-left"
              size="x-small"
              variant="text"
              color="secondary"
              @click="generatedPreview = null"
            />
            <span class="text-body-2 font-weight-medium text-medium-emphasis">
              Summary preview
            </span>
          </div>

          <SummaryItem
            :summary="generatedPreview"
            @export="handleExport"
            @delete="() => {}"
          />

          <v-card-actions class="justify-end pa-0 mt-2">
            <v-btn
              color="secondary"
              variant="flat"
              rounded="lg"
              @click="generateDialog = false"
            >
              Done
            </v-btn>
          </v-card-actions>
        </template>
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
import { ref, computed, reactive, onMounted, watch } from "vue";
import { useSummaryStore } from "@/stores/summary.store";
import type { Summary } from "@/stores/summary.store";
import SummaryItem from "@/components/summaries/SummaryItem.vue";
import GenerateSummaryDialog from "@/components/summaries/GenerateSummaryDialog.vue";
import SearchComponent from "@/components/shared/SearchComponent.vue";

const summaryStore = useSummaryStore();

const deleteDialog = ref(false);
const instantDialog = ref(false);
const generateDialog = ref(false);
const selectedSummary = ref<Summary | null>(null);
const selectedType = ref<string | null>(null);
// Holds the raw value from whichever input is showing:
// "YYYY-MM-DD" for Daily/Weekly, "YYYY-MM" for Monthly, "YYYY" for Yearly
const selectedDate = ref<string>("");
// Holds the summary just returned from the generate call so it can be
// previewed inside the dialog. This is never persisted to the database —
// it exists purely for on-screen display.
const generatedPreview = ref<Summary | null>(null);
const searchQuery = ref("");
const searchCategory = ref<string | null>(null);
const snackbar = reactive({ show: false, message: "", color: "success" });

const summaryTypes = ["Daily", "Weekly", "Monthly", "Yearly"];
const summaryCategories = ["Daily", "Weekly", "Monthly", "Yearly"];

onMounted(() => load());

async function load() {
  await summaryStore.getSummaries();
}

const filteredSummaries = computed(() => {
  let results = summaryStore.summaries;

  // Category filter — filter by timeframe
  if (searchCategory.value) {
    results = results.filter((s) => s.timeframe === searchCategory.value);
  }

  // Search filter — match against period dates
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
    return full.includes(q) || monthYear.includes(q) || year.includes(q);
  });
});

// SearchComponent's onSearchFn is a (query, filter) => void callback; the
// "filter" it passes here IS the selected category (Daily/Weekly/Monthly/
// Yearly), since that's what summaryCategories contains.
function handleSearch(query: string, filter: string) {
  searchQuery.value = query;
  searchCategory.value = filter || null;
}

// Reset the picked period whenever the timeframe changes so a stale value
// (e.g. a month string left over from "Monthly") isn't sent for "Yearly"
watch(selectedType, () => {
  selectedDate.value = "";
});

// Clear selections whenever the dialog is closed
watch(generateDialog, (isOpen) => {
  if (!isOpen) {
    selectedType.value = null;
    selectedDate.value = "";
    generatedPreview.value = null;
  }
});

// Converts whatever the active input produced into the ISO date string
// the backend expects, based on the granularity of the chosen timeframe.
function buildDateParam(type: string, value: string): string {
  if (type === "Monthly") {
    // <input type="month"> gives "YYYY-MM"
    return `${value}-01`;
  }
  if (type === "Yearly") {
    // <input type="number"> gives "YYYY"
    return `${value}-01-01`;
  }
  // Daily / Weekly — <input type="date"> already gives "YYYY-MM-DD"
  return value;
}

async function handleGenerate() {
  if (!selectedType.value || !selectedDate.value) return;
  try {
    const dateParam = buildDateParam(selectedType.value, selectedDate.value);
    const summary = await summaryStore.generateSummary(
      selectedType.value as "Daily" | "Weekly" | "Monthly" | "Yearly",
      dateParam
    );
    generatedPreview.value = summary;
    snackbar.message = `${selectedType.value} summary generated!`;
    snackbar.color = "success";
  } catch {
    snackbar.message = "Failed to generate summary.";
    snackbar.color = "error";
  } finally {
    snackbar.show = true;
  }
}

function handleExport(summary: Summary) {
  console.log("Export:", summary);
}

function confirmDelete(summary: Summary) {
  selectedSummary.value = summary;
  deleteDialog.value = true;
}

async function handleDelete() {
  if (!selectedSummary.value) return;
  // No delete endpoint currently exists on the backend/store for summaries.
  // Just close the dialog and clear selection for now so the UI doesn't hang.
  deleteDialog.value = false;
  selectedSummary.value = null;
}
</script>