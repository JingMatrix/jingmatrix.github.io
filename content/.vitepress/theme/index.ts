import "./tailwind.postcss";
import theme from "vitepress/theme";
import { DefaultTheme } from "vitepress";
// import type { Post } from "./../../../server/posts";
// @ts-ignore
import Layout from "../../../components/layouts/extendLayout.vue";
// @ts-ignore
import NotFound from "../../../components/layouts/404.vue";
// import Blog from "../../../components/layouts/blog.vue";
//
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faBlog } from '@fortawesome/free-solid-svg-icons'
import { faFilePdf } from '@fortawesome/free-regular-svg-icons'
import { faWikipediaW } from '@fortawesome/free-brands-svg-icons'

/* add icons to the library */
library.add(faBlog)
library.add(faFilePdf)
library.add(faWikipediaW)

interface ThemeConfig extends DefaultTheme.Config {
	// posts?: Post[];
}

export type { ThemeConfig };

export default {
	...theme,
	NotFound,
	Layout,
	enhanceApp({ app }) {
		// app.component('Blog', Blog)
		app.component('font-awesome-icon', FontAwesomeIcon)
	},
	hookPageData({ frontmatter }) {
		console.log(frontmatter);
		frontmatter.title = "Changed";
		frontmatter.layout = "doc"
	},
};
