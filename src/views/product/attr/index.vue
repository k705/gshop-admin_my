<template>
  <div>
    <CategorySelector :disabled="!isShowView"></CategorySelector>

    <el-card shadow="hover" stripe style="margin-top: 20px">
      <div v-if="isShowView">
        <el-button
          type="primary"
          icon="ele-Plus"
          @click="showAddOrEditAttrsHandler"
          :disabled="!category3Id"
          >添加属性</el-button
        >

        <el-table style="margin-top: 20px" border strip :data="attrs">
          <el-table-column type="index" label="序号"> </el-table-column>
          <el-table-column label="属性名称" prop="attrName"> </el-table-column>
          <el-table-column label="属性值名称列表">
            <template #="{ row }">
              <el-tag
                type="success"
                v-for="attrValue in row.attrValueList"
                :key="attrValue.id"
                >{{ attrValue.valueName }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template #="{ row }">
              <el-button type="warning" icon="ele-Edit"></el-button>
              <el-button type="danger" icon="ele-Delete"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 添加或编辑 -->
      <div v-else>
        <el-form inline>
          <el-form-item label="属性名">
            <el-input v-model="formData!.attrName"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              :disabled="!formData!.attrName"
              @click="addAttrValueHandler"
              >添加属性值</el-button
            >
            <el-button @click="isShowView = true">取消</el-button>
          </el-form-item>
        </el-form>
        <el-table :data="formData!.attrValueList"   >
          <el-table-column label="序号" type="index"></el-table-column>
          <el-table-column label="属性值名称">
            <template #="{ row }">
              <el-input ref="attrValueInputRef"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="操作"></el-table-column>
        </el-table>
        <div>
          <el-button type="primary">保存</el-button>
          <el-button @click="isShowView = true">取消</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { ElInput } from "element-plus";

export default defineComponent({
  name: "ProductAttrIndex",
});
</script>

<script lang="ts" setup>
import { nextTick, ref, watch } from "vue";
import CategorySelector from "@/components/CategorySelector/index.vue";
import { reqAttrInfoList, reqSaveAttrInfo } from "@/api/attrs";
import type { ReqAttrValue, ReqSaveAttr } from "@/api/attrs";
import useCategorySelector from "@/components/CategorySelector/index";
const { category1Id, category2Id, category3Id } = useCategorySelector();
const isShowView = ref(true);
const attrs = ref<ReqAttrValue[]>([]);
const formData = ref<ReqSaveAttr | null>(null);
const attrValueInputRef = ref<typeof ElInput | null>(null);

function showAddOrEditAttrsHandler() {
  isShowView.value = false;
  // 初始化formData
  formData.value = {
    categoryId: Number(category3Id.value),
    categoryLevel: 3,
    attrName: "",
    attrValueList: [],
  };
}
function addAttrValueHandler() {
  formData.value?.attrValueList.push({
    valueName: "",
  });
  nextTick(() => {
    attrValueInputRef.value?.focus();
  });
}
watch(category3Id, async () => {
  if (category3Id.value !== "") {
    try {
      attrs.value = await reqAttrInfoList(
        category1Id.value,
        category2Id.value,
        category3Id.value
      );
    } catch (e) {}
  }
});
</script>

<style scoped></style>
