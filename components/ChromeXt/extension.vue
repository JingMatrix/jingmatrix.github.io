<template>
	<p v-if="extensions.length == 0">{{ translation.extension }}</p>
	<div v-else>
		<div v-for="extension in  extensions " :key="extension.id">
			<iframe v-if="'page' in extension.background" :id="extension.id" :title="extension.name" class="h-0 w-0"
				:onload="(e: Event) => initFrame(e, extension)" />
		</div>
	</div>
</template>

<script lang="ts" setup>
import { useData } from "vitepress";
import { onMounted } from "vue";
import { initFrame } from "./chrome"
import type { ExtensionInfo } from "./type";

defineEmits(["refresh", "toggle_details"]);

const translation = useData().frontmatter.value;

defineProps<{ extensions: Array<ExtensionInfo>; toggle_details: boolean }>();

</script>
