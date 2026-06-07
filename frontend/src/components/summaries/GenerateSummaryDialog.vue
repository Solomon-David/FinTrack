<template>
  <v-dialog v-model="open" class="w-xs-75 w-sm-66" scrim="true">
    <v-container class="px-6 pb-5 pt-1 bg-light rounded-lg d-flex flex-column gap-3">
      <DialogHeaderComponent title="Instant Summary" v-model="open" />

      <!-- Type selection -->
      <template v-if="!preview">
        <p class="text-body-2 text-medium-emphasis text-center">
          Select a time period to summarise
        </p>
        <v-row dense>
          <v-col v-for="type in types" :key="type.label" cols="12">
            <v-card
              variant="outlined"
              rounded="lg"
              class="pa-3 d-flex align-center ga-3 cursor-pointer"
              :class="{ 'border-secondary': selected === type.label }"
              @click="selected = type.label"
            >
              <v-icon :color="selected === type.label ? 'secondary' : 'grey'" size="28">
                {{ type.icon }}
              </v-icon>
              <div class="d-flex flex-column">
                <span class="text-body-2 font-weight-bold">{{ type.label }}</span>
                <span class="text-caption text-medium-emphasis">{{ type.description }}</span>
              </div>
              <v-spacer />
              <v-icon v-if="selected === type.label" color="secondary" size="20">
                mdi-check-circle
              </v-icon>
            </v-card>
          </v-col>
        </v-row>

        <v-btn
          color="secondary"
          variant="flat"
          block
          rounded="lg"
          height="44"
          class="font-weight-bold text-none mt-2"
          :loading="loading"
          :disabled="!selected"
          @click="generate"
        >
          Generate
        </v-btn>
      </template>

      <!-- Preview -->
      <template v-else>
        <div class="d-flex align-center ga-2 mb-1">
          <v-btn
            icon="mdi-arrow-left"
            size="x-small"
            variant="text"
            color="secondary"
            @click="preview = null"
          />
          <span class="text-body-2 font-weight-medium text-medium-emphasis">
            {{ periodRangeLabel }}
          </span>
        </div>

        <SummaryItem :summary="preview" @export="handleExport" @delete="() => {}" />
      </template>

      <v-snackbar v-model="snackbar.show" :color="snackbar.color" rounded="lg" timeout="2500" location="bottom">
        {{ snackbar.message }}
      </v-snackbar>
    </v-container>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import { useIncomeStore } from "@/stores/income.store";
import { useExpenseStore } from "@/stores/expense.store";
import { useRCDataStore } from "@/stores/rcdata.store";
import type { Summary } from "@/stores/summary.store";
import DialogHeaderComponent from "@/components/shared/DialogHeaderComponent.vue";
import SummaryItem from "@/components/summaries/SummaryItem.vue";

const open = defineModel<boolean>({ required: true });

const incomeStore = useIncomeStore();
const expenseStore = useExpenseStore();
const rcDataStore = useRCDataStore();

const types = [
  {
    label: "Daily",
    icon: "mdi-calendar-today",
    description: "Today's activity",
  },
  {
    label: "Weekly",
    icon: "mdi-calendar-week",
    description: "Last 7 days",
  },
  {
    label: "Monthly",
    icon: "mdi-calendar-month",
    description: "This month so far",
  },
];

const selected = ref<string | null>(null);
const preview = ref<Summary | null>(null);
const loading = ref(false);
const snackbar = reactive({ show: false, message: "", color: "success" });

function showSnackbar(message: string, color: string) {
  snackbar.message = message;
  snackbar.color = color;
  snackbar.show = true;
}

// Compute date range based on selected type
function getDateRange(type: string): { start: Date; end: Date } {
  const now = new Date();
  const end = new Date(now);
  end.setHours(23, 59, 59, 999);

  const start = new Date(now);

  if (type === "Daily") {
    start.setHours(0, 0, 0, 0);
  } else if (type === "Weekly") {
    start.setDate(start.getDate() - 6);
    start.setHours(0, 0, 0, 0);
  } else if (type === "Monthly") {
    start.setDate(1);
    start.setHours(0, 0, 0, 0);
  }

  return { start, end };
}

const periodRangeLabel = computed(() => {
  if (!selected.value) return "";
  const { start, end } = getDateRange(selected.value);
  const fmt = (d: Date) => d.toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" });
  if (selected.value === "Daily") return fmt(start);
  return `${fmt(start)} — ${fmt(end)}`;
});

function inRange(dateStr: string, start: Date, end: Date) {
  const d = new Date(dateStr);
  return d >= start && d <= end;
}

async function generate() {
  if (!selected.value) return;
  loading.value = true;

  try {
    // Ensure stores are loaded
    await Promise.all([
      incomeStore.incomes.length === 0 ? incomeStore.getIncomes() : Promise.resolve(),
      expenseStore.expenses.length === 0 ? expenseStore.getExpenses() : Promise.resolve(),
      rcDataStore.records.length === 0 ? rcDataStore.getRCData() : Promise.resolve(),
    ]);

    const { start, end } = getDateRange(selected.value);

    // Filter records to the date range
    const incomes = incomeStore.incomes.filter(i => inRange(i.date, start, end));
    const expenses = expenseStore.expenses.filter(e => inRange(e.date, start, end));
    const rcdata = rcDataStore.records.filter(r => inRange(r.date, start, end));

    // Compute totals
    const totalIncome = incomes.reduce((s, i) => s + i.amount, 0);
    const totalExpense = expenses.reduce((s, e) => s + e.amount, 0);

    const totalAirtime = rcdata
      .filter(r => r.type === "airtime")
      .reduce((s, r) => s + r.amount.amount, 0);

    const totalDataMB = rcdata
      .filter(r => r.type === "data")
      .reduce((s, r) => s + (r.amount.size === "GB" ? r.amount.amount * 1024 : r.amount.amount), 0);

    // Build a Summary-shaped object for SummaryItem
    preview.value = {
      _id: "instant",
      user: "",
      timeframe: selected.value as "Daily" | "Weekly" | "Monthly" | "Yearly",
      category: "Income",
      currency: "NGN",
      period: { start: start.toISOString(), end: end.toISOString() },
      data: [
        { category: "Income",     total: totalIncome },
        { category: "Expenses",   total: totalExpense },
        { category: "Difference", total: totalIncome - totalExpense },
        { category: "Airtime",    total: totalAirtime },
        { category: "DataMB",     total: totalDataMB },
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  } catch (err: any) {
    showSnackbar(err.message || "Failed to generate summary.", "error");
  } finally {
    loading.value = false;
  }
}

function handleExport(summary: Summary) {
  console.log("Export:", summary);
}
</script>