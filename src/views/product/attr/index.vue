<template>
  <CategorySelector></CategorySelector>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ProductAttrIndex",
});
</script>

<script lang="ts" setup>
/* import {reqAttrInfoList } from "@/api/attrs"
import type { ReqAttrValue } from "@/api/attrs"
import { useCategorySelector } from "@/components/CategorySelector/index"
const {category1,} */
import CategorySelector from "@/components/CategorySelector/index.vue"
</script>

<style scoped></style>
