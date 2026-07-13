<template>
  <v-dialog v-model="open" class="w-xs-75 w-sm-66" scrim="true">
    <v-container class="px-6 pb-5 pt-1 bg-light rounded-lg d-flex flex-column gap-3">
      <!-- Header -->
      <DialogHeaderComponent title="Edit Income" v-model="open" />

      <!-- Form -->
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
          v-model="form.sender"
          variant="outlined"
          label="Sender"
          density="comfortable"
          color="secondary"
          :rules="[required]"
        />
        <v-text-field
          v-model="form.purpose"
          variant="outlined"
          label="Purpose (optional)"
          density="comfortable"
          color="secondary"
        />
      </v-form>

      <!-- Actions -->
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
            :loading="incomeStore.isLoading"
            @click="submit"
          >
            Save
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-dialog>

  <!-- Snackbar — outside v-dialog so it renders above it -->
  <v-snackbar v-model="snackbar.show" :color="snackbar.color" rounded="lg" timeout="3000">
    {{ snackbar.message }}
  </v-snackbar>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from "vue";
import { useIncomeStore } from "@/stores/income.store";
import type { Income } from "@/stores/income.store";
import DialogHeaderComponent from "@/components/shared/DialogHeaderComponent.vue";

const open = defineModel<boolean>({ required: true });
const props = defineProps<{ income: Income | null }>();
const emit = defineEmits<{ updated: [] }>();

const incomeStore = useIncomeStore();
const formRef = ref();

const form = reactive({
  date: "",
  amount: null as number | null,
  sender: "",
  purpose: "",
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
  () => props.income,
  (income) => {
    if (!income) return;
    form.date = income.date ? new Date(income.date).toISOString().split("T")[0] : "";
    form.amount = income.amount;
    form.sender = income.sender;
    form.purpose = income.purpose ?? "";
    form.currency = income.currency ?? "NGN";
  },
  { immediate: true }
);

watch(open, (isOpen) => {
  if (!isOpen) {
    form.date = "";
    form.amount = null;
    form.sender = "";
    form.purpose = "";
    form.currency = "NGN";
    snackbar.show = false;
  }
});


async function submit() {
  const { valid } = await formRef.value.validate();
  if (!valid || !props.income) return;

  try {
    await incomeStore.updateIncome(props.income._id, {
      date: form.date || null,
      amount: form.amount,
      sender: form.sender,
      purpose: form.purpose,
      currency: form.currency,
    });
    showSnackbar("Income updated successfully!", "success");
    emit("updated");
    setTimeout(() => {
      open.value = false;
    }, 1000);
  } catch (err: any) {
    showSnackbar(err.message || "Failed to update income.", "error");
  }
}
</script>
