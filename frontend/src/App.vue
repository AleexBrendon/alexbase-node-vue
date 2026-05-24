<script setup lang="ts">
import { onMounted } from "vue";
import { RouterView } from "vue-router";
import AppToastContainer from "./shared/components/ui/AppToastContainer.vue";
import { useThemeStore } from "./stores/themeStore";

const themeStore = useThemeStore();

onMounted(() => {
  themeStore.initTheme();
});
</script>

<template>
  <RouterView />
  <AppToastContainer />
</template>