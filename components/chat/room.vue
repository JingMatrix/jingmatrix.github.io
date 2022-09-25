<template>
	<div v-if="loading" class="mt-20 relative flex flex-col items-center">
		<img src='/img/loading.svg' class="w-screen max-w-xl" />
		<div class="text-center px-10 text-xl mt-8 text-indigo-600 whitespace-pre-wrap dark:text-sky-300">
			{{ $frontmatter.loading }}
			<font-awesome-icon icon="fa-solid fa-spinner" spin />
		</div>
	</div>
	<div v-else class="relative flex flex-col items-center bg-gray-500" id="chat-room">
		<Menu :replyMsg="replyMsg" :msgcolor="msgcolor" :name="chatData.name" :state="subscriptionData.state"
			:userList="chatData.userList" :namecolor="namecolor" @change-name="change_name" @msg-color="change_msg_color"
			@name-color="change_name_color" @video-chat="start_video(socket)"
			@subscribe="subscribe_usr(subscriptionData, socket)" />
		<Video />
		<History :messageList="chatData.messageList" :systemMsg="chatData.systemMsg" :name="chatData.name" 
			@reply-msg="msg => {replyMsg = msg}" />
		<Input :msgcolor=" msgcolor" @send-message="msg => { send_message(socket, msg, replyMsg); replyMsg = {} } " />
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
import start_video from './video'
import { subscribe_usr } from './subscription'

const { frontmatter } = useData();

const namecolor = ref('#00ff7f')
const msgcolor = ref('#7a7a7a')
const replyMsg = ref({});
const loading = ref(true)
const socket = ref({});
const subscriptionData = reactive({
	state: 'no',
	swRegistration: {},
}
)


const chatData = reactive(
	{
		messageList: [],
		userList: [],
		systemMsg: '',
		uid: '',
		name: ''
	}
)

onMounted(async () => {
	chatData.name = localStorage.getItem("name") || localStorage.getItem("roomId")
	if (localStorage.getItem("msgcolor") && localStorage.getItem("namecolor")) {
		msgcolor.value = localStorage.getItem("msgcolor");
		namecolor.value = localStorage.getItem("namecolor");
	} else {
		localStorage.setItem("msgcolor", msgcolor.value);
		localStorage.setItem("namecolor", namecolor.value);
	}
	initializeSocket(loading, chatData, socket, frontmatter, subscriptionData);
	const { draw_canvas } = await import('./canvas-nest.mjs');
	draw_canvas();
})

function change_name(name) {
	chatData.name = name;
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
</script >


