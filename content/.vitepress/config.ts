// @ts-check

import { defineConfigWithTheme } from 'vitepress'
import { ThemeConfig } from './theme'
import markdownHook from '../../server/markdownHook'
import blogList from '../../server/data/blog.json'
import writingList from '../../server/data/writing.json'
import essaiList from '../../server/data/essai.json'

export default defineConfigWithTheme<ThemeConfig>({
	cleanUrls: "with-subfolders",
	themeConfig: {
		// pageLayout: "Blog",
		logo: "/img/logo.svg",
		siteTitle: false,
		outline: 'deep',
	},
	markdown: {
		config: (md) => {
			md.use(markdownHook)
		}
	},
	locales: {
		en: {
			title: "Jianyu MA",
			lang: "en",
			label: "English",
			themeConfig: {
				sidebar: [
					{
						text: "All Blogs",
						items: writingList,
						collapsible: true,
					}
				],
				nav: [
					{ text: "Academic", link: "/en/academic" },
					{ text: "Writing", link: writingList[0].link },
					{
						text: "About Me",
						items: [
							{ text: "Curriculum Vitae", link: "/pdf/cv.pdf" },
							{ text: "Educations", link: "/cv" },
							{ text: "Contact Online", link: "/en/chat" },
						],
					},
				],
				editLink:
				{
					text: 'Fix Mistakes',
					pattern: 'https://github.com/JingMatrix/viteblog/edit/master/content/:path'
				}
			},
		},
		zh: {
			title: "马健宇",
			label: "简体中文",
			lang: "zh",
			themeConfig: {
				sidebar: [
					{
						text: "文章列表",
						items: blogList,
						collapsible: true,
					}
				],
				nav: [
					{ text: "博客", link: blogList[0].link },
					{
						text: "关于我",
						items: [
							{ text: "个人简历", link: "/pdf/cv.pdf" },
							{ text: "教育背景", link: "/cv" },
							{ text: "在线聊天", link: "/zh/chat" },
						],
					},
				],
				outlineTitle: "所有章节",
				editLink: {
					pattern: 'https://github.com/JingMatrix/viteblog/edit/master/content/:path',
					text: '纠正文章错误'
				}
			},
		},
		fr: {
			title: "Jianyu MA",
			label: "Français",
			lang: "fr",
			themeConfig: {
				sidebar: [
					{
						text: "Mes Essais",
						items: essaiList,
						collapsible: true,
					}
				],
				nav: [
					{ text: "Enseignement", link: "/fr/enseignement" },
					{ text: "Essai", link: essaiList[0].link },
					{
						text: "Sur Moi",
						items: [
							{ text: "Curriculum Vitae", link: "/pdf/cv.pdf" },
							{ text: "Formations", link: "/cv" },
							{ text: "Contactez en ligne", link: "/fr/chat" },
						],
					},
				],
				outlineTitle: "Sur Cette Page",
				editLink: {
					pattern: 'https://github.com/JingMatrix/viteblog/edit/master/content/:path',
					text: 'Corrigez moi'
				}
			},
		},
	},
});
