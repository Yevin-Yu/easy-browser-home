import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/Page.vue"),
      children:[
        {
          path: "setting",
          name: "setting",
          component: () => import("@/components/Setting.vue"),
        },
        {
          path: "news",
          name: "news",
          component: () => import("@/components/NewsMain.vue"),
        },
        {
          path: "notes",
          name: "notes",
          component: () => import("@/components/NotesMain.vue"),
        }
      ]
    },
  ],
});

export default router;
