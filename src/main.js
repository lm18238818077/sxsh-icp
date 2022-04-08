import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import installElementPlus from "./plugins/element";
import "./assets/css/icon.css";
import { ElNotification } from "element-plus";
import { sdkStatusNotify } from "./config/status";

const app = createApp(App);
installElementPlus(app);
let ICP = new ICPSDK({
  serverWSPort: "8002",
  serverAddress: "sdkserver.cloudicp.huawei.com",
  serverHttpPort: "8002",
  debugMode: "true",
  ringFlag: "0",
  mode: "window",
  ssl_enable: true,
  sdkStatusNotify: (data) => {
    console.log(data, "init");
    ElNotification({
      title: sdkStatusNotify[data.status],
      message: data.desc,
    });
    // 强制初始化
    ICP.dispatch.device.forceInitMSP({
      callback: ({rsp, desc}) => {
        console.log(rsp, desc, 'init')
        localStorage.removeItem("ms_username");
      },
    });
  },
});

app.config.globalProperties.ICP = ICP;
app.use(store).use(router).mount("#app");
