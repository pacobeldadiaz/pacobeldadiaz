import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import TableroView from "../views/TableroView.vue";
import UsuarioView from "../views/UsuarioView.vue";
import BlogView from "../views/BlogView.vue";

const routes = [
  { path: "/", name: "Login", component: LoginView },
  { path: "/tablero", name: "Tablero", component: TableroView },
  { path: "/usuario/:clave", name: "Usuario", component: UsuarioView },
  { path: "/blog", name: "Blog", component: BlogView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;


