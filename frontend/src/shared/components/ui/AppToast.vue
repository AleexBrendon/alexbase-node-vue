<script setup lang="ts">
import {
  CheckCircle2,
  XCircle,
  Info,
  AlertTriangle,
  X,
} from "lucide-vue-next";

import type { Toast } from "../../../shared/stores/toast.store";

defineProps<{
  toast: Toast;
}>();

const emit = defineEmits<{
  close: [];
}>();
</script>

<template>
  <div
    :class="[
      'flex w-full max-w-sm items-start gap-3 rounded-2xl border bg-white p-4 shadow-xl',
      toast.type === 'success' && 'border-emerald-200',
      toast.type === 'error' && 'border-red-200',
      toast.type === 'info' && 'border-blue-200',
      toast.type === 'warning' && 'border-amber-200',
    ]"
  >
    <CheckCircle2
      v-if="toast.type === 'success'"
      class="mt-0.5 text-emerald-600"
      :size="20"
    />

    <XCircle
      v-else-if="toast.type === 'error'"
      class="mt-0.5 text-red-600"
      :size="20"
    />

    <Info
      v-else-if="toast.type === 'info'"
      class="mt-0.5 text-blue-600"
      :size="20"
    />

    <AlertTriangle
      v-else
      class="mt-0.5 text-amber-600"
      :size="20"
    />

    <div class="flex-1">
      <p class="text-sm font-semibold text-slate-900">
        {{ toast.title }}
      </p>

      <p
        v-if="toast.message"
        class="mt-1 text-sm text-slate-500"
      >
        {{ toast.message }}
      </p>
    </div>

    <button
      class="text-slate-400 transition hover:text-slate-700"
      @click="emit('close')"
    >
      <X :size="16" />
    </button>
  </div>
</template>