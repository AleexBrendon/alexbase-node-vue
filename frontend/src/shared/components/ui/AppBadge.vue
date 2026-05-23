<script setup lang="ts">
defineProps<{
  variant?: "default" | "success" | "danger" | "warning";
}>();
</script>

<template>
  <span
    :class="[
      'inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold',
      (!variant || variant === 'default') &&
        'bg-slate-100 text-slate-700',
      variant === 'success' &&
        'bg-emerald-100 text-emerald-700',
      variant === 'danger' &&
        'bg-red-100 text-red-700',
      variant === 'warning' &&
        'bg-amber-100 text-amber-700',
    ]"
  >
    <slot />
  </span>
</template>