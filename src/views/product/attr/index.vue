<template>
  <div>
    <CategorySelector />
    <el-card shadow="hover" :body-style="{ padding: '20px' }">
      <el-button type="primary" icon="ele-Plus">添加属性</el-button>
      <el-table :data="attrs" border stripe>
        <el-table-column label="序号" type="index" width="70px"/>
        <el-table-column label="属性名称" prop="attrName" width="260px"/>
        <el-table-column label="属性值名称列表" >
          <template #="{ row }">
            <el-tag
              v-for="attr in row.attrValueList"
              :key="attr.id"
              type="success"
              style="margin-right: 5px"
            >
              {{ attr.valueName }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作"  width="200px">
          <el-button type="warning" icon="ele-Edit"></el-button>
          <el-button type="danger" icon="ele-Delete"></el-button>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ProductAttrIndex",
});
</script>

<script lang="ts" setup>
import { ref, watch } from "vue";

import { reqAttrInfoList } from "@/api/attrs";
import type { ReqAttrInfo } from "@/api/attrs";
import CategorySelector from "@/components/CategorySelector/index.vue";
import useCategorySelector from "@/components/CategorySelector/index";
const { category1Id, category2Id, category3Id } = useCategorySelector();
const attrs = ref<ReqAttrInfo[]>([]);
watch(category3Id, async () => {
  if (category3Id.value != "") {
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
