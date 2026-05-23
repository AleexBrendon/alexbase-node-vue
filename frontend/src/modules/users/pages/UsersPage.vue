<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { Pencil, Shield, Trash2 } from "lucide-vue-next";
import {
  deleteUser,
  getUsers,
} from "../services/users.service";
import type { User } from "../types/user.type";
import AppBadge from "../../../shared/components/ui/AppBadge.vue";
import AppButton from "../../../shared/components/ui/AppButton.vue";
import AppCard from "../../../shared/components/ui/AppCard.vue";
import AppEmptyState from "../../../shared/components/ui/AppEmptyState.vue";
import UserFormModal from "../components/UserFormModal.vue";
import { useToastStore } from "../../../shared/stores/toast.store";
import AppConfirmModal from "../../../shared/components/ui/AppConfirmModal.vue";
import { getErrorMessage } from "../../../shared/utils/getErrorMessage";

const users = ref<User[]>([]);
const showCreateModal = ref(false);
const selectedUser = ref<User | null>(null);
const loading = ref(false);
const errorMessage = ref("");
const userToDelete = ref<User | null>(null);
const deleting = ref(false);

const toast = useToastStore();

const page = ref(1);
const perPage = ref(10);
const search = ref("");

const meta = ref({
  page: 1,
  perPage: 10,
  total: 0,
  totalPages: 1,
});

let searchTimeout: number | undefined;

watch(search, () => {
  clearTimeout(searchTimeout);

  searchTimeout = window.setTimeout(async () => {
    page.value = 1;
    await loadUsers();
  }, 500);
});

async function loadUsers() {
  try {
    loading.value = true;
    errorMessage.value = "";

    const result = await getUsers({
      page: page.value,
      perPage: perPage.value,
      search: search.value || undefined,
    });

    users.value = result.data;
    meta.value = result.meta;
  } catch (error: unknown) {
    errorMessage.value =
      getErrorMessage(error, "Erro ao carregar usuários.");
  } finally {
    loading.value = false;
  }
}

async function goToPage(nextPage: number) {
  if (nextPage < 1 || nextPage > meta.value.totalPages) return;

  page.value = nextPage;

  await loadUsers();
}

async function refreshUsers() {
  await loadUsers();

  toast.info(
    "Lista atualizada",
    "Os usuários foram carregados novamente."
  );
}

async function handleSearch() {
  page.value = 1;
  await loadUsers();
}

