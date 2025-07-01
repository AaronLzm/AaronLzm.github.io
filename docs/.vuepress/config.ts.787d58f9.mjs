// docs/.vuepress/config.ts
import { defineUserConfig } from "vuepress";

// docs/.vuepress/theme.ts
import { hopeTheme } from "vuepress-theme-hope";

// docs/.vuepress/navbar/en.ts
import { navbar } from "vuepress-theme-hope";
var enNavbar = navbar([
  "/",
  "/demo/",
  {
    text: "Posts",
    icon: "pen-to-square",
    prefix: "/posts/",
    children: [
      {
        text: "Apple",
        icon: "pen-to-square",
        prefix: "apple/",
        children: [
          { text: "Apple1", icon: "pen-to-square", link: "1" },
          { text: "Apple2", icon: "pen-to-square", link: "2" },
          "3",
          "4"
        ]
      },
      {
        text: "Banana",
        icon: "pen-to-square",
        prefix: "banana/",
        children: [
          {
            text: "Banana 1",
            icon: "pen-to-square",
            link: "1"
          },
          {
            text: "Banana 2",
            icon: "pen-to-square",
            link: "2"
          },
          "3",
          "4"
        ]
      },
      { text: "Cherry", icon: "pen-to-square", link: "cherry" },
      { text: "Dragon Fruit", icon: "pen-to-square", link: "dragonfruit" },
      "tomato",
      "strawberry"
    ]
  },
  {
    text: "V2 Docs",
    icon: "book",
    link: "https://theme-hope.vuejs.press/"
  }
]);

// docs/.vuepress/navbar/zh.ts
import { navbar as navbar2 } from "vuepress-theme-hope";
var zhNavbar = navbar2([
  "/zh/",
  "/zh/demo/",
  {
    text: "\u535A\u6587",
    icon: "pen-to-square",
    prefix: "/zh/posts/",
    children: [
      {
        text: "\u82F9\u679C",
        icon: "pen-to-square",
        prefix: "apple/",
        children: [
          { text: "\u82F9\u679C1", icon: "pen-to-square", link: "1" },
          { text: "\u82F9\u679C2", icon: "pen-to-square", link: "2" },
          "3",
          "4"
        ]
      },
      {
        text: "\u9999\u8549",
        icon: "pen-to-square",
        prefix: "banana/",
        children: [
          {
            text: "\u9999\u8549 1",
            icon: "pen-to-square",
            link: "1"
          },
          {
            text: "\u9999\u8549 2",
            icon: "pen-to-square",
            link: "2"
          },
          "3",
          "4"
        ]
      },
      { text: "\u6A31\u6843", icon: "pen-to-square", link: "cherry" },
      { text: "\u706B\u9F99\u679C", icon: "pen-to-square", link: "dragonfruit" },
      "tomato",
      "strawberry"
    ]
  },
  {
    text: "V2 \u6587\u6863",
    icon: "book",
    link: "https://theme-hope.vuejs.press/zh/"
  }
]);

// docs/.vuepress/sidebar/en.ts
import { sidebar } from "vuepress-theme-hope";
var enSidebar = sidebar({
  "/": [
    "",
    {
      text: "Demo",
      icon: "laptop-code",
      prefix: "demo/",
      link: "demo/",
      children: "structure"
    },
    {
      text: "Articles",
      icon: "book",
      prefix: "posts/",
      children: "structure"
    },
    "intro",
    {
      text: "Slides",
      icon: "person-chalkboard",
      link: "https://ecosystem.vuejs.press/plugins/markdown/revealjs/demo.html"
    }
  ]
});

// docs/.vuepress/sidebar/zh.ts
import { sidebar as sidebar2 } from "vuepress-theme-hope";
var zhSidebar = sidebar2({
  "/zh/": [
    "",
    {
      text: "\u5982\u4F55\u4F7F\u7528",
      icon: "laptop-code",
      prefix: "demo/",
      link: "demo/",
      children: "structure"
    },
    {
      text: "\u6587\u7AE0",
      icon: "book",
      prefix: "posts/",
      children: "structure"
    },
    "intro",
    {
      text: "\u5E7B\u706F\u7247",
      icon: "person-chalkboard",
      link: "https://ecosystem.vuejs.press/zh/plugins/markdown/revealjs/demo.html"
    }
  ]
});

