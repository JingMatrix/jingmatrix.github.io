<template>
	<div
		class="fixed bottom-4 flex w-full max-w-2xl mx-auto justify-between px-3 items-center rounded-full border-solid border-2">
		<textarea v-model="msg"
			class="border-b-2 my-2 ml-8 font-sm text-xl border-gray-500 bg-transparent w-full focus:outline-none pr-4"
			:style="{ color: msgcolor }" @keyup.enter.shift="submit" @keyup.enter.ctrl="submit" />
		<font-awesome-icon icon="fa-regular fa-paper-plane" class="h-10 mr-2" @click="submit" />
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const msg = ref('');
defineProps({ msgcolor: String })
const emit = defineEmits(['send-message'])
const submit = (e: Event) => {
	const text = (e.target as HTMLInputElement).value || msg.value
	emit('send-message', text)
	msg.value = ''
	setTimeout(() => {
		document.querySelector('#sys').scrollIntoView()
	});
}
</script>
