import { defineClientConfig } from "vuepress/client";
import typedContent from "./components/typedContent.vue";

export default defineClientConfig({
  // 客户端增强
  enhance: ({ app, router }) => {
    // 注册全局组件
    app.component("typedContent", typedContent);

    // 注册路由守卫
    router.beforeEach((to) => {
      console.log("before navigation"+"-"+to.fullPath);
    });

    router.afterEach((to) => {
      console.log("after navigation"+"-"+to.fullPath);
    });
  },


});