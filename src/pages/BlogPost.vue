<script setup lang="ts">
import { useHead } from '@vueuse/head';
import { useRoute, useRouter } from 'vue-router';
import { computed } from 'vue';
import { useToolStore } from '@/tools/tools.store';
import { useI18n } from 'vue-i18n';

const route = useRoute();
const router = useRouter();
const toolStore = useToolStore();
const { t, tm } = useI18n();

const slug = computed(() => route.params.slug as string);

const tool = computed(() => {
    // Exact match on path usually, but tool.path has leading slash
    const path = `/${slug.value}`;
    return toolStore.tools.find(t => t.path === path);
});

// Redirect if tool not found
if (!tool.value) {
    // Only redirect if mounted? Or check immediately.
    // Ideally we should show 404
}

const articleKey = computed(() => {
    if (!tool.value) return '';
    // Construct the i18n key: tools.{toolKey}.article
    // We need the key used in en.yml, usually implied by the tool name or translation logic.
    // The tool definition usually has name: translate('tools.tool-name.title')
    // We need to reverse engineer the key 'tool-name' from the tool object or path.
    // Most tools path is /tool-name, so we can use slug.value
    return `tools.${slug.value}.article`;
});

const hasArticle = computed(() => {
    // Check if the translation exists and is not empty
    const content = t(articleKey.value);
    return content && content !== articleKey.value;
});

useHead({
    title: computed(() => tool.value ? `${tool.value.name} - Tech Details` : 'Article Not Found')
});
</script>

<template>
  <div class="pt-50px max-w-800px mx-auto px-4 pb-20">
    <div v-if="tool">
      <div class="mb-8">
        <router-link to="/blog" class="text-primary hover:underline flex items-center mb-4">
             &larr; Back to Blog
        </router-link>
        <h1 class="text-4xl font-bold mb-4 flex items-center">
             <n-icon :component="tool.icon" class="mr-3" />
             {{ tool.name }}
        </h1>
        <p class="text-xl text-gray-500">{{ tool.description }}</p>
      </div>

      <div v-if="hasArticle">
         <c-markdown :markdown="$t(articleKey)" />
      </div>
      <div v-else class="p-8 bg-gray-100 dark:bg-gray-800 rounded-lg text-center">
          <p class="text-lg">Detailed technical article coming soon.</p>
          <div class="mt-4">
            <router-link :to="tool.path" class="text-primary font-bold">
                Go to Tool &rarr;
            </router-link>
          </div>
      </div>
      
      <div class="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <h3 class="text-lg font-semibold mb-4">Try the tool</h3>
          <router-link 
            :to="tool.path" 
            class="inline-block px-6 py-3 bg-primary text-black rounded-lg hover:bg-opacity-90 transition-colors"
          >
            Open {{ tool.name }}
          </router-link>
      </div>
    </div>
    
    <div v-else class="text-center pt-20">
        <h1 class="text-2xl">Article not found</h1>
        <router-link to="/blog" class="text-primary mt-4 inline-block">Return to Blog</router-link>
    </div>
  </div>
</template>

<style scoped>
.text-primary {
  color: var(--primary-color);
}
.bg-primary {
  background-color: var(--primary-color);
}
</style>
