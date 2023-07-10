<template>
  <el-card shadow="hover">
    <!-- 头部为按钮组件 插槽-->
    <template #header>
      <el-button type="primary" icon="ele-plus"> 添加 </el-button>
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

 <!--  <el-dialog title="添加品牌" v-model="isShowAddTrademarkDialog" >
  <el-form :model="form">
    <el-form-item label="品牌名称" :label-width="formLabelWidth">
      <el-input v-model="form.name" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="品牌Logo" :label-width="formLabelWidth">
      <el-select v-model="form.region" placeholder="请选择活动区域">
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
  </div>
</el-dialog> -->
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
import { requestTrademarkListByPage } from "@/api/trademark";

// 导入类型
import type { ResTrademark } from "@/api/trademark";

// 定义数据类型
const trademarks = ref<ResTrademark[]>([]);
const total = ref(0);
const page = ref(1);
const pageSize = ref(5);

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
// 调用方法
getTrademarkListByPage();
</script>

<style scoped></style>
