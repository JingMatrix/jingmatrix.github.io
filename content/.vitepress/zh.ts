import { ThemeConfig } from './theme'
import { LocaleSpecificConfig } from 'vitepress'
import { blog, rssIcon, cvLink } from './plugin'

export const zhConfig: LocaleSpecificConfig<ThemeConfig> = {
	title: "马健宇",
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
				collapsed: true,
			}
		],
		nav: [
			{ text: "Alibrary", link: "/zh/Alibrary" },
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

}
