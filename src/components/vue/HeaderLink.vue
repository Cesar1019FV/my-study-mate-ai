<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  href: string;
  currentPath: string;
  class?: string | Record<string, boolean> | (string | Record<string, boolean>)[];
}>();

const isActive = computed(() => {
  if (!props.currentPath) return false;
  // Use a fallback for import.meta.env.BASE_URL if it's undefined
  const baseUrl = import.meta.env.BASE_URL || '/';
  const pathname = props.currentPath.replace(baseUrl, '');
  const subpath = pathname.match(/[^\/]+/g);
  return props.href === pathname || props.href === '/' + (subpath?.[0] || '');
});
</script>

<template>
  <a :href="href" :class="[props.class, { active: isActive }]">
    <slot />
  </a>
</template>

<style scoped>
a {
  display: inline-block;
  text-decoration: none;
}
a.active {
  font-weight: bolder;
  text-decoration: underline;
}
</style>
