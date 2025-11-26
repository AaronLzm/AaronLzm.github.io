import { defineUserConfig } from "vuepress";
import { appendDatePlugin } from '@vuepress/plugin-append-date'

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
    appendDatePlugin({
      format: "full",
      key: "date"
    }),
  ],
});
