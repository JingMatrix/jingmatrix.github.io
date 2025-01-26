<template>
	<div class="lg:flex lg:flex-row-reverse lg:px-20 lg:h-screen">
		<img :src="withBase('/img/connect.svg')" class="w-2/3 mx-auto my-8 lg:w-1/2" />
		<div class="max-w-md mx-auto">
			<h1 class="headtext">
				{{ translation.title }}
			</h1>
			<p class="paratext">
				{{ translation.input }}
			</p>
			<div class="flex flex-row justify-between py-10 mx-10">
				<input @keyup.enter="savename" v-model="name" type="text" class="input" />
				<div @click="savename">
					<button class="">
						{{ translation.connect }}
					</button>
				</div>
			</div>
			<h1 class="headtext">
				{{ translation.whytitle }}
			</h1>
			<p class="paratext">
				{{ translation.why }}
			</p>
			<h1 class="headtext">
				{{ translation.tricktitle }}
			</h1>
			<p class="paratext">
				{{ translation.trick }}
			</p>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useData, withBase } from 'vitepress'
const translation = useData().frontmatter.value
const lang = useData().site.value.lang

const name = ref('');
onMounted(() => {
	name.value = localStorage.getItem("name") || '';
	const roomId = localStorage.getItem("room");
	if (roomId && !name) {
		name.value = roomId;
	}
})

function savename() {
	if (!name) return;
	localStorage.setItem("room", name.value);
	if (!localStorage.getItem("name")) {
		localStorage.setItem("name", name.value);
	}
	window.location.href = withBase(`/chat/${lang}`);
}
</script>

<style lang="postcss" scoped>
@reference "tailwindcss/theme.css";
@tailwind components;

@layer components {
	.headtext {
		@apply font-semibold text-lg my-3 min-w-[64] pl-5;
	}

	.paratext {
		@apply px-8 dark:text-gray-400 text-gray-600 whitespace-pre-wrap
	}

	input {
		@apply bg-transparent focus:outline-none focus:shadow border-solid border border-gray-500 dark:border-gray-300 rounded-lg py-2 px-4 block w-2/3 appearance-none leading-normal
	}

	button {
		@apply bg-transparent hover:bg-indigo-500 text-sky-500 font-semibold hover:text-yellow-100 block py-2 px-4 border border-blue-500 hover:border-transparent rounded dark:text-cyan-300 border-solid
	}
}
</style>
