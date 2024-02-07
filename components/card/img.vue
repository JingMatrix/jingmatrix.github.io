<template>
	<Base :features="features">
	<div v-for="feature in features.content" :key="feature.title" class="shadow-lg hover:shadow-xl cards">
		<div class="flex h-64 justify-center flex-col">
			<img :src="withBase(feature.img)" :alt="feature.alt || feature.title" :class="feature.css" />
		</div>
		<div class="px-2 py-4">
			<a :href="withBase(feature.link)" download=""
				class="no-underline flex items-baseline hover:underline font-medium text-xl mb-2 underline-offset-8">
				{{ feature.title }}
				<font-awesome-icon icon="fa-regular fa-file-pdf" class="pl-2 text-sm" />
			</a>
			<p class="text-gray-600 text-base">
				{{ feature.description }}
			</p>
		</div>
		<div class="px-6 pt-4 pb-2">
			<span v-for="tag in feature.tags" :key="tag"
				class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
				{{ tag }}</span>
		</div>
	</div>
	</Base>
</template>
<script lang="ts" setup>
import Base from "./base.vue";
import { withBase } from "vitepress";
defineProps({ features: Object });
</script>
