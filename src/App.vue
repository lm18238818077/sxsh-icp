<template>
  <router-view />
  
    <DialogMe @onOk="handleOk" @onCancel="handleCancel" :title="dialogTitle" :visible="dialogMeVisible" width="340px"
      :before-close="handleCancel">
      <template v-slot:content>{{ dialogContent }}</template>
    </DialogMe>
    <div class="app">
      <el-dialog v-model="dialogPlayerVisible" title="视频" width="1100px" draggable :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false" :modal="false">
        <div class="playerdialog">
            <Player v-for="v in onCallConnect" :key="v.cid" :data="v" @stop="rejectForm"/>
            <i v-for="v in 3"></i>
        </div>
      </el-dialog>
    </div>
</template>

<script setup>
import { h, reactive, ref, computed, watchEffect } from "vue";
import { ElMessage, ElMessageBox, ElNotification } from "element-plus";
import { useIcpStore } from "./store/icp";
import eventToDesc from "./config/OnDialInRinging";
import { debounce } from "lodash";
import { useRouter } from "vue-router";
import DialogMe from "./components/DialogMe/index.vue";
import { monitorParam } from "./config";
import Player from './components/Player.vue'
import { storeToRefs } from "pinia";


import { sdkStatusNotify, voiceAnswer, videoAnswer, voiceReject, videoReject, dialStatus, voiceRelease, videoRelease } from "./config/status";

const icpStore = useIcpStore();
const router = useRouter();

const onInRinging = reactive({ detail: {} })
const onCallCidRef = reactive({})
const dialogTitle = ref('')
const dialogContent = ref('')
const dialogMeVisible = ref(false)
const dialogPlayerVisible = ref(false)
const curCallType = computed(() => onInRinging.detail.rsp == 2002 ? "voice" : "video")
const { onCallConnect } = storeToRefs(icpStore);

let cloudICP = new ICPSDK({
  serverWSPort: "8002",
  serverAddress: "sdkserver.cloudicp.huawei.com",
  serverHttpPort: "8002",
  debugMode: "true",
  ringFlag: "0",
  ssl_enable: true,
  sdkStatusNotify: (data) => {
    ElNotification({
      title: sdkStatusNotify[data.status],
      message: data.desc,
    });
    router.push('/login').then(() => {
      icpStore.success = true
    })
  }
});

icpStore.init(cloudICP);

watchEffect(() => {
  console.log(onCallConnect.value.length)
  dialogPlayerVisible.value = !!onCallConnect.value.length
})

const handleOk = (type) => {
  console.log(curCallType, type, 333)
  if (type == 'cancel') {

    cloudICP.dispatch[curCallType.value].reject({
      cid: onInRinging.detail.value.cid,
      callback: ({ rsp, desc }) => {
        if (rsp == 0) {
          ElMessage.success("拒接成功");
        } else {
          ElMessage.error(`错误码:${rsp},${(curCallType.value == 'voice' ? voiceReject[rsp] : videoReject[rsp]) || desc}`);
        }
      },
    });
  } else {
    cloudICP.dispatch[curCallType.value].answer({
      cid: onInRinging.detail.value.cid,
      ...(curCallType.value === "video" && {
        windowInfo: {
          mode: "wssflow",
          ...monitorParam
        },
      }),
      callback: ({ rsp, desc }) => {
        if (rsp == 0) {
          ElMessage.success("接听成功");
        } else {
          ElMessage.error(`错误码:${rsp},${(curCallType.value == 'voice' ? voiceAnswer[rsp] : videoAnswer[rsp]) || desc}`);
        }
      },
    });
  }

  dialogMeVisible.value = false
}

const handleCancel = () => {
  handleOk('cancel')
}

const onCallClose = (value) => {
  onCallCidRef[value.cid]?.close()
  rejectForm(value)
}

const onConnectStatus = (eventName, rsp, value) => {
  let eventType = eventToDesc[eventName]['value']['calltype']
  let tip = '', tipType = ''
  let { calltype } = value

  switch(calltype){
    case 'voice':
      tipType = '语音'
      break;
    case 'video':
      tipType = '视频'
      break;
    case 'monitor':
      tipType = '监控视频'
      break;
    default:
      tipType = eventType[calltype]
  }
  switch(rsp){
    case '2003':
      tip = `正在${tipType}通话中(呼出)`
      break;
    case '2007':
      tip = `正在${tipType}通话中(呼入)`
      break;
    case '3003':
      tip = `正在${tipType}通话中(呼出)`
      break;
    case '3006':
      tip = `正在${tipType}通话中(呼入)`
      break;
  }
  return tip
}

