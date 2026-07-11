<template>
  <v-card variant="outlined" rounded="lg" class="px-3 py-1 mb-2">
    <!-- Mobile layout -->
    <v-list-item class="px-0 py-2 d-sm-none">
      <template #prepend>
        <div class="d-flex flex-column justify-center mr-3">
          <span class="text-caption text-medium-emphasis">{{ bill.recurrence }}</span>
          <span class="font-weight-bold text-body-2"> ₦{{ bill.total }} </span>
          <div class="mt-1 d-flex ga-2">
            <v-chip size="x-small" text-color="white">
              ₦{{ Number(bill.amountPaid).toLocaleString("en-NG") }} / ₦{{
                Number(bill.total).toLocaleString("en-NG")
              }}
            </v-chip>
            <v-chip size="x-small" :color="statusColor" text-color="white">{{
              bill.status
            }}</v-chip>
          </div>
        </div>
      </template>
      <template #append>
        <div class="d-flex align-center ga-2">
          <div class="d-flex flex-column align-end">
            <span class="text-body-2 font-weight-bold">{{ bill.name }}</span>
            <span class="text-caption text-medium-emphasis">{{ bill.type }}</span>
          </div>
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
                @click="emit('edit', bill)"
              />
              <v-list-item
                prepend-icon="mdi-content-copy"
                title="Duplicate"
                @click="emit('duplicate', bill)"
              />
              <v-list-item
                prepend-icon="mdi-delete-outline"
                title="Delete"
                base-color="error"
                @click="emit('delete', bill)"
              />
            </v-list>
          </v-menu>
        </div>
      </template>
    </v-list-item>

    <!-- Tablet and above layout -->
    <v-row align="center" class="d-none d-sm-flex px-2 py-2">
      <v-col cols="2">
        <span class="text-body-2 font-weight-bold">{{ bill.name }}</span>
      </v-col>
      <v-col cols="2">
        <span class="text-caption text-medium-emphasis">{{ bill.type }}</span>
      </v-col>
      <v-col cols="2">
        <span class="text-body-2"> ₦{{ bill.total.toLocaleString("en-NG") }} </span>
      </v-col>
      <v-col cols="2" class="d-flex align-center">
        <v-chip size="small" text-color="white">
          ₦{{ formattedAmountPaid }} / ₦{{ formattedTotal }}
        </v-chip>
      </v-col>
      <v-col cols="1">
        <v-chip size="small" :color="statusColor" text-color="white">{{
          bill.status
        }}</v-chip>
      </v-col>
      <v-col cols="2">
        <span class="text-caption text-medium-emphasis">{{ bill.recurrence }}</span>
      </v-col>
      <v-col cols="1">
        <span class="text-caption text-medium-emphasis">{{ formattedDueDate }}</span>
      </v-col>
      <v-col cols="1" class="d-flex justify-end">
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
              @click="emit('edit', bill)"
            />
            <v-list-item
              prepend-icon="mdi-content-copy"
              title="Duplicate"
              @click="emit('duplicate', bill)"
            />
            <v-list-item
              prepend-icon="mdi-delete-outline"
              title="Delete"
              base-color="error"
              @click="emit('delete', bill)"
            />
          </v-list>
        </v-menu>
      </v-col>
    </v-row>

    <!-- Payment progress bar -->
    <v-progress-linear
      :model-value="progressPercent"
      :color="statusColor"
      height="3"
      rounded
      class="mx-2 mb-1"
    />
  </v-card>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { BillType } from "@/stores/billtype.store";

const props = defineProps<{ bill: BillType }>();
const emit = defineEmits<{
  edit: [bill: BillType];
  delete: [bill: BillType];
  duplicate: [bill: BillType];
}>();

const formattedAmountPaid = computed(() =>
  Number(props.bill.amountPaid).toLocaleString("en-NG")
);

const formattedTotal = computed(() => Number(props.bill.total).toLocaleString("en-NG"));

const formattedDueDate = computed(() =>
  props.bill.dueDate
    ? new Date(props.bill.dueDate).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : "—"
);

const progressPercent = computed(() =>
  props.bill.total > 0
    ? Math.min((props.bill.amountPaid / props.bill.total) * 100, 100)
    : 0
);

const statusColor = computed(() => {
  const colors: Record<string, string> = {
    Paid: "green",
    Part: "orange",
    Unpaid: "red",
    Overdue: "red",
  };
  return colors[props.bill.status] ?? "secondary";
});
</script>
