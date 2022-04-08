<template>
  <el-form ref="formRef" :model="param" label-width="120px" class="groupCreateForm">
    <el-form-item label="动态群组别名" prop="alias" :rules="[{ required: true, message: '动态群组别名必填' }]">
      <el-input
        v-model="param.alias"
        placeholder="不能为空和空字符串，字符串最大长度为32个字节，不能用中英文逗号、单引号、双引号、分号、/、\符号、&符号、<符号、>符号，不能有连续的空格及连续的百分号，3个字节对应1个中文字"
      ></el-input>
    </el-form-item>
    <el-form-item label="用户成员列表" prop="uelist">
      <el-input v-model="param.uelist" type="textarea" placeholder="用英文,分割"></el-input>
    </el-form-item>
    <el-form-item label="静态群组列表" prop="grouplist">
      <el-input v-model="param.grouplist" type="textarea" placeholder="用英文,分割"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(formRef)" :loading="callLoading">创建</el-button>
      <el-button type="primary" @click="findGroup">查询</el-button>
    </el-form-item>
  </el-form>

  <el-table :data="tableData.list" style="width: 100%">
    <el-table-column
      prop="category"
      label="群组类型"
      :formatter="
        (row, column, cellValue) => {
          let status = {
            '0': '全网广播组',
            '1': '静态组',
            '2': '区域广播组',
            '8': '外部组',
            '9': '动态组',
          };
          return status[cellValue];
        }
      "
    ></el-table-column>
    <el-table-column prop="departmentid" label="部门id" />
    <el-table-column prop="departmentname" label="部门名称" />
    <el-table-column prop="group" label="群组号" />
    <el-table-column
      prop="grpstate"
      label="群组状态"
      :formatter="
        (row, column, cellValue) => {
          let status = { '0': 'disable', '1': 'enable' };
          return status[cellValue];
        }
      "
    />
    <el-table-column prop="maxperiod" label="最大会话时长" />
    <el-table-column prop="name" label="名称" />
    <el-table-column prop="priority" label="优先级" />
    <el-table-column prop="setupdcid" label="创建者用户id" />

    <el-table-column label="Operations" width="200px">
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
        <el-button size="small" type="danger" @click="handleDelete(scope.row)">Delete</el-button>
        <el-button size="small" @click="handleSubscribe(scope.row)">订阅和加入组呼</el-button>
        <el-button size="small" @click="handleCall(scope.row)">
          {{
            isTalking ? "组呼放权" : "组呼发起/强权"
          }}
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
import { reactive, ref, getCurrentInstance, onMounted } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
const { proxy } = getCurrentInstance();
const cloudICP = proxy.ICP;

const formRef = ref(null);
const callLoading = ref(false);
const isTalking = ref(false);
const tableData = reactive({ list: [] });
const param = reactive({
  uelist: "",
  grouplist: "",
  alias: "",
});

const submitForm = (formEl) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    let params = {
      alias: param.alias,
      grpid: "0",
      maxperiod: "60000",
      priority: "1",
      uelist: param.uelist
        ? param.uelist.split(",").map((v) => ({ isdn: v }))
        : [],
      grouplist: param.grouplist
        ? param.grouplist.split(",").map((v) => ({ isdn: v }))
        : [],
    };
    if (valid) {
      cloudICP.dispatch.group.addDynamicGroup({
        ...params,
        callback: ({ rsp, desc }) => {
          if (rsp == 0) {
            ElMessage.success("创建成功");
          }
        },
      });
    } else {
      console.log("error submit!");
      return false;
    }
  });
};

const handleSubscribe = (value) => {
  console.log(value)
  cloudICP.dispatch.group.subjoinTalkingGroup({
    grpid: value.group,
    callback: ({ rsp, desc }) => {
      if (rsp == 0) {
        ElMessage.success("订阅成功");
      }
    },
  });
};

const handleCall = (value) => {
  cloudICP.dispatch.group[
    isTalking.value ? "pttreleaseTalkingGroup" : "subjoinTalkingGroup"
  ]({
    grpid: value.group,
    callback: ({ rsp, desc }) => {
      if (rsp == 0) {
        isTalking.value = !isTalking.value
        ElMessage.success(isTalking.value ? "放权成功" : "组呼或者抢权成功");
      }
    },
  });
};

const findGroup = () => {
  cloudICP.dispatch.query.queryDynamicGroup({
    callback: ({ rsp, desc, list }) => {
      console.log(list);
      tableData.list = list;
    },
  });
};

onMounted(() => {
  findGroup();
});

cloudICP.dispatch.event.register({
  eventType: "GroupCallNotify",
  eventName: "OnTalkingGroupCallPTTStart",
  callback: ({ eventName, rsp, value }) => {
    console.log(value, 'OnTalkingGroupCallPTTStart')
  },
});
</script>

<style scoped>
.groupCreateForm {
  width: 600px;
}
</style>
