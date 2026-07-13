<template>
  <v-dialog v-model="open" class="w-xs-75 w-sm-66 h-100" scrim="true">
    <v-container
      class="px-6 pb-5 pt-1 bg-light rounded-lg d-flex flex-column gap-3 overflow-y-auto"
    >
      <DialogHeaderComponent title="Add Expense" v-model="open" />

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

          <v-text-field
            v-model="entry.amount"
            variant="outlined"
            label="Amount (₦)"
            type="number"
            step="1000"
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
                  entry.amount =
                    (entry.amount || 0) * 1000 === 0 ? 1000 : Number(entry.amount) * 1000
                "
              >
                000
              </v-btn>
            </template>
          </v-text-field>

          <v-text-field
            v-model="entry.item"
            variant="outlined"
            label="Item"
            density="comfortable"
            :readonly="entry.isBill && !!entry.billTypeId"
          />

          <v-text-field
            v-model="entry.vendor"
            variant="outlined"
            label="Vendor (optional)"
            density="comfortable"
          />

          <v-checkbox
            v-model="entry.isBill"
            label="This is a bill payment"
            color="secondary"
            density="comfortable"
            hide-details
            class="mb-2"
            @update:model-value="onBillToggle(entry)"
          />

          <template v-if="entry.isBill">
            <v-select
              v-model="entry.billTypeId"
              :items="billTypeStore.billTypes"
              item-title="name"
              item-value="_id"
              label="Bill"
              variant="outlined"
              density="comfortable"
              @update:model-value="onBillTypeSelected(entry)"
            >
              <template #item="{ props: itemProps, item }">
                <v-list-item
                  v-bind="itemProps"
                  :subtitle="`Paid: ₦${Number(item.amountPaid || 0).toLocaleString('en-NG')} / ₦${Number(
                    item.total || 0
                  ).toLocaleString('en-NG')} • ${item.status || ''}`"
                />
              </template>
            </v-select>

            <div
              v-if="selectedBillType(entry)"
              class="text-caption text-medium-emphasis mb-3 ml-1"
            >
              Remaining: ₦{{ (selectedBillType(entry)!.total - selectedBillType(entry)!.amountPaid).toLocaleString('en-NG') }}
            </div>

            <v-text-field
              v-model="entry.billPaymentRemark"
              variant="outlined"
              label="Payment Remark (optional)"
              density="comfortable"
            />
          </template>

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
import { ref, reactive, watch, onMounted } from "vue";
import { useUserStore } from "@/stores/users.stores";
import { useExpenseStore } from "@/stores/expense.store";
import { useBillTypeStore } from "@/stores/billtype.store";
import DialogHeaderComponent from "@/components/shared/DialogHeaderComponent.vue";
import type { ExpenseEntry } from "@/types";

const props = defineProps<{ initialEntry?: Partial<ExpenseEntry> }>();
const open = defineModel<boolean>({ required: true });

const userStore = useUserStore();
const expenseStore = useExpenseStore();
const billTypeStore = useBillTypeStore();
const loading = ref(false);
const snackbar = reactive({ show: false, message: "", color: "success" });

onMounted(() => {
  if (billTypeStore.billTypes.length === 0) billTypeStore.getBillTypes();
});

function createEntry(): ExpenseEntry {
  return {
    date: props.initialEntry?.date ?? new Date().toISOString().split("T")[0],
    amount: props.initialEntry?.amount ?? null,
    item: props.initialEntry?.item ?? "",
    vendor: props.initialEntry?.vendor ?? "",
    isBill: props.initialEntry?.isBill ?? false,
    currency: props.initialEntry?.currency ?? userStore.user?.preferredCurrency ?? "NGN",
    billTypeId: props.initialEntry?.billTypeId,
    billPaymentRemark: props.initialEntry?.billPaymentRemark ?? "",
  };
}

const entries = ref<ExpenseEntry[]>([createEntry()]);

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

function selectedBillType(entry: ExpenseEntry) {
  return billTypeStore.billTypes.find((b) => b._id === entry.billTypeId) ?? null;
}

function onBillToggle(entry: ExpenseEntry) {
  if (!entry.isBill) {
    entry.billTypeId = undefined;
    entry.billPaymentRemark = "";
  }
}

function onBillTypeSelected(entry: ExpenseEntry) {
  const bt = selectedBillType(entry);
  if (bt) {
    entry.item = bt.name;
    entry.amount = bt.total - bt.amountPaid; // suggest remaining balance
  }
}

function showSnackbar(message: string, color: string) {
  snackbar.message = message;
  snackbar.color = color;
  snackbar.show = true;
}

async function submit() {
  loading.value = true;
  try {
    await expenseStore.addExpense(entries.value);
    showSnackbar(
      entries.value.length > 1
        ? `${entries.value.length} expense records added successfully!`
        : "Expense added successfully!",
      "success"
    );
    setTimeout(() => {
      entries.value = [createEntry()];
      open.value = false;
    }, 1500);
  } catch (err: any) {
    showSnackbar(err.message || "Failed to add expense.", "error");
  } finally {
    loading.value = false;
  }
}
</script>
