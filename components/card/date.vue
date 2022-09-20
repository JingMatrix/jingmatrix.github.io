<template>
  <Base :features="features">
    <div
      v-for="feature in features.content"
      :key="feature.title"
      class="cards flex items-start"
    >
      <div class="w-12 flex-shrink-0 flex flex-col text-center leading-none">
        <span class="text-gray-500 pb-2 mb-2 border-b-2 border-gray-300">
          {{ getMonth(feature.date) }}
        </span>
        <span class="font-medium text-xl text-gray-800 title-font">{{
          getDay(feature.date)
        }}</span>
      </div>
      <div class="pl-6">
        <h2
          class="tracking-widest text-xs title-font font-medium text-indigo-500 mb-1"
        >
          {{ feature.tag }}
        </h2>
        <h1 class="title-font text-xl font-medium mb-3">
          {{ feature.title }}
        </h1>
        <p class="leading-relaxed mb-5 text-gray-600">
          {{ feature.excerpt }}
        </p>
        <a class="inline-flex items-center">
          <img
            alt="blog"
            :src="feature.img"
            class="w-8 h-8 rounded-full flex-shrink-0 object-cover object-center"
          />
          <span class="flex-grow flex flex-col pl-3">
            <span class="title-font font-medium">{{ feature.author }}</span>
          </span>
        </a>
      </div>
    </div>
  </Base>
</template>

<script>
import Base from "./base.vue";
export default {
  components: { Base },
  props: {
    features: {
      type: Object,
      require: true,
      default: () => {},
    },
  },
  methods: {
    getMonth: (dateString) => {
      const date = new Date(dateString);
      return date.toString().slice(4, 7);
    },
    getDay: (dateString) => {
      const date = new Date(dateString);
      return date.toString().slice(8, 10);
    },
  },
};
</script>
