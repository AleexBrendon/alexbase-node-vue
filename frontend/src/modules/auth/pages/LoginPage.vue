<script setup lang="ts">
import { reactive, ref } from "vue";
import { useRouter, RouterLink } from "vue-router";
import { useAuthStore } from "../stores/auth.store";

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
  } catch (error: any) {
    const message =
      error?.response?.data?.message || "Credenciais inválidas.";

    errorMessage.value = message;

    toast.error("Erro ao entrar", message);
  }
}
</script>

<template>
  <form class="w-full max-w-md rounded-3xl border border-white/10 bg-white p-8 shadow-2xl"
    @submit.prevent="handleSubmit">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-slate-900">
        Entrar
      </h1>

      <p class="mt-2 text-sm text-slate-500">
        Acesse sua conta AlexBase.
      </p>
    </div>

    <div class="space-y-4">
      <AppInput v-model="form.email" label="Email" type="email" placeholder="seuemail@email.com" />

      <AppInput v-model="form.password" label="Senha" type="password" placeholder="Sua senha" />

      <p v-if="errorMessage" class="text-sm text-red-600">
        {{ errorMessage }}
      </p>

      <AppButton type="submit" class="w-full mt-4" :loading="auth.loading">
        {{ auth.loading ? "Entrando..." : "Entrar" }}
      </AppButton>
    </div>

    <p class="mt-6 text-center text-sm text-slate-500">
      Ainda não tem conta?
      <RouterLink to="/register" class="font-semibold text-slate-950">
        Criar conta
      </RouterLink>
    </p>
  </form>
</template>