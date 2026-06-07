<template>
  <v-container fluid class="pa-0">
    <SearchComponent :filters="summaryCategories" :on-search-fn="handleSearch" />

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

    <!-- Generate & Save Summary Dialog -->
    <v-dialog v-model="generateDialog" class="w-xs-75 w-sm-66">
      <v-card rounded="lg" class="pa-4">
        <v-card-title class="font-weight-bold text-body-1 pa-0 mb-4"
          >Generate Summary</v-card-title
        >
        <v-card-text class="pa-0 text-body-2 text-medium-emphasis mb-4">
          This will generate and save a summary for the selected timeframe to your
          records.
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
        <v-card-actions class="justify-end ga-2 pa-0 mt-4">
          <v-btn variant="text" @click="generateDialog = false">Cancel</v-btn>
          <v-btn
            color="secondary"
            variant="flat"
            rounded="lg"
            :disabled="!selectedType"
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
import { ref, computed, reactive, onMounted } from "vue";
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

function handleSearch(query: string, _filter: string, category: string | null) {
  searchQuery.value = query;
  searchCategory.value = category;
}

async function handleGenerate() {
  if (!selectedType.value) return;
  try {
    await summaryStore.generateSummary(
      selectedType.value as "Daily" | "Weekly" | "Monthly" | "Yearly"
    );
    snackbar.message = `${selectedType.value} summary generated successfully!`;
    snackbar.color = "success";
    generateDialog.value = false;
    selectedType.value = null;
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
  deleteDialog.value = false;
  selectedSummary.value = null;
}
</script>
