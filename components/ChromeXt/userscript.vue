<template>
	<p v-if="scripts.length == 0">
		{{ translation.introduction }}
		<a href="https://github.com/JingMatrix/ChromeXt">ChromeXt</a>.
	</p>
	<div v-else>
		<Meta v-if="toggle_details && script_meta != ''" :meta="script_meta" @exit="$emit('toggle_details')" />
		<div v-else v-for="script in scripts" :key="script" class="flex flex-row items-center gap-3 px-2 py-2">
			<button class="shrink-0 p-2" :aria-label="'Delete ' + getName(script)" @click="
				deleteScript([script]);
			$emit('refresh');
			">
				<font-awesome-icon icon="fa-regular fa-trash-can" />
			</button>
			<button class="min-w-0 flex-1 text-left" @click="
				$emit('toggle_details');
			getMeta([script]);
			">
				<span class="block truncate">{{ getName(script) }}</span>
				<span class="block truncate text-xs text-gray-500 dark:text-gray-400">
					{{ getSimpleNameSpace(script) }}
				</span>
			</button>
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
	globalThis.ChromeXt.dispatch("userscript", { ids });
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
	globalThis.ChromeXt.dispatch("userscript", { ids, "delete": true });
}

onMounted(() => {
	globalThis.ChromeXt.addEventListener("script_meta", (e: CustomEvent) => {
		script_meta.value = e.detail[0] || "invalid";
	});
});
</script>
