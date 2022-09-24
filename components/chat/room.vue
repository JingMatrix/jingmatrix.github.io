<template>
	<div v-if="loading" class="mt-20 relative flex flex-col items-center">
		<img src='/img/loading.svg' class="w-screen max-w-xl" />
		<div class="text-center px-10 text-xl mt-8 text-indigo-600 whitespace-pre-wrap dark:text-sky-300">
			{{ $frontmatter.loading }}
			<font-awesome-icon icon="fa-solid fa-spinner" spin />
		</div>
	</div>
	<div v-else class="relative flex flex-col items-center bg-gray-500" id="chat-room">
		<Menu :replyMsg="replyMsg" :msgcolor="msgcolor" :nickname="nickname" :subscription="subscriptionData.state"
			:namecolor="namecolor" @nick-name="change_name" @msg-color="change_msg_color"
			@name-color="change_name_color" @video-chat="start_video(socket)"
			@subscribe="subscribe_usr(subscriptionData, socket)" />
		<Video />
		<History :messageList="chatData.messageList" :systemMsg="chatData.systemMsg" :nickname="nickname"
			@reply-msg="msg => {replyMsg = msg}" />
		<Input :msgcolor=" msgcolor"
			@send-message="msg => { send_message(socket, msg, replyMsg); replyMsg = {} } " />
	</div>
</template>

<script setup lang="ts">
import Menu from './menu.vue'
import History from './history.vue'
import Input from './input.vue'
import Video from './video.vue'
import initializeSocket from './socket'
import { onMounted, reactive, ref } from 'vue'
import { useData } from 'vitepress'
import { send_message } from './sender'
// import start_video from './video'
import { subscribe_usr } from './subscription'

const { frontmatter } = useData();

const namecolor = ref('#5500ff')
const msgcolor = ref('##550000')
const replyMsg = ref({});
const loading = ref(true)
const socket = ref({});
const subscriptionData = reactive({
	state: 'no',
	swRegistration: {},
}
)

const nickname = ref('');

const chatData = reactive(
	{
		messageList: [],
		userList: [],
		systemMsg: '',
	}
)

onMounted(async () => {
	nickname.value = localStorage.getItem("name") || localStorage.getItem("roomId")
	if (localStorage.getItem("msgcolor") && localStorage.getItem("namecolor")) {
		msgcolor.value = localStorage.getItem("msgcolor");
		namecolor.value = localStorage.getItem("namecolor");
	} else if (localStorage.getItem('vitepress-theme-appearance') == 'dark') {
		namecolor.value = '#55aa00'
		msgcolor.value = '#ff55ff'
	}
	initializeSocket(loading, chatData, socket, frontmatter, subscriptionData);
	const { draw_canvas } = await import('./canvas-nest.mjs');
	draw_canvas();
})

function change_name(name) {
	nickname.value = name;
	socket.value.emit("change-name", name);
	localStorage.setItem("name", name);
}

function change_msg_color(color) {
	msgcolor.value = color;
	localStorage.setItem('msgcolor', color)
}

function change_name_color(color) {
	namecolor.value = color;
	localStorage.setItem('namecolor', color)
}

function start_video(socket) {
	console.log('Starting vieo with ', socket)
}
</script >


