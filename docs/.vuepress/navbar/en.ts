import { navbar } from "vuepress-theme-hope";

export const enNavbar = navbar([
  "/",
  //"/demo/",
  {
    text: "Posts",
    icon: "pen-to-square",
    prefix: "/posts/",
    children: [
      {
        text: "machine learning",
        icon: "pen-to-square",
        prefix: "Machine_learning/",
        children: [
          { text: "CV", icon: "pen-to-square", link: "CV/" },
          { text: "Bayesian", icon: "pen-to-square", link: "Bayesian/" },
        ],
      },
      {
        text: "Causal inference",
        icon: "pen-to-square",
        prefix: "Causal inference/",
        children: [
          { text: "What-if?", icon: "pen-to-square", link: "What-if book reading notes/" },
        ],
      },
      {
        text: "Inspirational",
        icon: "pen-to-square",
        prefix: "Inspirational/",
        children:[
          
        ]
      },
    ],
  },
]);