// docs/.vuepress/theme.ts
var theme_default = hopeTheme({
  hostname: "https://lemonahmas.github.io",
  author: {
    name: "Aaron L",
    url: "https://lemonahmas.github.io"
  },
  logo: "https://avatars.githubusercontent.com/u/13514693?s=400&u=c9045dcc8b2f95cdb2be77dbec13b54ce2ec8e43&v=4",
  repo: "lemonahmas/lemonahmas.github.io",
  docsDir: "docs",
  blog: {
    medias: {
      Email: "mailto:lzm_aaron@outlook.com"
    }
  },
  locales: {
    "/": {
      // navbar
      navbar: enNavbar,
      // sidebar
      sidebar: enSidebar,
      footer: "Mind to drop me a mail?",
      displayFooter: true,
      blog: {
        description: "Webdev/Machine Learning",
        intro: "/intro.html"
      },
      metaLocales: {
        editLink: "Edit this page on GitHub"
      }
    },
    /**
     * Chinese locale config
     */
    "/zh/": {
      // navbar
      navbar: zhNavbar,
      // sidebar
      sidebar: zhSidebar,
      footer: "\u90AE\u4EF6\u804A\u804A\uFF1F",
      displayFooter: true,
      blog: {
        description: "\u7F51\u7AD9\u5F00\u53D1/\u673A\u5668\u5B66\u4E60",
        intro: "/zh/intro.html"
      },
      // page meta
      metaLocales: {
        editLink: "\u5728 GitHub \u4E0A\u7F16\u8F91\u6B64\u9875"
      }
    }
  },
  encrypt: {
    config: {
      "/demo/encrypt.html": {
        hint: "Password: 1234",
        password: "1234"
      },
      "/zh/demo/encrypt.html": {
        hint: "Password: 1234",
        password: "1234"
      }
    }
  },
  // enable it to preview all changes in time
  // hotReload: true,
  // These features are enabled for demo, only preserve features you need here
  markdown: {
    align: true,
    attrs: true,
    codeTabs: true,
    component: true,
    demo: true,
    figure: true,
    gfm: true,
    imgLazyload: true,
    imgSize: true,
    include: true,
    mark: true,
    plantuml: true,
    spoiler: true,
    stylize: [
      {
        matcher: "Recommended",
        replacer: ({ tag }) => {
          if (tag === "em")
            return {
              tag: "Badge",
              attrs: { type: "tip" },
              content: "Recommended"
            };
        }
      }
    ],
    sub: true,
    sup: true,
    tabs: true,
    tasklist: true,
    vPre: true,
    //uncomment these if you need TeX support
    math: {
      // install katex before enabling it
      type: "katex"
      // or install mathjax-full before enabling it
      //type: "mathjax",
    }
    // install chart.js before enabling it
    // chartjs: true,
    // install echarts before enabling it
    // echarts: true,
    // install flowchart.ts before enabling it
    // flowchart: true,
    // install mermaid before enabling it
    // mermaid: true,
    // playground: {
    //   presets: ["ts", "vue"],
    // },
    // install @vue/repl before enabling it
    // vuePlayground: true,
    // install sandpack-vue3 before enabling it
    // sandpack: true,
    // install @vuepress/plugin-revealjs and uncomment these if you need slides
    // revealjs: {
    //   plugins: ["highlight", "math", "search", "notes", "zoom"],
    // },
  },
  plugins: {
    blog: true,
    // Install @waline/client before enabling it
    // Note: This is for testing ONLY!
    // You MUST generate and use your own comment service in production.
    // comment: {
    //   provider: "Waline",
    //   serverURL: "https://waline-comment.vuejs.press",
    // },
    components: {
      components: ["Badge", "VPCard"]
    },
    icon: {
      prefix: "fa6-solid:"
    }
    // install @vuepress/plugin-pwa and uncomment these if you want a PWA
    // pwa: {
    //   favicon: "/favicon.ico",
    //   cacheHTML: true,
    //   cacheImage: true,
    //   appendBase: true,
    //   apple: {
    //     icon: "/assets/icon/apple-icon-152.png",
    //     statusBarColor: "black",
    //   },
    //   msTile: {
    //     image: "/assets/icon/ms-icon-144.png",
    //     color: "#ffffff",
    //   },
    //   manifest: {
    //     icons: [
    //       {
    //         src: "/assets/icon/chrome-mask-512.png",
    //         sizes: "512x512",
    //         purpose: "maskable",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-mask-192.png",
    //         sizes: "192x192",
    //         purpose: "maskable",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-512.png",
    //         sizes: "512x512",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-192.png",
    //         sizes: "192x192",
    //         type: "image/png",
    //       },
    //     ],
    //     shortcuts: [
    //       {
    //         name: "Demo",
    //         short_name: "Demo",
    //         url: "/demo/",
    //         icons: [
    //           {
    //             src: "/assets/icon/guide-maskable.png",
    //             sizes: "192x192",
    //             purpose: "maskable",
    //             type: "image/png",
    //           },
    //         ],
    //       },
    //     ],
    //   },
    // },
  }
});

