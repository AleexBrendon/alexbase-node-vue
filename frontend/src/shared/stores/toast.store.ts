import { defineStore } from "pinia";

export type ToastType = "success" | "error" | "info" | "warning";

export type Toast = {
  id: number;
  type: ToastType;
  title: string;
  message?: string;
};

export const useToastStore = defineStore("toast", {
  state: () => ({
    toasts: [] as Toast[],
  }),

  actions: {
    show(toast: Omit<Toast, "id">) {
      const id = Date.now();

      this.toasts.push({
        id,
        ...toast,
      });

      setTimeout(() => {
        this.remove(id);
      }, 3500);
    },

    success(title: string, message?: string) {
      this.show({
        type: "success",
        title,
        message,
      });
    },

    error(title: string, message?: string) {
      this.show({
        type: "error",
        title,
        message,
      });
    },

    info(title: string, message?: string) {
      this.show({
        type: "info",
        title,
        message,
      });
    },

    warning(title: string, message?: string) {
      this.show({
        type: "warning",
        title,
        message,
      });
    },

    remove(id: number) {
      this.toasts = this.toasts.filter((toast) => toast.id !== id);
    },
  },
});