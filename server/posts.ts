import matter from "gray-matter";
import fs from 'fs';
import type { PathLike } from "fs";
import type { Post, dataPost, Frontmatter } from "./types";
import authors from './data/author.json'

export function hookFrontmatter(f: Frontmatter, filename: string): Frontmatter {
	if (isNaN(Date.parse(filename.slice(0, 10)))) {
		f.header = false;
	} else {
		f.header = true;
		if (!f.title) {
			f.title = filename.slice(11).replace(/-/g, ' ').slice(0, -3);
		};
		if (f.created) {
			f.date = new Date(f.created)
		} else if (f.date) {
			f.date = new Date(f.date);
		} else {
			f.date = new Date(filename.slice(0, 10));
		}
		if (f.date == null) {
			console.log(`Post $path have no valide date indicated`)
			f.date = new Date()
		}
		if (f.author != null &&
			typeof f.author == "string") {
			f.author = authors[f.author]
		}
		f.tags = f.tags || []
		if (f.math) {
			f.head = f.head || [];
			f.head.push(
				['link', {
					rel: "stylesheet",
					href: "https://cdn.jsdelivr.net/npm/katex@0.16.2/dist/katex.min.css",
					integrity: "sha384-bYdxxUwYipFNohQlHt0bjN/LCpueqWz13HufFEV1SUatKs1cm4L6fFgCi1jT643X",
					crossorigin: "anonymous"
				}])
			f.head.push(
				['link', { rel: "stylesheet", href: "/css/math.css" }])
			f.head.push(
				['script', {
					type: "module",
					src: "https://cdn.jsdelivr.net/npm/katex@0.16.2/dist/contrib/copy-tex.mjs",
					integrity: "sha384-bVEnwt0PtX+1EuJoOEcm4rgTUWvb2ILTdjHfI1gUe/r5fdqrTcQaUuRdHG2DciuQ",
					crossorigin: "anonymous"
				}])
		}
	}
	return f
}

function initTags(post: Post[]): dataPost {
	const data: dataPost = {};
	for (let i = 0; i < post.length; i++) {
		const element = post[i];
		const tags = element.frontMatter.tags;
		if (Array.isArray(tags)) {
			tags.forEach((item) => {
				if (!data[item]) {
					data[item] = [];
				}
				data[item].push(element);
			});
		}
	}
	return data;
}

function getPosts(dir: PathLike): Post[] {
	let paths = fs.readdirSync(dir);
	const posts = paths.map((filename: string) => {
		const content = fs.readFileSync(<PathLike>dir + "/" + filename);
		const { data } = matter(content);
		hookFrontmatter(data, filename);
		return {
			frontMatter: data,
			regularPath: dir.toString().slice(7) + '/' + encodeURI(filename.slice(0, -3))
		};
	});
	posts.reverse();
	return posts;
}

export default function() {
	const posts = [];
	["fr/essai", "zh/blog", "en/writing"].forEach(dir => {
		fs.writeFileSync(`server/data/${dir.slice(3)}.json`, JSON.stringify(getPosts(
			'content/' + dir).filter(
				(p: Post) => p.frontMatter.hidden !== true)
			.map(
				(p: Post) => {
					posts.push(p);
					return {
						text: p.frontMatter.title,
						link: p.regularPath,
						...p.frontMatter
					}
				}
			))
		)
	}
	);
	let md = '';
	for (const [tag, ps] of Object.entries(initTags(posts)).sort()) {
		md += "## " + tag + "\n\n";
		ps.forEach((p: Post) => {
			md += "- [" + p.frontMatter.title + "](" + p.regularPath + ") \n";
		}
		);
		md += "\n";
	}
	fs.writeFileSync(`content/tags.md`, md)
}
