<template>
  <v-card variant="outlined" rounded="lg" class="pa-3 mb-3">
    <div class="d-flex align-center justify-space-between mb-2">
      <span class="text-caption text-medium-emphasis font-weight-bold">{{
        periodLabel
      }}</span>
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
            prepend-icon="mdi-download-outline"
            title="Export"
            @click="emit('export', summary)"
          />
          <v-list-item
            prepend-icon="mdi-delete-outline"
            title="Delete"
            base-color="error"
            @click="emit('delete', summary)"
          />
        </v-list>
      </v-menu>
    </div>

    <!-- Income + Expenses always shown -->
    <div class="d-flex justify-space-between py-1">
      <span class="text-body-2">Income</span>
      <span class="text-body-2 font-weight-bold text-success">
        ₦{{ get("Income").toLocaleString("en-NG") }}
      </span>
    </div>
    <div class="d-flex justify-space-between py-1">
      <span class="text-body-2">Expenses</span>
      <span class="text-body-2 font-weight-bold text-error">
        ₦{{ get("Expenses").toLocaleString("en-NG") }}
      </span>
    </div>

    <!-- Monthly/Yearly extras -->
    <template v-if="summary.timeframe !== 'Daily'">
      <div class="d-flex justify-space-between py-1">
        <span class="text-body-2">Difference</span>
        <span
          class="text-body-2 font-weight-bold"
          :class="get('Difference') >= 0 ? 'text-success' : 'text-error'"
        >
          ₦{{ get("Difference").toLocaleString("en-NG") }}
        </span>
      </div>
      <div class="d-flex justify-space-between py-1">
        <span class="text-body-2">RC-Data</span>
        <span class="text-body-2 font-weight-bold">{{ formattedRCData }}</span>
      </div>
      <div class="d-flex justify-space-between py-1">
        <span class="text-body-2">Bills</span>
        <span class="text-body-2 font-weight-bold">
          {{ get("BillsPaid") }}/{{ get("BillsTotal") }}
          <span v-if="get('BillsAmountDue') > 0" class="text-error">
            (₦{{ get("BillsAmountDue").toLocaleString("en-NG") }})
          </span>
        </span>
      </div>
      <div
        v-if="summary.timeframe === 'Yearly'"
        class="d-flex justify-space-between py-1"
      >
        <span class="text-body-2">Plans</span>
        <span class="text-body-2 font-weight-bold">
          {{ get("PlansCompleted") }}/{{ get("PlansTotal") }}
        </span>
      </div>
    </template>
  </v-card>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { Summary } from "@/stores/summary.store";

const props = defineProps<{ summary: Summary }>();
const emit = defineEmits<{
  export: [summary: Summary];
  delete: [summary: Summary];
}>();

function get(category: string) {
  return props.summary.data.find((d) => d.category === category)?.total ?? 0;
}

const periodLabel = computed(() => {
  const start = new Date(props.summary.period.start);
  const end = new Date(props.summary.period.end);

  const fmt = (d: Date) =>
    d.toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" });

  if (props.summary.timeframe === "Daily") return fmt(start);
  if (props.summary.timeframe === "Weekly") return `${fmt(start)} — ${fmt(end)}`;
  if (props.summary.timeframe === "Monthly") {
    return `${String(start.getMonth() + 1).padStart(2, "0")}/${start.getFullYear()}`;
  }
  return `${start.getFullYear()}`;
});

const formattedRCData = computed(() => {
  const airtime = get("Airtime");
  const dataMB = get("DataMB");
  const dataGB = (dataMB / 1024).toFixed(1);
  const parts = [];
  if (airtime > 0) parts.push(`₦${airtime.toLocaleString("en-NG")}`);
  if (dataMB > 0) parts.push(`${dataGB}GB`);
  return parts.join("/") || "—";
});
</script>
