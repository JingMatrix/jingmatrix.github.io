<script lang="ts" setup>
import { useData } from "vitepress";
import Author from "./author.vue";

const site = useData().site;
const lang = site.value.lang;
defineProps({
	author: Object,
	title: String,
	date: String,
	tags: Array,
});

function formatDateByLocale(date) {
	const options: Intl.DateTimeFormatOptions = {
		year: "2-digit",
		month: "long",
		day: "numeric",
		weekday: "long",
	};
	return new Date(date).toLocaleDateString(lang, options);
}
</script>

<template>
	<article>
		<header>
			<div>
				<h1> {{ title }} </h1>
				<div>
					<div>
						<Author :author="author" />
					</div>
					<div> {{ formatDateByLocale(date) }} </div>
				</div>
			</div>
		</header>
		<Content :class="'markdown ' + 'blog-' + lang" />
		<div v-if="tags.length > 0">
			<div>
				<span v-for="tag in tags">
					{{ tag }}
				</span>
			</div>
		</div>
	</article>
</template>

