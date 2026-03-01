<script setup lang="ts">
import { computed } from 'vue';
import "../../styles/global.css";

const props = defineProps<{
  href: string;
  currentPath: string;
  class?: string | Record<string, boolean> | (string | Record<string, boolean>)[];
}>();

const isActive = computed(() => {
  if (!props.currentPath) return false;
  const baseUrl = import.meta.env.BASE_URL || '/';
  const pathname = props.currentPath.replace(baseUrl, '');
  const subpath = pathname.match(/[^\/]+/g);
  return props.href === pathname || props.href === '/' + (subpath?.[0] || '');
});
</script>

<template>
  <a :href="href" :class="[props.class, 'inline-block no-underline', { 'font-bolder underline': isActive }]">
    <slot />
  </a>
</template>

