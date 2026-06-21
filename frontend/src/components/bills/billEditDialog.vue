<template>
  <v-dialog v-model="open" class="w-xs-75 w-sm-66" scrim="true">
    <v-container
      class="px-6 pb-5 pt-1 bg-light rounded-lg d-flex flex-column gap-3 overflow-y-auto"
    >
      <DialogHeaderComponent title="Edit Bill" v-model="open" />

      <v-form ref="formRef">
        <v-text-field
          v-model="form.name"
          variant="outlined"
          label="Bill Name"
          density="comfortable"
          color="secondary"
          :rules="[required]"
        />

        <v-select
          v-model="form.type"
          :items="types"
          label="Type"
          variant="outlined"
          density="comfortable"
          color="secondary"
        />

        <v-text-field
          v-model="form.amount"
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
              @click="form.amount = form.amount ? Number(form.amount) * 1000 : 1000"
            >
              000
            </v-btn>
          </template>
        </v-text-field>

        <v-text-field
          v-model="form.total"
          variant="outlined"
          label="Total Owed (₦)"
          type="number"
          density="comfortable"
          color="secondary"
          :rules="[required]"
        />
        <v-row dense>
          <v-col cols="6">
            <v-text-field
              v-model="form.date"
              variant="outlined"
              label="Date"
              type="date"
              density="comfortable"
              color="secondary"
            />
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="form.dueDate"
              variant="outlined"
              label="Due Date (optional)"
              type="date"
              density="comfortable"
              color="secondary"
            />
          </v-col>
        </v-row>

        <v-select
          v-model="form.recurrence"
          :items="recurrences"
          label="Recurrence"
          variant="outlined"
          density="comfortable"
          color="secondary"
        />

        <v-text-field
          v-model="form.remark"
          variant="outlined"
          label="Remark"
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
            :loading="billStore.isLoading"
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
import { useBillStore } from "@/stores/bill.store";
import type { Bill } from "@/stores/bill.store";
import DialogHeaderComponent from "@/components/shared/DialogHeaderComponent.vue";

const open = defineModel<boolean>({ required: true });
const props = defineProps<{ bill: Bill | null }>();
const emit = defineEmits<{ updated: [] }>();

const billStore = useBillStore();
const formRef = ref();

const types = [
  "Electricity",
  "Accommodation",
  "Subscription",
  "Insurance",
  "Utility",
  "Other",
];
const statuses = ["Paid", "Part", "Unpaid", "Overdue"];
const recurrences = ["One-time", "Daily", "Weekly", "Monthly", "Yearly"];

const form = reactive({
  date: "",
  amount: null as number | null,
  currency: "NGN",
  type: "Other" as
    | "Electricity"
    | "Accommodation"
    | "Subscription"
    | "Insurance"
    | "Utility"
    | "Other",
  name: "",
  status: "Unpaid" as "Paid" | "Part" | "Unpaid" | "Overdue",
  recurrence: "Monthly" as "One-time" | "Daily" | "Weekly" | "Monthly" | "Yearly",
  dueDate: "",
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
  () => props.bill,
  (bill) => {
    if (!bill) return;
    form.date = bill.date ? new Date(bill.date).toISOString().split("T")[0] : "";
    form.amount = bill.amount;
    form.currency = bill.currency ?? "NGN";
    form.type = bill.type;
    form.name = bill.name;
    form.status = bill.status;
    form.recurrence = bill.recurrence;
    form.dueDate = bill.dueDate ? new Date(bill.dueDate).toISOString().split("T")[0] : "";
    form.remark = bill.remark;
  },
  { immediate: true }
);

async function submit() {
  const { valid } = await formRef.value.validate();
  if (!valid || !props.bill) return;

  try {
    await billStore.updateBill(props.bill._id, {
      date: form.date || null,
      amount: form.amount,
      currency: form.currency,
      type: form.type,
      name: form.name,
      status: form.status,
      recurrence: form.recurrence,
      dueDate: form.dueDate || null,
      remark: form.remark,
    });
    showSnackbar("Bill updated successfully!", "success");
    emit("updated");
    setTimeout(() => {
      open.value = false;
    }, 1000);
  } catch (err: any) {
    showSnackbar(err.message || "Failed to update bill.", "error");
  }
}
</script>
