import { defineUserConfig } from "vuepress";
import { sitemapPlugin } from '@vuepress/plugin-sitemap'
import { appendDatePlugin } from '@vuepress/plugin-append-date'
import { shikiPlugin } from '@vuepress/plugin-shiki'


import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  locales: {
    "/": {
      lang: "en-US",
      title: "Aaron's Blog",
      description: "Ad astra per Aspera",
    },
    "/zh/": {
      lang: "zh-CN",
      title: "Aaron的博客",
      description: "Ad astra per Aspera",
    },
  },

  theme,

  // Enable it with pwa
  // shouldPrefetch: false,

  plugins:[
    sitemapPlugin({
      hostname: "aaronlzm.github.io",
      changefreq: "daily",
    }),
    appendDatePlugin({
      format: "full",
      key: "full"
    }),
    shikiPlugin({
      // options
      langs: ['ts', 'json', 'vue', 'md', 'bash', 'diff', "python","py"],
    }),
  ],
});
