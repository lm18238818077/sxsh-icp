<template>
  <router-view />
</template>

<script setup>
import { h } from "vue";
import { ElMessage, ElMessageBox, ElNotification } from "element-plus";
import { useIcpStore } from "./store/icp";
import eventToDesc from "./config/OnDialInRinging";
import { debounce } from "lodash";
import { useRouter } from "vue-router";


import { sdkStatusNotify, voiceAnswer, videoAnswer, voiceReject, videoReject } from "./config/status";

const icpStore = useIcpStore();
const router = useRouter();

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
    router.push('/login').then(() => {
      icpStore.success = true
    })
  },
});

icpStore.init(cloudICP);

// 注册语音和视频事件
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
              width: "1000",
              height: "1000",
              posX: "0",
              posY: "0",
              buttonIDs: 1,
            },
          }),
          callback: ({ rsp, desc }) => {
            if (rsp == 0) {
              ElMessage.success("接听成功");
            } else {
              ElMessage.error(`错误码:${rsp},${(curCallType == 'voice' ? voiceAnswer[rsp] : videoAnswer[rsp]) || desc}`);
            }
          },
        });
      })
      .catch(() => {
        cloudICP.dispatch[curCallType].reject({
          cid: value.cid,
          callback: ({ rsp, desc }) => {
            if (rsp == 0) {
              ElMessage.success("拒接成功");
            } else {
              ElMessage.error(`错误码:${rsp},${(curCallType == 'voice' ? voiceReject[rsp] : videoReject[rsp]) || desc}`);
            }
          },
        });
      });
  },
});


//注册组呼状态事件
cloudICP.dispatch.event.register({
  eventType: "GroupCallNotify",
  eventName: "OnGroupCallStatusNotify",
  callback: debounce(function ({ eventName, rsp, value }) {
    console.log(eventName, rsp, value, 1111111)
    let current = eventToDesc[eventName]
    ElNotification({
      title: `组呼资源通知（${current.rsp[rsp]}）`,
      message: h('p', null, [
        h('span', null, `${current.value.grpid}：${value.grpid}`),
        h('br'),
        h('span', null, `${current.value.name}：${value.name}`),
        h('br'),
        h('span', null, `${current.value.speaker}：${value.speaker}`),
      ]),
      type: 'info',
    })

  }, 500),
});

//注册登录状态事件
cloudICP.dispatch.event.register({
  eventType: "ModuleNotify",
  eventName: "OnDispatchKickOutNotifyEvent",
  callback: function ({ eventName, localip, param }) {
    ElMessageBox.alert(`您已经在其他地方进行登录,当前登录的IP${localip},新登录地址的IP${param.newip}`, '用户被踢出', {
      confirmButtonText: '好的',
      callback: () => {
        router.push('/login')
        icpStore.success = true
      },
    })
  }
});

</script>

<style>
@import "./assets/css/main.css";
@import "./assets/css/color-dark.css";
</style>
