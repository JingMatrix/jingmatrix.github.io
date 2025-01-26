<template>
	<h1 @click="toggle_details ? (toggle_details = !toggle_details) : refresh()">
		{{ header }}
	</h1>
	<UserScript v-if="!toggle_extensions" :scripts="scripts" :toggle_details="toggle_details" @refresh="refresh"
		@toggle_details="toggle_details = !toggle_details" />
	<Extension v-else :extensions="extensions" :toggle_details="toggle_details" @refresh="refresh"
		@toggle_details="toggle_details = !toggle_details" />
	<DevTools v-if="inspecting && !toggle_details" :pages="inspect_pages" />
</template>

<script lang="ts" setup>
import { useData } from "vitepress";
import { ref, onMounted } from "vue";
import type { DevInfo, ExtensionInfo } from "./type";
import UserScript from "./userscript.vue";
import Extension from "./extension.vue";
import DevTools from "./devtools.vue";

const toggle_details = ref(false);
const toggle_extensions = ref(false);
const inspecting = ref(false);

const scripts = ref([]);
const inspect_pages = ref(new Array<DevInfo>());
const extensions = ref(new Array<ExtensionInfo>());

const translation = useData().frontmatter.value;
const header = ref(translation.not_installed);

function refresh() {
	const action = toggle_extensions.value ? "extension" : "userscript";
	globalThis.ChromeXt.dispatch(action);
}

if (
	typeof globalThis.ChromeXt !== "undefined" &&
	typeof globalThis.ChromeXt.dispatch != "function"
) {
	globalThis.ChromeXt.dispatch = (action: string, payload: any) => {
		console.debug(JSON.stringify({ action, payload }));
	};
	globalThis.ChromeXt.addEventListener = window.addEventListener.bind(window);
}

onMounted(() => {
	if (typeof globalThis.ChromeXt !== "undefined") {
		header.value = translation.installed;
		globalThis.ChromeXt.addEventListener("userscript", (e: CustomEvent) => {
			if (e.detail.type == "init") {
				scripts.value = e.detail.ids.filter((id: string) => id.includes(":"));
			}
		});
		globalThis.ChromeXt.addEventListener("inspect_pages", (e: CustomEvent) => {
			if (!inspecting.value) {
				window.addEventListener("visibilitychange", (_e) => {
					if (document.visibilityState === "visible") {
						setTimeout(() => globalThis.ChromeXt.dispatch("inspectPages"), 0);
					}
				});
			}
			inspecting.value = true;
			inspect_pages.value = e.detail.filter(
				(it: DevInfo) =>
					!it.url.startsWith("https://chrome-devtools-frontend.appspot.com") &&
					it.type == "page" &&
					!it.url.endsWith("ChromeXt/") &&
					(it.description == "" || !JSON.parse(it.description).never_attached)
			);
		});
		globalThis.ChromeXt.addEventListener("extension", (e: CustomEvent) => {
			toggle_extensions.value = !toggle_extensions.value;
			if (e.detail.type == "init") {
				extensions.value = e.detail.manifests;
			}
		});
		refresh();
	}
});
</script>

<style lang="postcss" scoped>
@reference "tailwindcss";

h1 {
	@apply text-center text-2xl py-8;
}

p {
	@apply px-2 indent-2;
}

a {
	@apply text-violet-400;
}
</style>
