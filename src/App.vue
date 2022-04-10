<template>
  <router-view />
</template>

<script setup>
import { ElMessage, ElMessageBox } from "element-plus";
import { useIcpStore } from "./store/icp";
import eventToDesc from "./config/OnDialInRinging";
import { ElNotification } from "element-plus";
import { sdkStatusNotify } from "./config/status";

const icpStore = useIcpStore();

let cloudICP = new ICPSDK({
  serverWSPort: "8002",
  serverAddress: "sdkserver.cloudicp.huawei.com",
  serverHttpPort: "8002",
  debugMode: "true",
  ringFlag: "0",
  mode: "window",
  ssl_enable: true,
  sdkStatusNotify: (data) => {
    ElNotification({
      title: sdkStatusNotify[data.status],
      message: data.desc,
    });
    // 强制初始化
    cloudICP.dispatch.device.forceInitMSP({
      callback: ({ rsp, desc }) => {
        localStorage.removeItem("ms_username");
      },
    });
  },
});

icpStore.init(cloudICP);

cloudICP.dispatch.event.register({
  eventType: "VoiceNotify",
  eventName: "OnDialInRinging",
  callback: ({ eventName, rsp, value }) => {
    console.log(eventName, rsp, value, "VideoNotify  OnDialInRinging");
    let curCallType = rsp == 2002 ? "voice" : "video";
    ElMessageBox.confirm(
      `主叫号码: ${value.caller}  被叫号码:${value.callee}`,
      eventToDesc[eventName]["value"]["calltype"][value.calltype],
      {
        confirmButtonText: "接听",
        cancelButtonText: "拒接",
        type: "warning",
      }
    )
      .then(() => {
        cloudICP.dispatch[curCallType].answer({
          cid: value.cid,
          ...(curCallType === "video" && {
            windowInfo: {
              width: "500",
              height: "500",
              posX: "0",
              posY: "0",
              buttonIDs: 1,
            },
          }),
          callback: ({ rsp, desc }) => {
            if (rsp == 0) {
              ElMessage.success("接听成功");
            }
          },
        });
      })
      .catch(() => {
        cloudICP.dispatch[curCallType].reject({
          cid: value.cid,
          callback: ({ rsp, desc }) => {
            if (rsp == 0) {
              ElMessage.success("挂断成功");
            }
          },
        });
      });
  },
});
</script>

<style>
@import "./assets/css/main.css";
@import "./assets/css/color-dark.css";
</style>
