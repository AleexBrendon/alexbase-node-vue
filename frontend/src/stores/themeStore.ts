import { defineStore } from "pinia";
import { ref } from "vue";

type Theme = "light" | "dark";

export const useThemeStore = defineStore("theme", () => {
  const theme = ref<Theme>(
    (localStorage.getItem("alexbase-theme") as Theme) || "dark"
  );

  function applyTheme() {
    document.documentElement.classList.toggle(
      "dark",
      theme.value === "dark"
    );

    localStorage.setItem(
      "alexbase-theme",
      theme.value
    );
  }

  function toggleTheme() {
    theme.value =
      theme.value === "dark"
        ? "light"
        : "dark";

    applyTheme();
  }

  function initTheme() {
    applyTheme();
  }

  return {
    theme,
    toggleTheme,
    initTheme
  };
});