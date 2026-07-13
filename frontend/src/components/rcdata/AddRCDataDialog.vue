<template>
  <v-dialog v-model="open" class="w-xs-75 w-sm-66" scrim="true">
    <v-container
      class="px-6 pb-5 pt-1 bg-light rounded-lg d-flex flex-column gap-3 overflow-y-auto"
    >
      <DialogHeaderComponent title="Record RC-Data" v-model="open" />

      <v-form>
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

          <!-- Type toggle -->
          <v-btn-toggle
            v-model="entry.type"
            mandatory
            color="secondary"
            rounded="lg"
            density="comfortable"
            class="mb-4 w-100"
          >
            <v-btn value="airtime" class="flex-grow-1">Airtime</v-btn>
            <v-btn value="data" class="flex-grow-1">Data</v-btn>
          </v-btn-toggle>

          <!-- Network -->
          <v-select
            v-model="entry.network"
            :items="networks"
            label="Network"
            variant="outlined"
            density="comfortable"
          />

          <!-- Sender -->
          <v-text-field
            v-model="entry.sender.name"
            variant="outlined"
            label="Sender Name"
            density="comfortable"
          />
          <v-text-field
            v-model="entry.sender.phone"
            variant="outlined"
            label="Sender Phone (optional)"
            density="comfortable"
          />

          <!-- Airtime amount -->
          <template v-if="entry.type === 'airtime'">
            <v-text-field
              v-model="entry.amount.amount"
              variant="outlined"
              label="Amount (₦)"
              type="number"
              step="100"
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
                    entry.amount.amount = entry.amount.amount
                      ? Number(entry.amount.amount) * 1000
                      : 1000
                  "
                >
                  000
                </v-btn>
              </template>
            </v-text-field>
          </template>

          <!-- Data amount -->
          <template v-else>
            <v-text-field
              v-model="entry.amount.amount"
              variant="outlined"
              label="Data Amount"
              type="number"
              step="1"
              density="comfortable"
            />
            <v-btn-toggle
              v-model="entry.amount.size"
              mandatory
              color="secondary"
              rounded="lg"
              density="comfortable"
              class="mb-4 w-100"
            >
              <v-btn value="MB" class="flex-grow-1">MB</v-btn>
              <v-btn value="GB" class="flex-grow-1">GB</v-btn>
            </v-btn-toggle>
          </template>

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
import { useRCDataStore } from "@/stores/rcdata.store";
import DialogHeaderComponent from "@/components/shared/DialogHeaderComponent.vue";
import type { RCDataEntry } from "@/types";

const props = defineProps<{ initialEntry?: Partial<RCDataEntry> }>();
const open = defineModel<boolean>({ required: true });

const userStore = useUserStore();
const rcDataStore = useRCDataStore();
const loading = ref(false);
const snackbar = reactive({ show: false, message: "", color: "success" });

const networks = ["MTN", "Airtel", "Glo", "9mobile"];

function createEntry(): RCDataEntry {
  return {
    date: props.initialEntry?.date ?? new Date().toISOString().split("T")[0],
    currency: props.initialEntry?.currency ?? userStore.user?.preferredCurrency ?? "NGN",
    sender: props.initialEntry?.sender ?? { name: "", phone: "" },
    amount: props.initialEntry?.amount ?? { amount: null, currency: "NGN", size: "GB" },
    type: props.initialEntry?.type ?? "airtime",
    network: props.initialEntry?.network ?? "MTN",
    remark: props.initialEntry?.remark ?? "",
  };
}

const entries = ref<RCDataEntry[]>([createEntry()]);

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
    await rcDataStore.addRCData(entries.value);
    showSnackbar(
      entries.value.length > 1
        ? `${entries.value.length} RC-Data records added successfully!`
        : "RC-Data added successfully!",
      "success"
    );
    setTimeout(() => {
      entries.value = [createEntry()];
      open.value = false;
    }, 1500);
  } catch (err: any) {
    showSnackbar(err.message || "Failed to add RC-Data.", "error");
  } finally {
    loading.value = false;
  }
}
</script>
