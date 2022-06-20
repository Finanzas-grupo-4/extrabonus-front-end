import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "crear-bono",
    },
    {
      path: "/crear-bono",
      name: "crear-bono",
      component: () => import("../extrabonus/pages/crear-bono.component.vue"),
    },
  ],
});

export default router;
