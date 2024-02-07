<template>
	<Base :features="features">
	<div v-for="feature in features.content" :key="feature.title" class="cards flex items-start">
		<div class="w-12 flex-shrink-0 flex flex-col text-center leading-none">
			<span class="text-gray-500 pb-2 mb-2 border-b-2 border-gray-300">
				{{ getMonth(feature.date) }}
			</span>
			<span class="font-medium text-xl text-gray-800 title-font dark:text-gray-500">{{ getDay(feature.date) }}</span>
		</div>
		<div class="pl-6 relative">
			<h2 class="tracking-widest text-xs title-font font-medium text-indigo-500 dark:text-cyan-400 mb-1">
				<a :href="withBase('/tags#' + feature.tag.toLowerCase().replace('è', 'e'))">{{
					feature.tag
				}}</a>
			</h2>
			<h1 class="title-font text-xl font-medium mb-3 hover:underline underline-offset-8">
				<a :href="withBase(feature.link)">{{ feature.title }}</a>
			</h1>
			<blockquote class="leading-relaxed mb-5 text-gray-600 dark:text-gray-400 whitespace-pre-wrap">
				{{ feature.excerpt }}
			</blockquote>
			<div v-if="feature.author != 'Jianyu MA'" class="inline-flex items-center absolute right-0">
				<img alt="blog" :src="feature.img" class="w-8 h-8 rounded-full flex-shrink-0 object-cover object-center" />
				<span class="flex-grow flex flex-col pl-3">
					<span class="title-font font-medium">{{ feature.author }}</span>
				</span>
			</div>
		</div>
	</div>
	</Base>
</template>

<script lang="ts" setup>
import Base from "./base.vue";
import { withBase } from 'vitepress';
defineProps({ features: Object });

function getMonth(dateString: string) {
	const date = new Date(dateString);
	return date.toString().slice(4, 7);
}

function getDay(dateString: string) {
	const date = new Date(dateString);
	return date.toString().slice(8, 10);
}
</script>
