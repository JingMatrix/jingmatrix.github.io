import matter from "gray-matter";
import fs from "fs";
import type { PathLike } from "fs";
import type { Post, dataPost } from "./types";

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
    // hookFrontmatter(data, filename);
    return {
      frontMatter: data,
      regularPath:
        dir.toString().slice(7) + "/" + encodeURI(filename.slice(0, -3)),
    };
  });
  posts.reverse();
  return posts;
}

export default function () {
  const posts: Array<Post> = [];
  const postData = ["fr/essai", "zh/blog", "en/writing"].map((dir) => [
    dir.slice(0, 2),
    getPosts("content/" + dir)
      .filter((p: Post) => p.frontMatter.hidden !== true)
      .map((p: Post) => {
        posts.push(p);
        return {
          text: p.frontMatter.title,
          link: p.regularPath,
          ...p.frontMatter,
        };
      }),
  ]);
  let md = "";
  for (const [tag, ps] of Object.entries(initTags(posts)).sort()) {
    md += "## " + tag + "\n\n";
    ps.forEach((p: Post) => {
      md += "- [" + p.frontMatter.title + "](" + p.regularPath + ") \n";
    });
    md += "\n";
  }
  fs.writeFileSync(`content/tags.md`, md);
  return Object.fromEntries(postData);
}
