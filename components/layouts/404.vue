<template>
		<div class="relative flex flex-col items-center justify-center px-2 sm:px-4 mt-20 lg:mt-32 md:px-0 z-10">
			<a href="/"><img src='/img/logo.svg' /></a>
			<p class="mt-2 mb-4 text-center text-4xl text-yellow-600"> 404 </p>
		</div>
		<img loading="lazy" class="hidden lg:block absolute w-full bottom-0 left-0 z-0 select-none"
			src="/img/error/bg-error_desktop.svg" />
		<img loading="lazy" class="hidden sm:block lg:hidden absolute w-full bottom-0 left-0 z-0 select-none"
			src="/img/error/bg-error_tablet.svg" />
		<img loading="lazy" class="block sm:hidden absolute w-full bottom-0 left-0 z-0 select-none"
			src="/img/error/bg-error_mobile.svg" />
</template>
