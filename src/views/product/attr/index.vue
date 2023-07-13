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
        <el-table :data="formData!.attrValueList">
          <el-table-column label="序号" type="index"></el-table-column>
          <el-table-column label="属性值名称">
            <template #="{ row }">
              <!-- 如果不是正在编辑的状态则展示span标签 -->
              <span
                v-if="!row.isEdit"
                @dblclick="changeAttrValueHandler(row)"
                >{{ row.valueName }}</span
              >
              <el-input
                v-else
                ref="attrValueInputRef"
                v-model="inputAttrValue"
                @blur="addNewAttrValueHandler(row)"
                @keydown.enter="addNewAttrValueHandler(row)"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="操作">
           <template #="{row}">
            <el-button
              type="danger"
             icon="ele-Delete"
              @click="deleteAttrValueHandler(row)"
            ></el-button>
           </template>
          </el-table-column>
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
import { ElMessage, type ElInput } from "element-plus";


export default defineComponent({
  name: "ProductAttrIndex",
});
</script>

<script lang="ts" setup>
import { nextTick, ref, watch } from "vue";
import CategorySelector from "@/components/CategorySelector/index.vue";
import { reqAttrInfoList, reqSaveAttrInfo } from "@/api/attrs";
import type {
  ReqAttr,
  ReqSaveAttr,
  ReqAttrValueList,
  ReqAttrValue,
} from "@/api/attrs";
import useCategorySelector from "@/components/CategorySelector/index";

const { category1Id, category2Id, category3Id } = useCategorySelector();
const isShowView = ref(true);
const attrs = ref<ReqAttr[]>([]);
const formData = ref<ReqSaveAttr | null>(null);
const attrValueInputRef = ref<typeof ElInput | null>(null);
const inputAttrValue = ref("");

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
    isEdit: true,
  });
  nextTick(() => {
    attrValueInputRef.value?.focus();
  });
}

function addNewAttrValueHandler(row: ReqAttrValue) {
  // 1.判断输入值是否为空
  const newValue = inputAttrValue.value.trim();
  // 解决回车键会调用两次函数问题:按下回车键也会触发失焦事件，按下回车键编辑状态变为false，所以如果row.isEdit为false则什么也不做，失焦事件会调用函数则不会出现调两次函数的问题
  if (!row.isEdit) return;
  if (newValue === "") {
    // 如果为空则说明用户没有输入任何内容，则放弃添加，从formData.value.attrValueList中删除row
    if (formData.value) {
      // 如果为空，则把属性值数组中除了当前行的属性值过滤出来，新的数组中就没有当前行的数据（相当于删除了）
      formData.value.attrValueList = formData.value.attrValueList.filter(
        (item) => item != row
      );
      inputAttrValue.value = "";
    }
  } else {
    // 如果不为空则查找此属性值在数组是否已经存在，需要在查找过程中排除和自身的比较（编辑的时候）,每一行对应的item和row是对应的所以如果相等的话说明就是当前行，就要排除这种情况
    const isExists = formData.value?.attrValueList.find((item) => {
      console.log(item);
      return item.valueName == newValue && item != row;
    });
    if (isExists) {
      // 如果存在该值则不允许添加
      inputAttrValue.value = "";
      ElMessage.error("已存在该值");
      nextTick(() => {
        attrValueInputRef.value?.focus();
      });
    } else {
      // 如果输入了内容且不重复则添加到当前row的valueName属性中
      /* console.log(row);
      console.log(newValue); */
      row.valueName = newValue;
      console.log(row);
      console.log(newValue);
      // 改变isEdit的状态，显示span标签
      row.isEdit = false;
      // 清空inputValue中存储的值
      inputAttrValue.value = "";
    }
  }
}

function changeAttrValueHandler(row: ReqAttrValue) {
  row.isEdit = true;
  inputAttrValue.value = row.valueName;
  nextTick(() => {
    attrValueInputRef.value?.focus();
  });
}

function deleteAttrValueHandler(row: ReqAttrValue) {
  if (formData.value) {
    formData.value.attrValueList = formData.value.attrValueList.filter(
      // 过滤出和这一行值不相等的数据即删掉这一行的数据
      (item) => item != row
    );
  }
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
