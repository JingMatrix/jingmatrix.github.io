import type MarkdownIt = require("markdown-it");
import textmath from 'markdown-it-texmath';
import footnote from 'markdown-it-footnote';
import katex from 'katex';
import { markdownData } from './types'
import { hookFrontmatter } from './posts'

export default function(md: MarkdownIt) {
	md.use(textmath, {
		engin: katex,
		delimiters: 'dollars'
	});
	md.use(footnote);
	const render = md.render.bind(md);
	md.render = (src, env: markdownData) => {
		const path = env.relativePath.split('/');
		if (path.length >= 3) {
			env.frontmatter = hookFrontmatter(env.frontmatter, path[2])
		} else {
			env.frontmatter.sidebar = false
		}
		return render(src, env)
	};
}
