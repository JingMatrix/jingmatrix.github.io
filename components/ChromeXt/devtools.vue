<template>
	<div>
		<h2 class="mt-16 mb-4 text-xl text-center dark:text-violet-400 text-cyan-600">{{
			translation.dev_title
		}}</h2>
		<div v-for="p in pages" :key="p.id" class="pl-4 py-3 pr-6">
			<div class="flex justify-between">
				<span class="shrink w-64 text-slate-600 dark:text-slate-300" v-html="p.title"></span>
				<a :href="p.devtoolsFrontendUrl" target="_blank"
					class="flex-shrink-0 text-green-600 dark:text-green-300 my-auto">{{ translation.inspect }}</a>
			</div>
			<p class="text-gray-400 dark:text-gray-500 text-sm">{{ p.url }}</p>
		</div>
		<p v-if="pages.length == 0" class="px-4 pt-6 indent-2">{{ translation.dev_intro }}</p>
	</div>
</template>


<script lang="ts" setup>
import { useData } from "vitepress";
import { DevInfo } from "./type"

defineProps<{ pages: Array<DevInfo> }>();
const translation = useData().frontmatter.value;

</script>
