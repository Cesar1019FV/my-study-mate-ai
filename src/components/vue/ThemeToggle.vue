<script setup lang="ts">
import { useThemeStore } from '../../stores/theme';
import { onMounted, ref } from 'vue';

const themeStore = ref<ReturnType<typeof useThemeStore>>();

onMounted(() => {
  themeStore.value = useThemeStore();
  themeStore.value.initTheme();
});
</script>

<template>
  <button @click="themeStore?.toggleTheme()" class="theme-toggle" aria-label="Toggle Theme">
    <span v-if="themeStore?.isDark">🌙</span>
    <span v-else>☀️</span>
  </button>
</template>

<style scoped>
.theme-toggle {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease;
}
.theme-toggle:hover {
  transform: scale(1.1);
}
</style>
