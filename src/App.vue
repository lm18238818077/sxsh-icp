<template>
  <router-view />
</template>

<script setup>
import { h, reactive } from "vue";
import { ElMessage, ElMessageBox, ElNotification } from "element-plus";
import { useIcpStore } from "./store/icp";
import eventToDesc from "./config/OnDialInRinging";
import { debounce } from "lodash";
import { useRouter } from "vue-router";


import { sdkStatusNotify, voiceAnswer, videoAnswer, voiceReject, videoReject, dialStatus } from "./config/status";

const icpStore = useIcpStore();
const router = useRouter();
const cids = reactive([])


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


const initMonitor = (id, type) => {

  if (type == 'add') {
    let lineth = 0
    lineth = Math.ceil(cids.length / 3)
    console.log({
      cid: id,
      windowInfo: {
        "width": "300",
        "height": "300",
        "posX": ((cids.length - 1) % 3 * 300) + '',
        "posY": ((lineth - 1) * 300) + ''

      },
      callback: ({ rsp, desc }) => {
        if (rsp != 0) {
          ElMessage.error(`错误码:${rsp}， ${desc}`);
        }
      }
    }, 'add')
    cloudICP.dispatch.device.setWindowInfo({
      cid: id,
      windowInfo: {
        "width": "300",
        "height": "300",
        "posX": ((cids.length - 1) % 3 * 300) + '',
        "posY": ((lineth - 1) * 300) + ''
      },
      callback: ({ rsp, desc }) => {
        if (rsp != 0) {
          ElMessage.error(`错误码:${rsp}， ${desc}`);
        }
      }
    })
  } else {
    let lineth = 0
    for (let i = id; i < cids.length; i++) {
      console.log({
        cid: cids[i],
        windowInfo: {
          "width": "300",
          "height": "300",
          "posX": (i % 3 * 300) + '',
          "posY": (lineth * 300) + ''

        }
      }, id, 'jianshao')

      cloudICP.dispatch.device.setWindowInfo({
        cid: cids[i],
        windowInfo: {
          "width": "300",
          "height": "300",
          "posX": (i % 3 * 300) + '',
          "posY": (lineth * 300) + ''

        },
        callback: ({ rsp, desc }) => {
          if (rsp != 0) {
            ElMessage.error(`错误码:${rsp}， ${desc}`);
          }
        }
      })

      if ((i + 1) % 3 === 0) {
        lineth++
      }

    }
  }


}

//语音视频注册的事件
cloudICP.dispatch.event.register({
  eventType: "VoiceNotify",
  eventName: "OnDialOutProceeding",
  callback: ({ eventName, rsp, value }) => {
    icpStore.callCurrent = value.cid
    console.log(value, 'cjj2')
    ElNotification({
      title: '正在外呼呼出',
      message: dialStatus[rsp],
      type: 'success',
    })
  },
});


cloudICP.dispatch.event.register({
  eventType: "VoiceNotify",
  eventName: "OnDialOutFailure",
  callback: ({ eventName, rsp, value }) => {
    console.log(eventName, 22222222)
    icpStore.callCurrent = ""
    ElNotification({
      title: '呼出失败',
      message: dialStatus[rsp],
      type: 'error',
    })
  },
});

cloudICP.dispatch.event.register({
  eventType: "VoiceNotify",
  eventName: "OnCallConnect",
  callback: ({ eventName, rsp, value }) => {
    ElNotification({
      title: '通话建立',
      message: dialStatus[rsp],
      type: 'success',
    })
    let { cid, calltype } = value
    if (calltype === 'monitor') {
      cids.push(cid)
      initMonitor(cid, 'add')
    }
  },
});

cloudICP.dispatch.event.register({
  eventType: "VoiceNotify",
  eventName: "OnCallRelease",
  callback: ({ eventName, rsp, value }) => {
    console.log(eventName, 7777777)
    icpStore.callCurrent = ""
    let { cid, calltype } = value
    ElNotification({
      title: '通话挂机',
      message: dialStatus[rsp],
      type: 'success',
    })
    if (calltype === 'monitor') {
      let index = cids.findIndex(v => v == cid)
      if (index < 0) return
      cids.splice(index, 1)
      initMonitor(index)
    }
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
    if (localip != param.newip) {
      ElMessageBox.alert(`您已经在其他地方进行登录,当前登录的IP${localip},新登录地址的IP${param.newip}`, '用户被踢出', {
        confirmButtonText: '好的',
        callback: () => {
          router.push('/login')
          icpStore.success = true
        },
      })
    }

  }
});

</script>

<style>
@import "./assets/css/main.css";
@import "./assets/css/color-dark.css";
</style>
