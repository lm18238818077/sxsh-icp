<template>
  <el-form
    ref="formRef"
    :model="numberValidateForm"
    label-width="100px"
    class="demo-ruleForm"
    :inline="true"
  >
    <el-form-item
      label="呼叫号码"
      prop="to"
      :rules="[{ required: true, message: '呼叫号码必填' }]"
    >
      <el-input v-model="numberValidateForm.to">
        <template #append>
          <el-select
            v-model="callCurrentType"
            placeholder="Select"
            style="width: 110px"
          >
            <el-option label="语音" value="1" />
            <el-option label="视频" value="2" />
            <el-option label="视频监控" value="3" />
          </el-select>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        @click="submitForm(formRef)"
        :loading="callLoading"
        >呼叫</el-button
      >
      <el-button type="primary" @click="rejectForm()" :disabled="rejectLoading"
        >挂断</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script setup>
import { reactive, ref, getCurrentInstance, onMounted } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
const { proxy } = getCurrentInstance();
const cloudICP = proxy.ICP;

const formRef = ref(null);
const callLoading = ref(false);
const rejectLoading = ref(true);
const callCurrentValue = reactive({ value: "" });
const callCurrentType = ref("1");
const numberValidateForm = reactive({
  to: "77747011",
});

const rejectForm = () => {
  cloudICP.dispatch[callCurrentType.value == 1 ? "voice" : "video"].release({
    cid: callCurrentValue.value.cid,
    callback: ({ rsp, desc }) => {
      if (rsp == 0) {
        ElMessage.success("挂断成功");
      }
    },
  });
};

const submitForm = (formEl) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      console.log(callCurrentType.value == 2);
      if (callCurrentType.value == 1) {
        cloudICP.dispatch.voice.dial({
          to: numberValidateForm.to,
          "Answer-Mode": "1",
          callback: ({ rsp, desc }) => {
            if (rsp == 0) {
              callLoading.value = true;
              rejectLoading.value = false;
              ElMessage.success("呼叫成功");
            }
          },
        });
      } else if (callCurrentType.value == 2) {
        cloudICP.dispatch.video.dialVideo({
          to: numberValidateForm.to,
          dialVideoParam: {
            fmt: "720P",
            buttonIDs: 1,
            showToolbar: 1
          },
          callback: ({ rsp, desc }) => {
            if (rsp == 0) {
              callLoading.value = true;
              rejectLoading.value = false;
              ElMessage.success("呼叫成功");
            }
          },
        });
      }else if (callCurrentType.value == 3) {
        cloudICP.dispatch.video.monitorVideo({
          to: numberValidateForm.to,
          monitorParam: {
            fmt: "720P",
            buttonIDs: 1,
            showToolbar: 1,
            mute: '0',
            confirm: '0',
            camera: '0',
            videooffer: '0',
          },
          callback: ({ rsp, desc }) => {
            if (rsp == 0) {
              callLoading.value = true;
              rejectLoading.value = false;
              ElMessage.success("呼叫成功");
            }else{
                ElMessage.error(desc)
            }
          },
        });
      }
    } else {
      console.log("error submit!");
      return false;
    }
  });
};

cloudICP.dispatch.event.register({
  eventType: "VoiceNotify",
  eventName: "OnDialOutProceeding",
  callback: ({ eventName, rsp, value }) => {
    callCurrentValue.value = value;
  },
});

cloudICP.dispatch.event.register({
  eventType: "VoiceNotify",
  eventName: "OnCallRelease",
  callback: ({ eventName, rsp, value }) => {
    callLoading.value = false;
    rejectLoading.value = true;
    callCurrentValue.value = "";
  },
});
cloudICP.dispatch.event.register({
  eventType: "VoiceNotify",
  eventName: "OnDialOutFailure",
  callback: ({ eventName, rsp, value }) => {
    callLoading.value = false;
    rejectLoading.value = true;
    callCurrentValue.value = "";
  },
});
</script>
