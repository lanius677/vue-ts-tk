<template>
  <div class="home-header">
    <el-container>
      <el-header>
        <HomeHeader></HomeHeader>
      </el-header>
      <el-container>
        <el-aside>
          <HomeAside></HomeAside>
        </el-aside>
        <el-main>
          <HomeBreadCrumb></HomeBreadCrumb>
          <HomeMain></HomeMain>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import HomeHeader from "@/views/Home/components/HomeHeader.vue";
import HomeAside from "@/views/Home/components/HomeAside.vue";
import HomeBreadCrumb from "@/views/Home/components/HomeBreadCrumb.vue";
import HomeMain from "@/views/Home/components/HomeMain.vue";
</script>

<style scoped lang="scss">

</style>
