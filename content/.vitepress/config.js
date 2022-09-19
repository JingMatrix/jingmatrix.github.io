// @ts-check

/** @type {import('vitepress').UserConfig} */
export default {
  title: "VitePress Playground",
  themeConfig: {
    dark: "min-dark",
    light: "min-light",
    repo: "JingMatrix/viteblog",
    docsDir: "content",

    locales: {
      "/": {
        nav: [
          { text: "Academic", link: "/academic" },
          { text: "Writings", link: "/writing" },
          {
            text: "Release Notes",
            link: "https://github.com/vuejs/vuex/releases",
          },
        ],

        sidebar: [
          {
            text: "Prologue",
            children: [
              { text: "Index", link: "/guide/" },
              { text: "Getting Started", link: "/guide/getting-started" },
              { text: "Guide Content", link: "/guide/guide-content" },
              { text: "Content", link: "/guide/content" },
            ],
          },
          {
            text: "Contents",
            children: [{ text: "Content", link: "/guide/content" }],
          },
        ],

        label: "English",
        selectText: "Languages",
      },
      "/zh/": {
        label: "中文",
        selectText: "选择语言",
        nav: [
          { text: "API", link: "/zh/api/" },
          { text: "更新日志", link: "https://github.com/vuejs/vuex/releases" },
        ],
        sidebar: [
          {
            text: "指南",
            children: [
              { text: "指南", link: "/zh/guide/" },
              { text: "快速开始", link: "/zh/guide/getting-started" },
              { text: "指南内容", link: "/zh/guide/guide-content" },
              { text: "内容", link: "/zh/guide/content" },
            ],
          },
          {
            text: "内容",
            children: [{ text: "内容", link: "/zh/guide/content" }],
          },
        ],
      },
    },
  },

  locales: {
    // 键名是该语言所属的子路径
    // 作为特例，默认语言可以使用 '/' 作为其路径。
    "/": {
      lang: "en-US", // 将会被设置为 <html> 的 lang 属性
      title: "VuePress",
      description: "Vue-powered Static Site Generator",
    },
    "/zh/": {
      lang: "zh-CN",
      title: "静态网站生成器",
      description: "Vue 驱动的静态网站生成器",
    },
  },
};
