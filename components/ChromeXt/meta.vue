<template>
	<div v-if="metadata.isValid" class="mx-2">
		<a :href="metadata.getUrl()" class="text-xl text-center block px-9 break-all text-cyan-600">{{
		metadata.getTitle() }}</a>
		<span class="absolute right-2 -mt-4 text-xs text-right text-gray-300 dark:text-gray-600">{{ metadata.version
		}}</span>
		<p class="indent-2 my-4 mx-4 text-gray-500 dark:text-gray-400">{{ metadata.description }}</p>
		<a v-if="metadata.author"
			class="indent-0 block text-right text-gray-700 dark:text-gray-200 pr-4 before:content-['@']"
			:href="metadata.getSupport()">{{ metadata.author }}</a>
		<div class="my-4" v-for="group in ['match', 'exclude', 'grant']" :key="group">
			<font-awesome-icon class="pl-2 pr-4 dark:text-gray-600 text-gray-300" icon="fa-solid fa-plus"
				@click="metadata[group].push('');" />
			<span> {{ capitalizeFirstLetter(group) }} </span>
			<div v-for="index in metadata[group].length" :key="index"
				class="flex items-center border-b border-teal-500 py-2">
				<input
					class="appearance-none bg-transparent border-none w-full text-gray-500 dark:text-gray-400 mr-3 py-1 px-2 leading-tight focus:outline-none"
					placeholder="Add new item" v-model="metadata[group][index - 1]">
				<font-awesome-icon icon="fa-solid fa-xmark" @click="metadata[group].splice(index-1, 1);"
					class="pr-2 dark:text-gray-600 text-gray-300" />
			</div>
		</div>
		<div class="my-6">
			<span class="ml-4 mr-12">Run At:</span>
			<select v-model="metadata.runAt"
				class="px-1 py-0.5 text-center hover:shadow-md text-gray-500 dark:text-gray-400 bg-inherit dark:bg-gray-900 border-solid border-2 rounded-lg border-slate-400 dark:border-slate-500 hover:border-violet-700 dark:hover:border-violet-100 ">
				<option v-for="runAt in ['document-start', 'document-idle', 'document-end']" :key="runAt"
					:value="runAt">
					<span>{{ capitalizeFirstLetter(runAt.split('-')[1]) }}</span>
				</option>
			</select>
		</div>
		<div class="flex justify-between px-4 text-lg mb-16">
			<button @click="emit('exit')"
				class="flex-shrink-0 border-solid border-transparent border-2 text-teal-500 py-1 px-2 rounded">
				{{ translation.return }} </button>
			<button @click="metadata.submit();"
				class="flex-shrink-0 border-solid border-cyan-400 dark:border-green-800 hover:border-teal-700 border-2 py-1 px-2 rounded">
				{{ translation.confirm }} </button>
		</div>
	</div>
	<p v-else @click="emit('exit')">{{ translation.invalidMeta }}</p>
</template>

<script lang="ts" setup>
import { useData } from "vitepress";
import { Metadata } from "./meta"
import { ref } from "vue"

const props = defineProps<{ meta: string }>()
const translation = useData().frontmatter.value;
const emit = defineEmits(['exit'])
const metadata = ref(new Metadata(props.meta))

function capitalizeFirstLetter(s: string) {
	return s.charAt(0).toUpperCase() + s.slice(1);
}

</script>
