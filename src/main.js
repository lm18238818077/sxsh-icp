import { createApp } from "vue";
import ElementPlus from 'element-plus'
import localeZH from 'element-plus/es/locale/lang/zh-cn'
import * as ElIconModules from '@element-plus/icons-vue'
import App from "./App.vue";
import router from "./router";
import { createPinia } from 'pinia'
import 'element-plus/dist/index.css'

const pinia = createPinia()
const app = createApp(App);

for (const iconName in ElIconModules) {
  if (Reflect.has(ElIconModules, iconName)) {
    const item = ElIconModules[iconName]
    app.component(iconName, item)
  }
}
app.use(ElementPlus,{
  locale: localeZH,
}).use(pinia).use(router).mount("#app");
