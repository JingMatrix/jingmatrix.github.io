<template>
	<div
		class="fixed bottom-4 flex w-full max-w-2xl mx-auto justify-between px-3 items-center rounded-full border-solid border-2">
		<textarea v-model="msg"
			class="border-b-2 my-2 ml-8 font-sm text-xl border-gray-500 bg-transparent w-full focus:outline-none"
			:style="{ color: msgcolor }" @keyup.enter.shift="$emit('send-message', msg); msg = ''" @keyup.enter.ctrl="$emit('send-message', msg); msg = ''" />
		<font-awesome-icon icon="fa-regular fa-paper-plane" class="text-xl mr-5" @click="$emit('send-message', msg); msg = ''" />
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const msg = ref('');
defineProps({ msgcolor: String })
defineEmits(['send-message'])
</script>
