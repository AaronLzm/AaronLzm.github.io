import { navbar } from "vuepress-theme-hope";

export const enNavbar = navbar([
  "/",
  "/demo/",
  {
    text: "Posts",
    icon: "pen-to-square",
    prefix: "/posts/",
    children: [
      {
        text: "machine learning",
        icon: "pen-to-square",
        prefix: "machine_learning/",
        children: [
          { text: "CV", icon: "pen-to-square", link: "CV/" },
          { text: "Bayesian", icon: "pen-to-square", link: "Bayesian/" },
        ],
      },
    ],
  },
]);
