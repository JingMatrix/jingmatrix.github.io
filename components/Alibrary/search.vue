<template>
	<h1 class="text-3xl text-center py-8 text-cyan-700 dark:text-violet-300 font-[STFangsong]" @click="api_info = true">
		{{
		translation.head_title
		}} </h1>
	<div class="flex justify-center px-2" @click="relay = false; api_info = false">
		<input v-model="search_text" @keyup.enter="submit" :placeholder="translation.search"
			class="border-4 rounded-md border-solid h-12 w-full sm:w-5/6 lg:w-2/3 text-center px-10 shadow-lg hover:shadow-2xl" />
	</div>
	<div v-if="api_info" class="text-center mt-36 px-4">
		<div v-if="zero_result" class="text-red-700 mb-6 -mt-12">
			{{ translation.zero_result }}
		</div>
		<span class="text-gray-400"> {{ translation.api_choice }} </span>
<select v-model="api_choice" @change="update_api"
			class="p-2 mb-6 mt-3 text-sm text-gray-900 border-2 border-solid ring-2 border-gray-300 rounded-lg bg-gray-100 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
			<option value="Fast"> {{ translation.fast_api.name }} </option>
			<option value="Large"> {{ translation.large_api.name }} </option>
		</select>
		<div class="max-w-md mx-auto mt-4 px-3 border-2 rounded-lg border-solid py-2">
			{{ api_choice == "Fast" ? translation.fast_api.info: translation.large_api.info }}
		</div>
	</div>
	<Result v-else :items="results" :relay="relay" @relay-show="relay = true" :api="api" />
	<div>
		<font-awesome-icon v-if="searching" class="text-center text-xl block mx-auto mt-4" icon="fa-solid fa-spinner"
			spin />
	</div>
</template>

<script lang="ts" setup>
import Result from './result.vue'
import { useData } from 'vitepress'
import { ref } from 'vue'
const search_text = ref('');
const api_choice = ref('Fast')
const api_info = ref(true)
const zero_result = ref(false)
const relay = ref(false)
const searching = ref(false)
const results = ref([])
const translation = useData().frontmatter.value
const api = ref('')
api.value = process.env.NODE_ENV === "production"
	? translation.fast_api.entry_point
	: "http://localhost:4000/Alibrary"

const submit = (e: Event) => {
	searching.value = true;
	const search = (e.target as HTMLInputElement).value || search_text.value
	if (search.trim() != '') {
		fetch(api.value + '?' + encodeURIComponent(search)).then((response) => response.json()).
			then((data) => {
				searching.value = false;
				if (data.length > 0) {
					results.value = data;
					api_info.value = false;
					zero_result.value = false;
				} else {
					api_info.value = true;
					zero_result.value = true;
				}
			}
			)
	}
}

const update_api = (e: Event) => {
	const choice = (e.target as HTMLInputElement).value || api_choice.value
	const old_api = api.value
	results.value = []
	if (choice == "Fast") {
		api.value = old_api[4] === "s"
			? translation.fast_api.entry_point
			: "http://localhost:4000/Alibrary"
	} else if (choice == "Large") {
		api.value = old_api[4] === "s"
			? translation.large_api.entry_point
			: "http://localhost:8080"
	}
}
</script>
