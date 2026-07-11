<template>
  <v-dialog v-model="open" class="w-xs-75 w-sm-66" scrim="true">
    <v-container class="px-6 pb-5 pt-1 bg-light rounded-lg d-flex flex-column gap-3">
      <DialogHeaderComponent title="Edit Bill Type" v-model="open" />

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
          v-model="form.total"
          variant="outlined"
          label="Total Owed Per Cycle (₦)"
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
              @click="form.total = form.total ? Number(form.total) * 1000 : 1000"
            >
              000
            </v-btn>
          </template>
        </v-text-field>

        <v-select
          v-model="form.recurrence"
          :items="recurrences"
          label="Recurrence"
          variant="outlined"
          density="comfortable"
          color="secondary"
        />

        <v-row dense v-if="form.recurrence !== 'One-time' && form.recurrence !== 'Daily'">
          <v-col cols="12">
            <v-select
              v-if="form.recurrence === 'Weekly'"
              v-model="form.dueEvery"
              :items="weekDays"
              item-title="label"
              item-value="value"
              label="Due Every"
              variant="outlined"
              density="comfortable"
              color="secondary"
            />
            <v-text-field
              v-else-if="form.recurrence === 'Monthly'"
              v-model.number="form.dueEvery"
              type="number"
              min="1"
              max="31"
              label="Due Every (Day of Month)"
              variant="outlined"
              density="comfortable"
              color="secondary"
            />
            <v-select
              v-else-if="form.recurrence === 'Yearly'"
              v-model="form.dueEvery"
              :items="months"
              item-title="label"
              item-value="value"
              label="Due Every (Month)"
              variant="outlined"
              density="comfortable"
              color="secondary"
            />
          </v-col>
        </v-row>

        <!-- Manual overdue toggle -->
        <v-checkbox
          v-model="form.markOverdue"
          label="Manually mark as Overdue"
          color="error"
          density="comfortable"
          hide-details
          class="mb-2"
        />

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
          <v-btn variant="tonal" color="error" block rounded="lg" height="44" class="text-none" @click="open = false">
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
            :loading="billTypeStore.isLoading"
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
import { useBillTypeStore } from "@/stores/billtype.store";
import type { BillType } from "@/stores/billtype.store";
import DialogHeaderComponent from "@/components/shared/DialogHeaderComponent.vue";

const open = defineModel<boolean>({ required: true });
const props = defineProps<{ bill: BillType | null }>();
const emit = defineEmits<{ updated: [] }>();

const billTypeStore = useBillTypeStore();
const formRef = ref();

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

const form = reactive({
  name: "",
  type: "Other" as "Electricity" | "Accommodation" | "Subscription" | "Insurance" | "Other",
  total: null as number | null,
  currency: "NGN",
  recurrence: "Monthly" as "One-time" | "Daily" | "Weekly" | "Monthly" | "Yearly",
  dueEvery: undefined as number | undefined,
  remark: "",
  markOverdue: false,
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
    form.name = bill.name;
    form.type = bill.type;
    form.total = bill.total;
    form.currency = bill.currency ?? "NGN";
    form.recurrence = bill.recurrence;
    form.dueEvery = bill.dueEvery;
    form.remark = bill.remark ?? "";
    form.markOverdue = bill.status === "Overdue";
  },
  { immediate: true }
);

async function submit() {
  const { valid } = await formRef.value.validate();
  if (!valid || !props.bill) return;

  try {
    await billTypeStore.updateBillType(props.bill._id, {
      name: form.name,
      type: form.type,
      total: form.total,
      currency: form.currency,
      recurrence: form.recurrence,
      dueEvery: form.dueEvery,
      remark: form.remark,
      status: form.markOverdue ? "Overdue" : undefined,
    });
    showSnackbar("Bill type updated successfully!", "success");
    emit("updated");
    setTimeout(() => { open.value = false; }, 1000);
  } catch (err: any) {
    showSnackbar(err.message || "Failed to update bill type.", "error");
  }
}
</script>