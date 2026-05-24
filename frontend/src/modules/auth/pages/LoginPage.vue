<script setup lang="ts">
import { reactive, ref } from "vue";
import { useRouter, RouterLink } from "vue-router";
import { useAuthStore } from "../stores/auth.store";
import { getErrorMessage } from "../../../shared/utils/getErrorMessage";
import AppButton from "../../../shared/components/ui/AppButton.vue";
import AppInput from "../../../shared/components/ui/AppInput.vue";
import { useToastStore } from "../../../shared/stores/toast.store";

const toast = useToastStore();
const router = useRouter();
const auth = useAuthStore();

const errorMessage = ref("");

const form = reactive({
  email: "",
  password: "",
});

async function handleSubmit() {
  try {
    errorMessage.value = "";

    await auth.login(form);

    toast.success(
      "Login realizado",
      "Bem-vindo de volta."
    );

    router.push("/dashboard");
  } catch (error: unknown) {
    const message =
      getErrorMessage(error, "Credenciais inválidas.");

    errorMessage.value = message;

    toast.error("Erro ao entrar", message);
  }
}
</script>

<template>
  <form
    class="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-5 shadow-2xl dark:border-white/10 dark:bg-slate-900 sm:p-8"
    @submit.prevent="handleSubmit"
  >
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
        Entrar
      </h1>

      <p class="mt-2 text-sm text-slate-500 dark:text-slate-400">
        Acesse sua conta AlexBase.
      </p>
    </div>

    <div class="space-y-4">
      <AppInput v-model="form.email" label="Email" type="email" placeholder="seuemail@email.com" />

      <AppInput v-model="form.password" label="Senha" type="password" placeholder="Sua senha" />

      <p v-if="errorMessage" class="text-sm text-red-600">
        {{ errorMessage }}
      </p>

      <AppButton type="submit" class="mt-4 w-full" :loading="auth.loading">
        {{ auth.loading ? "Entrando..." : "Entrar" }}
      </AppButton>
    </div>

    <p class="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
      Ainda não tem conta?
      <RouterLink to="/register" class="font-semibold text-slate-950 dark:text-white">
        Criar conta
      </RouterLink>
    </p>
  </form>
</template>