<template>
  <div>
    <el-card shadow="hover">
      <!-- 头部为按钮组件 插槽-->
      <template #header>
        <el-button
          type="primary"
          icon="ele-Plus"
          @click="showAddOrEditTrademarkDialogHandler"
        >
          添加
        </el-button>
      </template>

      <!-- footer-table组件 -->
      <el-table :data="trademarks">
        <el-table-column label="序号" type="index"></el-table-column>
        <el-table-column label="品牌名称" prop="tmName"></el-table-column>
        <el-table-column label="品牌LOGO">
          <template #="{ row }">
            <img :src="row.logoUrl" width="100" />
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template>
            <el-button type="warning" icon="ele-Edit" @click="showAddOrEditTrademarkDialogHandler">
              修改
            </el-button>
            <el-button type="danger" icon="ele-Delete">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- footer-pagination组件 -->
      <el-pagination
        :total="total"
        :current-page="page"
        :page-size="pageSize"
        :page-sizes="[5, 10, 15]"
        layout="prev, pager, next,jumper,->,sizes,total"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      >
      </el-pagination>
    </el-card>

    <el-dialog title="添加品牌" v-model="isShowAddTrademarkDialog">
      <el-form :model="formData" ref="formRef" label-width="80px" :rules="rules">
        <el-form-item label="品牌名称" prop="tmName">
          <el-input v-model="formData.tmName"></el-input>
        </el-form-item>
        <el-form-item label="品牌Logo" prop="logoUrl">
          <el-upload
            class="avatar-uploader"
            :action="uploadUrl"
            :show-file-list="false"
            :on-success="onSuccessHandler"
          >
            <img
              v-if="formData.logoUrl"
              :src="formData.logoUrl"
              class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><ele-Plus /></el-icon
          ></el-upload>
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button @click=" isShowAddTrademarkDialog = false">取消</el-button>
        <el-button type="primary" @click="addTrademarkHandler">确认</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ElMessage, type FormRules } from "element-plus";

export default defineComponent({
  name: "ProductTrademarkIndex",
});
</script>

<script lang="ts" setup>
// 导入vue内置模块
import { ref } from "vue";

// 导入请求
import {
  requestTrademarkListByPage,
  requestSaveTrademark,
} from "@/api/trademark";

// 导入类型
import type { ResTrademark, ReqSaveTrademark } from "@/api/trademark";

// 定义数据类型
const trademarks = ref<ResTrademark[]>([]);
const total = ref(0);
const page = ref(1);
const pageSize = ref(5);
const isShowAddTrademarkDialog = ref(false);
const formData = ref<ReqSaveTrademark>({ tmName: "", logoUrl: "" });
const uploadUrl = `${import.meta.env.VITE_API_URL}/product/upload`;
const formRef = ref()
// 表单校验
const rules: FormRules = {
  tmName: [
    {
      required: true,
      min: 1,
      max: 20,
      message: "品牌名称必须是1-20个字符之间",
    },
  ],
  logoUrl: [
    {
      required: true,
      // 自定义验证的函数
      validator(rule: any, value: string, callback) {
        // console.log("当前的value", value);
        if (value === "") {
          callback("品牌LOGO必填");
        } else {
          const ext = value.substring(value.lastIndexOf(".") + 1);
          if (!["png", "jpg", "gif"].includes(ext)) {
            callback("品牌LOGO必须是图片");
          } else {
            callback();
          }
        }
      },
    },
  ],
};

// 声明方法

// 请求trademark
async function getTrademarkListByPage() {
  try {
    const res = await requestTrademarkListByPage(page.value, pageSize.value);
    // console.log(res);
    /* ref数据不写value两种情况：1.模板中  2.reactive中的数据为ref数据（但如果是ref数组则不行，reactive不能劫持数据方法） */
    trademarks.value = res.records;
    total.value = res.total;
    page.value = res.current;
    pageSize.value = res.size;
  } catch (e) {}
}
// 当前页数改变
function handleCurrentChange(v: number) {
  page.value = v;
  getTrademarkListByPage();
}
// 每页条数改变
function handleSizeChange(v: number) {
  pageSize.value = v;
  getTrademarkListByPage();
}
/* -----------------添加品牌------------- */
// 发请求

// 点击添加按钮弹出对话框
function showAddOrEditTrademarkDialogHandler() {
  isShowAddTrademarkDialog.value = true;
  /* 对整个表单进行重置，将所有字段值重置为初始值并移除校验结果 */
  formRef.value.resetFields()
}


// 方法
// 提交成功
// onSuccessHandler
function onSuccessHandler(response: { code: number; data: string }) {
  if (response.code === 200) {
    formData.value.logoUrl = response.data;
  }
}
// 点击确定发送请求
async function addTrademarkHandler() {
  try {
    const res = await formRef.value.validate();
    await requestSaveTrademark(formData.value);
    // 隐藏
    isShowAddTrademarkDialog.value = false;
    // 提示
    ElMessage.success("添加成功");  
    
    page.value = Math.ceil((total.value + 1) / pageSize.value);
    getTrademarkListByPage();
  } catch (e) {
    ElMessage.error("添加失败");
  }
}



/* before-upload	上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。 */
// 调用方法
getTrademarkListByPage();
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}
.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
