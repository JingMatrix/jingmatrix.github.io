<script lang="ts" setup>
import DefaultTheme from "vitepress/theme";
import Author from "../blog/author.vue";
import { useData } from "vitepress";
const { frontmatter } = useData();
const { Layout } = DefaultTheme;
const site = useData().site;
function formatDateByLocale(date, lang) {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  };
  return new Date(date).toLocaleDateString(lang, options);
}
</script>

<template>
  <Layout>
    <template #doc-before>
      <div class="relative mb-16" v-if="frontmatter.header">
        <h1 class="text-3xl text-center pb-16">{{ frontmatter.title }}</h1>
        <div class="text-sm mb-2 text-cyan-500 hover:text-black">
          <a v-for="tag in frontmatter.tags" class="mr-4 p-1 rounded-md border-solid border-2 dark:border-gray-600 dark:hover:text-cyan-300"
		  :href='"/tags#" + tag.toLowerCase()'>
            {{ tag }}
          </a>
        </div>
        <span class="text-gray-400 dark:text-gray-600">
          {{ formatDateByLocale(frontmatter.date, site.lang) }}
        </span>
        <Author
          v-if="frontmatter.author || false"
          :author="frontmatter.author"
        />
      </div>
    </template>
  </Layout>
</template>
