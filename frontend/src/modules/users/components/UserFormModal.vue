<script setup lang="ts">
import { reactive, ref } from "vue";

import AppButton from "../../../shared/components/ui/AppButton.vue";
import AppInput from "../../../shared/components/ui/AppInput.vue";

import { createUser, updateUser } from "../services/users.service";
import { getErrorMessage } from "../../../shared/utils/getErrorMessage";
import type { CreateUserPayload, User } from "../types/user.type";

const props = defineProps<{
  user?: User | null;
}>();

const emit = defineEmits<{
  close: [];
  created: [user: User];
  updated: [user: User];
}>();

const loading = ref(false);
const errorMessage = ref("");

const isEditing = !!props.user;

const form = reactive<CreateUserPayload>({
  name: props.user?.name || "",
  email: props.user?.email || "",
  password: "",
  role: props.user?.role || "user",
});

async function handleSubmit() {
  try {
    loading.value = true;
    errorMessage.value = "";

    if (isEditing && props.user) {
      const payload = {
        name: form.name,
        email: form.email,
        role: form.role,
        ...(form.password ? { password: form.password } : {}),
      };

      const user = await updateUser(props.user.id, payload);

      emit("updated", user);
      emit("close");

      return;
    }

    const user = await createUser(form);

    emit("created", user);
    emit("close");
  } catch (error: unknown) {
    errorMessage.value =
      getErrorMessage(error, "Erro ao salvar usuário.");
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
    <form
      class="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl"
      @submit.prevent="handleSubmit"
    >
      <div class="mb-6 flex items-start justify-between">
        <div>
          <h2 class="text-xl font-bold text-slate-900">
            {{ isEditing ? "Editar usuário" : "Novo usuário" }}
          </h2>

          <p class="mt-1 text-sm text-slate-500">
            {{
              isEditing
                ? "Atualize os dados do usuário."
                : "Cadastre um novo usuário na AlexBase."
            }}
          </p>
        </div>

        <button
          type="button"
          class="text-slate-400 hover:text-slate-700"
          @click="emit('close')"
        >
          ✕
        </button>
      </div>

      <div class="space-y-4">
        <AppInput
          v-model="form.name"
          label="Nome"
          placeholder="Nome do usuário"
        />

        <AppInput
          v-model="form.email"
          label="Email"
          type="email"
          placeholder="email@exemplo.com"
        />

        <AppInput
          v-model="form.password"
          label="Senha"
          type="password"
          :placeholder="isEditing ? 'Deixe vazio para manter a senha' : 'Senha inicial'"
        />

        <label class="block space-y-1">
          <span class="text-sm font-medium text-slate-700">
            Role
          </span>

          <select
            v-model="form.role"
            class="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
          >
            <option value="user">Usuário</option>
            <option value="admin">Admin</option>
          </select>
        </label>

        <p
          v-if="errorMessage"
          class="text-sm text-red-600"
        >
          {{ errorMessage }}
        </p>
      </div>

      <div class="mt-6 flex justify-end gap-3">
        <AppButton
          type="button"
          variant="secondary"
          @click="emit('close')"
        >
          Cancelar
        </AppButton>

        <AppButton
          type="submit"
          :loading="loading"
        >
          {{ loading ? "Salvando..." : isEditing ? "Salvar alterações" : "Criar usuário" }}
        </AppButton>
      </div>
    </form>
  </div>
</template>