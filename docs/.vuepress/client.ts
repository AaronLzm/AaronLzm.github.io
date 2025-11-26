import { defineClientConfig } from "vuepress/client";
import typedContent from "./components/typedContent.vue";

export default defineClientConfig({
  // 客户端增强
  enhance: ({ app, router,siteData }) => {
    // 注册全局组件
    app.component("typedContent", typedContent);

    // 注册路由守卫 打印日志
    router.beforeEach((to) => {
      console.log("before navigation"+"-"+decodeURIComponent(to.fullPath));
    });

    router.afterEach((to) => {
      console.log("after navigation"+"-"+decodeURIComponent(to.fullPath));
    });
  },


});