<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>个人中心</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-card shadow="hover">
            <template #header>
              <div class="clearfix">
                <span>基础信息</span>
              </div>
            </template>
            <div class="info">
              <div class="info-image">
                <img :src="avatarImg" />
                <span class="info-edit">
                  <el-icon><camera-filled /></el-icon>
                </span>
              </div>
              <div class="info-name">{{ name }}</div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card shadow="hover">
            <template #header>
              <div class="clearfix">
                <span>账户编辑</span>
              </div>
            </template>
            <el-form
              label-width="90px"
              ref="formRef"
              :model="form"
              :rules="rules"
            >
              <el-form-item label="用户名：" prop="user">
                {{ name }}
              </el-form-item>
              <el-form-item label="旧密码：" prop="old">
                <el-input type="password" v-model="form.old"></el-input>
              </el-form-item>
              <el-form-item label="新密码：" prop="new">
                <el-input type="password" v-model="form.new"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">保存</el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup name="user">
import { reactive, ref } from "vue";
import { useIcpStore } from "../store/icp";
import { storeToRefs } from "pinia";
import { ElMessage } from "element-plus";
import avatar from "../assets/img/img.jpg";

const avatarImg = ref(avatar);
const dialogVisible = ref(false);
const name = localStorage.getItem("ms_username");
const icpStore = useIcpStore();
const { cloudICP } = storeToRefs(icpStore);
const form = reactive({
  old: "",
  new: "",
});
const rules = reactive({
  old: [
    {
      required: true,
      message: "不能为空",
      trigger: "blur",
    },
    { min: 1, max: 18, message: "最大长度为18位字符", trigger: "blur" },
  ],
  new: [
    {
      required: true,
      message: "不能为空",
      trigger: "blur",
    },
    { min: 1, max: 18, message: "最大长度为18位字符", trigger: "blur" },
  ],
});
const formRef = ref(null);

const onSubmit = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      cloudICP.value.dispatch.auth.unifiPasswordChange({
        user: name,
        newPassword: form.new,
        oldPassword: form.old,
        callback: ({ rsp, desc }) => {
          if (rsp == 0) {
            ElMessage.success("修改成功");
            localStorage.removeItem("ms_username");
          }
        },
      });
    }
  });
};

</script>

<style scoped>
.info {
  text-align: center;
  padding: 35px 0;
}
.info-image {
  position: relative;
  margin: auto;
  width: 100px;
  height: 100px;
  background: #f8f8f8;
  border: 1px solid #eee;
  border-radius: 50px;
  overflow: hidden;
}
.info-image img {
  width: 100%;
  height: 100%;
}
.info-edit {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  opacity: 0;
  transition: opacity 0.3s ease;
}
.info-edit i {
  color: #eee;
  font-size: 25px;
}
.info-image:hover .info-edit {
  opacity: 1;
}
.info-name {
  margin: 15px 0 10px;
  font-size: 24px;
  font-weight: 500;
  color: #262626;
}
</style>
