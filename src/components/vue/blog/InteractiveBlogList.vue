<script setup lang="ts">
import { computed, ref } from 'vue';
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

    <ul>
      <li v-for="post in filteredPosts" :key="post.id">
        <a :href="`/blog/${post.id}/`">
          <img v-if="post.heroImage" width="720" height="360" :src="post.heroImage.src" alt="" />
          <h4 class="title">{{ post.title }}</h4>
          <p class="date">
            <time :datetime="post.pubDate">{{ post.pubDate }}</time>
          </p>
        </a>
      </li>
    </ul>

    <div v-if="filteredPosts.length === 0" class="no-results">
        <p>No posts found matching your search "{{ searchQuery }}".</p>
    </div>
  </div>
</template>

<style scoped>
ul {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  list-style-type: none;
  margin: 0;
  padding: 0;
}
ul li {
  width: calc(50% - 1rem);
}
ul li * {
  text-decoration: none;
  transition: 0.2s ease;
}
ul li:first-child {
  width: 100%;
  margin-bottom: 1rem;
  text-align: center;
}
ul li:first-child img {
  width: 100%;
}
ul li:first-child .title {
  font-size: 2.369rem;
}
ul li img {
  margin-bottom: 0.5rem;
  border-radius: 12px;
}
ul li a {
  display: block;
}
.title {
  margin: 0;
  color: rgb(var(--black));
  line-height: 1;
}
.date {
  margin: 0;
  color: rgb(var(--gray));
}
ul li a:hover h4,
ul li a:hover .date {
  color: rgb(var(--accent));
}
ul a:hover img {
  box-shadow: var(--box-shadow);
}
@media (max-width: 720px) {
  ul {
    gap: 0.5em;
  }
  ul li {
    width: 100%;
    text-align: center;
  }
  ul li:first-child {
    margin-bottom: 0;
  }
  ul li:first-child .title {
    font-size: 1.563em;
  }
}

.no-results {
    text-align: center;
    padding: 3rem;
    color: rgb(var(--gray));
    background: rgb(var(--gray-light), 0.2);
    border-radius: 12px;
}
.clear-btn {
    margin-top: 1rem;
    padding: 0.5rem 1.5rem;
    background-color: var(--accent);
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: bold;
    transition: opacity 0.2s;
}
.clear-btn:hover {
    opacity: 0.8;
}
</style>
