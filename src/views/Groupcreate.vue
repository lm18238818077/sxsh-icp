<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>动态组创建</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <el-button type="primary" @click="dialogFormVisible = true">创建</el-button>
      <el-button type="primary" @click="findGroup">查询</el-button>

      <el-dialog v-model="dialogFormVisible" title="创建动态组" width="700px">
        <el-form ref="formRef" :model="param" label-width="150px" class="groupCreateForm" :rules="addrules">
          <el-form-item label="动态群组别名" prop="alias">
            <el-input v-model.trim="param.alias"
              placeholder="不能为空和空字符串，字符串最大长度为32个字节，不能用中英文逗号、单引号、双引号、分号、/、\符号、&符号、<符号、>符号，不能有连续的空格及连续的百分号，3个字节对应1个中文字">
            </el-input>
          </el-form-item>
          <el-form-item label="动态组最大通话时长" prop="maxperiod">
            <el-input v-model.number.trim="param.maxperiod" type="text" placeholder="取值范围是1～65535。单位为秒。"></el-input>
          </el-form-item>
          <el-form-item label="动态组优先级" prop="priority">
            <el-input v-model.number.trim="param.priority" type="text" placeholder="取值范围是1～255，数字越小优先级越高"></el-input>
          </el-form-item>
          <el-form-item label="用户成员列表" prop="uelist">
            <el-input v-model.trim="param.uelist" type="textarea" placeholder="用英文,分割"></el-input>
          </el-form-item>
          <el-form-item label="静态群组列表" prop="grouplist">
            <el-input v-model.trim="param.grouplist" type="textarea" placeholder="用英文,分割"></el-input>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取消</el-button>
            <el-button type="primary" @click="submitForm(formRef)">确认</el-button>
          </span>
        </template>
      </el-dialog>

      <el-dialog v-model="dialogEditFormVisible" title="编辑动态组" width="700px">
        <el-form ref="editFormRef" :model="editParam" label-width="120px" class="groupCreateForm" :rules="editrules">
          <el-form-item label="待添加用户ID" prop="addlist">
            <el-input v-model.trim="editParam.addlist" type="textarea" placeholder="用英文,分割"></el-input>
          </el-form-item>
          <el-form-item label="待删除用户ID" prop="dellist">
            <el-input v-model.trim="editParam.dellist" type="textarea" placeholder="用英文,分割"></el-input>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogEditFormVisible = false">取消</el-button>
            <el-button type="primary" @click="submitEditForm(editFormRef)">确认</el-button>
          </span>
        </template>
      </el-dialog>

      <el-dialog v-model="dialogGroupVisible" title="动态组成员" width="600px">
        <el-table :data="tableGroupData.list" style="width: 100%">
          <el-table-column prop="membertype" label="成员类型" :formatter="
            (row, column, cellValue) => {
              let status = {
                '0': '群组',
                '1': '用户',
              };
              return status[cellValue];
            }
          "></el-table-column>
          <el-table-column prop="group" label="群组号" />
          <el-table-column prop="isdn" label="用户号" />
          <el-table-column prop="statusvalue" label="是否在线">
            <template #default="{ row }">
              <el-badge is-dot class="dotitem" :type="row.statusvalue == 4011 ? 'success' : 'info'">
                <p>{{ row.statusvalue == 4011 ? '在线' : '离线' }}</p>
              </el-badge>
            </template>
          </el-table-column>
          <el-table-column prop="userpriority" label="优先级" width="80px" />
        </el-table>
        <template #footer>
          <span>
            <el-button type="primary" @click="dialogGroupVisible = false">关闭</el-button>
          </span>
        </template>
      </el-dialog>

      <el-table :data="tableData.list" style="width: 100%" size="large">
        <el-table-column prop="category" label="群组类型" width="100px" :formatter="
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
        "></el-table-column>
        <el-table-column prop="departmentid" label="部门id" width="80px" />
        <el-table-column prop="departmentname" label="部门名称" width="80px" />
        <el-table-column prop="group" label="群组号" width="140px" />
        <el-table-column prop="grpstate" label="群组状态" width="90px" :formatter="
          (row, column, cellValue) => {
            let status = { '0': 'disable', '1': 'enable' };
            return status[cellValue];
          }
        " />
        <el-table-column prop="maxperiod" label="最大会话时长" width="120px" />
        <el-table-column prop="name" label="名称" />
        <el-table-column prop="priority" label="优先级" width="80px" />
        <el-table-column prop="setupdcid" label="创建者用户id" width="120px" />

        <el-table-column label="Operations" width="440px">
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.row, true)">编辑</el-button>
            <el-popconfirm title="确定删除?" @confirm="handleDelete(scope.$index, scope.row)">
              <template #reference>
                <el-button size="small" type="danger">删除</el-button>
              </template>
            </el-popconfirm>
            <el-button size="small" @click="handleGroupList(scope.row)">成员</el-button>
            <el-button size="small" @click="handleSubscribe(scope.row)">订阅和加入组呼</el-button>
            <el-button size="small" @click="handleCall(scope.row)">{{
                scope.row.isTalking ? "组呼放权" : "组呼发起/抢权"
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
import { reactive, ref, onMounted, watch } from "vue";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import { dialStatus, otherStatus } from "../config/status";


const router = useRouter()
const icpStore = useIcpStore();
const rspRef = ref(0);

const { cloudICP, success } = storeToRefs(icpStore);
const isTalking = ref(false);
const tableData = reactive({ list: [] });
const tableGroupData = reactive({ list: [] });

const editFormRef = ref(null);
const currentEditRow = ref(null);
const dialogEditFormVisible = ref(false);
const dialogGroupVisible = ref(false);
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
  maxperiod: "",
  priority: "",
});

