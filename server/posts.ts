import matter = require("gray-matter");
import fs = require("fs");
import type { PathLike } from "fs";

export type Post = {
	frontMatter: {
		date?: Date;
		title?: string;
		tags?: string[];
		description?: string;
	};
	regularPath: string;
};

function initTags(post: Post[]) {
	const data: any = {};
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
	const posts = paths.map((item: String) => {
		// item = dir + "/" + item;
		const content = fs.readFileSync(<PathLike>dir + "/" + item);
		const { data } = matter(content);
		if (data.created) {
			data.date = new Date(data.created)
		} else if (data.date) {
			data.date = new Date(data.date);
		} else {
			data.date = new Date(item.slice(0, 10));
		}
		if (data.date == null) {
			console.log(`Post $item in $dir have no data indicated`)
			data.date = new Date()
		}
		return {
			frontMatter: data,
			regularPath: dir.toString().slice(7) + '/' + item.slice(0, -3) + ".html",
		};
	});
	posts.reverse();
	return posts;
}

export default function() {
	["fr/essai", "zh/blog", "en/writing"].forEach(dir => {
		fs.writeFileSync(`server/data/${dir.slice(3)}.json`, JSON.stringify(getPosts(
			'content/' + dir).map(
				(p: Post) => {
					return {
						text: p.frontMatter.title,
						link: p.regularPath
					}
				}
			))
		)
	}
	)
}
