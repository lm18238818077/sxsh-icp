import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from 'pinia'
import installElementPlus from "./plugins/element";
import "./assets/css/icon.css";

const pinia = createPinia()
const app = createApp(App);
installElementPlus(app);
app.use(pinia).use(router).mount("#app");
