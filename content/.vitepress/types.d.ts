export type authorDetailed = {
  avatar: string;
  name: string;
  links: [
    {
      lable: string;
      icon: string;
      url: string;
    }
  ];
};
type HeadConfig =
  | [string, Record<string, string>]
  | [string, Record<string, string>, string];

export type Frontmatter = {
  title?: string;
  header?: boolean;
  hidden?: boolean;
  head?: HeadConfig[];
  math?: boolean;
  sidebar?: boolean;
  created?: string;
  modified?: string;
  date?: Date;
  tags?: Array<string>;
  author?: string | authorDetailed;
};

export type markdownData = {
  path?: string;
  relativePath?: string;
  frontmatter?: Frontmatter;
};

export type Post = {
  frontMatter: Frontmatter;
  regularPath: string;
};

export type dataPost = Record<string, Post[]>;
