<template>
  <v-container fluid class="pa-4">
    <!-- Theme Section -->
    <v-card variant="outlined" rounded="lg" class="pa-4 mb-4">
      <div class="d-flex align-center ga-2 mb-3">
        <v-icon color="secondary">mdi-theme-light-dark</v-icon>
        <span class="text-body-1 font-weight-bold">Theme</span>
      </div>
      <p class="text-caption text-medium-emphasis mb-4">
        Choose how FinTrack looks on this device.
      </p>

      <v-row dense>
        <v-col cols="6">
          <v-card
            variant="outlined"
            rounded="lg"
            class="pa-4 d-flex flex-column align-center ga-2 cursor-pointer"
            :class="{
              'border-secondary border-opacity-100': selectedTheme === 'mainTheme',
            }"
            :style="selectedTheme === 'mainTheme' ? 'border-width: 2px' : ''"
            @click="selectTheme('mainTheme')"
          >
            <v-icon
              size="32"
              :color="selectedTheme === 'mainTheme' ? 'secondary' : 'grey'"
            >
              mdi-white-balance-sunny
            </v-icon>
            <span class="text-body-2 font-weight-medium">Light</span>
          </v-card>
        </v-col>
        <v-col cols="6">
          <v-card
            variant="outlined"
            rounded="lg"
            class="pa-4 d-flex flex-column align-center ga-2 cursor-pointer"
            :class="{
              'border-secondary border-opacity-100': selectedTheme === 'darkTheme',
            }"
            :style="selectedTheme === 'darkTheme' ? 'border-width: 2px' : ''"
            @click="selectTheme('darkTheme')"
          >
            <v-icon
              size="32"
              :color="selectedTheme === 'darkTheme' ? 'secondary' : 'grey'"
            >
              mdi-weather-night
            </v-icon>
            <span class="text-body-2 font-weight-medium">Dark</span>
          </v-card>
        </v-col>
      </v-row>
    </v-card>

    <!-- Currency Section -->
    <v-card variant="outlined" rounded="lg" class="pa-4 mb-4">
      <div class="d-flex align-center ga-2 mb-3">
        <v-icon color="secondary">mdi-cash-multiple</v-icon>
        <span class="text-body-1 font-weight-bold">Currency</span>
      </div>
      <p class="text-caption text-medium-emphasis mb-4">
        Sets the default currency used when recording new entries. Existing records keep
        the currency they were saved with.
      </p>

      <v-select
        v-model="selectedCurrency"
        :items="currencies"
        item-title="label"
        item-value="code"
        label="Preferred Currency"
        variant="outlined"
        density="comfortable"
        color="secondary"
      />
    </v-card>

    <!-- Save -->
    <v-btn
      color="secondary"
      variant="flat"
      block
      rounded="lg"
      height="44"
      class="font-weight-bold text-none"
      :loading="userStore.isLoading"
      :disabled="!hasChanges"
      @click="save"
    >
      Save Preferences
    </v-btn>

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
import { ref, reactive, computed, onMounted } from "vue";
import { useTheme } from "vuetify";
import { useUserStore } from "@/stores/users.stores";

const userStore = useUserStore();
const theme = useTheme();

const currencies = [
  { code: "NGN", label: "Nigerian Naira (₦)" },
  { code: "USD", label: "US Dollar ($)" },
  { code: "EUR", label: "Euro (€)" },
  { code: "GBP", label: "British Pound (£)" },
  { code: "GHS", label: "Ghanaian Cedi (₵)" },
  { code: "KES", label: "Kenyan Shilling (KSh)" },
  { code: "ZAR", label: "South African Rand (R)" },
  { code: "CAD", label: "Canadian Dollar (C$)" },
];

const selectedTheme = ref<"mainTheme" | "darkTheme">("mainTheme");
const selectedCurrency = ref("NGN");

// Track the originally-loaded values so the Save button can stay disabled
// until something actually changes.
const originalTheme = ref<"mainTheme" | "darkTheme">("mainTheme");
const originalCurrency = ref("NGN");

const snackbar = reactive({ show: false, message: "", color: "success" });

const hasChanges = computed(
  () =>
    selectedTheme.value !== originalTheme.value ||
    selectedCurrency.value !== originalCurrency.value
);

onMounted(() => {
  const user = userStore.user;
  const initialTheme = (user?.preferredTheme as "mainTheme" | "darkTheme") ?? "mainTheme";
  const initialCurrency = user?.preferredCurrency ?? "NGN";

  selectedTheme.value = initialTheme;
  originalTheme.value = initialTheme;
  selectedCurrency.value = initialCurrency;
  originalCurrency.value = initialCurrency;
});

// Applies immediately for live preview, and remembers the choice locally
// so a page reload doesn't flash back to the old theme before the saved
// preference round-trips through the backend.
function selectTheme(name: "mainTheme" | "darkTheme") {
  selectedTheme.value = name;
  //   theme.global.name.value = name;
  theme.change(name);
  localStorage.setItem("fintrack-theme", name);
}

function showSnackbar(message: string, color: string) {
  snackbar.message = message;
  snackbar.color = color;
  snackbar.show = true;
}

async function save() {
  try {
    await userStore.updateProfile({
      preferredTheme: selectedTheme.value,
      preferredCurrency: selectedCurrency.value,
    });
    originalTheme.value = selectedTheme.value;
    originalCurrency.value = selectedCurrency.value;
    showSnackbar("Preferences saved!", "success");
  } catch (err: any) {
    showSnackbar(err.message || "Failed to save preferences.", "error");
  }
}
</script>
