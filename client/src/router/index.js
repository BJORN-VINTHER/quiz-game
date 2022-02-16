import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/games/:gameId/lobby",
      name: "lobby",
      component: () => import("../views/LobbyView.vue"),
    },
    {
      path: "/games/:gameId/overview",
      name: "game",
      component: () => import("../views/HostView.vue"),
    },
    {
      path: "/games/:gameId/join",
      name: "join",
      component: () => import("../views/JoinGameView.vue"),
    },
    {
      path: "/games/:gameId",
      name: "player",
      component: () => import("../views/PlayerView.vue"),
    },
  ],
});

export default router;