// docs/.vuepress/config.ts
var config_default = defineUserConfig({
  base: "/",
  locales: {
    "/": {
      lang: "en-US",
      title: "Aaron's Blog",
      description: "Ad astra per Aspera"
    },
    "/zh/": {
      lang: "zh-CN",
      title: "Aaron\u7684\u535A\u5BA2",
      description: "Ad astra per Aspera"
    }
  },
  theme: theme_default
  // Enable it with pwa
  // shouldPrefetch: false,
});
export {
  config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZG9jcy8udnVlcHJlc3MvY29uZmlnLnRzIiwgImRvY3MvLnZ1ZXByZXNzL3RoZW1lLnRzIiwgImRvY3MvLnZ1ZXByZXNzL25hdmJhci9lbi50cyIsICJkb2NzLy52dWVwcmVzcy9uYXZiYXIvemgudHMiLCAiZG9jcy8udnVlcHJlc3Mvc2lkZWJhci9lbi50cyIsICJkb2NzLy52dWVwcmVzcy9zaWRlYmFyL3poLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzovVXNlcnMvbGVtb24vT25lRHJpdmUvbGVtb25haG1hcy5naXRodWIuaW8vZG9jcy8udnVlcHJlc3NcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGxlbW9uXFxcXE9uZURyaXZlXFxcXGxlbW9uYWhtYXMuZ2l0aHViLmlvXFxcXGRvY3NcXFxcLnZ1ZXByZXNzXFxcXGNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvbGVtb24vT25lRHJpdmUvbGVtb25haG1hcy5naXRodWIuaW8vZG9jcy8udnVlcHJlc3MvY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lVXNlckNvbmZpZyB9IGZyb20gXCJ2dWVwcmVzc1wiO1xuXG5pbXBvcnQgdGhlbWUgZnJvbSBcIi4vdGhlbWUuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lVXNlckNvbmZpZyh7XG4gIGJhc2U6IFwiL1wiLFxuXG4gIGxvY2FsZXM6IHtcbiAgICBcIi9cIjoge1xuICAgICAgbGFuZzogXCJlbi1VU1wiLFxuICAgICAgdGl0bGU6IFwiQWFyb24ncyBCbG9nXCIsXG4gICAgICBkZXNjcmlwdGlvbjogXCJBZCBhc3RyYSBwZXIgQXNwZXJhXCIsXG4gICAgfSxcbiAgICBcIi96aC9cIjoge1xuICAgICAgbGFuZzogXCJ6aC1DTlwiLFxuICAgICAgdGl0bGU6IFwiQWFyb25cdTc2ODRcdTUzNUFcdTVCQTJcIixcbiAgICAgIGRlc2NyaXB0aW9uOiBcIkFkIGFzdHJhIHBlciBBc3BlcmFcIixcbiAgICB9LFxuICB9LFxuXG4gIHRoZW1lLFxuXG4gIC8vIEVuYWJsZSBpdCB3aXRoIHB3YVxuICAvLyBzaG91bGRQcmVmZXRjaDogZmFsc2UsXG59KTtcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzovVXNlcnMvbGVtb24vT25lRHJpdmUvbGVtb25haG1hcy5naXRodWIuaW8vZG9jcy8udnVlcHJlc3NcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGxlbW9uXFxcXE9uZURyaXZlXFxcXGxlbW9uYWhtYXMuZ2l0aHViLmlvXFxcXGRvY3NcXFxcLnZ1ZXByZXNzXFxcXHRoZW1lLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9sZW1vbi9PbmVEcml2ZS9sZW1vbmFobWFzLmdpdGh1Yi5pby9kb2NzLy52dWVwcmVzcy90aGVtZS50c1wiO2ltcG9ydCB7IGhvcGVUaGVtZSB9IGZyb20gXCJ2dWVwcmVzcy10aGVtZS1ob3BlXCI7XG5cbmltcG9ydCB7IGVuTmF2YmFyLCB6aE5hdmJhciB9IGZyb20gXCIuL25hdmJhci9pbmRleC5qc1wiO1xuaW1wb3J0IHsgZW5TaWRlYmFyLCB6aFNpZGViYXIgfSBmcm9tIFwiLi9zaWRlYmFyL2luZGV4LmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGhvcGVUaGVtZSh7XG4gIGhvc3RuYW1lOiBcImh0dHBzOi8vbGVtb25haG1hcy5naXRodWIuaW9cIixcblxuICBhdXRob3I6IHtcbiAgICBuYW1lOiBcIkFhcm9uIExcIixcbiAgICB1cmw6IFwiaHR0cHM6Ly9sZW1vbmFobWFzLmdpdGh1Yi5pb1wiLFxuICB9LFxuXG4gIGxvZ286IFwiaHR0cHM6Ly9hdmF0YXJzLmdpdGh1YnVzZXJjb250ZW50LmNvbS91LzEzNTE0NjkzP3M9NDAwJnU9YzkwNDVkY2M4YjJmOTVjZGIyYmU3N2RiZWMxM2I1NGNlMmVjOGU0MyZ2PTRcIixcblxuICByZXBvOiBcImxlbW9uYWhtYXMvbGVtb25haG1hcy5naXRodWIuaW9cIixcblxuICBkb2NzRGlyOiBcImRvY3NcIixcblxuICBibG9nOiB7XG4gICAgbWVkaWFzOiB7XG4gICAgICBFbWFpbDogXCJtYWlsdG86bHptX2Fhcm9uQG91dGxvb2suY29tXCIsXG4gICAgfSxcbiAgfSxcblxuICBsb2NhbGVzOiB7XG4gICAgXCIvXCI6IHtcbiAgICAgIC8vIG5hdmJhclxuICAgICAgbmF2YmFyOiBlbk5hdmJhcixcblxuICAgICAgLy8gc2lkZWJhclxuICAgICAgc2lkZWJhcjogZW5TaWRlYmFyLFxuXG4gICAgICBmb290ZXI6IFwiTWluZCB0byBkcm9wIG1lIGEgbWFpbD9cIixcblxuICAgICAgZGlzcGxheUZvb3RlcjogdHJ1ZSxcblxuICAgICAgYmxvZzoge1xuICAgICAgICBkZXNjcmlwdGlvbjogXCJXZWJkZXYvTWFjaGluZSBMZWFybmluZ1wiLFxuICAgICAgICBpbnRybzogXCIvaW50cm8uaHRtbFwiLFxuICAgICAgfSxcblxuICAgICAgbWV0YUxvY2FsZXM6IHtcbiAgICAgICAgZWRpdExpbms6IFwiRWRpdCB0aGlzIHBhZ2Ugb24gR2l0SHViXCIsXG4gICAgICB9LFxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBDaGluZXNlIGxvY2FsZSBjb25maWdcbiAgICAgKi9cbiAgICBcIi96aC9cIjoge1xuICAgICAgLy8gbmF2YmFyXG4gICAgICBuYXZiYXI6IHpoTmF2YmFyLFxuXG4gICAgICAvLyBzaWRlYmFyXG4gICAgICBzaWRlYmFyOiB6aFNpZGViYXIsXG5cbiAgICAgIGZvb3RlcjogXCJcdTkwQUVcdTRFRjZcdTgwNEFcdTgwNEFcdUZGMUZcIixcblxuICAgICAgZGlzcGxheUZvb3RlcjogdHJ1ZSxcblxuICAgICAgYmxvZzoge1xuICAgICAgICBkZXNjcmlwdGlvbjogXCJcdTdGNTFcdTdBRDlcdTVGMDBcdTUzRDEvXHU2NzNBXHU1NjY4XHU1QjY2XHU0RTYwXCIsXG4gICAgICAgIGludHJvOiBcIi96aC9pbnRyby5odG1sXCIsXG4gICAgICB9LFxuXG4gICAgICAvLyBwYWdlIG1ldGFcbiAgICAgIG1ldGFMb2NhbGVzOiB7XG4gICAgICAgIGVkaXRMaW5rOiBcIlx1NTcyOCBHaXRIdWIgXHU0RTBBXHU3RjE2XHU4RjkxXHU2QjY0XHU5ODc1XCIsXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG5cbiAgZW5jcnlwdDoge1xuICAgIGNvbmZpZzoge1xuICAgICAgXCIvZGVtby9lbmNyeXB0Lmh0bWxcIjoge1xuICAgICAgICBoaW50OiBcIlBhc3N3b3JkOiAxMjM0XCIsXG4gICAgICAgIHBhc3N3b3JkOiBcIjEyMzRcIixcbiAgICAgIH0sXG4gICAgICBcIi96aC9kZW1vL2VuY3J5cHQuaHRtbFwiOiB7XG4gICAgICAgIGhpbnQ6IFwiUGFzc3dvcmQ6IDEyMzRcIixcbiAgICAgICAgcGFzc3dvcmQ6IFwiMTIzNFwiLFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxuXG4gIC8vIGVuYWJsZSBpdCB0byBwcmV2aWV3IGFsbCBjaGFuZ2VzIGluIHRpbWVcbiAgLy8gaG90UmVsb2FkOiB0cnVlLFxuXG4gIC8vIFRoZXNlIGZlYXR1cmVzIGFyZSBlbmFibGVkIGZvciBkZW1vLCBvbmx5IHByZXNlcnZlIGZlYXR1cmVzIHlvdSBuZWVkIGhlcmVcbiAgbWFya2Rvd246IHtcbiAgICBhbGlnbjogdHJ1ZSxcbiAgICBhdHRyczogdHJ1ZSxcbiAgICBjb2RlVGFiczogdHJ1ZSxcbiAgICBjb21wb25lbnQ6IHRydWUsXG4gICAgZGVtbzogdHJ1ZSxcbiAgICBmaWd1cmU6IHRydWUsXG4gICAgZ2ZtOiB0cnVlLFxuICAgIGltZ0xhenlsb2FkOiB0cnVlLFxuICAgIGltZ1NpemU6IHRydWUsXG4gICAgaW5jbHVkZTogdHJ1ZSxcbiAgICBtYXJrOiB0cnVlLFxuICAgIHBsYW50dW1sOiB0cnVlLFxuICAgIHNwb2lsZXI6IHRydWUsXG4gICAgc3R5bGl6ZTogW1xuICAgICAge1xuICAgICAgICBtYXRjaGVyOiBcIlJlY29tbWVuZGVkXCIsXG4gICAgICAgIHJlcGxhY2VyOiAoeyB0YWcgfSkgPT4ge1xuICAgICAgICAgIGlmICh0YWcgPT09IFwiZW1cIilcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIHRhZzogXCJCYWRnZVwiLFxuICAgICAgICAgICAgICBhdHRyczogeyB0eXBlOiBcInRpcFwiIH0sXG4gICAgICAgICAgICAgIGNvbnRlbnQ6IFwiUmVjb21tZW5kZWRcIixcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIF0sXG4gICAgc3ViOiB0cnVlLFxuICAgIHN1cDogdHJ1ZSxcbiAgICB0YWJzOiB0cnVlLFxuICAgIHRhc2tsaXN0OiB0cnVlLFxuICAgIHZQcmU6IHRydWUsXG5cbiAgICAvL3VuY29tbWVudCB0aGVzZSBpZiB5b3UgbmVlZCBUZVggc3VwcG9ydFxuICAgIG1hdGg6IHtcbiAgICAgIC8vIGluc3RhbGwga2F0ZXggYmVmb3JlIGVuYWJsaW5nIGl0XG4gICAgICB0eXBlOiBcImthdGV4XCIsXG4gICAgICAvLyBvciBpbnN0YWxsIG1hdGhqYXgtZnVsbCBiZWZvcmUgZW5hYmxpbmcgaXRcbiAgICAgIC8vdHlwZTogXCJtYXRoamF4XCIsXG4gICAgfSxcblxuICAgIC8vIGluc3RhbGwgY2hhcnQuanMgYmVmb3JlIGVuYWJsaW5nIGl0XG4gICAgLy8gY2hhcnRqczogdHJ1ZSxcblxuICAgIC8vIGluc3RhbGwgZWNoYXJ0cyBiZWZvcmUgZW5hYmxpbmcgaXRcbiAgICAvLyBlY2hhcnRzOiB0cnVlLFxuXG4gICAgLy8gaW5zdGFsbCBmbG93Y2hhcnQudHMgYmVmb3JlIGVuYWJsaW5nIGl0XG4gICAgLy8gZmxvd2NoYXJ0OiB0cnVlLFxuXG4gICAgLy8gaW5zdGFsbCBtZXJtYWlkIGJlZm9yZSBlbmFibGluZyBpdFxuICAgIC8vIG1lcm1haWQ6IHRydWUsXG5cbiAgICAvLyBwbGF5Z3JvdW5kOiB7XG4gICAgLy8gICBwcmVzZXRzOiBbXCJ0c1wiLCBcInZ1ZVwiXSxcbiAgICAvLyB9LFxuXG4gICAgLy8gaW5zdGFsbCBAdnVlL3JlcGwgYmVmb3JlIGVuYWJsaW5nIGl0XG4gICAgLy8gdnVlUGxheWdyb3VuZDogdHJ1ZSxcblxuICAgIC8vIGluc3RhbGwgc2FuZHBhY2stdnVlMyBiZWZvcmUgZW5hYmxpbmcgaXRcbiAgICAvLyBzYW5kcGFjazogdHJ1ZSxcblxuICAgIC8vIGluc3RhbGwgQHZ1ZXByZXNzL3BsdWdpbi1yZXZlYWxqcyBhbmQgdW5jb21tZW50IHRoZXNlIGlmIHlvdSBuZWVkIHNsaWRlc1xuICAgIC8vIHJldmVhbGpzOiB7XG4gICAgLy8gICBwbHVnaW5zOiBbXCJoaWdobGlnaHRcIiwgXCJtYXRoXCIsIFwic2VhcmNoXCIsIFwibm90ZXNcIiwgXCJ6b29tXCJdLFxuICAgIC8vIH0sXG4gIH0sXG5cbiAgcGx1Z2luczoge1xuICAgIGJsb2c6IHRydWUsXG5cbiAgICAvLyBJbnN0YWxsIEB3YWxpbmUvY2xpZW50IGJlZm9yZSBlbmFibGluZyBpdFxuICAgIC8vIE5vdGU6IFRoaXMgaXMgZm9yIHRlc3RpbmcgT05MWSFcbiAgICAvLyBZb3UgTVVTVCBnZW5lcmF0ZSBhbmQgdXNlIHlvdXIgb3duIGNvbW1lbnQgc2VydmljZSBpbiBwcm9kdWN0aW9uLlxuICAgIC8vIGNvbW1lbnQ6IHtcbiAgICAvLyAgIHByb3ZpZGVyOiBcIldhbGluZVwiLFxuICAgIC8vICAgc2VydmVyVVJMOiBcImh0dHBzOi8vd2FsaW5lLWNvbW1lbnQudnVlanMucHJlc3NcIixcbiAgICAvLyB9LFxuXG4gICAgY29tcG9uZW50czoge1xuICAgICAgY29tcG9uZW50czogW1wiQmFkZ2VcIiwgXCJWUENhcmRcIl0sXG4gICAgfSxcblxuICAgIGljb246IHtcbiAgICAgIHByZWZpeDogXCJmYTYtc29saWQ6XCIsXG4gICAgfSxcblxuICAgIC8vIGluc3RhbGwgQHZ1ZXByZXNzL3BsdWdpbi1wd2EgYW5kIHVuY29tbWVudCB0aGVzZSBpZiB5b3Ugd2FudCBhIFBXQVxuICAgIC8vIHB3YToge1xuICAgIC8vICAgZmF2aWNvbjogXCIvZmF2aWNvbi5pY29cIixcbiAgICAvLyAgIGNhY2hlSFRNTDogdHJ1ZSxcbiAgICAvLyAgIGNhY2hlSW1hZ2U6IHRydWUsXG4gICAgLy8gICBhcHBlbmRCYXNlOiB0cnVlLFxuICAgIC8vICAgYXBwbGU6IHtcbiAgICAvLyAgICAgaWNvbjogXCIvYXNzZXRzL2ljb24vYXBwbGUtaWNvbi0xNTIucG5nXCIsXG4gICAgLy8gICAgIHN0YXR1c0JhckNvbG9yOiBcImJsYWNrXCIsXG4gICAgLy8gICB9LFxuICAgIC8vICAgbXNUaWxlOiB7XG4gICAgLy8gICAgIGltYWdlOiBcIi9hc3NldHMvaWNvbi9tcy1pY29uLTE0NC5wbmdcIixcbiAgICAvLyAgICAgY29sb3I6IFwiI2ZmZmZmZlwiLFxuICAgIC8vICAgfSxcbiAgICAvLyAgIG1hbmlmZXN0OiB7XG4gICAgLy8gICAgIGljb25zOiBbXG4gICAgLy8gICAgICAge1xuICAgIC8vICAgICAgICAgc3JjOiBcIi9hc3NldHMvaWNvbi9jaHJvbWUtbWFzay01MTIucG5nXCIsXG4gICAgLy8gICAgICAgICBzaXplczogXCI1MTJ4NTEyXCIsXG4gICAgLy8gICAgICAgICBwdXJwb3NlOiBcIm1hc2thYmxlXCIsXG4gICAgLy8gICAgICAgICB0eXBlOiBcImltYWdlL3BuZ1wiLFxuICAgIC8vICAgICAgIH0sXG4gICAgLy8gICAgICAge1xuICAgIC8vICAgICAgICAgc3JjOiBcIi9hc3NldHMvaWNvbi9jaHJvbWUtbWFzay0xOTIucG5nXCIsXG4gICAgLy8gICAgICAgICBzaXplczogXCIxOTJ4MTkyXCIsXG4gICAgLy8gICAgICAgICBwdXJwb3NlOiBcIm1hc2thYmxlXCIsXG4gICAgLy8gICAgICAgICB0eXBlOiBcImltYWdlL3BuZ1wiLFxuICAgIC8vICAgICAgIH0sXG4gICAgLy8gICAgICAge1xuICAgIC8vICAgICAgICAgc3JjOiBcIi9hc3NldHMvaWNvbi9jaHJvbWUtNTEyLnBuZ1wiLFxuICAgIC8vICAgICAgICAgc2l6ZXM6IFwiNTEyeDUxMlwiLFxuICAgIC8vICAgICAgICAgdHlwZTogXCJpbWFnZS9wbmdcIixcbiAgICAvLyAgICAgICB9LFxuICAgIC8vICAgICAgIHtcbiAgICAvLyAgICAgICAgIHNyYzogXCIvYXNzZXRzL2ljb24vY2hyb21lLTE5Mi5wbmdcIixcbiAgICAvLyAgICAgICAgIHNpemVzOiBcIjE5MngxOTJcIixcbiAgICAvLyAgICAgICAgIHR5cGU6IFwiaW1hZ2UvcG5nXCIsXG4gICAgLy8gICAgICAgfSxcbiAgICAvLyAgICAgXSxcbiAgICAvLyAgICAgc2hvcnRjdXRzOiBbXG4gICAgLy8gICAgICAge1xuICAgIC8vICAgICAgICAgbmFtZTogXCJEZW1vXCIsXG4gICAgLy8gICAgICAgICBzaG9ydF9uYW1lOiBcIkRlbW9cIixcbiAgICAvLyAgICAgICAgIHVybDogXCIvZGVtby9cIixcbiAgICAvLyAgICAgICAgIGljb25zOiBbXG4gICAgLy8gICAgICAgICAgIHtcbiAgICAvLyAgICAgICAgICAgICBzcmM6IFwiL2Fzc2V0cy9pY29uL2d1aWRlLW1hc2thYmxlLnBuZ1wiLFxuICAgIC8vICAgICAgICAgICAgIHNpemVzOiBcIjE5MngxOTJcIixcbiAgICAvLyAgICAgICAgICAgICBwdXJwb3NlOiBcIm1hc2thYmxlXCIsXG4gICAgLy8gICAgICAgICAgICAgdHlwZTogXCJpbWFnZS9wbmdcIixcbiAgICAvLyAgICAgICAgICAgfSxcbiAgICAvLyAgICAgICAgIF0sXG4gICAgLy8gICAgICAgfSxcbiAgICAvLyAgICAgXSxcbiAgICAvLyAgIH0sXG4gICAgLy8gfSxcbiAgfSxcbn0pO1xuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOi9Vc2Vycy9sZW1vbi9PbmVEcml2ZS9sZW1vbmFobWFzLmdpdGh1Yi5pby9kb2NzLy52dWVwcmVzcy9uYXZiYXJcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGxlbW9uXFxcXE9uZURyaXZlXFxcXGxlbW9uYWhtYXMuZ2l0aHViLmlvXFxcXGRvY3NcXFxcLnZ1ZXByZXNzXFxcXG5hdmJhclxcXFxlbi50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvbGVtb24vT25lRHJpdmUvbGVtb25haG1hcy5naXRodWIuaW8vZG9jcy8udnVlcHJlc3MvbmF2YmFyL2VuLnRzXCI7aW1wb3J0IHsgbmF2YmFyIH0gZnJvbSBcInZ1ZXByZXNzLXRoZW1lLWhvcGVcIjtcblxuZXhwb3J0IGNvbnN0IGVuTmF2YmFyID0gbmF2YmFyKFtcbiAgXCIvXCIsXG4gIFwiL2RlbW8vXCIsXG4gIHtcbiAgICB0ZXh0OiBcIlBvc3RzXCIsXG4gICAgaWNvbjogXCJwZW4tdG8tc3F1YXJlXCIsXG4gICAgcHJlZml4OiBcIi9wb3N0cy9cIixcbiAgICBjaGlsZHJlbjogW1xuICAgICAge1xuICAgICAgICB0ZXh0OiBcIkFwcGxlXCIsXG4gICAgICAgIGljb246IFwicGVuLXRvLXNxdWFyZVwiLFxuICAgICAgICBwcmVmaXg6IFwiYXBwbGUvXCIsXG4gICAgICAgIGNoaWxkcmVuOiBbXG4gICAgICAgICAgeyB0ZXh0OiBcIkFwcGxlMVwiLCBpY29uOiBcInBlbi10by1zcXVhcmVcIiwgbGluazogXCIxXCIgfSxcbiAgICAgICAgICB7IHRleHQ6IFwiQXBwbGUyXCIsIGljb246IFwicGVuLXRvLXNxdWFyZVwiLCBsaW5rOiBcIjJcIiB9LFxuICAgICAgICAgIFwiM1wiLFxuICAgICAgICAgIFwiNFwiLFxuICAgICAgICBdLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGV4dDogXCJCYW5hbmFcIixcbiAgICAgICAgaWNvbjogXCJwZW4tdG8tc3F1YXJlXCIsXG4gICAgICAgIHByZWZpeDogXCJiYW5hbmEvXCIsXG4gICAgICAgIGNoaWxkcmVuOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGV4dDogXCJCYW5hbmEgMVwiLFxuICAgICAgICAgICAgaWNvbjogXCJwZW4tdG8tc3F1YXJlXCIsXG4gICAgICAgICAgICBsaW5rOiBcIjFcIixcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6IFwiQmFuYW5hIDJcIixcbiAgICAgICAgICAgIGljb246IFwicGVuLXRvLXNxdWFyZVwiLFxuICAgICAgICAgICAgbGluazogXCIyXCIsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcIjNcIixcbiAgICAgICAgICBcIjRcIixcbiAgICAgICAgXSxcbiAgICAgIH0sXG4gICAgICB7IHRleHQ6IFwiQ2hlcnJ5XCIsIGljb246IFwicGVuLXRvLXNxdWFyZVwiLCBsaW5rOiBcImNoZXJyeVwiIH0sXG4gICAgICB7IHRleHQ6IFwiRHJhZ29uIEZydWl0XCIsIGljb246IFwicGVuLXRvLXNxdWFyZVwiLCBsaW5rOiBcImRyYWdvbmZydWl0XCIgfSxcbiAgICAgIFwidG9tYXRvXCIsXG4gICAgICBcInN0cmF3YmVycnlcIixcbiAgICBdLFxuICB9LFxuICB7XG4gICAgdGV4dDogXCJWMiBEb2NzXCIsXG4gICAgaWNvbjogXCJib29rXCIsXG4gICAgbGluazogXCJodHRwczovL3RoZW1lLWhvcGUudnVlanMucHJlc3MvXCIsXG4gIH0sXG5dKTtcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzovVXNlcnMvbGVtb24vT25lRHJpdmUvbGVtb25haG1hcy5naXRodWIuaW8vZG9jcy8udnVlcHJlc3MvbmF2YmFyXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxsZW1vblxcXFxPbmVEcml2ZVxcXFxsZW1vbmFobWFzLmdpdGh1Yi5pb1xcXFxkb2NzXFxcXC52dWVwcmVzc1xcXFxuYXZiYXJcXFxcemgudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL2xlbW9uL09uZURyaXZlL2xlbW9uYWhtYXMuZ2l0aHViLmlvL2RvY3MvLnZ1ZXByZXNzL25hdmJhci96aC50c1wiO2ltcG9ydCB7IG5hdmJhciB9IGZyb20gXCJ2dWVwcmVzcy10aGVtZS1ob3BlXCI7XG5cbmV4cG9ydCBjb25zdCB6aE5hdmJhciA9IG5hdmJhcihbXG4gIFwiL3poL1wiLFxuICBcIi96aC9kZW1vL1wiLFxuICB7XG4gICAgdGV4dDogXCJcdTUzNUFcdTY1ODdcIixcbiAgICBpY29uOiBcInBlbi10by1zcXVhcmVcIixcbiAgICBwcmVmaXg6IFwiL3poL3Bvc3RzL1wiLFxuICAgIGNoaWxkcmVuOiBbXG4gICAgICB7XG4gICAgICAgIHRleHQ6IFwiXHU4MkY5XHU2NzlDXCIsXG4gICAgICAgIGljb246IFwicGVuLXRvLXNxdWFyZVwiLFxuICAgICAgICBwcmVmaXg6IFwiYXBwbGUvXCIsXG4gICAgICAgIGNoaWxkcmVuOiBbXG4gICAgICAgICAgeyB0ZXh0OiBcIlx1ODJGOVx1Njc5QzFcIiwgaWNvbjogXCJwZW4tdG8tc3F1YXJlXCIsIGxpbms6IFwiMVwiIH0sXG4gICAgICAgICAgeyB0ZXh0OiBcIlx1ODJGOVx1Njc5QzJcIiwgaWNvbjogXCJwZW4tdG8tc3F1YXJlXCIsIGxpbms6IFwiMlwiIH0sXG4gICAgICAgICAgXCIzXCIsXG4gICAgICAgICAgXCI0XCIsXG4gICAgICAgIF0sXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0ZXh0OiBcIlx1OTk5OVx1ODU0OVwiLFxuICAgICAgICBpY29uOiBcInBlbi10by1zcXVhcmVcIixcbiAgICAgICAgcHJlZml4OiBcImJhbmFuYS9cIixcbiAgICAgICAgY2hpbGRyZW46IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0ZXh0OiBcIlx1OTk5OVx1ODU0OSAxXCIsXG4gICAgICAgICAgICBpY29uOiBcInBlbi10by1zcXVhcmVcIixcbiAgICAgICAgICAgIGxpbms6IFwiMVwiLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGV4dDogXCJcdTk5OTlcdTg1NDkgMlwiLFxuICAgICAgICAgICAgaWNvbjogXCJwZW4tdG8tc3F1YXJlXCIsXG4gICAgICAgICAgICBsaW5rOiBcIjJcIixcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiM1wiLFxuICAgICAgICAgIFwiNFwiLFxuICAgICAgICBdLFxuICAgICAgfSxcbiAgICAgIHsgdGV4dDogXCJcdTZBMzFcdTY4NDNcIiwgaWNvbjogXCJwZW4tdG8tc3F1YXJlXCIsIGxpbms6IFwiY2hlcnJ5XCIgfSxcbiAgICAgIHsgdGV4dDogXCJcdTcwNkJcdTlGOTlcdTY3OUNcIiwgaWNvbjogXCJwZW4tdG8tc3F1YXJlXCIsIGxpbms6IFwiZHJhZ29uZnJ1aXRcIiB9LFxuICAgICAgXCJ0b21hdG9cIixcbiAgICAgIFwic3RyYXdiZXJyeVwiLFxuICAgIF0sXG4gIH0sXG4gIHtcbiAgICB0ZXh0OiBcIlYyIFx1NjU4N1x1Njg2M1wiLFxuICAgIGljb246IFwiYm9va1wiLFxuICAgIGxpbms6IFwiaHR0cHM6Ly90aGVtZS1ob3BlLnZ1ZWpzLnByZXNzL3poL1wiLFxuICB9LFxuXSk7XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6L1VzZXJzL2xlbW9uL09uZURyaXZlL2xlbW9uYWhtYXMuZ2l0aHViLmlvL2RvY3MvLnZ1ZXByZXNzL3NpZGViYXJcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGxlbW9uXFxcXE9uZURyaXZlXFxcXGxlbW9uYWhtYXMuZ2l0aHViLmlvXFxcXGRvY3NcXFxcLnZ1ZXByZXNzXFxcXHNpZGViYXJcXFxcZW4udHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL2xlbW9uL09uZURyaXZlL2xlbW9uYWhtYXMuZ2l0aHViLmlvL2RvY3MvLnZ1ZXByZXNzL3NpZGViYXIvZW4udHNcIjtpbXBvcnQgeyBzaWRlYmFyIH0gZnJvbSBcInZ1ZXByZXNzLXRoZW1lLWhvcGVcIjtcblxuZXhwb3J0IGNvbnN0IGVuU2lkZWJhciA9IHNpZGViYXIoe1xuICBcIi9cIjogW1xuICAgIFwiXCIsXG4gICAge1xuICAgICAgdGV4dDogXCJEZW1vXCIsXG4gICAgICBpY29uOiBcImxhcHRvcC1jb2RlXCIsXG4gICAgICBwcmVmaXg6IFwiZGVtby9cIixcbiAgICAgIGxpbms6IFwiZGVtby9cIixcbiAgICAgIGNoaWxkcmVuOiBcInN0cnVjdHVyZVwiLFxuICAgIH0sXG4gICAge1xuICAgICAgdGV4dDogXCJBcnRpY2xlc1wiLFxuICAgICAgaWNvbjogXCJib29rXCIsXG4gICAgICBwcmVmaXg6IFwicG9zdHMvXCIsXG4gICAgICBjaGlsZHJlbjogXCJzdHJ1Y3R1cmVcIixcbiAgICB9LFxuICAgIFwiaW50cm9cIixcbiAgICB7XG4gICAgICB0ZXh0OiBcIlNsaWRlc1wiLFxuICAgICAgaWNvbjogXCJwZXJzb24tY2hhbGtib2FyZFwiLFxuICAgICAgbGluazogXCJodHRwczovL2Vjb3N5c3RlbS52dWVqcy5wcmVzcy9wbHVnaW5zL21hcmtkb3duL3JldmVhbGpzL2RlbW8uaHRtbFwiLFxuICAgIH0sXG4gIF0sXG59KTtcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzovVXNlcnMvbGVtb24vT25lRHJpdmUvbGVtb25haG1hcy5naXRodWIuaW8vZG9jcy8udnVlcHJlc3Mvc2lkZWJhclwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcbGVtb25cXFxcT25lRHJpdmVcXFxcbGVtb25haG1hcy5naXRodWIuaW9cXFxcZG9jc1xcXFwudnVlcHJlc3NcXFxcc2lkZWJhclxcXFx6aC50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvbGVtb24vT25lRHJpdmUvbGVtb25haG1hcy5naXRodWIuaW8vZG9jcy8udnVlcHJlc3Mvc2lkZWJhci96aC50c1wiO2ltcG9ydCB7IHNpZGViYXIgfSBmcm9tIFwidnVlcHJlc3MtdGhlbWUtaG9wZVwiO1xuXG5leHBvcnQgY29uc3QgemhTaWRlYmFyID0gc2lkZWJhcih7XG4gIFwiL3poL1wiOiBbXG4gICAgXCJcIixcbiAgICB7XG4gICAgICB0ZXh0OiBcIlx1NTk4Mlx1NEY1NVx1NEY3Rlx1NzUyOFwiLFxuICAgICAgaWNvbjogXCJsYXB0b3AtY29kZVwiLFxuICAgICAgcHJlZml4OiBcImRlbW8vXCIsXG4gICAgICBsaW5rOiBcImRlbW8vXCIsXG4gICAgICBjaGlsZHJlbjogXCJzdHJ1Y3R1cmVcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHRleHQ6IFwiXHU2NTg3XHU3QUUwXCIsXG4gICAgICBpY29uOiBcImJvb2tcIixcbiAgICAgIHByZWZpeDogXCJwb3N0cy9cIixcbiAgICAgIGNoaWxkcmVuOiBcInN0cnVjdHVyZVwiLFxuICAgIH0sXG4gICAgXCJpbnRyb1wiLFxuICAgIHtcbiAgICAgIHRleHQ6IFwiXHU1RTdCXHU3MDZGXHU3MjQ3XCIsXG4gICAgICBpY29uOiBcInBlcnNvbi1jaGFsa2JvYXJkXCIsXG4gICAgICBsaW5rOiBcImh0dHBzOi8vZWNvc3lzdGVtLnZ1ZWpzLnByZXNzL3poL3BsdWdpbnMvbWFya2Rvd24vcmV2ZWFsanMvZGVtby5odG1sXCIsXG4gICAgfSxcbiAgXSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFp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
