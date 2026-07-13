<template>
  <v-dialog v-model="open" class="w-xs-75 w-sm-66 h-100" scrim="true">
    <v-container
      class="px-6 pb-5 pt-1 bg-light rounded-lg d-flex flex-column gap-3 overflow-y-auto"
    >
      <!-- Header -->
      <DialogHeaderComponent title="Add Income" v-model="open" />
      <v-form>
        <!-- Income Forms -->
        <div v-for="(entry, index) in entries" :key="index" class="d-flex flex-column">
          <div v-if="entries.length > 1" class="d-flex align-center ga-2 mb-2">
            <v-divider />
          </div>

          <v-text-field
            v-model="entry.date"
            variant="outlined"
            label="Date"
            type="date"
            density="comfortable"
          />
          <v-text-field
            v-model="entry.amount"
            variant="outlined"
            label="Amount (₦)"
            type="number"
            step="1000"
            density="comfortable"
          >
            <template #append-inner>
              <v-btn
                size="x-small"
                variant="tonal"
                color="secondary"
                rounded="lg"
                class="text-caption font-weight-bold"
                @click="
                  entry.amount =
                    (entry.amount || 0) * 1000 === 0 ? 1000 : Number(entry.amount) * 1000
                "
              >
                000
              </v-btn>
            </template>
          </v-text-field>
          <!-- Sender Field -->
          <v-text-field
            v-model="entry.sender"
            variant="outlined"
            label="Sender"
            density="comfortable"
          />
          <v-text-field
            v-model="entry.purpose"
            variant="outlined"
            label="Purpose (optional)"
            density="comfortable"
          />

          <!-- Minus button — hidden on first entry if only one exists -->
          <div v-if="entries.length > 1" class="d-flex justify-center mb-2">
            <v-btn
              icon="mdi-minus"
              variant="outlined"
              color="error"
              size="small"
              rounded="lg"
              @click="removeEntry(index)"
            />
          </div>
        </div>
      </v-form>

      <!-- Plus button -->
      <div class="d-flex justify-center">
        <v-btn
          icon="mdi-plus"
          variant="outlined"
          color="secondary"
          size="small"
          rounded="lg"
          @click="addEntry"
        />
      </div>

      <!-- Submit -->
      <v-btn
        color="secondary"
        variant="flat"
        block
        rounded="lg"
        height="44"
        class="font-weight-bold text-none mt-2"
        :loading="loading"
        @click="submit"
      >
        {{ entries.length > 1 ? `Submit (${entries.length})` : `Submit` }}
      </v-btn>

      <!-- Snackbar -->
      <v-snackbar
        v-model="snackbar.show"
        :color="snackbar.color"
        rounded="lg"
        timeout="2500"
        location="bottom"
      >
        {{ snackbar.message }}
      </v-snackbar>
    </v-container>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from "vue";
import { useUserStore } from "@/stores/users.stores";
import { useIncomeStore as IncomeStore } from "@/stores/income.store";
import DialogHeaderComponent from "@/components/shared/DialogHeaderComponent.vue";
import type { IncomeEntry } from "@/types";

const snackbar = reactive({ show: false, message: "", color: "success" });

function showSnackbar(message: string, color: string) {
  snackbar.message = message;
  snackbar.color = color;
  snackbar.show = true;
}

const props = defineProps<{
  initialEntry?: Partial<IncomeEntry>;
}>();
const open = defineModel<boolean>({ required: true });
const userStore = useUserStore();
const incomeStore = IncomeStore();
const loading = ref(false);

function createEntry(): IncomeEntry {
  return {
    _id: "",
    userId: userStore.user?.id || "",
    date: props.initialEntry?.date ?? new Date().toISOString().split("T")[0],
    amount: props.initialEntry?.amount ?? null,
    sender: props.initialEntry?.sender ?? "",
    purpose: props.initialEntry?.purpose ?? "",
  };
}

const entries = ref<IncomeEntry[]>([createEntry()]);

function resetEntries() {
  entries.value = [createEntry()];
}

watch(
  () => [open.value, props.initialEntry],
  ([isOpen]) => {
    if (isOpen) {
      resetEntries();
    } else {
      resetEntries();
      snackbar.show = false;
    }
  }
);


function addEntry() {
  entries.value.push(createEntry());
}

function removeEntry(index: number) {
  if (entries.value.length > 1) {
    entries.value.splice(index, 1);
  }
}

async function submit() {
  loading.value = true;
  try {
    await incomeStore.addIncome(entries.value);
    showSnackbar(
      entries.value.length > 1
        ? `${entries.value.length} income records added successfully!`
        : "Income added successfully!",
      "success"
    );
    setTimeout(() => {
      entries.value = [createEntry()];
      open.value = false;
    }, 1500);
  } catch (err: any) {
    showSnackbar(err.message || "Failed to add income.", "error");
  } finally {
    loading.value = false;
  }
}
</script>
