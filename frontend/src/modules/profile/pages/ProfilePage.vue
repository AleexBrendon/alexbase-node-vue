<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";

import AppButton from "../../../shared/components/ui/AppButton.vue";
import AppCard from "../../../shared/components/ui/AppCard.vue";
import AppInput from "../../../shared/components/ui/AppInput.vue";

import { getProfile, updateProfile } from "../services/profile.service";
import { useToastStore } from "../../../shared/stores/toast.store";
import { useAuthStore } from "../../auth/stores/auth.store";
import { getErrorMessage } from "../../../shared/utils/getErrorMessage";

const toast = useToastStore();
const auth = useAuthStore();

const loading = ref(false);
const saving = ref(false);

const form = reactive({
  name: "",
  email: "",
  password: "",
});

async function loadProfile() {
  try {
    loading.value = true;

    const profile = await getProfile();

    form.name = profile.name;
    form.email = profile.email;
  } finally {
    loading.value = false;
  }
}

async function handleSubmit() {
  try {
    saving.value = true;

    const payload = {
      name: form.name,
      email: form.email,
      ...(form.password ? { password: form.password } : {}),
    };

    const updatedUser = await updateProfile(payload);

    auth.user = {
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
    };

    localStorage.setItem("@alexbase:user", JSON.stringify(auth.user));

    form.password = "";

    toast.success(
      "Perfil atualizado",
      "Suas informações foram salvas com sucesso.",
    );
  } catch (error: unknown) {
    toast.error(
      "Erro ao atualizar",
      getErrorMessage(error, "Não foi possível atualizar o perfil."),
    );
  } finally {
    saving.value = false;
  }
}

onMounted(loadProfile);
</script>

<template>
  <section class="space-y-5 sm:space-y-6">
    <div>
      <h1 class="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
        Minha conta
      </h1>

      <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">
        Atualize suas informações pessoais.
      </p>
    </div>

    <AppCard>
      <div
        v-if="loading"
        class="text-sm text-slate-500 dark:text-slate-400"
      >
        Carregando perfil...
      </div>

      <form
        v-else
        class="w-full max-w-xl space-y-5"
        @submit.prevent="handleSubmit"
      >
        <AppInput v-model="form.name" label="Nome" placeholder="Seu nome" />

        <AppInput v-model="form.email" label="Email" type="email" placeholder="seu@email.com" />

        <AppInput
          v-model="form.password"
          label="Nova senha"
          type="password"
          placeholder="Deixe vazio para manter a senha atual"
        />

        <div class="flex flex-col gap-3 pt-4 sm:flex-row sm:justify-end">
          <AppButton
            type="submit"
            class="w-full sm:w-auto"
            :loading="saving"
          >
            {{ saving ? "Salvando..." : "Salvar alterações" }}
          </AppButton>
        </div>
      </form>
    </AppCard>
  </section>
</template>