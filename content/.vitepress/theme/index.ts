import theme from "vitepress/theme";
import { h } from "vue";
import "./tailwind.postcss";
// @ts-ignore
import NotFound from "../../../components/layouts/404.vue";
// @ts-ignore
import Header from "../../../components/layouts/header.vue";
// @ts-ignore
import Comment from "../../../components/layouts/comment.vue";
//

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faBlog, faBars, faVideo, faSpinner, faMagnifyingGlass, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons'
import { faFilePdf, faCircleXmark, faPaperPlane, faTrashCan } from '@fortawesome/free-regular-svg-icons'
import { faWikipediaW } from '@fortawesome/free-brands-svg-icons'

/* add icons to the library */
[faBlog, faBars, faFilePdf, faCircleXmark, faMagnifyingGlass, faPlus, faXmark, faVideo, faPaperPlane, faTrashCan, faWikipediaW, faSpinner].forEach((fa) => library.add(fa));

export default {
	extends: theme,
	Layout() {
		return h(theme.Layout, null, {
			'not-found': () => h(NotFound),
			'doc-before': () => h(Header),
			'doc-after': () => h(Comment),
		})
	},
	enhanceApp({ app }) {
		app.component('font-awesome-icon', FontAwesomeIcon)
	}
};
