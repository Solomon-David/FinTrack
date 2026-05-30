<template>
  <v-card variant="outlined" rounded="lg" class="px-3 py-1 mb-2">
    <!-- Mobile layout -->
    <v-list-item class="px-0 py-2 d-sm-none">
      <template #prepend>
        <div class="d-flex flex-column justify-center mr-3">
          <span class="text-caption text-medium-emphasis">{{ formattedDate }}</span>
          <span class="font-weight-bold text-body-2">{{ formattedAmount }}</span>
        </div>
      </template>
      <template #append>
        <div class="d-flex align-center ga-2">
          <div class="d-flex flex-column align-end">
            <span class="text-body-2 font-weight-bold">{{ record.sender.name }}</span>
            <v-chip size="x-small" :color="networkColor" label>{{
              record.network
            }}</v-chip>
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
                @click="emit('edit', record)"
              />
              <v-list-item
                prepend-icon="mdi-content-copy"
                title="Duplicate"
                @click="emit('duplicate', record)"
              />
              <v-list-item
                prepend-icon="mdi-delete-outline"
                title="Delete"
                base-color="error"
                @click="emit('delete', record)"
              />
            </v-list>
          </v-menu>
        </div>
      </template>
    </v-list-item>

    <!-- Tablet and above layout -->
    <v-row align="center" class="d-none d-sm-flex px-2 py-2">
      <v-col cols="2">
        <span class="text-caption text-medium-emphasis">{{ formattedDate }}</span>
      </v-col>
      <v-col cols="2">
        <span class="font-weight-bold text-body-2">{{ formattedAmount }}</span>
      </v-col>
      <v-col cols="3">
        <span class="text-body-2 font-weight-bold">{{ record.sender.name }}</span>
      </v-col>
      <v-col cols="2">
        <v-chip size="x-small" :color="networkColor" label>{{ record.network }}</v-chip>
      </v-col>
      <v-col cols="2">
        <span class="text-caption text-medium-emphasis">{{ record.remark }}</span>
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
              @click="emit('edit', record)"
            />
            <v-list-item
              prepend-icon="mdi-content-copy"
              title="Duplicate"
              @click="emit('duplicate', record)"
            />
            <v-list-item
              prepend-icon="mdi-delete-outline"
              title="Delete"
              base-color="error"
              @click="emit('delete', record)"
            />
          </v-list>
        </v-menu>
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { RCData } from "@/stores/rcdata.store";

const props = defineProps<{ record: RCData }>();
const emit = defineEmits<{
  edit: [record: RCData];
  delete: [record: RCData];
  duplicate: [record: RCData];
}>();

const formattedDate = computed(() =>
  new Date(props.record.date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })
);

const formattedAmount = computed(() => {
  const { amount, size } = props.record.amount;
  return props.record.type === "airtime"
    ? `₦${Number(amount).toLocaleString("en-NG")}`
    : `${amount}${size}`;
});

const networkColor = computed(() => {
  const colors: Record<string, string> = {
    MTN: "warning",
    Airtel: "error",
    Glo: "success",
    "9mobile": "teal",
  };
  return colors[props.record.network] ?? "secondary";
});
</script>
