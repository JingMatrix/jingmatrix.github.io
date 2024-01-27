import initPosts from "./posts";
import localeConfig from "./locales";
import { defineConfigWithTheme } from "vitepress";
import { ThemeConfig } from "./theme";
import { withPwa } from "@vite-pwa/vitepress";
import { vue, markdown, manifest } from "./plugin";
import { rssPlugin } from "vite-plugin-rss";

const hostname = "https://jingmatrix.github.io";
const posts = initPosts();

type blog = { text?: string; title: string; link: string };
const rssConfig = localeConfig.map((c) => {
  c.config.themeConfig.sidebar[0].items = posts[c.lang].map((p: blog) => {
    return { link: p.link, text: p.text };
  });
  const navItem = c.config.themeConfig.nav.find(
    (i) => "link" in i && i.link == null
  );
  if ("link" in navItem) navItem.link = posts[c.lang][0].link;
  return rssPlugin({
    mode: "define",
    fileName: `feed-${c.lang}.xml`,
    items: posts[c.lang].map((p: blog) => {
      p.link = hostname + p.link;
      delete p.text;
      return p;
    }),
    channel: c.channel,
  });
});

export default withPwa(
  defineConfigWithTheme<ThemeConfig>({
    vue,
    markdown,
    vite: { plugins: rssConfig },
    pwa: {
      outDir: ".vitepress/dist",
      strategies: "generateSW",
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
        globIgnores: [
          "workbox-*.js",
          "sw.js",
          "{hyperbolic-canvas,HyperbolicGroup,h2snake,public}/**/*",
        ],
        navigateFallbackDenylist: [
          /^\/pdf\/*/,
          /^\/cv\/*/,
          /^\/mikutap\/*/,
          /^\/hyperbolic-canvas\/*/,
        ],
      },
      registerType: "autoUpdate",
      includeAssets: ["favicon.png", "img/icon-180.png", "img/masked-icon.svg"],
      manifest,
    },
    cleanUrls: true,
    head: [
      ["link", { rel: "prefetch", href: "/manifest.webmanifest" }],
      ["link", { rel: "manifest", href: "/manifest.webmanifest" }],
      ["meta", { name: "theme-color", content: "#ffffff" }],
      [
        "link",
        {
          rel: "icon",
          href: "/favicon.png",
          type: "image/png",
          sizes: "32x32",
        },
      ],
      ["link", { rel: "mask-icon", href: "/img/logo.svg", color: "#ffffff" }],
      ["meta", { name: "author", content: "Jianyu MA" }],
      [
        "link",
        {
          rel: "apple-touch-icon",
          href: "/img/icon-180.png",
          sizes: "180x180",
        },
      ],
    ],
    themeConfig: {
      i18nRouting: false,
      logo: "/img/logo.svg",
      siteTitle: false,
      outline: "deep",
    },
    sitemap: { hostname },
    locales: Object.fromEntries(
      localeConfig.map((c) => [
        c.lang,
        { lang: c.lang, label: c.label, ...c.config },
      ])
    ),
  })
);
