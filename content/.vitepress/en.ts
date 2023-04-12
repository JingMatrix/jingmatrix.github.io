import { ThemeConfig } from './theme'
import { LocaleSpecificConfig } from 'vitepress'
import { writing, rssIcon, cvLink } from './plugin'

export const enConfig: LocaleSpecificConfig<ThemeConfig> = {
	title: "Jianyu MA",
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
				collapsed: true,
			}
		],
		nav: [
			{ text: "Academic", link: "/en/academic" },
			// { text: "Alibrary", link: "/en/Alibrary" },
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
	}
}
