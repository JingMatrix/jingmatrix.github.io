import "./tailwind.postcss";
import theme from "vitepress/theme";
import { DefaultTheme } from "vitepress";
// import type { Post } from "./../../../server/posts";
// @ts-ignore
import Layout from "../../../components/layouts/extendLayout.vue";
// import Blog from "../../../components/layouts/blog.vue";

interface ThemeConfig extends DefaultTheme.Config {
	// posts?: Post[];
}

export type { ThemeConfig };

export default {
	...theme,
	Layout,
	enhanceApp({ }) {
		// app.component('Blog', Blog)
	},
	hookPageData({ frontmatter }) {
		console.log(frontmatter);
		frontmatter.title = "Changed";
		frontmatter.layout = "doc"
	},
};
