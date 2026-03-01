<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import "../../styles/global.css";

const progress = ref(0);

const updateProgress = () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  const windowHeight = scrollHeight - clientHeight;
  if (windowHeight > 0) {
    progress.value = (scrollTop / windowHeight) * 100;
  } else {
    progress.value = 0;
  }
};

onMounted(() => {
  window.addEventListener('scroll', updateProgress);
  updateProgress();
});

onUnmounted(() => {
  window.removeEventListener('scroll', updateProgress);
});
</script>

<template>
  <div class="fixed top-0 left-0 w-full h-1 bg-transparent z-[2000]">
    <div class="h-full bg-[var(--accent)] transition-[width] duration-100 ease-out" :style="{ width: `${progress}%` }"></div>
  </div>
</template>

