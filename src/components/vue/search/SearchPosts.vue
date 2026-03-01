<script setup lang="ts">
const searchQuery = defineModel<string>();
import "../../../styles/global.css";
</script>

<template>
  <div class="mb-6">
    <input 
      type="text" 
      v-model="searchQuery"
      placeholder="Search posts by title..." 
      class="w-full px-4 py-3 text-[1.1rem] border border-[rgb(var(--gray-light))] rounded-lg bg-white text-[rgb(var(--black))] transition-colors duration-200 ease-in-out focus:outline-none focus:border-[rgb(var(--accent))]"
    />
  </div>
</template>

