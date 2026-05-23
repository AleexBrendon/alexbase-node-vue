<script setup lang="ts">
import { AlertTriangle } from "lucide-vue-next";

import AppButton from "./AppButton.vue";

defineProps<{
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
}>();

const emit = defineEmits<{
  close: [];
  confirm: [];
}>();
</script>

<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
    <div class="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
      <div class="flex gap-4">
        <div
          class="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600"
        >
          <AlertTriangle :size="24" />
        </div>

        <div class="flex-1">
          <h2 class="text-lg font-bold text-slate-900">
            {{ title }}
          </h2>

          <p class="mt-2 text-sm leading-6 text-slate-500">
            {{ message }}
          </p>
        </div>
      </div>

      <div class="mt-6 flex justify-end gap-3">
        <AppButton
          type="button"
          variant="secondary"
          :disabled="loading"
          @click="emit('close')"
        >
          {{ cancelText || "Cancelar" }}
        </AppButton>

        <AppButton
          type="button"
          variant="danger"
          :loading="loading"
          @click="emit('confirm')"
        >
          {{ confirmText || "Excluir" }}
        </AppButton>
      </div>
    </div>
  </div>
</template>