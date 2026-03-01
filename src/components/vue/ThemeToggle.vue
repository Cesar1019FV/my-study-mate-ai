<script setup lang="ts">
import { useThemeStore } from '../../stores/theme';
import { onMounted, ref } from 'vue';
import "../../styles/global.css";

const themeStore = ref<ReturnType<typeof useThemeStore>>();

onMounted(() => {
  themeStore.value = useThemeStore();
  themeStore.value.initTheme();
});
</script>

<template>
  <button
    @click="themeStore?.toggleTheme()"
    class="bg-none border-none text-2xl cursor-pointer p-2 flex items-center justify-center transition-transform duration-200 ease-in-out hover:scale-110"
    aria-label="Toggle Theme"
  >
    <span v-if="themeStore?.isDark">🌙</span>
    <span v-else>☀️</span>
  </button>
</template>

