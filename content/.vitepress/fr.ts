import { ThemeConfig } from './theme'
import { LocaleSpecificConfig } from 'vitepress'
import { essai, rssIcon, cvLink } from './plugin'

export const frConfig: LocaleSpecificConfig<ThemeConfig> = {
	title: "Jianyu MA",
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
				collapsed: true,
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
}
