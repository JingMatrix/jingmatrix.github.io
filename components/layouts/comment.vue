<template>
	<div>
		<VueUtterances repo="JingMatrix/jingmatrix.github.io" :theme="isDark ? 'github-dark' : 'github-light'"
			issue-term="title" v-if="frontmatter.header" />
	</div>
</template>

<script lang="ts" setup>
import VueUtterances from "vue-utterances";
import { useData } from "vitepress";
import { ref, onMounted, onBeforeUnmount } from "vue";

const isDark = ref(false);
let observer = null;

function checkDark() {
	const setValue = () => {
		isDark.value = document.documentElement.classList.contains("dark");
	};
	setTimeout(setValue, document?.documentElement == null ? 0 : 1000);
}

onMounted(() => {
	observer = new MutationObserver(checkDark);
	observer.observe(document.documentElement, {
		attributes: true,
		attributeFilter: ["class"],
	});
	checkDark();
});

onBeforeUnmount(() => {
	observer.disconnect();
});

const frontmatter = useData().frontmatter;
</script>
