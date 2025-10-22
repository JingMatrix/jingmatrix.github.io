<template>
	<div class="flex flex-wrap py-10 lg:py-20 lg:flex-no-wrap justify-between">
		<div class="max-w-md md:pt-10 px-10 mx-auto">
			<div class="uppercase text-2xl text-indigo-500 dark:text-cyan-300">
				{{ features.title }}
			</div>
			<div class="mt-5 lg:pt-10 pl-10">
				{{ features.description }}
			</div>
		</div>
		<div class="px-10 mx-auto lg:flex lg:justify-between lg:w-full xl:justify-around">
			<slot />
		</div>
	</div>
</template>

<script lang="ts" setup>
defineProps({ features: Object });
</script>
