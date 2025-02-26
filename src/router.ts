import Vue from "vue";
import Router from "vue-router";
import Index from "./Index.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      redirect: "/index",
    },
    {
      path: "/index",
      name: "index",
      component: Index,
    },
    {
      path: "/model/login",
      name: "modelLogin",
      component: () => import(/* webpackChunkName: "operation" */ "./login/index.vue"),
    },
    {
      path: "/desgin/list",
      name: "desginList",
      component: () => import(/* webpackChunkName: "operation" */ "./desgin/list.vue"),
    },
    {
      path: "/desgin/edit",
      name: "desginEdit",
      component: () => import(/* webpackChunkName: "operation" */ "./desgin/edit.vue"),
    },
    {
      path: "/operation",
      name: "operation",
      component: () => import(/* webpackChunkName: "operation" */ "./Operation.vue"),
    },
  ],
});
