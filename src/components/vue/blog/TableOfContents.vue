<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import "../../../styles/global.css";

interface Heading {
  id: string;
  text: string;
  level: number;
}

const headings = ref<Heading[]>([]);
const activeId = ref<string>('');
let observer: IntersectionObserver | null = null;

onMounted(() => {
  const elements = document.querySelectorAll('.prose h2, .prose h3');
  
  elements.forEach((el) => {
    if (!el.id) {
      el.id = el.textContent?.toLowerCase().replace(/\s+/g, '-') || 'section';
    }
    headings.value.push({
      id: el.id,
      text: el.textContent || '',
      level: el.tagName === 'H3' ? 3 : 2
    });
  });

  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        activeId.value = entry.target.id;
      }
    });
  }, { rootMargin: '0px 0px -80% 0px' });

  elements.forEach(el => observer?.observe(el));
});

onUnmounted(() => {
  if (observer) observer.disconnect();
});
</script>

<template>
  <aside 
    v-if="headings.length > 0"
    class="toc-container p-6 bg-[rgb(var(--gray-light),0.3)] rounded-xl sticky top-8 min-w-[220px] max-w-[260px] lg:relative lg:top-0 lg:mr-0 lg:mb-8 lg:max-w-full"
  >
    <h3 class="text-xl mt-0 mb-4">Tabla de Contenidos</h3>
    <nav>
      <ul class="list-none p-0 m-0">
        <li 
          v-for="h in headings" 
          :key="h.id" 
          :class="[
            'mb-2 leading-[1.4]',
            h.level === 3 ? 'pl-4 text-[0.9rem]' : 'text-[0.95rem]',
            { 'active font-bold': activeId === h.id }
          ]"
        >
          <a 
            :href="`#${h.id}`"
            :class="[
              'no-underline transition-colors duration-200',
              activeId === h.id ? 'text-[var(--accent)]' : 'text-[rgb(var(--gray))] hover:text-[var(--accent)]'
            ]"
          >
            {{ h.text }}
          </a>
        </li>
      </ul>
    </nav>
  </aside>
</template>

