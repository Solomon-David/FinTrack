<template>
  <v-card variant="outlined" rounded="lg" class="px-3 py-2 mb-2">
    <!-- Mobile layout -->
    <v-list-item class="px-0 py-1 d-sm-none">
      <template #prepend>
        <div class="d-flex flex-column justify-center mr-3">
          <span class="font-weight-bold text-body-2">{{ plan.name }}</span>
          <span class="text-caption text-medium-emphasis">{{ formattedDueDate }}</span>
        </div>
      </template>
      <template #append>
        <div class="d-flex align-center ga-2">
          <div class="d-flex flex-column align-end">
            <span class="text-body-2 font-weight-bold">{{ progressLabel }}</span>
            <v-chip size="x-small" :color="statusColor" label>{{ plan.status }}</v-chip>
          </div>
          <v-menu>
            <template #activator="{ props: menuProps }">
              <v-btn icon="mdi-dots-vertical" size="x-small" variant="text" v-bind="menuProps" />
            </template>
            <v-list density="compact" rounded="lg" min-width="140">
              <v-list-item prepend-icon="mdi-pencil-outline" title="Edit" @click="emit('edit', plan)" />
              <v-list-item prepend-icon="mdi-content-copy" title="Duplicate" @click="emit('duplicate', plan)" />
              <v-list-item prepend-icon="mdi-delete-outline" title="Delete" base-color="error" @click="emit('delete', plan)" />
            </v-list>
          </v-menu>
        </div>
      </template>
    </v-list-item>

    <!-- Progress bar (mobile) -->
    <v-progress-linear
      v-if="progressPercent !== null"
      :model-value="progressPercent"
      color="secondary"
      height="6"
      rounded
      class="d-sm-none mt-1"
    />

    <!-- Tablet and above layout -->
    <v-row align="center" class="d-none d-sm-flex px-2 py-1">
      <v-col cols="3">
        <span class="text-body-2 font-weight-bold">{{ plan.name }}</span>
        <div v-if="plan.description" class="text-caption text-medium-emphasis">
          {{ plan.description }}
        </div>
      </v-col>
      <v-col cols="3">
        <span class="text-body-2">{{ progressLabel }}</span>
        <v-progress-linear
          v-if="progressPercent !== null"
          :model-value="progressPercent"
          color="secondary"
          height="6"
          rounded
          class="mt-1"
        />
      </v-col>
      <v-col cols="2">
        <span class="text-caption text-medium-emphasis">{{ formattedDueDate }}</span>
      </v-col>
      <v-col cols="2">
        <v-chip size="x-small" :color="statusColor" label>{{ plan.status }}</v-chip>
      </v-col>
      <v-col cols="2" class="d-flex justify-end">
        <v-menu>
          <template #activator="{ props: menuProps }">
            <v-btn icon="mdi-dots-vertical" size="x-small" variant="text" v-bind="menuProps" />
          </template>
          <v-list density="compact" rounded="lg" min-width="140">
            <v-list-item prepend-icon="mdi-pencil-outline" title="Edit" @click="emit('edit', plan)" />
            <v-list-item prepend-icon="mdi-content-copy" title="Duplicate" @click="emit('duplicate', plan)" />
            <v-list-item prepend-icon="mdi-delete-outline" title="Delete" base-color="error" @click="emit('delete', plan)" />
          </v-list>
        </v-menu>
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { Plan } from "@/stores/plan.store";

const props = defineProps<{ plan: Plan }>();
const emit = defineEmits<{
  edit: [plan: Plan];
  delete: [plan: Plan];
  duplicate: [plan: Plan];
}>();

const formattedDueDate = computed(() =>
  props.plan.dueDate
    ? new Date(props.plan.dueDate).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : "No due date"
);

const progressLabel = computed(() => {
  const progress = Number(props.plan.progress).toLocaleString("en-NG");
  if (props.plan.targetAmount === "Unknown") {
    return `₦${progress} saved`;
  }
  const target = Number(props.plan.targetAmount).toLocaleString("en-NG");
  return `₦${progress} / ₦${target}`;
});

const progressPercent = computed(() => {
  if (props.plan.targetAmount === "Unknown" || !props.plan.targetAmount) return null;
  const pct = (props.plan.progress / Number(props.plan.targetAmount)) * 100;
  return Math.min(100, Math.max(0, pct));
});

const statusColor = computed(() => {
  const colors: Record<string, string> = {
    Completed: "success",
    "In Progress": "secondary",
    Overdue: "error",
  };
  return colors[props.plan.status] ?? "secondary";
});
</script>