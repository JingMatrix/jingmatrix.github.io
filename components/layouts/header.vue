<template>
	<div class="relative mb-16" v-if="frontmatter.header">
		<h1 class="text-3xl text-center pb-16">{{ frontmatter.title }}</h1>
		<div class="text-sm mb-2 text-cyan-500 hover:text-black">
			<a v-for="tag in frontmatter.tags"
				class="mr-4 p-1 rounded-md border-solid border-2 dark:border-gray-600 dark:hover:text-cyan-300"
				:href="withBase('/tags#' + tag.toLowerCase())">
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
import { onBeforeMount } from "vue";

onBeforeMount(async () => {
	const { registerSW } = await import("virtual:pwa-register");
	registerSW({
		immediate: true,
		onRegistered() {
			console.info("Service Worker registered");
		},
		onRegisterError(e) {
			console.error("Service Worker registration error!", e);
		},
	});
});

const frontmatter = useData().frontmatter;

const site = useData().site;

function formatDateByLocale(date: Date, lang: string) {
	const options: Intl.DateTimeFormatOptions = {
		year: "numeric",
		month: "long",
		day: "numeric",
		weekday: "long",
	};
	return new Date(date).toLocaleDateString(lang, options);
}
</script>