const addrules = reactive({
  alias: [
    { required: true, message: '请输入动态群组别名', trigger: 'blur' },
  ],
  uelist: [
    {
      trigger: 'change',
      validator: (rule, value, callback) => {
        if (value === '' && param.grouplist === '') {
          callback(new Error('用户成员列表和群组列表不能同时为空'))
        } else {
          if (value && value.split(',').length > 200) {
            callback(new Error('最大值为200个'))
          } else {
            callback()
          }
        }
      }
    }
  ],
  grouplist: [
    {
      trigger: 'change',
      validator: (rule, value, callback) => {
        if (value && value.split(',').length > 8) {
          callback(new Error('最大值为8个'))
        }
        if (!formRef.value) return
        formRef.value.validateField('uelist', () => null)
        callback()

      }
    }
  ],
  maxperiod: [
    {
      required: true,
      trigger: 'change',
      validator: (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入最大通话时长'))
        } else {
          if (!/^\d+$/.test(value)) {
            callback(new Error('请输入数字'))
          } else {
            if (value < 1 || value > 65535) {
              callback(new Error('取值范围是1～65535'))
            }
            callback()
          }
        }
      }
    }
  ],
  priority: [
    {
      required: true,
      trigger: 'change',
      validator: (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入动态组优先级'))
        } else {
          if (!/^\d+$/.test(value)) {
            callback(new Error('请输入数字'))
          } else {
            if (value < 1 || value > 255) {
              callback(new Error('取值范围是1～255'))
            }
            callback()
          }
        }
      }
    }
  ],
})

const editrules = reactive({
  addlist: [
    {
      trigger: 'change',
      validator: (rule, value, callback) => {
        if (value === '' && editParam.dellist === '') {
          callback(new Error('待添加用户和待删除用户不能同时为空'))
        } else {
          if (value && value.split(',').length > 200) {
            callback(new Error('最大值为200个'))
          } else {
            callback()
          }
        }
      }
    }
  ],
  dellist: [
    {
      trigger: 'change',
      validator: (rule, value, callback) => {
        if (value && value.split(',').length > 200) {
          callback(new Error('最大值为200个'))
        }
        if (!editFormRef.value) return
        editFormRef.value.validateField('addlist', () => null)
        callback()
      }
    }
  ],
})

watch(rspRef, (newVal) => {
  if (newVal == -3) {
    router.push('/login')
  }
})

const handleGroupList = async (value) => {
  let data = await findGroupList(value)
  let { rsp, desc, list } = data

  if (rsp == 0) {
    tableGroupData.list = list;
    dialogGroupVisible.value = true
    cloudICP.value.dispatch.voice.subscribeUserStatus({
      reslist: list.map(v => ({ isdn: v.isdn })),
      callback: ({ rsp, desc }) => {
        console.log(rsp, desc, 'subscribeUserStatus', list.map(v => ({ isdn: v.isdn })))
      }
    })
  } else {
    ElMessage.error(`错误码:${rsp},${otherStatus[rsp] || desc}`);
  }
  rspRef.value = rsp
}

