<script setup lang="ts">
defineProps<{
  title: string;
  description?: string;
}>();
</script>

<template>
  <div class="flex flex-col items-center justify-center px-6 py-14 text-center">
    <h3 class="text-lg font-semibold text-slate-900">
      {{ title }}
    </h3>

    <p
      v-if="description"
      class="mt-2 max-w-md text-sm text-slate-500"
    >
      {{ description }}
    </p>
  </div>
</template>