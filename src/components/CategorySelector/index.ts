import { ref } from "vue";
import type {
  ResCategoryId1,
  ResCategoryId2,
  ResCategoryId3,
} from "@/api/categorySelector";
import {
  requestGetCategory1,
  requestGetCategory2,
  requestGetCategory3,
} from "@/api/categorySelector";

// 分类数据 categories
const categories1 = ref<ResCategoryId1[]>([]);
const categories2 = ref<ResCategoryId2[]>([]);
const categories3 = ref<ResCategoryId3[]>([]);

// 分类Id
const category1Id = ref("");
const category2Id = ref("");
const category3Id = ref("");

// 请求
async function getCategories1() {
  try {
    categories1.value = await requestGetCategory1();
  } catch (e) {}
}

async function getCategories2() {
  try {
    categories2.value = await requestGetCategory2(category1Id.value);
    console.log(categories2.value);
  } catch (e) {}
}

async function getCategories3() {
  try {
    categories3.value = await requestGetCategory3(category2Id.value);
  } catch (e) {}
}

export default function useCategorySelector() {
  return {
    category1Id,
    category2Id,
    category3Id,

    categories1,
    categories2,
    categories3,

    getCategories1,
    getCategories2,
    getCategories3,
  };
}
