<script setup lang="ts">
import { LayoutDashboard, LogOut, Users } from "lucide-vue-next";
import { useRouter } from "vue-router";
import { useAuthStore } from "../modules/auth/stores/auth.store";

const router = useRouter();
const auth = useAuthStore();

function logout() {
  auth.logout();
  router.push("/login");
}
</script>

<template>
  <div class="min-h-screen bg-slate-100 text-slate-900">
    <aside class="fixed inset-y-0 left-0 w-64 bg-slate-950 text-white">
      <div class="flex h-20 items-center border-b border-white/10 px-6">
        <h1 class="text-xl font-bold">AlexBase</h1>
      </div>

      <nav class="space-y-2 p-4">
        <RouterLink
          to="/dashboard"
          class="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-300 transition hover:bg-white/10 hover:text-white"
        >
          <LayoutDashboard :size="18" />
          Dashboard
        </RouterLink>

        <RouterLink
          to="/users"
          class="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-300 transition hover:bg-white/10 hover:text-white"
        >
          <Users :size="18" />
          Usuários
        </RouterLink>
      </nav>
    </aside>

    <div class="ml-64 min-h-screen">
      <header class="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-8">
        <div>
          <h2 class="font-semibold text-slate-900">
            {{ auth.user?.name }}
          </h2>
          <p class="text-sm text-slate-500">
            {{ auth.user?.role }}
          </p>
        </div>

        <button
          class="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
          @click="logout"
        >
          <LogOut :size="16" />
          Sair
        </button>
      </header>

      <main class="p-8">
        <RouterView />
      </main>
    </div>
  </div>
</template>