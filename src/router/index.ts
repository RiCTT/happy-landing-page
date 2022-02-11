import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../page/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
    redirect: "/landing-list",
  },
  {
    path: "/landing-list",
    name: "LandingList",
    component: () => import("@/page/landing-list/index.vue"),
  },
  {
    path: "/landing-item",
    name: "LandingItem",
    component: () => import("@/page/landing-item/index.vue"),
  },
  {
    path: "/page-preview",
    name: "PagePreview",
    component: () => import("@/page/page-preview/index.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
