<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>语音业务</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <el-form ref="formRef" :model="numberValidateForm" label-width="100px" class="demo-ruleForm" :inline="true"
        :rules="rules">
        <el-form-item label="呼叫号码" prop="to">
          <el-select v-model="numberValidateForm.to" filterable placeholder="Select"
            :filter-method="(value) => numberValidateForm.to = value + ''">
            <el-option v-for="v in 23" :key="77746999 + v + ''" :label="77746999 + v + ''" :value="77746999 + v + ''" />
          </el-select>
        </el-form-item>
        <el-form-item label="" prop="callType">
          <el-select v-model="numberValidateForm.callType" placeholder="Select" style="width: 110px">
            <el-option label="语音" value="1" />
            <el-option label="视频" value="2" />
            <el-option label="视频监控" value="3" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(formRef)">呼叫</el-button>
          <el-button type="primary" @click="rejectForm()" :disabled="!callCurrentValue">挂断</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup name="voice">
import { reactive, ref, watch, computed } from "vue";
import { ElMessage } from "element-plus";
import { useIcpStore } from "../store/icp";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { voiceDial, videoDial, videoMonitor, voiceRelease, videoRelease } from "../config/status";

const icpStore = useIcpStore();
const { cloudICP, success, callCurrent } = storeToRefs(icpStore);
const formRef = ref(null);

const rspRef = ref(0);
const numberValidateForm = reactive({
  to: "77747011",
  callType: "1"
});

const callCurrentValue = computed(() => callCurrent.value)

const router = useRouter()

watch(rspRef, (newVal) => {
  if (newVal == -3) {
    router.push('/login')
  }
})

const rules = reactive({
  to: [{
    validator: (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入号码'))
      } else {
        if (!/^\d+$/.test(value)) {
          callback(new Error('请输入数字'))
        }
        callback()
      }
    }, trigger: 'change'
  }]
})

const rejectForm = () => {
  console.log(callCurrentValue.value, 'callCurrentValue')
  let statusType = numberValidateForm.callType == 1 ? voiceRelease : videoRelease
  cloudICP.value.dispatch[
    numberValidateForm.callType == 1 ? "voice" : "video"
  ].release({
    cid: callCurrentValue.value,
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
  console.log(numberValidateForm.callType, '呼叫类型')
  formEl.validate((valid) => {
    if (valid) {
      console.log(numberValidateForm)
      if (numberValidateForm.callType == 1) {
        cloudICP.value.dispatch.voice.dial({
          to: numberValidateForm.to,
          "Answer-Mode": "1",
          callback: ({ rsp, desc }) => {
            if (rsp == 0) {
              ElMessage.success("呼叫成功");
            } else {
              ElMessage.error(`错误码:${rsp},${voiceDial[rsp] || desc}`);
            }
            rspRef.value = rsp
          },
        });
      } else if (numberValidateForm.callType == 2) {
        cloudICP.value.dispatch.video.dialVideo({
          to: numberValidateForm.to,
          dialVideoParam: {
            fmt: "720P",
            buttonIDs: 1,
            showToolbar: 1,
          },
          callback: ({ rsp, desc }) => {
            if (rsp == 0) {
              ElMessage.success("呼叫成功");
            } else {
              ElMessage.error(`错误码:${rsp},${videoDial[rsp] || desc}`);
            }
            rspRef.value = rsp
          },
        });
      } else if (numberValidateForm.callType == 3) {
        cloudICP.value.dispatch.video.monitorVideo({
          to: numberValidateForm.to,
          monitorParam: {
            buttonIDs: 1,
            showToolbar: 1,
            mute: "0",
            confirm: "0",
            camera: "0",
            videooffer: "0",
          },
          callback: ({ rsp, desc }) => {
            if (rsp == 0) {
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


</script>

