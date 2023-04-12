// @ts-check
import { defineConfigWithTheme } from 'vitepress'
import { ThemeConfig } from './theme'
import { withPwa } from '@vite-pwa/vitepress'
import { vue, vite, markdown, manifest } from './plugin'

import { zhConfig } from './zh'
import { enConfig } from './en'
import { frConfig } from './fr'

export default withPwa(defineConfigWithTheme<ThemeConfig>({
	vue, vite, markdown,
	pwa: {
		outDir: '.vitepress/dist',
		registerType: "autoUpdate",
		includeAssets: ['favicon.png', 'img/icon-180.png', 'img/masked-icon.svg'],
		manifest
	},
	cleanUrls: true,
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
		i18nRouting: false,
		logo: "/img/logo.svg",
		siteTitle: false,
		outline: 'deep',
		localSearch: true,
	},
	locales: {
		en: { lang: "en", label: "English", ...enConfig },
		zh: { label: "简体中文", lang: "zh", ...zhConfig },
		fr: { lang: "fr", label: "Français", ...frConfig },
	}
}));
