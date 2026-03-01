<script setup lang="ts">
const searchQuery = defineModel<string>();
</script>

<template>
  <div class="search-container">
    <input 
      type="text" 
      v-model="searchQuery"
      placeholder="Search posts by title..." 
      class="search-input"
    />
  </div>
</template>

<style scoped>
.search-container {
  margin-bottom: 1.5rem;
}
.search-input {
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 1.1rem;
  border: 1px solid rgb(var(--gray-light));
  border-radius: 8px;
  background-color: white;
  color: rgb(var(--black));
  transition: border-color 0.2s ease;
}
.search-input:focus {
  outline: none;
  border-color: rgb(var(--accent));
}
</style>
