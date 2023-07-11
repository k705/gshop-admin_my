import {
  reqGetCategory1,
  reqGetCategory2,
  reqGetCategory3,
} from "@/api/category";
import type { ResCategory1, ResCategory2, ResCategory3 } from "@/api/category";
import { ref } from "vue";

const category1Id = ref("");
const category2Id = ref("");
const category3Id = ref("");
const categories1 = ref<ResCategory1[]>([]);
const categories2 = ref<ResCategory2[]>([]);
const categories3 = ref<ResCategory3[]>([]);

async function getCategories1() {
  categories1.value = await reqGetCategory1();
}
async function getCategories2() {
  /* 清空2、3级列表内容 */
  category2Id.value = category3Id.value = "";
  categories2.value = [];
  categories3.value = [];
  categories2.value = await reqGetCategory2(Number(category1Id.value));
}
async function getCategories3() {
  /* 清空3级列表内容 */
  category3Id.value = "";
  categories3.value = [];
  categories3.value = await reqGetCategory3(Number(category2Id.value));
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
