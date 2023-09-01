<template>
  <div class="home-breadcrumb">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="item in breadcrumb" :key="item.path">{{ item.meta?.title }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route=useRoute()

const breadcrumb=computed(()=>route.matched)

// console.log('breadcrumb',breadcrumb.value)

</script>

<style scoped>
@import "@/views/Home/Home.module.scss";
</style>
