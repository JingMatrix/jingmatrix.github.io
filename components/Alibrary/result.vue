<template>
	<div class="flex flex-col justify-center pt-8 sm:w-5/6 lg:w-2/3 mx-auto">
		<div v-for="item in items" :key="item.file_id" @click="get(item.file_id)" class="flex flex-row pt-6 px-2">
			<div class="basis-11/12 mr-2 text-violet-600 dark:text-green-300 hover:shadow-md py-2"> {{ item.name }} </div>
			<div class="basis-1/12 ml-2 text-gray-400"> {{ filesize(item.size) }} </div>
		</div>
	</div>
</template>


<script lang="ts" setup>
import { Info } from './types'
import { useData } from 'vitepress'
import { filesize } from "filesize";
const translation = useData().frontmatter.value
defineProps<{ items: Info[] }>()

const get = (file_id: string) => {
	fetch(translation.api, {
		method: 'POST',
		body: file_id
	}).then((response) =>
		response.text()).then((url) => {
			alert(translation.notice)
			window.location.href = url
		})
}
</script>
