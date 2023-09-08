import markdownHook from '../../server/markdownHook'
import { rssPlugin } from "vite-plugin-rss";
import blogList from '../../server/data/blog.json'
import writingList from '../../server/data/writing.json'
import essaiList from '../../server/data/essai.json'
import type MarkdownIt from 'markdown-it'

const katex_tags = ['math', 'annotation', 'semantics', 'mtext', 'mn', 'mo', 'mi', 'mspace', 'mover', 'munder', 'munderover', 'msup', 'msub', 'msubsup', 'mfrac', 'mroot', 'msqrt', 'mtable', 'mtr', 'mtd', 'mlabeledtr', 'mrow', 'menclose', 'mstyle', 'mpadded', 'mphantom', 'mglyph', 'svg', 'line', 'path', 'eq', 'eqn'];

const vue = {
	"template": {
		compilerOptions: {
			isCustomElement:
				(tag: string) => katex_tags.includes(tag)
		}
	}
}

const blog = blogList.map((p) => { return { text: p.text, link: p.link } })
const essai = essaiList.map((p) => { return { text: p.text, link: p.link } })
const writing = writingList.map((p) => { return { text: p.text, link: p.link } })

function rss(blog: { text?: string, title: string, link: string }) {
	blog.link = 'https://jingmatrix.github.io' + blog.link;
	delete blog.text;
	return blog;
}

const vite = {
	plugins: [
		rssPlugin({
			mode: "define",
			fileName: "feed-en.xml",
			channel: {
				title: "English RSS Feed for Jianyu MA's blog",
				link: "https://jingmatrix.github.io",
				description: "Update for blogs English",
			},
			items: writingList.map(rss)
		}),
		rssPlugin({
			mode: "define",
			fileName: "feed-fr.xml",
			channel: {
				title: "Flux RSS en Français pour le blog de Jianyu MA",
				link: "https://jingmatrix.github.io",
				description: "Mis à jour des blogs en Français",
			},
			items: essaiList.map(rss)
		}),
		rssPlugin({
			mode: "define",
			fileName: "feed-zh.xml",
			channel: {
				title: "马健宇中文博客 RSS",
				link: "https://jingmatrix.github.io",
				description: "中文博客的更新",
			},
			items: blogList.map(rss)
		}),
	]
}

const markdown = {
	theme: { dark: 'dark-plus', light: 'material-theme-palenight' },
	preConfig: (md: MarkdownIt) => {
		md.use(markdownHook)
	}
}

const rssIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M0 64C0 46.3 14.3 32 32 32c229.8 0 416 186.2 416 416c0 17.7-14.3 32-32 32s-32-14.3-32-32C384 253.6 226.4 96 32 96C14.3 96 0 81.7 0 64zM128 416c0 35.3-28.7 64-64 64s-64-28.7-64-64s28.7-64 64-64s64 28.7 64 64zM32 160c159.1 0 288 128.9 288 288c0 17.7-14.3 32-32 32s-32-14.3-32-32c0-123.7-100.3-224-224-224c-17.7 0-32-14.3-32-32s14.3-32 32-32z"/></svg>'

const cvLink = "https://jingmatrix.github.io/cv/"

const manifest = {
	name: "Jianyu MA's website",
	short_name: 'Jianyu',
	description: 'Hope you find me interesting',
	theme_color: '#ffffff',
	icons: [
		{
			src: 'img/icon-192.png',
			sizes: '192x192',
			type: 'image/png'
		},
		{
			src: 'img/icon-512.png',
			sizes: '512x512',
			type: 'image/png'
		}
	]
}

export { blog, writing, essai, vue, vite, markdown, rssIcon, cvLink, manifest }
