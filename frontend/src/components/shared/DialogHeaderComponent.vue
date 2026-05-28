<template>
  <div class="d-flex flex-column align-center justify-end gap-1 pb-6 pt-3">
    <v-btn icon size="sm" variant="text" class="align-self-end" @click="open = false">
      <v-icon>mdi-close</v-icon>
    </v-btn>
    <span class="text-h5 font-weight-bold pb-3">{{ title }}</span>
    <v-divider class="w-100" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string;
}>();

const open = defineModel<boolean>({ required: true });
</script>
