<template>
  <div class="lg:flex lg:flex-row-reverse lg:px-20 lg:h-screen">
    <img src="/img/connect.svg" class="w-2/3 mx-auto my-8 lg:w-1/2" />
    <div class="max-w-md mx-auto">
      <h1 class="headtext">
        {{ $frontmatter.title }}
      </h1>
      <p class="paratext">
        {{ $frontmatter.input }}
      </p>
      <div class="flex flex-row justify-between py-10 mx-10">
        <input
          @keyup.enter="savename"
          v-model="name"
          type="text"
          class="input"
        />
        <div @click="savename">
          <button class="">
            {{ $frontmatter.connect }}
          </button>
        </div>
      </div>
      <h1 class="headtext">
        {{ $frontmatter.whytitle }}
      </h1>
      <p class="paratext">
        {{ $frontmatter.why }}
      </p>
      <h1 class="headtext">
        {{ $frontmatter.tricktitle }}
      </h1>
      <p class="paratext">
        {{ $frontmatter.trick }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: null,
    };
  },
  mounted() {
    const roomId = localStorage.getItem("roomId");
    if (roomId && !this.name) {
      this.name = roomId;
    }
  },
  methods: {
    savename() {
      if (!this.name) return;
      localStorage.setItem("roomId", this.name);
      if (!localStorage.getItem("name")) {
        localStorage.setItem("name", this.name);
      }
      window.location.href = "./chat";
    },
  },
};
</script>

<style scoped>
@tailwind components;

@layer components {
	.headtext {
		@apply font-semibold text-lg my-3 min-w-[64] pl-5;
	}

	.paratext {
		@apply px-8 text-gray-600 whitespace-pre-wrap dark:text-gray-400;
	}
	input {
		@apply bg-transparent focus:outline-none focus:shadow border-solid border border-gray-500 dark:border-gray-300 rounded-lg py-2 px-4 block w-2/3 appearance-none leading-normal
	}
	button {
		@apply bg-transparent hover:bg-indigo-500 text-sky-500 font-semibold hover:text-yellow-100 block py-2 px-4 border border-blue-500 hover:border-transparent rounded dark:text-cyan-300 border-solid
	}
}
</style>
