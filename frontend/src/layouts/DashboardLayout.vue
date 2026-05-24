<script setup lang="ts">
import {
  LayoutDashboard,
  LogOut,
  Users,
  UserCircle,
  Moon,
  Sun,
  Menu,
  X,
} from "lucide-vue-next";

import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../modules/auth/stores/auth.store";
import { useThemeStore } from "../stores/themeStore";

const router = useRouter();
const auth = useAuthStore();
const themeStore = useThemeStore();

const sidebarOpen = ref(false);

function logout() {
  auth.logout();
  router.push("/login");
}

function closeSidebar() {
  sidebarOpen.value = false;
}
</script>

<template>
  <div class="min-h-screen bg-slate-100 text-slate-900 transition-colors dark:bg-slate-950 dark:text-white">
    <div
      v-if="sidebarOpen"
      class="fixed inset-0 z-40 bg-black/50 lg:hidden"
      @click="closeSidebar"
    />

    <aside
      :class="[
        'fixed inset-y-0 left-0 z-50 w-64 transform bg-slate-950 text-white transition-transform duration-300 lg:translate-x-0',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      ]"
    >
      <div class="flex h-20 items-center justify-between border-b border-white/10 px-6">
        <h1 class="text-xl font-bold">AlexBase</h1>

        <button class="lg:hidden" @click="closeSidebar">
          <X :size="22" />
        </button>
      </div>

      <nav class="space-y-2 p-4">
        <RouterLink
          to="/dashboard"
          class="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-300 transition hover:bg-white/10 hover:text-white"
          @click="closeSidebar"
        >
          <LayoutDashboard :size="18" />
          Dashboard
        </RouterLink>

        <RouterLink
          to="/users"
          class="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-300 transition hover:bg-white/10 hover:text-white"
          @click="closeSidebar"
        >
          <Users :size="18" />
          Usuários
        </RouterLink>

        <RouterLink
          to="/profile"
          class="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-300 transition hover:bg-white/10 hover:text-white"
          @click="closeSidebar"
        >
          <UserCircle :size="18" />
          Minha conta
        </RouterLink>
      </nav>
    </aside>

    <div class="min-h-screen lg:ml-64">
      <header class="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-4 transition-colors dark:border-white/10 dark:bg-slate-900 sm:px-6 lg:px-8">
        <div class="flex items-center gap-3">
          <button
            class="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 lg:hidden dark:border-white/10 dark:bg-slate-800 dark:text-white"
            @click="sidebarOpen = true"
          >
            <Menu :size="20" />
          </button>

          <div>
            <h2 class="max-w-[150px] truncate font-semibold text-slate-900 dark:text-white sm:max-w-none">
              {{ auth.user?.name }}
            </h2>

            <p class="text-sm text-slate-500 dark:text-slate-400">
              {{ auth.user?.role }}
            </p>
          </div>
        </div>

        <div class="flex items-center gap-2 sm:gap-3">
          <button
            @click="themeStore.toggleTheme"
            class="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-100 dark:border-white/10 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
          >
            <Sun v-if="themeStore.theme === 'dark'" :size="18" />
            <Moon v-else :size="18" />
          </button>

          <button
            class="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:border-white/10 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700 sm:px-4"
            @click="logout"
          >
            <LogOut :size="16" />
            <span class="hidden sm:inline">Sair</span>
          </button>
        </div>
      </header>

      <main class="p-4 sm:p-6 lg:p-8">
        <RouterView />
      </main>
    </div>
  </div>
</template>