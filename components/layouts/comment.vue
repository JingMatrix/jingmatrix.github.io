<template>
	<div>
		<VueUtterances repo="JingMatrix/jingmatrix.github.io" :theme="isDark ? 'github-dark' : 'github-light'"
			issue-term="title" label="Comment" v-if="showComment" />
	</div>
</template>

<script lang="ts" setup>
import VueUtterances from "vue-utterances";
import { useData, useRouter } from "vitepress";
import { ref, onMounted, onBeforeUnmount } from "vue";

const showComment = ref(useData().frontmatter.value.header);
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

useRouter().onBeforeRouteChange = (_path: string) => {
	showComment.value = false;
};
useRouter().onAfterRouteChanged = (path: string) => {
	checkDark();
	showComment.value = ["en", "fr", "zh"].includes(path.split("/").at(-3));
};
</script>
