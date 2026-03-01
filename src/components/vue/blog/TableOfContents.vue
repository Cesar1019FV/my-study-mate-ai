<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

interface Heading {
  id: string;
  text: string;
  level: number;
}

const headings = ref<Heading[]>([]);
const activeId = ref<string>('');
let observer: IntersectionObserver | null = null;

onMounted(() => {
  // Encontrar headers generados por Astro en .prose iterando dinámicamente
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

  // Configuro la hidratación pasiva para que detecte el scroll visual
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
  <aside class="toc-container" v-if="headings.length > 0">
    <h3 class="toc-title">Tabla de Contenidos</h3>
    <nav>
      <ul>
        <li v-for="h in headings" :key="h.id" :class="[`level-${h.level}`, { active: activeId === h.id }]">
          <a :href="`#${h.id}`">{{ h.text }}</a>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<style scoped>
.toc-container {
  padding: 1.5rem;
  background-color: rgb(var(--gray-light), 0.3);
  border-radius: 12px;
  position: sticky;
  top: 2rem;
  min-width: 220px;
  max-width: 260px;
  margin-right: 6rem;
}
.toc-title {
  font-size: 1.2rem;
  margin-top: 0;
  margin-bottom: 1rem;
}
nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
nav li {
  margin-bottom: 0.5rem;
  line-height: 1.4;
}
nav li a {
  color: rgb(var(--gray));
  text-decoration: none;
  transition: color 0.2s;
  font-size: 0.95rem;
}
nav li a:hover {
  color: var(--accent);
}
.level-3 {
  padding-left: 1rem;
  font-size: 0.9rem;
}
nav li.active a {
  color: var(--accent);
  font-weight: bold;
}

@media (max-width: 1000px) {
  .toc-container {
    position: static;
    margin-right: 0;
    margin-bottom: 2rem;
    max-width: 100%;
  }
}
</style>
