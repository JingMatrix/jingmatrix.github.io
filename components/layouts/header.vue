<template>
  <div class="relative mb-16" v-if="frontmatter.header">
    <h1>{{ frontmatter.title }}</h1>
    <div class="text-sm mb-2 text-cyan-500 hover:text-black">
      <a
        v-for="tag in frontmatter.tags"
        class="mr-4 p-1 rounded-md border-solid border-2 dark:border-gray-600 dark:hover:text-cyan-300"
        :href="withBase('/tags#' + tag.toLowerCase())"
      >
        {{ tag }}
      </a>
    </div>
    <span class="text-gray-400 dark:text-gray-600">
      {{ formatDateByLocale(frontmatter.date, site.lang) }}
    </span>
    <Author v-if="frontmatter.author || false" :author="frontmatter.author" />
  </div>
</template>

<script lang="ts" setup>
import Author from "../blog/author.vue";
import { useData, withBase } from "vitepress";

const frontmatter = useData().frontmatter;
const site = useData().site;

function formatDateByLocale(date: Date, lang: string) {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  };
  let localDate = new Date(date).toLocaleDateString(
    lang == "zh" ? "zh-Hans-CN-u-nu-hanidec" : lang,
    options
  );
  if (lang == "zh")
    localDate = localDate
      .replaceAll(/一(?=\S[日月])/g, "十")
      .replace(/二(?=\S[日])/, "二十")
      .replaceAll("十〇", "十")
      .replaceAll("日", "日，");
  return localDate;
}
</script>

<style lang="postcss" scoped>
@reference "tailwindcss";

h1 {
    @apply text-3xl text-center pb-16;
}
</style>