async function handleUserCreated() {
  await loadUsers();

  toast.success(
    "Usuário criado",
    "O usuário foi cadastrado com sucesso."
  );
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((item) => item[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function openEditModal(user: User) {
  selectedUser.value = user;
}

function closeModals() {
  showCreateModal.value = false;
  selectedUser.value = null;
}

async function handleUserUpdated() {
  await loadUsers();

  toast.success(
    "Usuário atualizado",
    "O usuário foi atualizado com sucesso."
  );
}

async function confirmDeleteUser() {
  if (!userToDelete.value) return;

  try {
    deleting.value = true;

    await deleteUser(userToDelete.value.id);

    await loadUsers();

    toast.success(
      "Usuário excluído",
      "O usuário foi removido com sucesso."
    );

    userToDelete.value = null;

  } catch (error: unknown) {
    toast.error(
      "Erro ao excluir",
      getErrorMessage(error, "Não foi possível excluir o usuário.")
    );
  } finally {
    deleting.value = false;
  }
}

function roleVariant(role: string) {
  return role?.toLowerCase() === "admin" ? "success" : "default";
}

onMounted(() => {
  loadUsers();
});

</script>

<template>
  <section class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-slate-900">
          Usuários
        </h1>

        <p class="mt-1 text-sm text-slate-500">
          Gerencie os usuários cadastrados na AlexBase.
        </p>
      </div>

      <div class="flex gap-3">
        <AppButton variant="secondary" @click="refreshUsers">
          Atualizar
        </AppButton>

        <AppButton @click="showCreateModal = true">
          Novo usuário
        </AppButton>
      </div>
    </div>

    <AppCard class="p-0">
      <div class="flex gap-3">
        <input v-model="search" type="text" placeholder="Buscar por nome ou email..."
          class="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
          @keyup.enter="handleSearch" />
      </div>

      <div class="border-b border-slate-200 p-5">
        <h2 class="font-semibold text-slate-900">
          Lista de usuários
        </h2>
      </div>

      <div v-if="loading" class="p-6 text-sm text-slate-500">
        Carregando usuários...
      </div>

      <div v-else-if="errorMessage" class="p-6 text-sm text-red-600">
        {{ errorMessage }}
      </div>

      <AppEmptyState v-else-if="users.length === 0" title="Nenhum usuário encontrado"
        description="Quando novos usuários forem cadastrados, eles aparecerão aqui." />

      <div v-else class="overflow-x-auto">
        <table class="w-full border-collapse">
          <thead>
            <tr class="border-b border-slate-200 bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
              <th class="px-6 py-4">Usuário</th>
              <th class="px-6 py-4">Email</th>
              <th class="px-6 py-4">Role</th>
              <th class="px-6 py-4">Criado em</th>
              <th class="px-6 py-4 text-right">Ações</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="user in users" :key="user.id" class="border-b border-slate-100 transition hover:bg-slate-50">
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <div
                    class="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white">
                    {{ getInitials(user.name) }}
                  </div>

                  <div>
                    <p class="font-medium text-slate-900">
                      {{ user.name }}
                    </p>

                    <p class="text-xs text-slate-500">
                      ID: {{ user.id }}
                    </p>
                  </div>
                </div>
              </td>

              <td class="px-6 py-4 text-sm text-slate-600">
                {{ user.email }}
              </td>

              <td class="px-6 py-4">
                <AppBadge :variant="roleVariant(user.role)">
                  <Shield :size="13" />
                  {{ user.role }}
                </AppBadge>
              </td>

              <td class="px-6 py-4 text-sm text-slate-500">
                {{
                  user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString("pt-BR")
                    : "-"
                }}
              </td>

              <td class="px-6 py-4">
                <div class="flex justify-end gap-2">
                  <button class="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-100"
                    @click="openEditModal(user)">
                    <Pencil :size="16" />
                  </button>

                  <button class="rounded-lg border border-red-200 p-2 text-red-600 transition hover:bg-red-50"
                    @click="userToDelete = user">
                    <Trash2 :size="16" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="!loading && !errorMessage && users.length > 0"
        class="flex items-center justify-between border-t border-slate-200 px-6 py-4">
        <p class="text-sm text-slate-500">
          Página {{ meta.page }} de {{ meta.totalPages }}
          · Total: {{ meta.total }} usuários
        </p>

        <div class="flex gap-2">
          <AppButton variant="secondary" :disabled="meta.page <= 1" @click="goToPage(meta.page - 1)">
            Anterior
          </AppButton>

          <AppButton variant="secondary" :disabled="meta.page >= meta.totalPages" @click="goToPage(meta.page + 1)">
            Próxima
          </AppButton>
        </div>
      </div>
    </AppCard>
  </section>
  <UserFormModal v-if="showCreateModal" @close="closeModals" @created="handleUserCreated" />

  <UserFormModal v-if="selectedUser" :user="selectedUser" @close="closeModals" @updated="handleUserUpdated" />

  <AppConfirmModal v-if="userToDelete" title="Excluir usuário"
    :message="`Tem certeza que deseja excluir o usuário ${userToDelete.name}? Essa ação não poderá ser desfeita.`"
    confirm-text="Excluir usuário" cancel-text="Cancelar" :loading="deleting" @close="userToDelete = null"
    @confirm="confirmDeleteUser" />
</template>