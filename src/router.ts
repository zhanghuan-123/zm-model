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
      component: () => import(/* webpackChunkName: "login" */ "./login/index.vue"),
    },
    {
      path: "/machine",
      name: "machine",
      component: () => import(/* webpackChunkName: "machine" */ "./template/index.vue"),
      children: [
        {
          path: "desgin-list",
          name: "desginList",
          component: () => import(/* webpackChunkName: "machine" */ "./desgin/list.vue"),
        },
        {
          path: "desgin-edit",
          name: "desginEdit",
          component: () => import(/* webpackChunkName: "machine" */ "./desgin/edit.vue"),
        },
      ]
    },
    {
      path: "/center",
      name: "center",
      component: () => import(/* webpackChunkName: "center" */ "./template/index.vue"),
      children: [
        {
          path: 'operation-list',
          name: 'operationList',
          component: () => import(/* webpackChunkName: "center" */ "./Operation.vue"),
        }
      ]
    },
  ],
});
