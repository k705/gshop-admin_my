<template>
  <div>
    <el-card shadow="hover">
      <!-- 头部为按钮组件 插槽-->
      <template #header>
        <el-button
          type="primary"
          icon="ele-Plus"
          @click="showAddTrademarkDialog"
        >
          添加
        </el-button>
      </template>

      <!-- footer-table组件 -->
      <el-table :data="trademarks">
        <el-table-column label="序号" type="index"></el-table-column>
        <el-table-column label="品牌名称" ></el-table-column>
        <el-table-column label="品牌LOGO" >
          <template #="{ row }">
            <img :src="row.logoUrl" width="100" />
          </template>
        </el-table-column>
        <el-table-column label="操作"></el-table-column>
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
      <el-form
        label-width="100px"
        :model="formData"
        :rules="rules"
        ref="formRef"
      >
        <el-form-item label="品牌名称" prop="tmName">
          <el-input v-model="formData.tmName" />
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
              class="avatar"
            />
            <el-icon v-else class="avatar-uploader-icon">
              <ele-Plus />
            </el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="notShowAddTrademarkDialog">取 消</el-button>
        <el-button type="primary" @click="addTrademarkHandler">确 定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

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
  requestSaveBaseTrademark,
} from "@/api/trademark";

// 导入类型
import type { ResTrademark, ReqSaveBaseTrademark } from "@/api/trademark";
import type { FormRules } from "element-plus";
import { ElMessage } from "element-plus";

// 定义数据类型
const trademarks = ref<ResTrademark[]>([]);
const total = ref(0);
const page = ref(1);
const pageSize = ref(5);
const formRef = ref();
const uploadUrl = `${import.meta.env.VITE_API_URL}/product/upload`;
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
      validator(rules: any, value: string, callback) {
        if (value === "") {
          callback("品牌名必填");
        } else {
          const ext = value.substring(value.lastIndexOf(".") + 1);
          if (!["png", "gif", "jpg"].includes(ext)) {
            callback("品牌LOGO必须是图片");
          } else {
            callback();
          }
        }
      },
    },
  ],
};

const isShowAddTrademarkDialog = ref(false);
const formData = ref<ReqSaveBaseTrademark>({
  tmName: "",
  logoUrl: "",
});

// 声明方法
// 请求trademark
async function getTrademarkListByPage() {
  try {
    const res = await requestTrademarkListByPage(page.value, pageSize.value);
    console.log(res);
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

/* ---------------------添加------------------------------ */
// 点击添加显示添加框
function showAddTrademarkDialog() {
  isShowAddTrademarkDialog.value = true;
}
function notShowAddTrademarkDialog() {
  isShowAddTrademarkDialog.value = false;
}

// 点击添加框的确定按钮发送请求
async function addTrademarkHandler() {
  try {
    console.log("formRef", formRef.value);

    // 调用 formRef.value.validate() 方法来对这个表单中指定的数据（model、rules）进行校验
  
      const res = await formRef.value.validate();
      console.log("校验成功", res);
 

    await requestSaveBaseTrademark(formData.value);
    // 隐藏
    isShowAddTrademarkDialog.value = false;
    // 提示
    ElMessage.success("添加成功");
    // 获取最新的列表数据
    // 把当前页定到最后一页（新增的数据就在最后一页）
    page.value = Math.ceil((total.value + 1) / pageSize.value);
    getTrademarkListByPage();
  } catch (e) {
    ElMessage.error("添加失败");
  }
}

// 文件上传成功时的钩子
function onSuccessHandler(response: { code: number; data: string }) {
  if (response.code === 200) {
    formData.value.logoUrl = response.data;
  }
}

// 调用获取列表数据方法
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
