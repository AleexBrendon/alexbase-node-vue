<script setup lang="ts">
defineProps<{
  title: string;
  value: number;
}>();
</script>

<template>
  <div
    class="
      rounded-3xl
      border
      border-slate-200
      bg-white
      p-4
      shadow-sm
      transition-all
      hover:shadow-md
      dark:border-white/10
      dark:bg-slate-900
      sm:p-6
    "
  >
    <p
      class="
        text-xs
        font-medium
        uppercase
        tracking-wide
        text-slate-500
        dark:text-slate-400
        sm:text-sm
      "
    >
      {{ title }}
    </p>

    <h2
      class="
        mt-2
        text-2xl
        font-bold
        text-slate-900
        dark:text-white
        sm:text-3xl
      "
    >
      {{ value }}
    </h2>
  </div>
</template>