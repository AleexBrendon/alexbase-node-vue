<script setup lang="ts">
defineProps<{
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "danger";
  loading?: boolean;
  disabled?: boolean;
}>();
</script>

<template>
  <button
    :type="type || 'button'"
    :disabled="disabled || loading"
    :class="[
      'inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60',
      variant === 'secondary' &&
        'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50',
      variant === 'danger' &&
        'bg-red-600 text-white hover:bg-red-700',
      (!variant || variant === 'primary') &&
        'bg-slate-950 text-white hover:bg-slate-800',
    ]"
  >
    <slot>
      {{ loading ? "Carregando..." : "Salvar" }}
    </slot>
  </button>
</template>