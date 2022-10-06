// @ts-check

import { defineConfigWithTheme } from 'vitepress'
import { ThemeConfig } from './theme'
import { blog, writing, essai, vue, vite, markdown, buildEnd } from './plugin'

const rssIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M0 64C0 46.3 14.3 32 32 32c229.8 0 416 186.2 416 416c0 17.7-14.3 32-32 32s-32-14.3-32-32C384 253.6 226.4 96 32 96C14.3 96 0 81.7 0 64zM128 416c0 35.3-28.7 64-64 64s-64-28.7-64-64s28.7-64 64-64s64 28.7 64 64zM32 160c159.1 0 288 128.9 288 288c0 17.7-14.3 32-32 32s-32-14.3-32-32c0-123.7-100.3-224-224-224c-17.7 0-32-14.3-32-32s14.3-32 32-32z"/></svg>'

const cvLink = "https://jingmatrix.github.io/cv/"

export default defineConfigWithTheme<ThemeConfig>({
	vue, vite, markdown,
	cleanUrls: "without-subfolders",
	head: [
		['link', { rel: 'prefetch', href: '/manifest.webmanifest' }],
		['link', { rel: 'manifest', href: '/manifest.webmanifest' }],
		['meta', { name: 'theme-color', content: '#ffffff' }],
		['link', { rel: 'icon', href: '/favicon.png', type: 'image/png', sizes: "32x32" }],
		['link', { rel: 'mask-icon', href: '/img/logo.svg', color: '#ffffff' }],
		['meta', { name: 'author', content: 'Jianyu MA' }],
		['link', { rel: 'apple-touch-icon', href: '/img/icon-180.png', sizes: '180x180' }],
	],
	themeConfig: {
		// pageLayout: "Blog",
		logo: "/img/logo.svg",
		siteTitle: false,
		outline: 'deep',
	},
	locales: {
		en: {
			title: "Jianyu MA",
			lang: "en",
			label: "English",
			description: "Hope you can find something interesting here about me",
			themeConfig: {
				socialLinks: [
					{ icon: 'github', link: 'https://github.com/JingMatrix' },
					{ icon: { svg: rssIcon }, link: "/feed-en.xml" }
				],
				sidebarMenuLabel: 'All Blogs',
				sidebar: [
					{
						text: "All Blogs",
						items: writing,
						collapsible: true,
					}
				],
				nav: [
					{ text: "Academic", link: "/en/academic" },
					{ text: "Writing", link: writing[0].link },
					{ text: "Contact Online", link: "/en/contact" },
					{
						text: "About Me",
						items: [
							{ text: "Curriculum Vitae", link: "/pdf/cv.pdf" },
							{ text: "Educations", link: cvLink },
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
			description: "希望你觉得我算是一个有趣的人吧",
			themeConfig: {
				socialLinks: [
					{ icon: 'github', link: 'https://github.com/JingMatrix' },
					{ icon: { svg: rssIcon }, link: "/feed-zh.xml" }
				],
				returnToTopLabel: "回到顶部",
				sidebarMenuLabel: "文章列表",
				sidebar: [
					{
						text: "文章列表",
						items: blog,
						collapsible: true,
					}
				],
				nav: [
					{ text: "博客", link: blog[0].link },
					{ text: "在线聊天", link: "/zh/contact" },
					{
						text: "关于我",
						items: [
							{ text: "个人简历", link: "/pdf/cv.pdf" },
							{ text: "教育背景", link: cvLink },
						],
					},
				],
				outlineTitle: "所有章节",
				editLink: {
					pattern: 'https://github.com/JingMatrix/viteblog/edit/master/content/:path',
					text: '纠正文章错误'
				},
				docFooter: {
					prev: "上一篇",
					next: "下一篇",
				}
			},
		},
		fr: {
			title: "Jianyu MA",
			label: "Français",
			lang: "fr",
			description: "J'espère que vous trouverez ici quelque chose d'intéressant sur moi",
			themeConfig: {
				socialLinks: [
					{ icon: 'instagram', link: 'https://www.instagram.com/jingmatrix/' },
					{ icon: { svg: rssIcon }, link: "/feed-fr.xml" }
				],
				returnToTopLabel: "Retourez au haut",
				sidebarMenuLabel: "Mes Essais",
				sidebar: [
					{
						text: "Mes Essais",
						items: essai,
						collapsible: true,
					}
				],
				nav: [
					{ text: "Enseignement", link: "/fr/enseignement" },
					{ text: "Essai", link: essai[0].link },
					{ text: "Contactez en ligne", link: "/fr/contact" },
					{
						text: "Sur Moi",
						items: [
							{ text: "Curriculum Vitae", link: "/pdf/cv.pdf" },
							{ text: "Formations", link: cvLink },
						],
					},
				],
				outlineTitle: "Sur Cette Page",
				editLink: {
					pattern: 'https://github.com/JingMatrix/viteblog/edit/master/content/:path',
					text: 'Corrigez moi'
				},
				docFooter: {
					prev: "Page Avant",
					next: "Page Suivant",
				}
			},
		},
	},
	buildEnd
});
