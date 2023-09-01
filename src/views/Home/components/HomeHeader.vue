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
        <el-badge :value="12" class="home-header-bell">
          <el-icon class=""><Bell /></el-icon>
        </el-badge>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>暂无消息</el-dropdown-item>
            <el-dropdown-item>Action 2</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

      <el-dropdown>
        <el-space>
          <el-avatar
            :src="(head as string)"
          />
          <span>{{name}}</span>
        </el-space>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item @click="handleLogout()">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useUsersStore} from '@/stores/users';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

const usersStore=useUsersStore()
const {userInfos}=storeToRefs(usersStore)

// console.log(userInfos.value)

// 从store中获取头像
const head=computed(()=>userInfos.value.head)
const name=computed(()=>userInfos.value.name)

// 退出
const handleLogout=()=>{
  usersStore.clearToken();
  setTimeout(()=>{
    window.location.replace('/login')
  },1000)
}

</script>

<style scoped lang="scss">
@import "../Home.module.scss";

.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}


</style>
