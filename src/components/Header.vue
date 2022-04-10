<template>
  <div class="header">
    <!-- 折叠按钮 -->
    <div class="collapse-btn" @click="collapseChage">
      <i v-if="!collapse" class="el-icon-s-fold"></i>
      <i v-else class="el-icon-s-unfold"></i>
    </div>
    <div class="logo">后台管理系统</div>
    <div class="header-right">
      <div class="header-user-con">
        <!-- 用户头像 -->
        <div class="user-avator">
          <img src="../assets/img/img.jpg" />
        </div>
        <!-- 用户名下拉菜单 -->
        <el-dropdown class="user-name" trigger="click" @command="handleCommand">
          <span class="el-dropdown-link">
            {{ username }}
            <i class="el-icon-caret-bottom"></i>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="user">个人中心</el-dropdown-item>
              <el-dropdown-item divided command="loginout"
                >退出登录</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed, onMounted } from "vue";
import { useIcpStore } from "../store/icp";
import { useIndexStore } from "../store/index";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { ElMessage, ElMessageBox } from "element-plus";

const username = localStorage.getItem("ms_username");

const icpStore = useIcpStore();
const indexStore = useIndexStore();

const { cloudICP } = storeToRefs(icpStore);
const { collapse } = storeToRefs(indexStore);

// 侧边栏折叠
const collapseChage = () => {
  indexStore.handleCollapse(!collapse.value);
};

onMounted(() => {
  if (document.body.clientWidth < 1500) {
    collapseChage();
  }
});

// 用户名下拉菜单选择事件
const router = useRouter();

const handleCommand = (command) => {
  if (command == "loginout") {
    cloudICP.value.dispatch.auth.unifiedLogout({
      callback: ({ rsp, desc }) => {
        if (rsp == 0) {
          localStorage.removeItem("ms_username");
          router.push("/login");
        } else {
          ElMessage.error(`错误码: ${rsp}, 描述${desc}`);
        }
      },
    });
  } else if (command == "user") {
    router.push("/user");
  }
};
</script>
<style scoped>
.header {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 70px;
  font-size: 22px;
  color: #fff;
}
.collapse-btn {
  float: left;
  padding: 0 21px;
  cursor: pointer;
  line-height: 70px;
}
.header .logo {
  float: left;
  width: 250px;
  line-height: 70px;
}
.header-right {
  float: right;
  padding-right: 50px;
}
.header-user-con {
  display: flex;
  height: 70px;
  align-items: center;
}
.btn-fullscreen {
  transform: rotate(45deg);
  margin-right: 5px;
  font-size: 24px;
}
.btn-bell,
.btn-fullscreen {
  position: relative;
  width: 30px;
  height: 30px;
  text-align: center;
  border-radius: 15px;
  cursor: pointer;
}
.btn-bell-badge {
  position: absolute;
  right: 0;
  top: -2px;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background: #f56c6c;
  color: #fff;
}
.btn-bell .el-icon-bell {
  color: #fff;
}
.user-name {
  margin-left: 10px;
}
.user-avator {
  margin-left: 20px;
}
.user-avator img {
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.el-dropdown-link {
  color: #fff;
  cursor: pointer;
}
.el-dropdown-menu__item {
  text-align: center;
}
</style>
