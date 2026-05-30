<template>
  <v-card variant="outlined" rounded="lg" class="px-3 py-1 mb-2">
    <!-- Mobile layout (default) -->
    <v-list-item class="px-0 py-2 d-sm-none">
      <template #prepend>
        <div class="d-flex flex-column justify-center mr-3">
          <span class="text-caption text-medium-emphasis">{{ formattedDate }}</span>
          <span class="font-weight-bold text-body-2">₦{{ formattedAmount }}</span>
        </div>
      </template>

      <template #append>
        <div class="d-flex align-center ga-2">
          <div class="d-flex flex-column align-end">
            <span class="text-body-2 font-weight-bold">{{ income.sender }}</span>
            <span class="text-caption text-medium-emphasis">{{ income.purpose }}</span>
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
                @click="emit('edit', income)"
              />
              <v-list-item
                prepend-icon="mdi-content-copy"
                title="Duplicate"
                @click="emit('duplicate', income)"
              />
              <v-list-item
                prepend-icon="mdi-delete-outline"
                title="Delete"
                base-color="error"
                @click="emit('delete', income)"
              />
            </v-list>
          </v-menu>
        </div>
      </template>
    </v-list-item>

    <!-- Tablet and above layout -->
    <v-row align="center" class="d-none d-sm-flex px-2 py-2">
      <v-col cols="3">
        <span class="text-caption text-medium-emphasis">{{ formattedDate }}</span>
      </v-col>
      <v-col cols="3">
        <span class="font-weight-bold text-body-2">₦{{ formattedAmount }}</span>
      </v-col>
      <v-col cols="3">
        <span class="text-body-2 font-weight-bold">{{ income.sender }}</span>
      </v-col>
      <v-col cols="2">
        <span class="text-caption text-medium-emphasis">{{ income.purpose }}</span>
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
              @click="emit('edit', income)"
            />
            <v-list-item
              prepend-icon="mdi-content-copy"
              title="Duplicate"
              @click="emit('duplicate', income)"
            />
            <v-list-item
              prepend-icon="mdi-delete-outline"
              title="Delete"
              base-color="error"
              @click="emit('delete', income)"
            />
          </v-list>
        </v-menu>
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { Income } from "@/stores/income.store";

const props = defineProps<{ income: Income }>();
const emit = defineEmits<{
  edit: [income: Income];
  delete: [income: Income];
  duplicate: [income: Income];
}>();

const formattedDate = computed(() =>
  new Date(props.income.date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })
);

const formattedAmount = computed(() =>
  Number(props.income.amount).toLocaleString("en-NG")
);
</script>
