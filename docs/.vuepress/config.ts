import { defineUserConfig } from "vuepress";
import { sitemapPlugin } from '@vuepress/plugin-sitemap'

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
  ],
});
