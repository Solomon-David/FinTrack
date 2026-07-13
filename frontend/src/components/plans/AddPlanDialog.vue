<template>
  <v-dialog v-model="open" class="w-xs-75 w-sm-66" scrim="true">
    <v-container
      class="px-6 pb-5 pt-1 bg-light rounded-lg d-flex flex-column gap-3 overflow-y-auto"
    >
      <DialogHeaderComponent title="Create A Plan" v-model="open" />

      <v-form>
        <div v-for="(entry, index) in entries" :key="index" class="d-flex flex-column">
          <div v-if="entries.length > 1" class="d-flex align-center ga-2 mb-2">
            <v-divider />
          </div>

          <v-text-field
            v-model="entry.name"
            variant="outlined"
            label="Plan Name"
            density="comfortable"
          />

          <v-text-field
            v-model="entry.description"
            variant="outlined"
            label="Description (optional)"
            density="comfortable"
          />

          <v-checkbox
            v-model="entry.targetUnknown"
            label="Target amount is unknown"
            color="secondary"
            density="comfortable"
            hide-details
            class="mb-2"
          />

          <v-text-field
            v-if="!entry.targetUnknown"
            v-model="entry.targetAmount"
            variant="outlined"
            label="Target Amount (₦)"
            type="number"
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
                  entry.targetAmount = entry.targetAmount
                    ? Number(entry.targetAmount) * 1000
                    : 1000
                "
              >
                000
              </v-btn>
            </template>
          </v-text-field>

          <v-text-field
            v-model="entry.progress"
            variant="outlined"
            label="Amount Saved So Far (₦)"
            type="number"
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
                  entry.progress = entry.progress ? Number(entry.progress) * 1000 : 1000
                "
              >
                000
              </v-btn>
            </template>
          </v-text-field>

          <v-text-field
            v-model="entry.dueDate"
            variant="outlined"
            label="Due Date (optional)"
            type="date"
            density="comfortable"
          />

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
import { usePlanStore } from "@/stores/plan.store";
import DialogHeaderComponent from "@/components/shared/DialogHeaderComponent.vue";
import type { PlanEntry } from "@/types";

const props = defineProps<{ initialEntry?: Partial<PlanEntry> }>();
const open = defineModel<boolean>({ required: true });

const userStore = useUserStore();
const planStore = usePlanStore();
const loading = ref(false);
const snackbar = reactive({ show: false, message: "", color: "success" });

// Local form-row shape — mirrors PlanEntry but keeps a boolean toggle for
// "Unknown" target amount so the number field and checkbox can coexist.
interface PlanFormEntry {
  name: string;
  description: string;
  targetUnknown: boolean;
  targetAmount: number | null;
  progress: number | null;
  dueDate: string;
  currency: string;
}

function createEntry(): PlanFormEntry {
  return {
    name: props.initialEntry?.name ?? "",
    description: props.initialEntry?.description ?? "",
    targetUnknown: props.initialEntry?.targetAmount === "Unknown",
    targetAmount:
      props.initialEntry?.targetAmount && props.initialEntry.targetAmount !== "Unknown"
        ? props.initialEntry.targetAmount
        : null,
    progress: props.initialEntry?.progress ?? 0,
    dueDate: props.initialEntry?.dueDate ?? "",
    currency: props.initialEntry?.currency ?? userStore.user?.preferredCurrency ?? "NGN",
  };
}

const entries = ref<PlanFormEntry[]>([createEntry()]);

watch(
  () => [open.value, props.initialEntry],
  ([isOpen]) => {
    if (isOpen) entries.value = [createEntry()];
  }
);

function addEntry() {
  entries.value.push(createEntry());
}

function removeEntry(index: number) {
  if (entries.value.length > 1) entries.value.splice(index, 1);
}

function showSnackbar(message: string, color: string) {
  snackbar.message = message;
  snackbar.color = color;
  snackbar.show = true;
}

async function submit() {
  loading.value = true;
  try {
    const payload: PlanEntry[] = entries.value.map((entry) => ({
      name: entry.name,
      description: entry.description || undefined,
      progress: entry.progress ?? 0,
      targetAmount: entry.targetUnknown ? "Unknown" : entry.targetAmount,
      dueDate: entry.dueDate || null,
      currency: entry.currency,
    }));

    await planStore.addPlan(payload);
    showSnackbar(
      entries.value.length > 1
        ? `${entries.value.length} plans created successfully!`
        : "Plan created successfully!",
      "success"
    );
    setTimeout(() => {
      entries.value = [createEntry()];
      open.value = false;
    }, 1500);
  } catch (err: any) {
    showSnackbar(err.message || "Failed to create plan.", "error");
  } finally {
    loading.value = false;
  }
}
</script>