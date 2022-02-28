import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from "../views/HomeView.vue";

const routes: Array<RouteRecordRaw> = [
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
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
