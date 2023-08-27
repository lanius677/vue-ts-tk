<template>
  <div class="home-header">
    <!-- 左侧 LOGO 标题  -->
    <div class="">
      <span class="home-header-logo">
        <i class="iconfont icon-vue icon-vue"></i>
        <i class="iconfont icon-icon-test icon-icon-test"></i>
        <i class="iconfont icon-typescript icon-typescript"></i>
      </span>
      <span class="home-header-title">在线考勤系统</span>
    </div>

    <!-- 右侧 提示消息 个人中心  -->
    <div>
      <el-dropdown>
        <el-icon class="home-header-bell"><Bell /></el-icon>
        <template #dropdown> 
          <el-dropdown-menu>
            <el-dropdown-item>暂无消息</el-dropdown-item>
            <el-dropdown-item>Action 2</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

      <el-dropdown>
        <el-badge :value="12" class="home-header-badge">

          <el-space>
            <el-avatar
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          /> 
          <span>XXX</span>
          </el-space>
        </el-badge>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
@import "../Home.module.scss";

.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
</style>
