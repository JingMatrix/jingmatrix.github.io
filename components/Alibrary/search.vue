<template>
	<h1 class="text-3xl text-center py-8 text-cyan-700 dark:text-violet-300 font-[STFangsong]">
		{{
		translation.head_title
		}} </h1>
	<div class="flex justify-center px-2" @click="relay = false; zero_result = false">
		<input v-model="search_text" @keyup.enter="submit" :placeholder="translation.search"
			class="border-4 rounded-md border-solid h-12 w-full sm:w-5/6 lg:w-2/3 text-center px-10 shadow-lg hover:shadow-2xl" />
	</div>
	<div v-if="zero_result" class="text-red-700 mt-12 text-center">
		{{ translation.zero_result }}
	</div>
	<Result v-else :items="results" :relay="relay" @relay-show="relay = true" />
	<div>
		<font-awesome-icon v-if="searching && ! relay" class="text-center text-xl block mx-auto mt-4"
			icon="fa-solid fa-spinner" spin />
	</div>
</template>

<script lang="ts" setup>
import Result from './result.vue'
import { useData } from 'vitepress'
import { ref } from 'vue'
const search_text = ref('');
const zero_result = ref(false)
const relay = ref(false)
const searching = ref(false)
const results = ref([])
const translation = useData().frontmatter.value
const api = translation.api[0]

const submit = (e: Event) => {
	searching.value = true;
	const search = (e.target as HTMLInputElement).value || search_text.value
	if (search.trim() != '') {
		fetch(api + '?' + encodeURIComponent(search)).then((response) => response.json()).
			then((data) => {
				searching.value = false;
				if (data.length > 0) {
					results.value = data;
					zero_result.value = false;
				} else {
					zero_result.value = true;
				}
			}
			)
	}
}
</script>
