<template>
  <el-card shadow="hover">
    <el-form inline>
      <el-form-item
        label="一级分类"
       
      >
        <el-select v-model="category1Id"
        @change="getCategories2">
          <el-option
            v-for="cat1 in categories1"
            :key="cat1.id"
            :label="cat1.name"
            :value="cat1.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="二级分类"
       
      >
        <el-select v-model="category2Id"
        @change="getCategories3">
          <el-option
            v-for="cat2 in categories2"
            :key="cat2.id"
            :label="cat2.name"
            :value="cat2.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类" >
        <el-select v-model="category3Id">
          <el-option
            v-for="cat3 in categories3"
            :key="cat3.id"
            :label="cat3.name"
            :value="cat3.id"
          ></el-option>
        </el-select>
      </el-form-item>
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
} = useCategorySelector();

onMounted(getCategories1);
</script>

<style scoped lang="scss"></style>
