<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-calendar"></i> 群组业务
        </el-breadcrumb-item>
        <el-breadcrumb-item>动态组创建</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <el-button type="primary" @click="dialogFormVisible = true"
        >创建</el-button
      >
      <el-button type="primary" @click="findGroup">查询</el-button>
      <el-dialog v-model="dialogFormVisible" title="创建动态组">
        <el-form
          ref="formRef"
          :model="param"
          label-width="120px"
          class="groupCreateForm"
        >
          <el-form-item
            label="动态群组别名"
            prop="alias"
            :rules="[{ required: true, message: '动态群组别名必填' }]"
          >
            <el-input
              v-model="param.alias"
              placeholder="不能为空和空字符串，字符串最大长度为32个字节，不能用中英文逗号、单引号、双引号、分号、/、\符号、&符号、<符号、>符号，不能有连续的空格及连续的百分号，3个字节对应1个中文字"
            ></el-input>
          </el-form-item>
          <el-form-item label="用户成员列表" prop="uelist">
            <el-input
              v-model="param.uelist"
              type="textarea"
              placeholder="用英文,分割"
            ></el-input>
          </el-form-item>
          <el-form-item label="静态群组列表" prop="grouplist">
            <el-input
              v-model="param.grouplist"
              type="textarea"
              placeholder="用英文,分割"
            ></el-input>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取消</el-button>
            <el-button type="primary" @click="submitForm(formRef)"
              >确认</el-button
            >
          </span>
        </template>
      </el-dialog>

      <el-dialog v-model="dialogEditFormVisible" title="编辑动态组">
        <el-form
          ref="editFormRef"
          :model="editParam"
          label-width="120px"
          class="groupCreateForm"
        >
          <el-form-item label="待添加用户ID" prop="addlist">
            <el-input
              v-model="editParam.addlist"
              type="textarea"
              placeholder="用英文,分割"
            ></el-input>
          </el-form-item>
          <el-form-item label="待删除用户ID" prop="dellist">
            <el-input
              v-model="editParam.dellist"
              type="textarea"
              placeholder="用英文,分割"
            ></el-input>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="handleEdit(null, false)">取消</el-button>
            <el-button type="primary" @click="submitEditForm(editFormRef)"
              >确认</el-button
            >
          </span>
        </template>
      </el-dialog>

      <el-table :data="tableData.list" style="width: 100%">
        <el-table-column
          prop="category"
          label="群组类型"
          width="100px"
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
        <el-table-column prop="departmentid" label="部门id" width="80px" />
        <el-table-column prop="departmentname" label="部门名称" />
        <el-table-column prop="group" label="群组号" />
        <el-table-column
          prop="grpstate"
          label="群组状态"
          width="90px"
          :formatter="
            (row, column, cellValue) => {
              let status = { '0': 'disable', '1': 'enable' };
              return status[cellValue];
            }
          "
        />
        <el-table-column prop="maxperiod" label="最大会话时长" />
        <el-table-column prop="name" label="名称" />
        <el-table-column prop="priority" label="优先级" width="80px" />
        <el-table-column prop="setupdcid" label="创建者用户id" />

        <el-table-column label="Operations" width="400px">
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.row.group, true)"
              >Edit</el-button
            >
            <el-popconfirm
              title="确定删除?"
              @confirm="handleDelete(scope.$index, scope.row)"
            >
              <template #reference>
                <el-button size="small" type="danger">Delete</el-button>
              </template>
            </el-popconfirm>

            <el-button size="small" @click="handleSubscribe(scope.row)"
              >订阅和加入组呼</el-button
            >
            <el-button size="small" @click="handleCall(scope.row)">{{
              isTalking ? "组呼放权" : "组呼发起/抢权"
            }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup name="groupcreate">
import { useIcpStore } from "../store/icp";
import { storeToRefs } from "pinia";
import { reactive, ref, onMounted } from "vue";
import { ElMessage } from "element-plus";
const icpStore = useIcpStore();

const { cloudICP } = storeToRefs(icpStore);
const isTalking = ref(false);
const tableData = reactive({ list: [] });

const editFormRef = ref(null);
const currentEditRow = ref(null);
const dialogEditFormVisible = ref(false);
const editParam = reactive({
  addlist: "",
  dellist: "",
});

const formRef = ref(null);
const dialogFormVisible = ref(false);
const param = reactive({
  uelist: "",
  grouplist: "",
  alias: "",
});

const handleEdit = (value, visible) => {
  dialogEditFormVisible.value = visible;
  currentEditRow.value = value;
};

const handleDelete = (index, value) => {
  cloudICP.value.dispatch.group.deleteDynamicGroup({
    grpid: value.group,
    callback: ({ rsp, desc }) => {
      if (rsp == 0) {
        ElMessage.success("删除成功");
        tableData.list.splice(index, 1);
      }
    },
  });
};

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
      cloudICP.value.dispatch.group.addDynamicGroup({
        ...params,
        callback: ({ rsp, desc }) => {
          if (rsp == 0) {
            formEl.resetFields();
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

const submitEditForm = (formEl) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    let params = {
      grpid: currentEditRow.value,
      addlist: editParam.addlist
        ? editParam.addlist.split(",").map((v) => ({ isdn: v }))
        : [],
      dellist: editParam.dellist
        ? editParam.dellist.split(",").map((v) => ({ isdn: v }))
        : [],
    };
    if (valid) {
      cloudICP.value.dispatch.group.modifyDynamicGroup({
        ...params,
        callback: ({ rsp, desc }) => {
          if (rsp == 0) {
            formEl.resetFields();
            dialogEditFormVisible.value = false;
            ElMessage.success("修改成功");
          }
        },
      });
    }
  });
};

const handleSubscribe = (value) => {
  cloudICP.value.dispatch.group.subjoinTalkingGroup({
    grpid: value.group,
    callback: ({ rsp, desc }) => {
      if (rsp == 0) {
        ElMessage.success("订阅成功");
      }
    },
  });
};

const handleCall = (value) => {
  cloudICP.value.dispatch.group[
    isTalking.value ? "pttreleaseTalkingGroup" : "pttTalkingGroup"
  ]({
    grpid: value.group,
    callback: ({ rsp, desc }) => {
      if (rsp == 0) {
        isTalking.value = !isTalking.value;
        ElMessage.success(isTalking.value ? "放权成功" : "组呼或者抢权成功");
      }
    },
  });
};

const findGroup = () => {
  cloudICP.value.dispatch.query.queryDynamicGroup({
    callback: ({ rsp, desc, list }) => {
      console.log(list);
      tableData.list = list;
    },
  });
};

onMounted(() => {
  findGroup();
});

cloudICP.value.dispatch.event.register({
  eventType: "GroupCallNotify",
  eventName: "OnTalkingGroupCallPTTStart",
  callback: ({ eventName, rsp, value }) => {
    console.log(value, "OnTalkingGroupCallPTTStart");
  },
});
</script>

<style scoped>
.groupCreateForm {
  width: 600px;
}
</style>
