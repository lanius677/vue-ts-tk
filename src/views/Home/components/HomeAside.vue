<template>
  <div>
    <el-menu default-active="1-1">
      <el-sub-menu index="1">
        <template #title>
          <el-icon><location /></el-icon>
          <span>Navigator One</span>
        </template>
        <el-menu-item index="1-1">
          <el-icon><location /></el-icon>
          <span>item one</span>
        </el-menu-item>
        <el-menu-item index="1-2">
          <el-icon><location /></el-icon>
          <span>item two</span>
        </el-menu-item>
      </el-sub-menu>
    </el-menu>

    <el-menu default-active="2-1">
      <el-sub-menu index="2">
        <template #title>
          <el-icon><location /></el-icon>
          <span>Navigator two</span>
        </template>
        <el-menu-item index="2-1">
          <el-icon><location /></el-icon>
          <span>item one</span>
        </el-menu-item>
        <el-menu-item index="2-2">
          <el-icon><location /></el-icon>
          <span>item two</span>
        </el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script setup lang="ts">


</script>

<style scoped lang="scss">
.el-menu{
  height:calc(100vh - 60px);
  border:none;
  padding-top:30px
}

.el-sub-menu.is-active{
  background:#e6f7ff;
}

</style>
