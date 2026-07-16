<template>
  <v-dialog v-model="open" class="w-xs-75 w-sm-66" scrim="true">
    <v-container class="px-6 pb-5 pt-1 bg-light rounded-lg d-flex flex-column gap-3">
      <DialogHeaderComponent title="Update Plan" v-model="open" />

      <div class="mb-2" v-if="plan">
        <div class="font-weight-bold text-body-1">{{ plan.name }}</div>
        <div class="text-caption text-medium-emphasis">
          Currently saved: ₦{{ Number(plan.progress).toLocaleString("en-NG") }}
          <span v-if="plan.targetAmount !== 'Unknown'">
            / ₦{{ Number(plan.targetAmount).toLocaleString("en-NG") }}
          </span>
        </div>
      </div>

      <v-form ref="formRef">
        <v-text-field
          v-model="amountToAdd"
          variant="outlined"
          label="Amount to Add (₦)"
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
              @click="amountToAdd = amountToAdd ? Number(amountToAdd) * 1000 : 1000"
            >
              000
            </v-btn>
          </template>
        </v-text-field>
      </v-form>

      <div v-if="newTotal !== null" class="text-caption text-medium-emphasis">
        New total: ₦{{ newTotal.toLocaleString("en-NG") }}
      </div>

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
            :loading="planStore.isLoading"
            @click="submit"
          >
            Add
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
import { ref, reactive, computed, watch } from "vue";
import { usePlanStore } from "@/stores/plan.store";
import type { Plan } from "@/stores/plan.store";
import DialogHeaderComponent from "@/components/shared/DialogHeaderComponent.vue";

const open = defineModel<boolean>({ required: true });
const props = defineProps<{ plan: Plan | null }>();
const emit = defineEmits<{ updated: [] }>();

const planStore = usePlanStore();
const formRef = ref();
const amountToAdd = ref<number | null>(null);
const snackbar = reactive({ show: false, message: "", color: "success" });
const required = (v: any) =>
  (v !== null && v !== "" && Number(v) > 0) || "Enter an amount greater than 0";

// Reset the input whenever a new plan is targeted or the dialog reopens
watch(
  () => [open.value, props.plan],
  ([isOpen]) => {
    if (isOpen) amountToAdd.value = null;
  }
);

const newTotal = computed(() => {
  if (!props.plan || !amountToAdd.value) return null;
  return Number(props.plan.progress) + Number(amountToAdd.value);
});

function showSnackbar(message: string, color: string) {
  snackbar.message = message;
  snackbar.color = color;
  snackbar.show = true;
}

async function submit() {
  const { valid } = await formRef.value.validate();
  if (!valid || !props.plan) return;

  try {
    const updatedProgress = Number(props.plan.progress) + Number(amountToAdd.value);
    await planStore.updatePlan(props.plan._id, {
      progress: updatedProgress,
      // status left undefined so the backend re-derives Completed / In
      // Progress / Overdue from the new progress vs target and due date.
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