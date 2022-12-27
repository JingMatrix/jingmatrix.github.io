import "./tailwind.postcss";
import theme from "vitepress/theme";
import { DefaultTheme } from "vitepress";

// @ts-ignore
import Layout from "../../../components/layouts/extendLayout.vue";
// @ts-ignore
import NotFound from "../../../components/layouts/404.vue";
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

interface ThemeConfig extends DefaultTheme.Config { }

export type { ThemeConfig };

export default {
	...theme,
	NotFound,
	Layout,
	enhanceApp({ app }) {
		app.component('font-awesome-icon', FontAwesomeIcon)
	}
};
