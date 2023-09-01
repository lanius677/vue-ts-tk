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
.el-header {
  box-shadow: 0 8px 24px -2px rbg(0 0 0/5%);
}

.el-aside{
  box-shadow: 2px 0 8px 0 rbg(29 35 41/5%);
}

.el-main{
  background: #f0f2f5;
  display: flex;
  flex-direction: column;
}
</style>