/**
 * description: 挂机事件
 */
const rejectForm = (value) => {
  let statusType = value.calltype == 'voice' ? voiceRelease : videoRelease
  cloudICP.dispatch[
    value.calltype == 'voice' ? "voice" : "video"
  ].release({
    cid: value.cid,
    callback: ({ rsp, desc }) => {
      if (rsp == 0) {
        ElMessage.success("挂断成功");
      } else {
        ElMessage.error(`错误码:${rsp},${statusType[rsp] || desc}`);
      }
    },
  });
};

// 注册语音和视频事件 呼入振铃事件
cloudICP.dispatch.event.register({
  eventType: "VoiceNotify",
  eventName: "OnDialInRinging",
  callback: (data) => {
    onInRinging.detail = data
    dialogContent.value = `主叫号码: ${data.value.caller}  被叫号码:${data.value.callee}`
    dialogTitle.value = eventToDesc[data.eventName]["value"]["calltype"][data.value.calltype]
    dialogMeVisible.value = true
  },
});


//注册外呼呼出事件
cloudICP.dispatch.event.register({
  eventType: "VoiceNotify",
  eventName: "OnDialOutProceeding",
  callback: ({ eventName, rsp, value }) => {
    onCallCidRef[value.cid] = ElNotification({
      title: '正在外呼呼出',
      message: h('div',{class: 'onconnectcall'},[h('p', `主叫号码: ${value.caller}`),
      h('p', `被叫号码: ${value.callee}`), 
      h('p', h('button', { class: 'el-button el-button--primary el-button--small', onClick: () => { onCallClose(value) } }, h('span','挂断')))]),
      duration: 0,
      icon: 'phone'
    })
  }
});


//注册呼出失败事件
cloudICP.dispatch.event.register({
  eventType: "VoiceNotify",
  eventName: "OnDialOutFailure",
  callback: ({ eventName, rsp, value }) => {
    onCallCidRef[value.cid]?.close()
    ElNotification({
      title: '呼出失败',
      message: dialStatus[rsp],
      type: 'error',
    })
  },
});

//注册表示通话建立。
cloudICP.dispatch.event.register({
  eventType: "VoiceNotify",
  eventName: "OnCallConnect",
  callback: async ({ eventName, rsp, value }) => {
    await ElNotification({
      title: '通话建立',
      message: dialStatus[rsp],
      type: 'success',
    })
    onCallCidRef[value.cid]?.close()

    onCallCidRef[value.cid] = ElNotification({
      title: onConnectStatus(eventName, rsp, value),
      message: h('div',{class: 'onconnectcall'},[h('p', `主叫号码: ${value.caller}`),
      h('p', `被叫号码: ${value.callee}`), 
      h('p', h('button', { class: 'el-button el-button--primary el-button--small', onClick: () => { onCallClose(value) } }, h('span','挂断')))]),
      duration: 0,
      icon: 'phone'
    })
    
    let { cid, calltype } = value
    if (calltype === 'monitor' || calltype === 'video' || calltype === 'dispatch') {
      icpStore.addCall(value)
    }
  },
});

//通话建立后，通话挂机。
cloudICP.dispatch.event.register({
  eventType: "VoiceNotify",
  eventName: "OnCallRelease",
  callback: ({ eventName, rsp, value }) => {
    dialogMeVisible.value = false
    let { cid, calltype } = value
    onCallCidRef[value.cid]?.close()
    ElNotification({
      title: '通话挂机',
      message: dialStatus[rsp],
      type: 'success',
    })
    if (calltype === 'monitor' || calltype === 'video' || calltype === 'dispatch') {
      icpStore.reduceCall(value)
    }
  }
});


//注册组呼状态事件
cloudICP.dispatch.event.register({
  eventType: "GroupCallNotify",
  eventName: "OnGroupCallStatusNotify",
  callback: debounce(function ({ eventName, rsp, value }) {
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
.app > div{
  visibility: hidden;
}
.app .el-dialog{
  visibility: visible;
}
.onconnectcall{
  display: flex;
  flex-direction: column;
}
.onconnectcall > p{
  margin-top: 4px;
}
.onconnectcall > p:last-child{
  margin-top: 6px;
}

.playerdialog{
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
}
.playerdialog > i{
  width: 352px;
}

</style>
