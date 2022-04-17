import { createApp } from "vue";
import * as ElIconModules from '@element-plus/icons-vue'
import App from "./App.vue";
import router from "./router";
import { createPinia } from 'pinia'
import installElementPlus from "./plugins/element";
import "./assets/css/icon.css";

const pinia = createPinia()
const app = createApp(App);
installElementPlus(app);

for (const iconName in ElIconModules) {
  if (Reflect.has(ElIconModules, iconName)) {
    const item = ElIconModules[iconName]
    app.component(iconName, item)
  }
}

app.use(pinia).use(router).mount("#app");
