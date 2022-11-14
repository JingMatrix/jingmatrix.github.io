<template>
	<h1 class="text-3xl text-center py-8 text-cyan-700 dark:text-violet-300 font-[STFangsong]"> {{ translation.head_title
	}} </h1>
	<div class="flex justify-center px-2">
		<input v-model="search_text" @keyup.enter="submit" :placeholder="translation.search"
			class="border-4 rounded-md border-solid h-12 w-full sm:w-5/6 lg:w-2/3 text-center px-10 shadow-lg hover:shadow-2xl" />
	</div>
	<Result :items="results" />
</template>

<script lang="ts" setup>
import Result from './result.vue'
import { useData } from 'vitepress'
import { ref } from 'vue'
const search_text = ref('');
const results = ref([])
const translation = useData().frontmatter.value

const submit = (e: Event) => {
	const search = (e.target as HTMLInputElement).value || search_text.value
	if (search.trim() != '') {
		fetch(translation.api + '?' + encodeURIComponent(search)).then((response) => response.json()).
			then((data) => { results.value = data; }
			)
	}
}
</script>
