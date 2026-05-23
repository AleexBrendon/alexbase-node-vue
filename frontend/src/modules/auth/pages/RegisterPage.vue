<script setup lang="ts">
import { reactive, ref } from "vue";
import { useRouter, RouterLink } from "vue-router";
import { useAuthStore } from "../stores/auth.store";
import { getErrorMessage } from "../../../shared/utils/getErrorMessage";
import AppButton from "../../../shared/components/ui/AppButton.vue";
import AppInput from "../../../shared/components/ui/AppInput.vue";

const router = useRouter();
const auth = useAuthStore();

const errorMessage = ref("");

const form = reactive({
  name: "",
  email: "",
  password: "",
});

async function handleSubmit() {
  try {
    errorMessage.value = "";

    await auth.register(form);

    router.push("/login");
  } catch (error: unknown) {
    errorMessage.value =
      getErrorMessage(error, "Erro ao criar conta.");
  }
}
</script>

<template>
  <form class="w-full max-w-md rounded-3xl border border-white/10 bg-white p-8 shadow-2xl"
    @submit.prevent="handleSubmit">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-slate-900">
        Criar conta
      </h1>

      <p class="mt-2 text-sm text-slate-500">
        Cadastre-se para acessar a AlexBase.
      </p>
    </div>

    <div class="space-y-4">
      <AppInput v-model="form.name" label="Nome" placeholder="Seu nome" />

      <AppInput v-model="form.email" label="Email" type="email" placeholder="seuemail@email.com" />

      <AppInput v-model="form.password" label="Senha" type="password" placeholder="Sua senha" />

      <p v-if="errorMessage" class="text-sm text-red-600">
        {{ errorMessage }}
      </p>

      <AppButton type="submit" class="w-full mt-4" :loading="auth.loading">
        {{ auth.loading ? "Criando conta..." : "Criar conta" }}
      </AppButton>
    </div>

    <p class="mt-6 text-center text-sm text-slate-500">
      Já possui conta?
      <RouterLink to="/login" class="font-semibold text-slate-950">
        Entrar
      </RouterLink>
    </p>
  </form>
</template>