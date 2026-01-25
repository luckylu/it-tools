<script setup lang="ts">
import { useHead } from '@vueuse/head';
import { useToolStore } from '@/tools/tools.store';
import ToolCard from '../components/ToolCard.vue';
import { computed } from 'vue';

const toolStore = useToolStore();
useHead({ title: 'Tech Blog - Kit For Dev' });

// We want to list all tools. We can reuse the ToolCard but we might want to override the click behavior
// or we can just create a list of links.
// For now, let's use a similar grid layout but maybe a different card style or just reuse ToolCard 
// if we can modify the link destination.
// However, ToolCard likely hardcodes the link to tool.path. 
// A custom card is safer to avoid hacking ToolCard.

const tools = computed(() => toolStore.tools);
</script>

<template>
  <div class="pt-50px max-w-1200px mx-auto px-4">
    <div class="text-center mb-10">
      <h1 class="text-3xl font-bold mb-4">Tech Blog</h1>
      <p class="text-gray-500">Learn about the technology behind the tools.</p>
    </div>

    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <router-link
        v-for="tool in tools"
        :key="tool.name"
        :to="`/blog${tool.path}`"
        class="block p-6 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow border border-transparent hover:border-primary"
      >
        <div class="flex items-center mb-4">
          <n-icon :component="tool.icon" size="24" class="mr-3 text-primary" />
          <h2 class="text-lg font-semibold">{{ tool.name }}</h2>
        </div>
        <p class="text-sm text-gray-500 dark:text-gray-400 line-clamp-3">
          {{ tool.description }}
        </p>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.text-primary {
  color: var(--primary-color);
}
</style>
