<script setup lang="ts">
import { useToastStore } from "../../../shared/stores/toast.store";
import AppToast from "./AppToast.vue";

const toastStore = useToastStore();
</script>

<template>
  <div class="fixed right-6 top-6 z-[9999] flex flex-col gap-3">
    <TransitionGroup name="toast">
      <AppToast
        v-for="toast in toastStore.toasts"
        :key="toast.id"
        :toast="toast"
        @close="toastStore.remove(toast.id)"
      />
    </TransitionGroup>
  </div>
</template>