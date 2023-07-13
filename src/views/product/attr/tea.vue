<template>
  <div>
    <CategorySelector :disabled="!isListView"></CategorySelector>

    <el-card shadow="hover" style="margin-top: 20px">
      <div v-if="isListView">
        <el-button
          type="primary"
          icon="ele-Plus"
          :disabled="!category3Id"
          @click="showAddOrEditViewHandler()"
          >添加属性</el-button
        >

        <el-table style="margin-top: 20px" border stripe :data="attrs">
          <el-table-column
            width="80"
            label="序号"
            type="index"
          ></el-table-column>
          <el-table-column
            width="150"
            label="属性名称"
            prop="attrName"
          ></el-table-column>
          <el-table-column label="属性值名称列表">
            <template #="{ row }">
              <el-tag
                v-for="attrValue in row.attrValueList"
                :key="attrValue.id"
                type="success"
                style="margin-right: 5px"
                >{{ attrValue.valueName }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column width="150" label="操作">
            <template #="{ row }">
              <el-button
                type="warning"
                icon="ele-Edit"
                @click="showAddOrEditViewHandler(row)"
              ></el-button>
              <el-popconfirm
                title="你确定要删除吗？"
                @confirm="confirmDeleteAttrHandler(row.id)"
              >
                <template #reference>
                  <el-button type="danger" icon="ele-Delete"></el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 添加/编辑 -->
      <div v-else>
        <el-form inline>
          <el-form-item label="属性名">
            <!-- 
              在 Vue 的模板中不能使用 ? 这个可选链操作符
              使用 !（告诉ts，!之前的数据类型排除null|undefined等情况）
             -->
             <!-- 1.双向绑定属性名  2.按下回车键检测是否已存在此属性名  3.失焦检测是否已存在此属性名 -->
            <el-input
              v-model="formData!.attrName"
              @keydown.enter="enterAttrNameHandler"
              @blur="enterAttrNameHandler"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <!-- 点击添加属性值，给属性值数组中添加空字符串，保证formData不为null或undefined？？？ -->
            <el-button
              type="primary"
              :disabled="!formData!.attrName"
              @click="addAttrValueHandler"
              >添加属性值</el-button
            >
            <el-button @click="isListView = true">取消</el-button>
          </el-form-item>
        </el-form>
        <!-- 绑定属性值数组的数据 -->
        <el-table style="margin: 10px 0" :data="formData!.attrValueList">
          <el-table-column label="序号" type="index"></el-table-column>
          <el-table-column label="属性值名称">
            <template #="{ row }">
              <!-- 判断如果为编辑则双击input框修改数据 -->
              <span
                v-if="!row.isEdit"
                @dblclick="changeInputStatusHandler(row)"
                >{{ row.valueName }}</span
              >
              <!-- 如果不是编辑则是添加，则双向绑定input框输入的内容 失焦和回车键按下则判断是否有重复的属性值并存储数据-->
              <el-input
                v-else
                ref="attrValueInputRef"
                v-model="inputAttrValue"
                @blur="enterNewAttrValueHandler(row, $event)"
                @keydown.enter="enterNewAttrValueHandler(row, $event)"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template #="{ row }">
              <el-button
                type="danger"
                icon="ele-Delete"
                @click="deleteAttrValuehandler(row)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
        <div>
          <el-button
            type="primary"
            :disabled="!(formData!.attrName && formData!.attrValueList.length > 0)"
            @click="saveAttrHandler"
            >保存</el-button
          >
          <el-button @click="isListView = true">取消</el-button>
        </div>
      </div>
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
import { watch, ref, nextTick } from "vue";
import CategorySelector from "@/components/CategorySelector/index.vue";
import useCategorySelector from "@/hooks/categorySelector";
import { requestAttrInfoList, requestSaveAttrInfo } from "@/api/attr";
import { ElInput, ElMessage } from "element-plus";
import _ from "lodash";

import type { ResAttr, ReqSaveAttr, ReqSaveAttrValue } from "@/api/attr";

const { category1Id, category2Id, category3Id } = useCategorySelector();

// 存储所有的属性列表数据
const attrs = ref<ResAttr[]>([]);
// 记录当前显示的视图（true=>list,false=>add/edit）
const isListView = ref(true);
// 收集用户输入的数据（添加/编辑）
const formData = ref<ReqSaveAttr | null>(null);
// 获取属性值的实例对象
const attrValueInputRef = ref<typeof ElInput | null>(null);
// 绑定收集用户在属性值列表输入框中输入的数据
const inputAttrValue = ref("");
// 使用一个变量来表示当前输入状态（true：输入，false：展示）
// 这样做有一个问题：所有的数据共用了一个状态，我们得为每一条数据添加一个属于自己的状态
// const inputValueNameStatus = ref(true);

/**
 * typeof 在 TS 有一个特殊的意义，获取类型
 */
// let a = typeof "asdas"; //'string'
// let v = "asdfsdfsd";
// type t = typeof v;

// let obj = { x: 1, y: "abc" };

// let obj2: { x: number; y: string } = { x: 2, y: "asdasd" };
// type t = typeof obj;
// let obj2: t;

async function getAttrs() {
  if (category3Id.value != "") {
    try {
      attrs.value = await requestAttrInfoList(
        Number(category1Id.value),
        Number(category2Id.value),
        Number(category3Id.value)
      );
    } catch (e) {}
  }
}

watch(category3Id, getAttrs);

/**
 * 点击添加按钮
 */
function showAddOrEditViewHandler(row?: ResAttr) {
  // 切换到添加到视图
  isListView.value = false;

  // 对formData进行初始化

  if (row) {
    // 编辑的初始化
    // 使用深拷贝
    formData.value = _.cloneDeep(row);
  } else {
    // 添加初始化
    formData.value = {
      categoryId: Number(category3Id.value),
      categoryLevel: 3,
      attrName: "",
      attrValueList: [],
    };
  }
}

/**
 * 检测要添加的属性名称是否已经存在
 */
function enterAttrNameHandler() {
  if (formData.value) {
    // 过滤掉当前这条数据
    const filterAttrs = attrs.value.filter(
      (item) => item.id != formData.value?.id
    );

    // 在已经过滤掉的数据中去查找是否还有重复的
    const isExists = filterAttrs.find(
      (item) => item.attrName == formData.value?.attrName
    );
    // console.log(isExists);
    if (isExists) {
      ElMessage.error("已经存在同名属性了");
      formData.value.attrName = "";
    }
  }
}

/**
 * 给指定的属性名添加属性值
 */
// const obj: any = {};
// console.log(obj);
// setTimeout(() => {
//   obj.x = 1;
// }, 5000);
function addAttrValueHandler() {
  formData.value?.attrValueList.push({
    valueName: "",
    isEdit: true,
  });

  // @ts-ignore
  // attrValueInputRef.value?.focus();
  // console.log("attrValueInputRef", attrValueInputRef.value);

  // 不能给未在页面中存在的元素设置焦点
  // attrValueInputRef.value?.focus();
  // 渲染完成以后再调用focus
  nextTick(() => {
    attrValueInputRef.value?.focus();
  });
  // 修改当前状态为输入状态
  // 状态放在 数据的 isEdit 上
  // inputValueNameStatus.value = true;
}

/**
 * 确认输入的属性值
 */
function enterNewAttrValueHandler(row: ReqSaveAttrValue, e: Event) {
  // 判断当前值是否为空
  const newValue = inputAttrValue.value.trim();
  // 获取当前用户输入的内容
  // console.log(row.isEdit, inputAttrValue.value, e);
  // 如果按下回车，会触发两次事件：keydown，blur，原因：keydown添加完数据以后，会把状态设置为false，导致input不被渲染，从而失去焦点了，触发blur
  // 解决
  // 解决办法一：
  // if (e.type == "keydown") {
  //   row.isEdit = false;
  //   return;
  // }
  // 解决办法二：
  if (!row.isEdit && newValue == "") {
    return;
  }
  if (newValue === "") {
    // 如果用户没有输入任何内容，则表示放弃这次添加
    // 也就是从 formData.value.attrValueList 删除 row
    // console.log(row);
    if (formData.value) {
      formData.value.attrValueList = formData.value.attrValueList.filter(
        (item) => item != row
      );
      inputAttrValue.value = "";
    }
  } else {
    // 判断当前要添加的值是否在数组中已经存在
    // 需要在查找的过程中排除自身的比较（item == row）
    const isExists = formData.value?.attrValueList.find(
      (item) => item.valueName == newValue && item != row
    );

    // console.log(isExists);
    if (isExists) {
      // 表示当前数据已经存在了，不允许添加
      inputAttrValue.value = "";
      ElMessage.error("已经存在该值");
      nextTick(() => {
        attrValueInputRef.value?.focus();
      });
    } else {
      // 如果用户输入了内容，则把这个输入内容添加到当前row的valueName属性
      row.valueName = newValue;
      // 把编辑状态修改为显示的状态
      // inputValueNameStatus.value = false;
      row.isEdit = false;
      // 清空inputAttrValue中存储的值
      inputAttrValue.value = "";
    }
  }
}

/**
 * 点击span进入编辑状态
 */
function changeInputStatusHandler(row: ReqSaveAttrValue) {
  // 把当前row的状态设置为true
  row.isEdit = true;
  // 给 inputAttrValue 设置值，值就是当前row.valueName
  inputAttrValue.value = row.valueName;
  // 给当前的input设置焦点
  nextTick(() => {
    attrValueInputRef.value?.focus();
  });
}

/**
 * 点击删除按钮删除指定的属性值
 */
function deleteAttrValuehandler(row: ReqSaveAttrValue) {
  if (formData.value) {
    formData.value.attrValueList = formData.value.attrValueList.filter(
      (item) => item != row
    );
  }
}

/**
 * 提交保存
 */
async function saveAttrHandler() {
  if (formData.value) {
    const messageType = formData.value.id ? "修改" : "添加";
    try {
      await requestSaveAttrInfo(formData.value);
      ElMessage.success(`${messageType}成功`);
      isListView.value = true;
      getAttrs();
    } catch (e) {
      ElMessage.error(`${messageType}失败`);
    }
  }
}

/**
 * 删除attr
 */
function confirmDeleteAttrHandler(id: number) {
  console.log(id);
}
</script>

<style scoped></style>
