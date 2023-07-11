<template>
  <CategorySelector/>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ProductAttrIndex",
});
</script>

<script lang="ts" setup>
import  CategorySelector  from "@/components/CategorySelector/index.vue";
</script>

<style scoped></style>
