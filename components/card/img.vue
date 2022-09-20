<template>
  <Base :features="features">
    <div
      v-for="feature in features.content"
      :key="feature.title"
      class="shadow-lg hover:shadow-xl cards"
    >
      <img :src="feature.img" :alt="feature.alt || feature.title" />
      <div class="px-2 py-4">
        <a
          :href="feature.link"
          download=""
          class="no-underline flex items-baseline hover:underline font-medium text-xl mb-2"
        >
          <img src="/icon/document-download.svg"
            class="h-5 w-5 stroke-current mr-3 inline-block text-indigo-300"
          />
          {{ feature.title }}
        </a>
        <p class="text-gray-600 text-base">
          {{ feature.description }}
        </p>
      </div>
      <div class="px-6 pt-4 pb-2">
        <span
          v-for="tag in feature.tags"
          :key="tag"
          class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
          >{{ tag }}</span
        >
      </div>
    </div>
  </Base>
</template>
<script>
import Base from "./base.vue";
export default {
  components: {
    Base,
  },
  props: {
    features: {
      type: Object,
      require: true,
      default: () => {},
    },
  },
};
</script>
