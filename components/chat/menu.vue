<template>
	<div class="flex rounded-lg top-0 flex-row justify-between h-12 w-full max-w-2xl px-4 py-3 fixed" id='chat-room'
		@click="config = !config">
		<span class="flex-grow text-xl text-center" :style="{ color: msgcolor }">
			{{ replyMsg? translation.replyTitle + replyMsg.name :
			translation.online + userList.join(", ") }}
		</span>
		<font-awesome-icon :icon="config? 'fa-regular fa-circle-xmark' : 'fa-solid fa-bars'" class="right-0 z-20 h-7" />
	</div>
	<div v-if="config"
		class="fixed flex flex-col mt-40 max-w-sm rounded z-20 shadow-xl px-5 py-3 dark:bg-gray-700 bg-gray-50">
		<input :value="name" :placeholder="name" :style="{ color: namecolor }" type="text"
			class="mx-5 my-5 border-b-2 py-1 border-solid"
			@change="$emit('update:name', ($event.target as HTMLInputElement).value)" />
		<div class="flex flex-row items-center justify-between px-5 pb-4">
			<div class="flex flex-col">
				<input :value="namecolor" type="color"
					@change="$emit('update:namecolor', ($event.target as HTMLInputElement).value)" />
				<input :value="msgcolor" type="color"
					@change="$emit('update:msgcolor', ($event.target as HTMLInputElement).value)" />
			</div>
			<font-awesome-icon class="h-10 p-2 dark:shadow-gray-500/30 rounded-full shadow-lg" icon="fa-solid fa-video"
				@click="$emit('video-chat'); config = false" />
			<font-awesome-icon class="h-10 p-2 dark:shadow-gray-500/30 rounded-full shadow-lg"
				icon="fa-regular fa-circle-xmark" @click="config = false" />
		</div>
		<div class="flex my-4"></div>
		<button :disabled="state === 'disabled'"
			class="rounded-lg cursor-pointer active:outline-none border-solid border-2 border-gray-400"
			@click="$emit('subscribe')">
			{{ translation.push[state] }}
		</button>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { UserMsg } from './types'
import { useData } from 'vitepress'
const translation = useData().frontmatter.value

defineProps<{
	replyMsg: UserMsg,
	msgcolor: string,
	namecolor: string,
	name: string,
	userList: string[],
	state: string
}>()

defineEmits(['video-chat', 'subscribe', 'update:name', 'update:msgcolor', 'update:namecolor'])

const config = ref(false)

</script>