const findGroupList = (value) => {
  return new Promise((resolve, reject) => {
    cloudICP.value.dispatch.query.queryDynamicGroupMembers({
      grpid: value.group,
      callback: (data) => {
        resolve(data)
      }
    })
  })
}

const handleEdit = (value, visible) => {
  if (icpStore.isdn != value.setupdcid) {
    return ElMessage.error('只能编辑自己创建的');
  }
  dialogEditFormVisible.value = visible;
  currentEditRow.value = value.group;
};

const handleDelete = (index, value) => {
  if (icpStore.isdn != value.setupdcid) {
    return ElMessage.error('只能删除自己创建的');
  }

  cloudICP.value.dispatch.group.deleteDynamicGroup({
    grpid: value.group,
    callback: ({ rsp, desc }) => {
      if (rsp == 0) {
        ElMessage.success("删除成功");
        tableData.list.splice(index, 1);
      } else {
        ElMessage.error(`错误码:${rsp},${otherStatus[rsp] || desc}`);
      }
      rspRef.value = rsp

    },
  });
};

const submitForm = (formEl) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    let params = {
      alias: param.alias,
      grpid: "0",
      maxperiod: param.maxperiod,
      priority: param.priority,
      uelist: param.uelist
        ? param.uelist.split(",").map((v) => ({ isdn: v }))
        : [],
      grouplist: param.grouplist
        ? param.grouplist.split(",").map((v) => ({ isdn: v }))
        : [],
    };
    console.log(params)
    if (valid) {
      cloudICP.value.dispatch.group.addDynamicGroup({
        ...params,
        callback: ({ rsp, desc }) => {
          if (rsp == 0) {
            formEl.resetFields();
            ElMessage.success("创建成功");
            findGroup()
          } else {
            ElMessage.error(`错误码:${rsp},${otherStatus[rsp] || desc}`);
          }
          dialogFormVisible.value = false
          rspRef.value = rsp

        },
      });
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
            findGroup()
          } else {
            ElMessage.error(`错误码:${rsp},${otherStatus[rsp] || desc}`);
          }
          rspRef.value = rsp

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
      } else {
        ElMessage.error(`错误码:${rsp},${otherStatus[rsp] || desc}`);
      }
      rspRef.value = rsp

    },
  });
};

const handleCall = async (value) => {
  let data = await findGroupList(value)
  let { rsp, desc, list } = data

  if (rsp == 0) {
    let isIngroup = list.map(v => v.isdn).includes(icpStore.isdn)
    if (!isIngroup) {
      return ElMessage.error('用户不在该动态组！');
    }
    currentEditRow.value = value.group;
    cloudICP.value.dispatch.group[
      value.isTalking ? "pttreleaseTalkingGroup" : "pttTalkingGroup"
    ]({
      grpid: value.group,
      callback: ({ rsp, desc }) => {
        if (rsp == 0) {
          ElMessage.success(value.isTalking ? "放权成功" : "组呼或者抢权成功");
          value.isTalking = !value.isTalking
        } else {
          ElMessage.error(`错误码:${rsp},${otherStatus[rsp] || desc}`);
        }
        rspRef.value = rsp

      },
    });

  } else {
    ElMessage.error(`错误码:${rsp},${otherStatus[rsp] || desc}`);
  }
  rspRef.value = rsp


};

const findGroup = async () => {
  await new Promise((res, rej) => {
    setTimeout(() => {
      res()
    }, 1000)
  })
  cloudICP.value.dispatch.query.queryDynamicGroup({
    callback: ({ rsp, desc, list }) => {
      if (rsp == 0) {
        tableData.list = list;
      } else {
        ElMessage.error(`错误码:${rsp},${otherStatus[rsp] || desc}`);
      }
      rspRef.value = rsp
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

/**
 *  注册用户状态变化
 */
cloudICP.value.dispatch.event.register({
  eventType: "VoiceNotify",
  eventName: "OnUserStatusNotify",
  callback: ({ eventName, list }) => {
    const resObj = {}
    list.forEach(v => {
      resObj[v.isdn] = v.statusvalue
    })
    tableGroupData.list.forEach(v => {
      if (resObj[v.isdn]) {
        v.statusvalue = resObj[v.isdn]
      }
    })
  }
});
</script>

<style scoped>
.groupCreateForm {
  width: 600px;
}

.dotitem >>> .el-badge__content {
  top: 4px;
  right: 1px;
}
</style>
