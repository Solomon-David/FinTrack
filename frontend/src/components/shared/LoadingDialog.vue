<template>
  <v-dialog model-value="true" max-width="320" persistent>
    <v-card rounded="lg" class="pa-6 d-flex flex-column align-center ga-4">
      <v-progress-circular indeterminate color="secondary" size="48" width="4" />
      <span class="text-body-2 text-medium-emphasis">Loading...</span>
    </v-card>
  </v-dialog>
</template>