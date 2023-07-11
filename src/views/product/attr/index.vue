<template>
  <CategorySelector></CategorySelector>

  <el-card shadow="hover" stripe style="margin-top: 20px">
    <el-table border strip :data="attrs">
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
  </el-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ProductAttrIndex",
});
</script>

<script lang="ts" setup>
import { ref, watch } from "vue";
import CategorySelector from "@/components/CategorySelector/index.vue";
import { reqAttrInfoList } from "@/api/attrs";
import type { ReqAttrValue } from "@/api/attrs";
import useCategorySelector from "@/components/CategorySelector/index";
const { category1Id, category2Id, category3Id } = useCategorySelector();

const attrs = ref<ReqAttrValue[]>([]);
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
