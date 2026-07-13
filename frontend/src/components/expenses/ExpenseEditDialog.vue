<template>
  <v-dialog v-model="open" class="w-xs-75 w-sm-66" scrim="true">
    <v-container class="px-6 pb-5 pt-1 bg-light rounded-lg d-flex flex-column gap-3">
      <DialogHeaderComponent title="Edit Expense" v-model="open" />

      <v-form ref="formRef">
        <v-text-field
          v-model="form.date"
          variant="outlined"
          label="Date"
          type="date"
          density="comfortable"
          color="secondary"
        />
        <v-text-field
          v-model="form.amount"
          variant="outlined"
          label="Amount (₦)"
          type="number"
          step="1000"
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
          v-model="form.item"
          variant="outlined"
          label="Item"
          density="comfortable"
          color="secondary"
          :rules="[required]"
        />
        <v-text-field
          v-model="form.vendor"
          variant="outlined"
          label="Vendor (optional)"
          density="comfortable"
          color="secondary"
        />
        <v-checkbox
          v-model="form.isBill"
          label="This is a bill"
          color="secondary"
          density="comfortable"
          hide-details
          class="mb-2"
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
            :loading="expenseStore.isLoading"
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
import { useExpenseStore } from "@/stores/expense.store";
import type { Expense } from "@/stores/expense.store";
import DialogHeaderComponent from "@/components/shared/DialogHeaderComponent.vue";

const open = defineModel<boolean>({ required: true });
const props = defineProps<{ expense: Expense | null }>();
const emit = defineEmits<{ updated: [] }>();

const expenseStore = useExpenseStore();
const formRef = ref();

const form = reactive({
  date: "",
  amount: null as number | null,
  item: "",
  vendor: "",
  isBill: false,
  currency: "NGN",
});

const snackbar = reactive({ show: false, message: "", color: "success" });
const required = (v: any) => !!v || "This field is required";

function showSnackbar(message: string, color: string) {
  snackbar.message = message;
  snackbar.color = color;
  snackbar.show = true;
}

watch(
  () => props.expense,
  (expense) => {
    if (!expense) return;
    form.date = expense.date ? new Date(expense.date).toISOString().split("T")[0] : "";
    form.amount = expense.amount;
    form.item = expense.item;
    form.vendor = expense.vendor?.name ?? "";
    form.isBill = expense.isBill;
    form.currency = expense.currency ?? "NGN";
  },
  { immediate: true }
);

watch(open, (isOpen) => {
  if (!isOpen) {
    form.date = "";
    form.amount = null;
    form.item = "";
    form.vendor = "";
    form.isBill = false;
    form.currency = "NGN";
    snackbar.show = false;
  }
});


async function submit() {
  const { valid } = await formRef.value.validate();
  if (!valid || !props.expense) return;

  try {
    await expenseStore.updateExpense(props.expense._id, {
      date: form.date || null,
      amount: form.amount,
      item: form.item,
      vendor: form.vendor,
      isBill: form.isBill,
      currency: form.currency,
    });
    showSnackbar("Expense updated successfully!", "success");
    emit("updated");
    setTimeout(() => { open.value = false; }, 1000);
  } catch (err: any) {
    showSnackbar(err.message || "Failed to update expense.", "error");
  }
}
</script>