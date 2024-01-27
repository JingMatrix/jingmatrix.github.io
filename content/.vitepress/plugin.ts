import textmath from "markdown-it-texmath";
import footnote from "markdown-it-footnote";
import katex from "katex";
import authors from "./author.json";

import { ThemeOptions } from "vitepress";
import type MarkdownIt = require("markdown-it");
import { markdownData, Frontmatter } from "./types";

function hookFrontmatter(f: Frontmatter, filename: string): Frontmatter {
	if (isNaN(Date.parse(filename.slice(0, 10)))) {
		f.header = false;
	} else {
		f.header = true;
		if (!f.title) {
			f.title = filename.slice(11).replace(/-/g, " ").slice(0, -3);
		}
		if (f.created) {
			f.date = new Date(f.created);
		} else if (f.date) {
			f.date = new Date(f.date);
		} else {
			f.date = new Date(filename.slice(0, 10));
		}
		if (f.date == null) {
			console.log(`Post $path have no valide date indicated`);
			f.date = new Date();
		}
		if (f.author != null && typeof f.author == "string") {
			f.author = authors[f.author];
		}
		f.tags = f.tags || [];
		if (f.math) {
			f.head = f.head || [];
			f.head.push([
				"link",
				{
					rel: "stylesheet",
					href: "https://cdn.jsdelivr.net/npm/katex@0.16.2/dist/katex.min.css",
					integrity:
						"sha384-bYdxxUwYipFNohQlHt0bjN/LCpueqWz13HufFEV1SUatKs1cm4L6fFgCi1jT643X",
					crossorigin: "anonymous",
				},
			]);
			f.head.push(["link", { rel: "stylesheet", href: "/css/math.css" }]);
			f.head.push([
				"script",
				{
					type: "module",
					src: "https://cdn.jsdelivr.net/npm/katex@0.16.2/dist/contrib/copy-tex.mjs",
					integrity:
						"sha384-bVEnwt0PtX+1EuJoOEcm4rgTUWvb2ILTdjHfI1gUe/r5fdqrTcQaUuRdHG2DciuQ",
					crossorigin: "anonymous",
				},
			]);
		}
	}
	return f;
}

function markdownHook(md: MarkdownIt) {
	md.use(textmath, {
		engin: katex,
		delimiters: "dollars",
	});
	md.use(footnote);
	const render = md.render.bind(md);
	md.render = (src, env: markdownData) => {
		if (env.relativePath && env.frontmatter != null) {
			const path = env.relativePath.split("/");
			if (path.length >= 3) {
				env.frontmatter = hookFrontmatter(env.frontmatter, path[2]);
			} else {
				env.frontmatter.sidebar = false;
			}
		}
		return render(src, env);
	};
}

const katex_tags = [
	"math",
	"annotation",
	"semantics",
	"mtext",
	"mn",
	"mo",
	"mi",
	"mspace",
	"mover",
	"munder",
	"munderover",
	"msup",
	"msub",
	"msubsup",
	"mfrac",
	"mroot",
	"msqrt",
	"mtable",
	"mtr",
	"mtd",
	"mlabeledtr",
	"mrow",
	"menclose",
	"mstyle",
	"mpadded",
	"mphantom",
	"mglyph",
	"svg",
	"line",
	"path",
	"eq",
	"eqn",
];

const vue = {
	template: {
		compilerOptions: {
			isCustomElement: (tag: string) => katex_tags.includes(tag),
		},
	},
};

const theme: ThemeOptions = {
	dark: "dark-plus",
	light: "material-theme-palenight",
};

const markdown = {
	theme,
	preConfig: (md: MarkdownIt) => {
		md.use(markdownHook);
	},
};

const manifest = {
	name: "Jianyu MA's website",
	short_name: "Jianyu",
	description: "Hope you find me interesting",
	theme_color: "#ffffff",
	icons: [
		{
			src: "img/icon-192.png",
			sizes: "192x192",
			type: "image/png",
		},
		{
			src: "img/icon-512.png",
			sizes: "512x512",
			type: "image/png",
		},
	],
};

export { vue, markdown, manifest };
