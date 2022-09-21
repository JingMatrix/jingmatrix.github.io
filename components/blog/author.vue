<template>
	<a v-if="author.link" :href="author.link">
		<img :src="author.avatarUrl" :alt="author.name" />
		<span>{{ author.name }}</span>
	</a>
	<span v-else>
		<img :src="author.avatarUrl" :alt="author.name" />
		<span>{{ author.name }}</span>
	</span>
</template>

<script lang=ts setup>
defineProps({ 'author': Object });
</script>
