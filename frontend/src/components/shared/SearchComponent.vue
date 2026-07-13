<template>
  <div
    class="d-flex align-center ga-2 px-none py-none mx-auto bg-grey-blue rounded-xl w-xs-50 w-md-75"
  >
    <!-- Filter dropdown -->
    <v-menu v-model="filterMenu" :close-on-content-click="false">
      <template #activator="{ props: menuProps }">
        <v-btn
          color="light"
          variant="tonal"
          rounded="xl"
          size="large"
          append-icon="mdi-menu-down"
          class="text-none bg-secondary my-none mx-none"
          style="min-width: 100px"
          v-bind="menuProps"
        >
          {{ selectedFilter || filters[0] }}
        </v-btn>
      </template>
      <v-list density="compact" rounded="lg" min-width="140">
        <v-list-item
          v-for="filter in filters"
          :key="filter"
          :title="filter"
          :active="selectedFilter === filter"
          color="secondary"
          rounded="lg"
          @click="selectFilter(filter)"
        />
      </v-list>
    </v-menu>

    <!-- Search field -->
    <v-text-field
      v-model="searchQuery"
      placeholder="Search"
      variant="flat"
      density="comfortable"
      rounded="xl"
      hide-details
      class="flex-grow-1"
      append-inner-icon="mdi-magnify"
      @update:model-value="onSearch"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
  filters: string[];
  onSearchFn: (query: string, filter: string) => void;
}>();

const filterMenu = ref(false);
const selectedFilter = ref(props.filters[0]);
const searchQuery = ref("");

function selectFilter(filter: string) {
  selectedFilter.value = filter;
  filterMenu.value = false;
  onSearch();
}

function onSearch() {
  props.onSearchFn(searchQuery.value, selectedFilter.value);
}
</script>
