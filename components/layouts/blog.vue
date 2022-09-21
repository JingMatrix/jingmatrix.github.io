<template>
	<div>
		<Post :tags="tags" :author="author" :date="date" :title="title" />
	</div>
</template>

<script lang="ts" setup>
import Post from "../blog/post.vue";
import { useData, useRoute } from "vitepress";
const path = useRoute().path
const { frontmatter, site } = useData();
const tags = frontmatter.value.tags || [''];
const title = frontmatter.value.title
const filename = path.split('/').pop()
const date = frontmatter.value.date || filename.slice(0, 10)
const author = frontmatter.value.date || {
	name: "Jianyu MA",
	avatarUrl: "/img/profile/jm_profile_bw.jpg",
	link: "/" + site.value.lang + "/",
}
</script>
