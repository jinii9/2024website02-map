import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import UserView from "../views/UserView.vue";
import FriendView from "../views/FriendView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/user",
      name: "user",
      component: UserView,
    },
    {
      path: "/friend",
      name: "friend",
      component: FriendView,
    },
  ],
});
export default router;
