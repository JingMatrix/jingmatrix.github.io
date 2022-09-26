<template>
	<div v-if="loading" class="mt-20 relative flex flex-col items-center">
		<img src='/img/loading.svg' class="w-screen max-w-xl" />
		<div class="text-center px-10 text-xl mt-8 text-indigo-600 whitespace-pre-wrap dark:text-sky-300">
			{{ translation.loading }}
			<font-awesome-icon icon="fa-solid fa-spinner" spin />
		</div>
	</div>
	<div v-else class="relative flex flex-col items-center bg-gray-500" id="chat-room">
		<Menu :replyMsg="chatData.replyMsg" v-model:msgcolor="chatData.msgcolor" v-model:name="chatData.name"
			:state="subscriptionData.state" v-model:namecolor="chatData.namecolor" :userList="chatData.userList"
			@video-chat="start_video(socket)" @subscribe="subscribe_usr(subscriptionData, socket)" />
		<Video />
		<History :messageList="chatData.messageList" :systemMsg="chatData.systemMsg" :name="chatData.name"
			@reply-msg="msg => {chatData.replyMsg = msg}" />
		<Input :msgcolor="chatData.msgcolor" @send-message="msg => { send_message(socket, msg, chatData);} " />
	</div>
</template>

<script setup lang="ts">
import Menu from './menu.vue'
import History from './history.vue'
import Input from './input.vue'
import Video from './video.vue'
import type { Socket } from "socket.io-client";
import { initializeSocket } from './socket'
import { onMounted, reactive, ref } from 'vue'
import { useData } from 'vitepress'
import { send_message } from './sender'
import start_video from './video'
import { subscribe_usr } from './subscription'
import type { ChatData, SubscriptionData } from './type'

const loading = ref(true)
const socket = ref<Socket>();
const subscriptionData: SubscriptionData = reactive({
	state: 'no',
	swRegistration: null
})

const chatData: ChatData = reactive(
	{
		messageList: [],
		userList: [],
		replyMsg: null,
		systemMsg: '',
		uid: null,
		name: null,
		namecolor: '#00ff7f',
		msgcolor: '#7a7a7a',
		room: null
	}
)

const translation = useData().frontmatter.value

onMounted(async () => {
	chatData.room = localStorage.getItem("room")
	if (!chatData.room) document.location.href = `/contact/${translation.lang}`
	chatData.uid = localStorage.getItem("uid")
	chatData.name = localStorage.getItem("name") || chatData.room
	if (localStorage.getItem("msgcolor") && localStorage.getItem("namecolor")) {
		chatData.msgcolor = localStorage.getItem("msgcolor");
		chatData.namecolor = localStorage.getItem("namecolor");
	}
	const { draw_canvas } = await import('./canvas-nest');
	draw_canvas();
	initializeSocket(loading, chatData, socket, translation, subscriptionData);
})

</script>
