<template>
	<h1 class="text-3xl text-center py-8 text-cyan-700 dark:text-violet-300 font-[Fangsong]">
		{{ translation.head_title }}
	</h1>
	<select v-model="category"
		class="text-center block mx-auto mb-2 -mt-1 text-sm px-1 py-0.5 hover:shadow-md text-gray-500 dark:text-gray-400 bg-inherit dark:bg-gray-900 border-solid border-2 rounded-lg border-slate-600 dark:border-slate-300 hover:border-violet-700 dark:hover:border-violet-100 ">
		<option v-for="cat in translation.categories" :key="cat.name" :value="cat.name">
			{{ cat.text }} <span> {{ cat.description }} </span>
		</option>
	</select>
	<div class="flex justify-center px-2" @click="
	  relay = false;
	  zero_result = false;
	">
		<input v-model="search_text" @keyup.enter="submit" :placeholder="translation.search"
			class="border-4 rounded-md border-solid h-12 w-full sm:w-5/6 lg:w-2/3 text-center px-10 shadow-lg hover:shadow-2xl" />
	</div>
	<div v-if="zero_result" class="text-red-700 mt-12 text-center">
		{{ translation.zero_result }}
	</div>
	<Result v-else :items="results" :relay="relay" @relay-show="relay = true" />
	<div>
		<font-awesome-icon v-if="searching && !relay" class="text-center text-xl block mx-auto mt-4"
			icon="fa-solid fa-spinner" spin />
	</div>
</template>

<script lang="ts" setup>
import Result from "./result.vue";
import { useData } from "vitepress";
import { ref, onMounted } from "vue";
const search_text = ref("");
const zero_result = ref(false);
const relay = ref(false);
const searching = ref(false);
const results = ref([]);
const category = ref("book");
const translation = useData().frontmatter.value;
const api = translation.api;

onMounted(() => {
	const search = window.location.search;
	if (search != "") {
		search_text.value = decodeURIComponent(search.substring(1));
		submit();
	}
	fetch(api, {
		method: "POST",
		body: '{"alibrary": "login"}',
	});
});

const submit = () => {
	searching.value = true;
	relay.value = false;
	results.value = [];
	const search = search_text.value;
	if (search.trim() != "") {
		fetch(api + "/" + category.value + "?" + encodeURIComponent(search))
			.then((response) => {
				if (response.status == 403) {
					zero_result.value = true;
					alert(translation.invalid_search);
				} else {
					return response.json();
				}
			})
			.then((data) => {
				if (data == undefined) {
					return;
				}
				searching.value = false;
				if (data.length > 0) {
					results.value = data;
					zero_result.value = false;
					searching.value = false;
				} else {
					zero_result.value = true;
				}
			});
	}
};
</script>
