<template>
	<h1 @click="show_details ? (show_details = false) : getIds()">
		{{ header }}
	</h1>
	<p v-if="scripts.length == 0">
		{{ translation.introduction }}
		<a href="https://github.com/JingMatrix/ChromeXt">ChromeXt</a>.
	</p>
	<div v-else>
		<Meta v-if="show_details && script_meta != ''" :meta="script_meta" @exit="
		  show_details = false;
		  script_meta = '';
		" />
		<div v-else v-for="script in scripts" :key="script" class="pb-4 pl-2 flex flex-row">
			<font-awesome-icon icon="fa-regular fa-trash-can" class="basis-1/8 mt-1" @click="
			  deleteScriptById([script]);
			  getIds();
			" />
			<button class="basis-5/8 flex-1 text-left indent-3" @click="
			  show_details = true;
			  getMetaById([script]);
			">
				{{ getName(script) }}
			</button>
			<div class="basis-1/4 text-xs px-2 break-all text-gray-200 dark:text-gray-700">
				{{ getSimpleNameSpace(script) }}
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { useData } from "vitepress";
import { ref, onMounted } from "vue";
import Meta from "./meta.vue";

const show_details = ref(false);
const script_meta = ref("");
const scripts = ref([]);
const translation = useData().frontmatter.value;
const header = ref(translation.not_installed);
const SINGLE_QUOTE_ESCAPE = /ChromeXt_Quote_Escape_String/g;

function getIds() {
	globalThis.ChromeXt(JSON.stringify({ action: "getIds", payload: "" }));
}

function getMetaById(arg: string[]) {
	script_meta.value = "";
	if (show_details.value) {
		globalThis.ChromeXt(
			JSON.stringify({ action: "getMetaById", payload: arg })
		);
	}
}

function getName(id: string) {
	const split = id.split(":");
	return split[split.length - 1];
}

function getSimpleNameSpace(id: string) {
	const split = id.split(":");
	split.pop();
	if (split.length == 1) {
		return split[0];
	} else {
		if (split[0].startsWith("http")) {
			split.shift();
			let namespace = split.join(":");
			if (namespace.startsWith("//")) {
				return namespace.substring(2);
			} else {
				return namespace;
			}
		} else {
			return split.join(":");
		}
	}
}

function deleteScriptById(arg: string[]) {
	globalThis.ChromeXt(
		JSON.stringify({ action: "deleteScriptById", payload: arg })
	);
}

onMounted(async () => {
	if (typeof globalThis.ChromeXt !== "undefined") {
		header.value = translation.installed;
		window.addEventListener("script_id", (e: CustomEvent) => {
			scripts.value = e.detail
				.filter((id: string) => id.includes(":"))
				.map((text: string) => text.replace(SINGLE_QUOTE_ESCAPE, "'"));
		});
		window.addEventListener("script_meta", (e: CustomEvent) => {
			script_meta.value =
				e.detail[0].replace(SINGLE_QUOTE_ESCAPE, "`") || "invalid";
		});
		getIds();
	}
});
</script>

<style lang="postcss" scoped>
@tailwind base;

@layer base {
	h1 {
		@apply text-center text-2xl py-8;
	}

	p {
		@apply px-2 indent-2;
	}

	a {
		@apply text-violet-400;
	}
}
</style>
