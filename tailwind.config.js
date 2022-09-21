module.exports = {
	darkMode: 'class',
	content: [
		'./components/**/*.{html,js,vue,ts,md}',
		'./content/**/*.{html,js,vue,ts,md}',
		'./content/.vitepress/**/*.{html,js,vue,ts,md}',
	],
	plugins: [
		require('@tailwindcss/typography'),
	]
};
