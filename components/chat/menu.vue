<template>
	<div class="flex rounded-lg top-0 flex-row justify-between h-12 w-full max-w-2xl px-4 py-3 fixed" id='chat-room'>
		<span class="flex-grow text-xl text-center" :style="{ color: msgcolor }" @click="config = true">
			{{ replyMsg.name? $frontmatter.reply + replyMsg.name : $frontmatter.online }}
		</span>
		<font-awesome-icon :icon="config? 'fa-regular fa-circle-xmark' : 'fa-solid fa-bars'" class="right-0 z-20 h-7"
			@click="config = !config" />
	</div>
	<div v-if="config"
		class="fixed flex flex-col mt-40 max-w-sm rounded z-20 shadow-xl px-5 py-3 dark:bg-gray-700 bg-gray-50">
		<input v-model="nickname" :placeholder="nickname" :style="{ color: namecolor }" type="text"
			class="mx-5 my-5 border-b-2 py-1 border-solid" @change="$emit('nick-name', nickname)" />
		<div class="flex flex-row items-center justify-between px-5 pb-4">
			<div class="flex flex-col">
				<input v-model="namecolor" type="color" @change="$emit('name-color', namecolor)" />
				<input v-model="msgcolor" type="color" @change="$emit('msg-color', msgcolor)" />
			</div>
			<font-awesome-icon class="h-10 p-2 dark:shadow-gray-500/30 rounded-full shadow-lg" icon="fa-solid fa-video"
				@click="$emit('video-chat')" />
			<font-awesome-icon class="h-10 p-2 dark:shadow-gray-500/30 rounded-full shadow-lg"
				icon="fa-regular fa-circle-xmark" @click="config = false" />
		</div>
		<div class="flex my-4"></div>
		<button :disabled="subscription === 'disabled'"
			class="rounded-lg cursor-pointer active:outline-none border-solid border-2 border-gray-400"
			@click="$emit('subscribe')">
			{{ $frontmatter.push }}
		</button>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps({
	replyMsg: Object,
	msgcolor: String,
	namecolor: String,
	nickname: String,
	subscription: String
})
defineEmits(['video-chat', 'subscribe', 'nick-name', 'msg-color', 'name-color'])

const config = ref(false)
</script>
