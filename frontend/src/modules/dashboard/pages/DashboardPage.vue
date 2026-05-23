<script setup lang="ts">
import { onMounted, ref } from "vue";
import {
  Shield,
  Users,
  UserRound,
} from "lucide-vue-next";

import type { DashboardData } from "../types/dashboard.type";
import { getDashboardData } from "../services/dashboard.service";
import AppCard from "../../../shared/components/ui/AppCard.vue";

const data = ref<DashboardData>({
  users: 0,
  admins: 0,
  regularUsers: 0,
});

const loading = ref(false);

async function loadDashboard() {
  try {
    loading.value = true;

    data.value = await getDashboardData();
  } finally {
    loading.value = false;
  }
}

onMounted(loadDashboard);
</script>

<template>
  <div class="space-y-8">
    <div>
      <h1 class="text-3xl font-bold">
        Dashboard
      </h1>

      <p class="mt-1 text-sm text-slate-500">
        Visão geral da AlexBase
      </p>
    </div>

    <div v-if="loading" class="text-slate-500">
      Carregando...
    </div>

    <div v-else class="grid gap-6 md:grid-cols-3">
      <AppCard>
        <div class="flex items-center justify-between">
          <span>Total usuários</span>

          <Users />
        </div>

        <h2 class="mt-5 text-4xl font-bold">
          {{ data.users }}
        </h2>
      </AppCard>

      <div class="rounded-2xl bg-white p-6 shadow">
        <div class="flex items-center justify-between">
          <span>Admins</span>

          <Shield />
        </div>

        <h2 class="mt-5 text-4xl font-bold">
          {{ data.admins }}
        </h2>
      </div>

      <div class="rounded-2xl bg-white p-6 shadow">
        <div class="flex items-center justify-between">
          <span>Usuários comuns</span>

          <UserRound />
        </div>

        <h2 class="mt-5 text-4xl font-bold">
          {{ data.regularUsers }}
        </h2>
      </div>
    </div>
  </div>
</template>