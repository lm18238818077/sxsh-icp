<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title">后台管理系统</div>
      <el-form
        :model="param"
        :rules="rules"
        ref="login"
        label-width="70px"
        class="ms-content"
      >
        <el-form-item prop="user" label="用户名">
          <el-input v-model="param.user" placeholder="user"> </el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input
            type="password"
            placeholder="password"
            v-model="param.password"
            @keyup.enter="submitForm()"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="force">
          <el-checkbox v-model="param.force" />
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm()">登录</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { ref, reactive, getCurrentInstance } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";

export default {
  setup(props, context) {
    const { proxy } = getCurrentInstance();
    const cloudICP = proxy.ICP;
    console.log(cloudICP, 111111111);
    const router = useRouter();
    const param = reactive({
      user: "66647001",
      password: "66647001",
      force: false,
    });

    const rules = {
      user: [
        {
          required: true,
          message: "请输入用户名",
          trigger: "blur",
        },
      ],
      password: [{ required: true, message: "请输入密码", trigger: "blur" }],
    };
    const login = ref(null);
    const submitForm = () => {
      login.value.validate((valid) => {
        if (valid) {
          let person = {
            ...param,
            callback: function (data) {
                console.log(data)
              if (data.rsp == 0) {
                ElMessage.success("登录成功");
                router.push("/");
                localStorage.setItem("ms_username", param.user);
                
              } else {
                ElMessage.error(data.desc);
              }
            },
          };
                console.log(person,'person')

          cloudICP.dispatch.auth.unifiedLogin(person);
        } else {
          return false;
        }
      });
    };

    const store = useStore();
    store.commit("clearTags");

    return {
      param,
      rules,
      login,
      submitForm,
    };
  },
};
</script>

<style scoped>
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url(../assets/img/login-bg.jpg);
  background-size: 100%;
}
.ms-title {
  width: 100%;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  color: #fff;
  border-bottom: 1px solid #ddd;
}
.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 350px;
  margin: -190px 0 0 -175px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.6);
  overflow: hidden;
}
.ms-content {
  padding: 30px 30px;
}
.login-btn {
  text-align: center;
}
.login-btn button {
  width: 100%;
  height: 36px;
  margin-bottom: 10px;
}
.login-tips {
  font-size: 12px;
  line-height: 30px;
  color: #fff;
}
</style>
