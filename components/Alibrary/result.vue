<template>
	<div v-if='relay'>
		<div class="text-center mt-4 text-lg text-gray-400"> {{ info }} </div>
		<a :href='link' v-if='ready' target='_blank'
			class="block underline text-slate-400 dark:text-green-400 mx-auto mt-6 text-center"> {{ translation.link
			+ filename }}
		</a>
		<font-awesome-icon v-else class="text-center block mx-auto mt-4" icon="fa-solid fa-spinner" spin />
	</div>
	<div v-else class="flex flex-col justify-center pt-8 sm:w-5/6 lg:w-2/3 mx-auto">
		<div v-for="item in items" :key="item.file_id" @click="get(item)" class="flex flex-row pt-6 px-2">
			<div class="basis-11/12 mr-2 text-violet-600 dark:text-green-300 hover:shadow-md py-2"> {{ item.name }}
			</div>
			<div class="basis-1/12 ml-2 text-gray-400"> {{ filesize(item.size) }} </div>
		</div>
	</div>
</template>


<script lang="ts" setup>
import { Info } from './types'
import { useData } from 'vitepress'
import { filesize } from "filesize";
import { ref } from 'vue';
const translation = useData().frontmatter.value
const ready = ref(false)
const link = ref('')
const filename = ref('')
const info = ref(translation.wait)
const emit = defineEmits(['relay-show'])
defineProps<{ items: Info[], relay: boolean }>()
const api = translation.api[0]

const get = (item: Info) => {
	emit('relay-show')
	ready.value = false
	info.value = translation.wait
	filename.value = item.name
	link.value = ''
	fetch(api, {
		method: 'POST',
		body: JSON.stringify({ 'file_id': item.file_id, 'share_id': item.share_id })
	}).then((response) =>
		response.text()).then((url) => {
			if (url != 'Failed') {
				ready.value = true
				info.value = translation.ready
				link.value = url
			} else {
				alert(translation.failed + JSON.stringify(item))
			}
		})
}
</script>
