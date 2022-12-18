<template>
  <div v-if="installed">
    <h1>{{ translation.installed }}</h1>
    <div v-for="script in scripts" :key="script" class="pb-4 pl-2 flex flex-row">
	<font-awesome-icon icon="fa-regular fa-trash-can" class="basis-1/8 mt-1" @click="deleteScriptById([script]);getIds();" />
     <div class="basis-5/8 flex-1 px-3"> {{ script.split(":")[1] }} </div>
	 <div class="basis-1/4 text-xs text-gray-200 dark:text-gray-700"> {{ script.split(":")[0] }} </div>
    </div>
  </div>
  <div v-else>
    <h1>{{ translation.not_installed }}</h1>
    <p>
      {{ translation.introduction }}
      <a href="https://github.com/JingMatrix/ChromeXt">ChromeXt</a>.
    </p>
  </div>
</template>

<script lang="ts" setup>
import { useData } from "vitepress";
import { ref, onMounted } from "vue";
const installed = ref(false);
const scripts = ref([]);
const translation = useData().frontmatter.value;

function getIds() {
  globalThis.ChromeXt(JSON.stringify({ action: "getIds", payload: "" }));
}

// function getIdByRunAt(arg = ["document-idle"]) {
//  globalThis.ChromeXt(JSON.stringify({ action: "getIdByRunAt", payload: arg }));
// }

// function getScriptById(arg: string[]) {
//  globalThis.ChromeXt(
//    JSON.stringify({ action: "getScriptById", payload: arg })
//  );
// }

function deleteScriptById(arg: string[]) {
  globalThis.ChromeXt(
    JSON.stringify({ action: "deleteScriptById", payload: arg })
  );
}

onMounted(async () => {
  installed.value = typeof globalThis.ChromeXt != "undefined";
  const log = console.log.bind(console);
  console.log = (msg: string[]) => {
    if (typeof msg == "object" && typeof msg.length != undefined) {
      scripts.value = msg;
    }
    log(msg);
  };
  getIds();
});
</script>

<style lang="postcss" scoped>
@tailwind components;

@layer components {
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
