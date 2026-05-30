<template>
  <v-dialog v-model="open" class="w-xs-75 w-sm-66" scrim="true">
    <v-container
      class="px-6 pb-5 pt-1 bg-light rounded-lg d-flex flex-column overflow-y-auto gap-3"
    >
      <DialogHeaderComponent title="Edit RC-Data" v-model="open" />

      <v-form ref="formRef">
        <v-text-field
          v-model="form.date"
          variant="outlined"
          label="Date"
          type="date"
          density="comfortable"
          color="secondary"
        />

        <v-btn-toggle
          v-model="form.type"
          mandatory
          color="secondary"
          rounded="lg"
          density="comfortable"
          class="mb-4 w-100"
        >
          <v-btn value="airtime" class="flex-grow-1">Airtime</v-btn>
          <v-btn value="data" class="flex-grow-1">Data</v-btn>
        </v-btn-toggle>

        <v-select
          v-model="form.network"
          :items="networks"
          label="Network"
          variant="outlined"
          density="comfortable"
          color="secondary"
        />

        <v-text-field
          v-model="form.senderName"
          variant="outlined"
          label="Sender Name"
          density="comfortable"
          color="secondary"
          :rules="[required]"
        />
        <v-text-field
          v-model="form.senderPhone"
          variant="outlined"
          label="Sender Phone (optional)"
          density="comfortable"
          color="secondary"
        />

        <template v-if="form.type === 'airtime'">
          <v-text-field
            v-model="form.amountValue"
            variant="outlined"
            label="Amount (₦)"
            type="number"
            density="comfortable"
            color="secondary"
            :rules="[required]"
          >
            <template #append-inner>
              <v-btn
                size="x-small"
                variant="tonal"
                color="secondary"
                rounded="lg"
                class="text-caption font-weight-bold"
                @click="
                  form.amountValue = form.amountValue
                    ? Number(form.amountValue) * 1000
                    : 1000
                "
              >
                000
              </v-btn>
            </template>
          </v-text-field>
        </template>

        <template v-else>
          <v-text-field
            v-model="form.amountValue"
            variant="outlined"
            label="Data Amount"
            type="number"
            density="comfortable"
            color="secondary"
            :rules="[required]"
          />
          <v-btn-toggle
            v-model="form.size"
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
          v-model="form.remark"
          variant="outlined"
          label="Remark (optional)"
          density="comfortable"
          color="secondary"
        />
      </v-form>

      <v-row dense>
        <v-col cols="6">
          <v-btn
            variant="tonal"
            color="error"
            block
            rounded="lg"
            height="44"
            class="text-none"
            @click="open = false"
          >
            Cancel
          </v-btn>
        </v-col>
        <v-col cols="6">
          <v-btn
            color="secondary"
            variant="flat"
            block
            rounded="lg"
            height="44"
            class="font-weight-bold text-none"
            :loading="rcDataStore.isLoading"
            @click="submit"
          >
            Save
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-dialog>

  <v-snackbar v-model="snackbar.show" :color="snackbar.color" rounded="lg" timeout="3000">
    {{ snackbar.message }}
  </v-snackbar>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from "vue";
import { useRCDataStore } from "@/stores/rcdata.store";
import type { RCData } from "@/stores/rcdata.store";
import DialogHeaderComponent from "@/components/shared/DialogHeaderComponent.vue";

const open = defineModel<boolean>({ required: true });
const props = defineProps<{ record: RCData | null }>();
const emit = defineEmits<{ updated: [] }>();

const rcDataStore = useRCDataStore();
const formRef = ref();
const networks = ["MTN", "Airtel", "Glo", "9mobile"];

const form = reactive({
  date: "",
  type: "airtime" as "airtime" | "data",
  network: "MTN" as "MTN" | "Airtel" | "Glo" | "9mobile",
  senderName: "",
  senderPhone: "",
  amountValue: null as number | null,
  size: "GB" as "GB" | "MB",
  currency: "NGN",
  remark: "",
});

const snackbar = reactive({ show: false, message: "", color: "success" });
const required = (v: any) => !!v || "This field is required";

function showSnackbar(message: string, color: string) {
  snackbar.message = message;
  snackbar.color = color;
  snackbar.show = true;
}

watch(
  () => props.record,
  (record) => {
    if (!record) return;
    form.date = record.date ? new Date(record.date).toISOString().split("T")[0] : "";
    form.type = record.type;
    form.network = record.network;
    form.senderName = record.sender.name;
    form.senderPhone = record.sender.phone ?? "";
    form.amountValue = record.amount.amount;
    form.size = record.amount.size ?? "GB";
    form.currency = record.currency ?? "NGN";
    form.remark = record.remark ?? "";
  },
  { immediate: true }
);

async function submit() {
  const { valid } = await formRef.value.validate();
  if (!valid || !props.record) return;

  try {
    await rcDataStore.updateRCData(props.record._id, {
      date: form.date || null,
      currency: form.currency,
      sender: { name: form.senderName, phone: form.senderPhone },
      amount: {
        amount: form.amountValue,
        currency: form.type === "airtime" ? form.currency : undefined,
        size: form.type === "data" ? form.size : undefined,
      },
      type: form.type,
      network: form.network,
      remark: form.remark,
    });
    showSnackbar("RC-Data updated successfully!", "success");
    emit("updated");
    setTimeout(() => {
      open.value = false;
    }, 1000);
  } catch (err: any) {
    showSnackbar(err.message || "Failed to update RC-Data.", "error");
  }
}
</script>
