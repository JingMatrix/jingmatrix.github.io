<template>
	<p v-if="scripts.length == 0">
		{{ translation.introduction }}
		<a href="https://github.com/JingMatrix/ChromeXt">ChromeXt</a>.
	</p>
	<div v-else>
		<Meta v-if="toggle_details && script_meta != ''" :meta="script_meta" @exit="$emit('toggle_details')" />
		<div v-else v-for="script in scripts" :key="script" class="pb-4 pl-2 flex flex-row">
			<font-awesome-icon icon="fa-regular fa-trash-can" class="basis-1/8 my-auto" @click="
				deleteScript([script]);
			$emit('refresh');
			" />
			<button class="basis-5/8 flex-1 text-left indent-3" @click="
				$emit('toggle_details');
			getMeta([script]);
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

defineEmits(["refresh", "toggle_details"]);

const translation = useData().frontmatter.value;

const script_meta = ref("");

defineProps<{ scripts: any[]; toggle_details: boolean }>();

function getMeta(ids: string[]) {
	script_meta.value = "";
	globalThis.ChromeXt(JSON.stringify({ action: "userscript", payload: { ids } }));
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

function deleteScript(ids: string[]) {
	globalThis.ChromeXt(JSON.stringify({ action: "userscript", payload: { ids, "delete": true } }));
}

onMounted(() => {
	window.addEventListener("script_meta", (e: CustomEvent) => {
		script_meta.value = e.detail[0] || "invalid";
	});
});
</script>
