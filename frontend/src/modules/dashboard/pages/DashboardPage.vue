<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { Clock3 } from "lucide-vue-next";
import { getActivities } from "../../../modules/activities/services/activity.service";
import type { Activity } from "../../../modules/activities/types/activity.type";
import KpiCard from "../components/KpiCard.vue";
import { getDashboardData } from "../services/dashboard.service";
import type { DashboardData } from "../types/dashboard.type";

const dashboard = ref<DashboardData>({
  totalUsers: 0,
  admins: 0,
  users: 0,
  newUsersToday: 0,

  rolesChart: {
    labels: [],
    series: [],
  },

  usersByDayChart: {
    labels: [],
    series: [],
  },
});

const loading = ref(false);
const activities = ref<Activity[]>([]);

async function loadDashboard() {
  try {
    loading.value = true;

    dashboard.value =
      await getDashboardData();

  } finally {
    loading.value = false;
  }
}

const chartOptions = computed(() => ({
  labels: dashboard.value.rolesChart?.labels ?? [],
  legend: {
    position: "bottom",
  },
  dataLabels: {
    enabled: true,
  },
}));

const usersByDayOptions = computed(() => ({
  chart: {
    toolbar: {
      show: false,
    },
  },
  xaxis: {
    categories: dashboard.value.usersByDayChart?.labels ?? [],
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
  },
}));

async function loadActivities() {
  activities.value = await getActivities();
}

function formatDate(date: string) {
  return new Date(date).toLocaleString("pt-BR");
}

function getActivityColor(type: string) {
  if (type === "created") return "bg-emerald-500";
  if (type === "updated") return "bg-blue-500";
  if (type === "deleted") return "bg-red-500";

  return "bg-slate-500";
}

onMounted(() => {
  loadDashboard();
  loadActivities();
});
</script>

<template>
  <section class="space-y-5 sm:space-y-6">
    <div>
      <h1 class="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
        Dashboard
      </h1>

      <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">
        Visão geral da AlexBase.
      </p>
    </div>

    <div v-if="loading" class="text-sm text-slate-500 dark:text-slate-400">
      Carregando...
    </div>

    <div v-else class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <KpiCard title="Total usuários" :value="dashboard.totalUsers" />

      <KpiCard title="Admins" :value="dashboard.admins" />

      <KpiCard title="Usuários" :value="dashboard.users" />

      <KpiCard title="Novos hoje" :value="dashboard.newUsersToday" />
    </div>

    <div class="grid grid-cols-1 gap-5 xl:grid-cols-2">
      <div
        class="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-slate-900 sm:p-6"
      >
        <div class="mb-5 sm:mb-6">
          <h2 class="text-base font-bold text-slate-900 dark:text-white sm:text-lg">
            Usuários por role
          </h2>

          <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Distribuição entre administradores e usuários comuns.
          </p>
        </div>

        <div class="min-h-[260px]">
          <apexchart
            width="100%"
            height="280"
            type="donut"
            :options="chartOptions"
            :series="dashboard.rolesChart?.series ?? []"
          />
        </div>
      </div>

      <div
        class="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-slate-900 sm:p-6"
      >
        <div class="mb-5 sm:mb-6">
          <h2 class="text-base font-bold text-slate-900 dark:text-white sm:text-lg">
            Cadastros por dia
          </h2>

          <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Novos usuários cadastrados nos últimos 7 dias.
          </p>
        </div>

        <div class="min-h-[260px]">
          <apexchart
            width="100%"
            height="280"
            type="area"
            :options="usersByDayOptions"
            :series="[
              {
                name: 'Cadastros',
                data: dashboard.usersByDayChart?.series ?? [],
              },
            ]"
          />
        </div>
      </div>
    </div>

    <div
      class="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-slate-900 sm:p-6"
    >
      <div class="mb-6 flex items-center gap-3">
        <div class="shrink-0 rounded-2xl bg-slate-100 p-3 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
          <Clock3 :size="20" />
        </div>

        <div class="min-w-0">
          <h2 class="text-base font-bold text-slate-900 dark:text-white sm:text-lg">
            Atividades recentes
          </h2>

          <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Últimas ações registradas no sistema.
          </p>
        </div>
      </div>

      <div v-if="activities.length === 0" class="text-sm text-slate-500 dark:text-slate-400">
        Nenhuma atividade registrada.
      </div>

      <div v-else class="space-y-4">
        <div
          v-for="activity in activities"
          :key="activity.id"
          class="flex gap-3 rounded-2xl border border-slate-100 p-3 dark:border-white/10 sm:border-0 sm:p-0"
        >
          <div
            :class="[
              'mt-1 h-3 w-3 shrink-0 rounded-full',
              getActivityColor(activity.type),
            ]"
          />

          <div class="min-w-0">
            <p class="break-words font-medium text-slate-900 dark:text-white">
              {{ activity.title }}
            </p>

            <p class="mt-1 break-words text-sm text-slate-500 dark:text-slate-400">
              {{
                activity.description ||
                `${activity.userName || "Sistema"} executou uma ação.`
              }}
            </p>

            <p class="mt-1 text-xs text-slate-400">
              {{ formatDate(activity.createdAt) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>