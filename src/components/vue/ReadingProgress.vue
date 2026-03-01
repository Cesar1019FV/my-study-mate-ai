<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

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
  <div class="progress-container">
    <div class="progress-bar" :style="{ width: `${progress}%` }"></div>
  </div>
</template>

<style scoped>
.progress-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background-color: transparent;
  z-index: 1000;
}
.progress-bar {
  height: 100%;
  background-color: var(--accent);
  transition: width 0.1s ease-out;
}
</style>
