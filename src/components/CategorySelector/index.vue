<template>
  <el-card shadow="hover">
    <el-form inline>
      <el-form-item label="一级分类">
        <el-select v-model="category1Id" @change="getCategories2">
          <el-option
            v-for="item in categories1"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
     
        </el-form-item
      >
      <el-form-item label="二级分类">
        <el-select v-model="category2Id" @change="getCategories3">
          <el-option
            v-for="item in categories2"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
    
        </el-form-item
      >
      <el-form-item label="三级分类">
        <el-select v-model="category3Id" >
          <el-option
            v-for="item in categories3"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
     
        </el-form-item
      >
    </el-form>
  </el-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "CategorySelector",
});
</script>

<script setup lang="ts">
import { onMounted } from "vue";
import useCategorySelector from "./index";
const {
  category1Id,
  category2Id,
  category3Id,
  categories1,
  categories2,
  categories3,
  getCategories1,
  getCategories2,
  getCategories3,
} = useCategorySelector()
onMounted(getCategories1)

</script>

<style scoped lang="scss"></style>
