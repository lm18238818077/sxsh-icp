<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>语音业务</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <el-form ref="formRef" :model="numberValidateForm" label-width="100px" class="demo-ruleForm" :inline="true">
        <el-form-item label="呼叫号码" prop="to" :rules="[{ required: true, message: '呼叫号码必填' }]">
          <el-input v-model="numberValidateForm.to">
            <template #append>
              <el-select v-model="callCurrentType" placeholder="Select" style="width: 110px">
                <el-option label="语音" value="1" />
                <el-option label="视频" value="2" />
                <el-option label="视频监控" value="3" />
              </el-select>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(formRef)">呼叫</el-button>
          <el-button type="primary" @click="rejectForm()" :disabled="rejectLoading">挂断</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup name="voice">
import { reactive, ref, watch, onMounted } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { useIcpStore } from "../store/icp";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { voiceDial, videoDial, videoMonitor, voiceRelease, videoRelease } from "../config/status";

const icpStore = useIcpStore();
const { cloudICP, success } = storeToRefs(icpStore);
const formRef = ref(null);
const rejectLoading = ref(true);
const callCurrentValue = reactive({ value: "" });
const callCurrentType = ref("1");
const rspRef = ref(0);
const cids = reactive([])
const numberValidateForm = reactive({
  to: "77747011",
});

const router = useRouter()

watch(rspRef, (newVal) => {
  if (newVal == -3) {
    router.push('/login')
    success.value = true
  }
})

const rejectForm = () => {
  let statusType = callCurrentType.value == 1 ? voiceRelease : videoRelease
  cloudICP.value.dispatch[
    callCurrentType.value == 1 ? "voice" : "video"
  ].release({
    cid: callCurrentValue.value.cid,
    callback: ({ rsp, desc }) => {
      if (rsp == 0) {
        ElMessage.success("挂断成功");
      } else {
        ElMessage.error(`错误码:${rsp},${statusType[rsp] || desc}`);
      }
      rspRef.value = rsp
    },
  });
};

const submitForm = (formEl) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      if (callCurrentType.value == 1) {
        cloudICP.value.dispatch.voice.dial({
          to: numberValidateForm.to,
          "Answer-Mode": "1",
          callback: ({ rsp, desc }) => {
            if (rsp == 0) {
              rejectLoading.value = false;
              ElMessage.success("呼叫成功");
            } else {
              ElMessage.error(`错误码:${rsp},${voiceDial[rsp] || desc}`);
            }
            rspRef.value = rsp
          },
        });
      } else if (callCurrentType.value == 2) {
        cloudICP.value.dispatch.video.dialVideo({
          to: numberValidateForm.to,
          dialVideoParam: {
            fmt: "720P",
            buttonIDs: 1,
            showToolbar: 1,
          },
          callback: ({ rsp, desc }) => {
            if (rsp == 0) {
              rejectLoading.value = false;
              ElMessage.success("呼叫成功");
            } else {
              ElMessage.error(`错误码:${rsp},${videoDial[rsp] || desc}`);
            }
            rspRef.value = rsp
          },
        });
      } else if (callCurrentType.value == 3) {
        cloudICP.value.dispatch.video.monitorVideo({
          to: numberValidateForm.to,
          monitorParam: {
            fmt: "720P",
            buttonIDs: 1,
            showToolbar: 1,
            mute: "0",
            confirm: "0",
            camera: "0",
            videooffer: "0",
          },
          callback: ({ rsp, desc }) => {
            if (rsp == 0) {
              rejectLoading.value = false;
              ElMessage.success("呼叫成功");
            } else {
              ElMessage.error(`错误码:${rsp},${videoMonitor[rsp] || desc}`);
            }
            rspRef.value = rsp
          },
        });
      }
    } else {
      console.log("error submit!");
      return false;
    }
  });
};

cloudICP.value.dispatch.event.register({
  eventType: "VoiceNotify",
  eventName: "OnDialOutProceeding",
  callback: ({ eventName, rsp, value }) => {
    callCurrentValue.value = value;
  },
});

cloudICP.value.dispatch.event.register({
  eventType: "VoiceNotify",
  eventName: "OnCallRelease",
  callback: ({ eventName, rsp, value }) => {
    rejectLoading.value = true;
    callCurrentValue.value = "";
  },
});
cloudICP.value.dispatch.event.register({
  eventType: "VoiceNotify",
  eventName: "OnDialOutFailure",
  callback: ({ eventName, rsp, value }) => {
    rejectLoading.value = true;
    callCurrentValue.value = "";
  },
});

cloudICP.value.dispatch.event.register({
  eventType: "VoiceNotify",
  eventName: "OnCallConnect",
  callback: ({ eventName, rsp, value }) => {
    let { cid, calltype } = value
    console.log(cid, 'OnCallConnect')
    if (calltype === 'monitor') {
      cids.push(cid)
      initMonitor(cid, 'add')
    }
  },
});

cloudICP.value.dispatch.event.register({
  eventType: "VoiceNotify",
  eventName: "OnCallRelease",
  callback: ({ eventName, rsp, value }) => {
    let { cid, calltype } = value
    console.log(cid, 'OnCallRelease')
    if (calltype === 'monitor') {
      let index = cids.findIndex(v => v == cid)
      if (index < 0) return
      cids.splice(index, 1)
      initMonitor(index)
    }
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
    cloudICP.value.dispatch.device.setWindowInfo({
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

      cloudICP.value.dispatch.device.setWindowInfo({
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

</script>

