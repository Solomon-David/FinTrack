<template>
  <v-dialog v-model="open" class="w-xs-75 w-sm-66" scrim="true">
    <v-container
      class="px-6 pb-5 pt-1 bg-light rounded-lg d-flex flex-column gap-3 overflow-y-auto"
    >
      <DialogHeaderComponent title="Edit Plan" v-model="open" />

      <v-form ref="formRef">
        <v-text-field
          v-model="form.name"
          variant="outlined"
          label="Plan Name"
          density="comfortable"
          color="secondary"
          :rules="[required]"
        />

        <v-text-field
          v-model="form.description"
          variant="outlined"
          label="Description (optional)"
          density="comfortable"
          color="secondary"
        />

        <v-checkbox
          v-model="form.targetUnknown"
          label="Target amount is unknown"
          color="secondary"
          density="comfortable"
          hide-details
          class="mb-2"
        />

        <v-text-field
          v-if="!form.targetUnknown"
          v-model="form.targetAmount"
          variant="outlined"
          label="Target Amount (₦)"
          type="number"
          density="comfortable"
          color="secondary"
        />

        <v-text-field
          v-model="form.progress"
          variant="outlined"
          label="Amount Saved So Far (₦)"
          type="number"
          density="comfortable"
          color="secondary"
        />

        <v-text-field
          v-model="form.dueDate"
          variant="outlined"
          label="Due Date (optional)"
          type="date"
          density="comfortable"
          color="secondary"
        />

        <v-select
          v-model="form.status"
          :items="statusOptions"
          label="Status"
          variant="outlined"
          density="comfortable"
          color="secondary"
          hint="Leave on Auto to let it be derived from progress and due date"
          persistent-hint
        />
      </v-form>

      <v-row dense class="mt-2">
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
            :loading="planStore.isLoading"
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
import { usePlanStore } from "@/stores/plan.store";
import type { Plan } from "@/stores/plan.store";
import DialogHeaderComponent from "@/components/shared/DialogHeaderComponent.vue";

const open = defineModel<boolean>({ required: true });
const props = defineProps<{ plan: Plan | null }>();
const emit = defineEmits<{ updated: [] }>();

const planStore = usePlanStore();
const formRef = ref();

const statusOptions = ["Auto", "Completed", "In Progress", "Overdue"];

const form = reactive({
  name: "",
  description: "",
  targetUnknown: false,
  targetAmount: null as number | null,
  progress: null as number | null,
  dueDate: "",
  status: "Auto",
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
  () => props.plan,
  (plan) => {
    if (!plan) return;
    form.name = plan.name;
    form.description = plan.description ?? "";
    form.targetUnknown = plan.targetAmount === "Unknown";
    form.targetAmount = plan.targetAmount !== "Unknown" ? plan.targetAmount : null;
    form.progress = plan.progress;
    form.dueDate = plan.dueDate ? new Date(plan.dueDate).toISOString().split("T")[0] : "";
    form.status = plan.status ?? "Auto";
    form.currency = plan.currency ?? "NGN";
  },
  { immediate: true }
);

async function submit() {
  const { valid } = await formRef.value.validate();
  if (!valid || !props.plan) return;

  try {
    await planStore.updatePlan(props.plan._id, {
      name: form.name,
      description: form.description || undefined,
      progress: form.progress ?? 0,
      targetAmount: form.targetUnknown ? "Unknown" : form.targetAmount,
      dueDate: form.dueDate || null,
      // Only send an explicit status when the user picked something other
      // than "Auto" — otherwise let the backend re-derive it.
      status: form.status === "Auto" ? undefined : (form.status as Plan["status"]),
      currency: form.currency,
    });
    showSnackbar("Plan updated successfully!", "success");
    emit("updated");
    setTimeout(() => {
      open.value = false;
    }, 1000);
  } catch (err: any) {
    showSnackbar(err.message || "Failed to update plan.", "error");
  }
}
</script>