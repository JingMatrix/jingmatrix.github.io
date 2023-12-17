<template>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.2/dist/katex.min.css"
		integrity="sha384-bYdxxUwYipFNohQlHt0bjN/LCpueqWz13HufFEV1SUatKs1cm4L6fFgCi1jT643X" crossorigin="anonymous">
	<div class="fixed overflow-y-scroll mt-12 w-full" style="height: calc(100% - 10rem)">
		<div v-for="message in messageList" :id="message.time.toString()" :key="message.time"
			class="w-full max-w-2xl mx-auto" @dblclick="$emit('reply-msg', message)">
			<div class="flex px-5 justify-between" :class="[name == message.name ? 'flex-row-reverse' : 'flex-row']">
				<span :style="{ color: message.namecolor }" class="basis-1/4"
					:class="[name == message.name ? 'text-right' : 'text-left']">
					{{ message.name }} </span>
				<span class="text-xs dark:text-gray-600 text-gray-400 basis-1/2 text-center -mb-4"> {{
					getTime(message.time) }}</span>
				<span class="text-gray-100 dark:text-gray-800 text-sm basis-1/4">
					{{ " @ " + message.uid }}
				</span>
			</div>
			<div :style="{ color: message.msgcolor }" class="mx-12 flex my-2 flex-col render-html" :class="[
				name == message.name ? 'items-end' : '']" v-html="render(message.msg)"></div>
		</div>
		<span id="sys" class="text-center text-sm block text-green-300 px-8 dark:text-cyan-700">
			{{ systemMsg }}
		</span>
	</div>
</template>

<script setup lang="ts">
import ScrollHack from './jumptomsg'
import { onMounted } from 'vue'
import { UserMsg } from './types'
import Markdown from 'markdown-it'
import { full as emoji } from 'markdown-it-emoji'
import katex from 'katex'
import texmath from 'markdown-it-texmath'
const markdownItOption = {
	html: true,
	linkify: true,
	typographer: true,
	xhtmlOut: true,
}

const md = new Markdown(markdownItOption)
md.use(emoji).use(texmath, {
	engine: katex,
	delimiters: ['dollars', 'beg_end', 'julia']
})
defineProps<{ messageList: UserMsg[], systemMsg: string, name: string }>()
const render = (p: string) => {
	return md.render(p.replace(/&gt;+/g, '>'))
}
defineEmits(['reply-msg'])
function getTime(seconds: number) {
	if (seconds < 10000000000) {
		seconds *= 1000
	}
	const date = new Date(seconds);
	return date.toLocaleString();
}
onMounted(() => ScrollHack())
</script>
