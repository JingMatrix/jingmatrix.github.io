import type MarkdownIt = require('markdown-it');
import type { MarkdownItEnv } from '@mdit-vue/types';

export default function(md: MarkdownIt) {
	const render = md.render.bind(md);
	md.render = (src, env: MarkdownItEnv = {}) => {
		env.frontmatter = { ...env.frontmatter};
		return render(src, env);
	}

}

