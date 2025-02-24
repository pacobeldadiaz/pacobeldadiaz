import { createApp } from "vue";
import App from "./App.vue";
import "./assets/styles.css"; // Archivo CSS global
import router from "./router"; // Configuración del enrutador

createApp(App).use(router).mount("#app");
