<template>
	<div>
		<h2 class="mt-16 mb-4 text-xl text-center dark:text-violet-400 text-cyan-600">{{
		translation.dev_title }}</h2>
		<div v-for="p in pages" :key="p.id" class="pl-4 py-3 pr-6">
			<div class="flex justify-between">
				<span class="shrink w-64 text-slate-600 dark:text-slate-300">{{ p.title }}</span>
				<a :href="fixUrl(p.devtoolsFrontendUrl, port)" target="_blank"
					class="flex-shrink-0 text-green-600 dark:text-green-300 my-auto">{{ translation.inspect }}</a>
			</div>
			<p class="text-gray-400 dark:text-gray-500 text-sm">{{ p.url }}</p>
		</div>
	</div>
</template>


<script lang="ts" setup>
import { useData } from "vitepress";

import { onMounted } from "vue";
import { ref } from "vue";

defineProps<{ port: number }>();
const translation = useData().frontmatter.value;

type DevInfo = {
	description: string,
	devtoolsFrontendUrl: string,
	id: string,
	title: string,
	type: string,
	url: string,
	webSocketDebuggerUrl: string
}

const pages = ref([])

function fixUrl(url: string, port: number) {
	return url.replace("?ws=/devtools/page/",
		`?ws=localhost:${port}/devtools/page/`)
}

function getPages() {
	globalThis.ChromeXt(JSON.stringify({ action: "getPages", payload: "" }));
}

onMounted(() => {
	window.addEventListener("pages", (e: CustomEvent) => {
		pages.value = []
		e.detail.forEach((it: DevInfo) => {
			if (!it.url.startsWith("https://chrome-devtools-frontend.appspot.com") && window.location.href != it.url) {
				pages.value.push(it)
			}
		}
		)
	});
	getPages()
})

</script>
