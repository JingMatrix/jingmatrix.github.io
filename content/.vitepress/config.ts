import initPosts from "./posts";
import localeConfig from "./locales";
import { defineConfigWithTheme, DefaultTheme } from "vitepress";
import { withPwa } from "@vite-pwa/vitepress";
import { vue, markdown, manifest, origin, base, fixLink } from "./plugin";
import { rssPlugin } from "vite-plugin-rss";

const posts = initPosts();

type blog = { text?: string; title: string; link: string };
const rssConfig = [];

for (const c of localeConfig) {
  const theme = c.config.themeConfig;
  if (theme.sidebar == null || theme.nav == null) continue;
  theme.sidebar[0].items = posts[c.lang].map((p: blog) => {
    return { link: p.link, text: p.text };
  });
  theme.socialLinks.forEach(fixLink);
  for (const o of theme.nav) if ("items" in o) o.items.forEach(fixLink);
  const navItem = theme.nav.find((i: Object) => "link" in i && i.link == null);
  if (navItem != undefined && "link" in navItem)
    navItem.link = posts[c.lang][0].link;

  rssConfig.push(
    rssPlugin({
      mode: "define",
      fileName: `feed-${c.lang}.xml`,
      items: posts[c.lang].map((p: blog) => {
        p.link = origin + p.link;
        delete p.text;
        return p;
      }),
      channel: { ...c.channel, link: origin + "/" + c.lang + "/" },
    })
  );
}

export default withPwa(
  defineConfigWithTheme<DefaultTheme.Config>({
    vue,
    base,
    markdown,
    vite: { plugins: rssConfig },
    pwa: {
      outDir: ".vitepress/dist",
      strategies: "generateSW",
      workbox: {
        globPatterns: ["**/*.{js,css,html,svg}"],
        globIgnores: ["workbox-*.js", "sw.js", "HyperbolicGroup/**/*", "*.xml"],
        navigateFallbackAllowlist: [/^\/en\/*/, /^\/fr\/*/, /^\/zh\/*/],
      },
      registerType: "autoUpdate",
      includeAssets: ["favicon.png", "img/icon-180.png", "img/masked-icon.svg"],
      manifest,
    },
    cleanUrls: true,
    head: [
      ["link", { rel: "prefetch", href: base + "manifest.webmanifest" }],
      ["link", { rel: "manifest", href: base + "manifest.webmanifest" }],
      ["meta", { name: "theme-color", content: "#ffffff" }],
      [
        "link",
        {
          rel: "icon",
          href: base + "favicon.png",
          type: "image/png",
          sizes: "32x32",
        },
      ],
      [
        "link",
        { rel: "mask-icon", href: base + "img/logo.svg", color: "#ffffff" },
      ],
      ["meta", { name: "author", content: "Jianyu MA" }],
      [
        "link",
        {
          rel: "apple-touch-icon",
          href: base + "img/icon-180.png",
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
    sitemap: { hostname: origin },
    locales: Object.fromEntries(
      localeConfig.map((c) => [
        c.lang,
        { lang: c.lang, label: c.label, ...c.config },
      ])
    ),
  })
);
