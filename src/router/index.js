import Vue from "vue";
import Router from "vue-router";
import Trans from "@/components/trans";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      component: Trans
    },
  ]
});
