// @ts-check

/** @type {import('vitepress').UserConfig} */
export default {
  themeConfig: {
    repo: "JingMatrix/viteblog",
    logo: "/img/logo.svg",
    siteTitle: false,
  },

  locales: {
    en: {
      title: "Jianyu MA",
      lang: "en",
      label: "English",
      themeConfig: {
        nav: [
          { text: "Academic", link: "/en/academic" },
          { text: "Writing", link: "/en/wrting" },
          {
            text: "About Me",
            items: [
              { text: "Curriculum Vitae", link: "/pdf/cv.pdf" },
              { text: "Educations", link: "/cv" },
              { text: "Contact Online", link: "/en/chat" },
            ],
          },
        ],
      },
    },
    zh: {
      title: "马健宇",
      label: "简体中文",
      lang: "zh",
      themeConfig: {
        nav: [
          { text: "博客", link: "/zh/blog" },
          {
            text: "关于我",
            items: [
              { text: "个人简历", link: "/pdf/cv.pdf" },
              { text: "教育背景", link: "/cv" },
              { text: "在线聊天", link: "/en/chat" },
            ],
          },
        ],
      },
    },
    fr: {
      title: "Jianyu MA",
      label: "Français",
      lang: "fr",
      themeConfig: {
        nav: [
          { text: "Enseignement", link: "/fr/enseignement" },
          { text: "Essai", link: "/fr/essai" },
          {
            text: "Sur Moi",
            items: [
              { text: "Curriculum Vitae", link: "/pdf/cv.pdf" },
              { text: "Formations", link: "/cv" },
              { text: "Contactez en ligne", link: "/en/chat" },
            ],
          },
        ],
      },
    },
  },
};
