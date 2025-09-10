import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
  "/zh/",
  //"/zh/demo/",
  {
    text: "博文",
    icon: "pen-to-square",
    prefix: "/zh/posts/",
    children: [
      "notice.md",
    ],
  },
]);
