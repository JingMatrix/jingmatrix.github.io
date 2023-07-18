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
			<font-awesome-icon icon="fa-regular fa-trash-can" class="basis-1/8 my-auto" @click="
				deleteScript([script]);
			getIds();
			" />
			<button class="basis-5/8 flex-1 text-left indent-3" @click="
				show_details = true;
			getMeta([script]);
			">
				{{ getName(script) }}
			</button>
			<div class="basis-1/4 text-xs px-2 break-all text-gray-200 dark:text-gray-700">
				{{ getSimpleNameSpace(script) }}
			</div>
		</div>
	</div>
	<DevTools v-if="inspecting && !show_details" :pages="inspect_pages" />
</template>

<script lang="ts" setup>
import { useData } from "vitepress";
import { ref, onMounted } from "vue";
import Meta from "./meta.vue";
import type { DevInfo } from "./type";
import DevTools from "./devtools.vue";

const show_details = ref(false);
const script_meta = ref("");
const scripts = ref([]);
const inspect_pages = ref(new Array<DevInfo>());
const inspecting = ref(false);
const translation = useData().frontmatter.value;
const header = ref(translation.not_installed);

function getIds() {
	globalThis.ChromeXt(JSON.stringify({ action: "getIds", payload: "" }));
}

function getMeta(arg: string[]) {
	script_meta.value = "";
	if (show_details.value) {
		globalThis.ChromeXt(
			JSON.stringify({ action: "getMeta", payload: arg })
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

function deleteScript(arg: string[]) {
	globalThis.ChromeXt(
		JSON.stringify({ action: "deleteScript", payload: arg })
	);
}

onMounted(async () => {
	if (typeof globalThis.ChromeXt !== "undefined") {
		header.value = translation.installed;
		window.addEventListener("script_id", (e: CustomEvent) => {
			scripts.value = e.detail.filter((id: string) => id.includes(":"));
		});
		window.addEventListener("script_meta", (e: CustomEvent) => {
			script_meta.value = e.detail[0] || "invalid";
		});
		window.addEventListener("inspect_pages", (e: CustomEvent) => {
			if (!inspecting.value) {
				window.addEventListener("visibilitychange", (_e) => {
					if (document.visibilityState === "visible") {
						setTimeout(() => globalThis.ChromeXt(JSON.stringify({ action: "inspectPages", payload: "" })), 0);
					}
				});
			};
			inspecting.value = true;
			inspect_pages.value = e.detail.filter(
				(it: DevInfo) =>
					!it.url.startsWith("https://chrome-devtools-frontend.appspot.com") &&
					it.type == "page" &&
					!it.url.endsWith("ChromeXt/") &&
					(it.description == "" || !JSON.parse(it.description).never_attached)
			);
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
