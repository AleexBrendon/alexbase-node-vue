<script setup lang="ts">
defineProps<{
  label?: string;
  modelValue: string;
  type?: string;
  placeholder?: string;
  error?: string;
}>();

defineEmits<{
  "update:modelValue": [value: string];
}>();
</script>

<template>
  <label class="space-y-1">
    <span
      v-if="label"
      class="text-sm font-medium text-slate-700"
    >
      {{ label }}
    </span>

    <input
      :type="type || 'text'"
      :value="modelValue"
      :placeholder="placeholder"
      class="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />

    <span
      v-if="error"
      class="text-xs text-red-600"
    >
      {{ error }}
    </span>
  </label>
</template>