<script lang="ts" setup>
import { withBase } from "vitepress";
defineProps({
	author: Object
});

</script>

<template>
	<div class="absolute right-0 bottom-0">
		<img v-if="author.avatar" :src="withBase(author.avatar)" :alt="author.name"
			class="rounded h-10 align-middle aspect-auto inline" />
		<span class="ml-4 mr-2 text-sm text-green-400 dark:text-violet-200">{{ author.name }}</span>
		<div v-for="link in author.links" class="inline ml-2 mr-2">
			<a :href="link.url">
				<font-awesome-icon :icon="link.icon" />
			</a>
		</div>
	</div>
</template>
