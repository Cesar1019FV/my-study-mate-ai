<script setup lang="ts">
import { computed, ref } from 'vue';
import "../../../styles/global.css";
import SearchPosts from '../search/SearchPosts.vue';

export interface Post {
  id: string;
  title: string;
  pubDate: string;
  heroImage: { src: string } | null;
}

const props = withDefaults(defineProps<{
  posts: Post[];
}>(), {
  posts: () => []
});

const searchQuery = ref('');

const filteredPosts = computed(() => {
  const query = searchQuery.value.toLowerCase().trim();
  if (!query) return props.posts;
  
  return props.posts.filter((post) => {
    return post.title.toLowerCase().includes(query);
  });
});
</script>

<template>
  <div class="interactive-blog-list">
    <SearchPosts v-model="searchQuery" />

    <ul class="flex flex-wrap gap-8 list-none m-0 p-0 md:gap-2">
      <li 
        v-for="post in filteredPosts" 
        :key="post.id"
        class="group w-[calc(50%-1rem)] first:w-full first:mb-4 first:text-center md:w-full md:first:mb-0 md:text-center"
      >
        <a :href="`/blog/${post.id}/`" class="block no-underline transition-all duration-200 ease-in-out group-hover:no-underline">
          <img 
            v-if="post.heroImage" 
            width="720" 
            height="360" 
            :src="post.heroImage.src" 
            alt="" 
            class="mb-2 rounded-xl group-first:w-full group-hover:shadow-[0_2px_6px_rgba(var(--gray),0.25),0_8px_24px_rgba(var(--gray),0.33),0_16px_32px_rgba(var(--gray),0.33)]"
          />
          <h4 class="m-0 text-[rgb(var(--black))] leading-none group-first:text-[2.369rem] md:group-first:text-[1.563em] group-hover:text-[rgb(var(--accent))]">
            {{ post.title }}
          </h4>
          <p class="m-0 text-[rgb(var(--gray))] group-hover:text-[rgb(var(--accent))]">
            <time :datetime="post.pubDate">{{ post.pubDate }}</time>
          </p>
        </a>
      </li>
    </ul>

    <div v-if="filteredPosts.length === 0" class="text-center p-12 text-[rgb(var(--gray))] bg-[rgb(var(--gray-light),0.2)] rounded-xl">
        <p>No posts found matching your search "{{ searchQuery }}".</p>
    </div>
  </div>
</template>

