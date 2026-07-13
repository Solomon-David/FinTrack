<template>
  <v-dialog v-model="open" class="w-xs-75 w-sm-66" scrim="true">
    <v-container class="px-6 pb-5 pt-1 bg-light rounded-lg d-flex flex-column gap-3 overflow-y-auto">
      <DialogHeaderComponent title="Create Bill Type" v-model="open" />

      <v-form>
        <div v-for="(entry, index) in entries" :key="index" class="d-flex flex-column">
          <div v-if="entries.length > 1" class="d-flex align-center ga-2 mb-2">
            <v-divider />
          </div>

          <v-text-field
            v-model="entry.name"
            variant="outlined"
            label="Bill Name"
            density="comfortable"
          />

          <v-select
            v-model="entry.type"
            :items="types"
            label="Type"
            variant="outlined"
            density="comfortable"
          />

          <v-text-field
            v-model="entry.total"
            variant="outlined"
            label="Total Owed Per Cycle (₦)"
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
                @click="entry.total = entry.total ? Number(entry.total) * 1000 : 1000"
              >
                000
              </v-btn>
            </template>
          </v-text-field>

          <v-select
            v-model="entry.recurrence"
            :items="recurrences"
            label="Recurrence"
            variant="outlined"
            density="comfortable"
          />

          <v-row dense v-if="entry.recurrence !== 'One-time' && entry.recurrence !== 'Daily'">
            <v-col cols="12">
              <v-select
                v-if="entry.recurrence === 'Weekly'"
                v-model="entry.dueEvery"
                :items="weekDays"
                item-title="label"
                item-value="value"
                label="Due Every"
                variant="outlined"
                density="comfortable"
              />
              <v-text-field
                v-else-if="entry.recurrence === 'Monthly'"
                v-model.number="entry.dueEvery"
                type="number"
                min="1"
                max="31"
                label="Due Every (Day of Month)"
                variant="outlined"
                density="comfortable"
              />
              <v-select
                v-else-if="entry.recurrence === 'Yearly'"
                v-model="entry.dueEvery"
                :items="months"
                item-title="label"
                item-value="value"
                label="Due Every (Month)"
                variant="outlined"
                density="comfortable"
              />
            </v-col>
          </v-row>

          <v-text-field
            v-model="entry.remark"
            variant="outlined"
            label="Remark (optional)"
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

      <v-snackbar v-model="snackbar.show" :color="snackbar.color" rounded="lg" timeout="2500" location="bottom">
        {{ snackbar.message }}
      </v-snackbar>
    </v-container>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from "vue";
import { useUserStore } from "@/stores/users.stores";
import { useBillTypeStore } from "@/stores/billtype.store";
import DialogHeaderComponent from "@/components/shared/DialogHeaderComponent.vue";
import type { BillTypeEntry } from "@/types";

const props = defineProps<{ initialEntry?: Partial<BillTypeEntry> }>();
const open = defineModel<boolean>({ required: true });

const userStore = useUserStore();
const billTypeStore = useBillTypeStore();
const loading = ref(false);
const snackbar = reactive({ show: false, message: "", color: "success" });

const types = ["Electricity", "Accommodation", "Subscription", "Insurance", "Other"];
const recurrences = ["One-time", "Daily", "Weekly", "Monthly", "Yearly"];
const weekDays = [
  { label: "Sunday", value: 0 }, { label: "Monday", value: 1 }, { label: "Tuesday", value: 2 },
  { label: "Wednesday", value: 3 }, { label: "Thursday", value: 4 }, { label: "Friday", value: 5 },
  { label: "Saturday", value: 6 },
];
const months = [
  { label: "January", value: 1 }, { label: "February", value: 2 }, { label: "March", value: 3 },
  { label: "April", value: 4 }, { label: "May", value: 5 }, { label: "June", value: 6 },
  { label: "July", value: 7 }, { label: "August", value: 8 }, { label: "September", value: 9 },
  { label: "October", value: 10 }, { label: "November", value: 11 }, { label: "December", value: 12 },
];

function createEntry(): BillTypeEntry {
  return {
    name: props.initialEntry?.name ?? "",
    type: props.initialEntry?.type ?? "Other",
    total: props.initialEntry?.total ?? null,
    currency: props.initialEntry?.currency ?? userStore.user?.preferredCurrency ?? "NGN",
    recurrence: props.initialEntry?.recurrence ?? "Monthly",
    dueEvery: props.initialEntry?.dueEvery,
    remark: props.initialEntry?.remark ?? "",
  };
}

const entries = ref<BillTypeEntry[]>([createEntry()]);

watch(
  () => [open.value, props.initialEntry],
  ([isOpen]) => { 
    if (isOpen) entries.value = [createEntry()];
    else {
      entries.value = [createEntry()];
      snackbar.show = false;
    }
  }
);


function addEntry() { entries.value.push(createEntry()); }
function removeEntry(index: number) { if (entries.value.length > 1) entries.value.splice(index, 1); }

function showSnackbar(message: string, color: string) {
  snackbar.message = message; snackbar.color = color; snackbar.show = true;
}

async function submit() {
  loading.value = true;
  try {
    await billTypeStore.addBillType(entries.value);
    showSnackbar(
      entries.value.length > 1 ? `${entries.value.length} bill types created!` : "Bill type created!",
      "success"
    );
    setTimeout(() => {
      entries.value = [createEntry()];
      open.value = false;
    }, 1500);
  } catch (err: any) {
    showSnackbar(err.message || "Failed to create bill type.", "error");
  } finally {
    loading.value = false;
  }
}
</script>