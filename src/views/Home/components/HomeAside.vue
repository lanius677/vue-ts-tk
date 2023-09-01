<template>
  <div>
    <el-menu default-active="1-1" router>
      <el-sub-menu v-for="item in menus" :index="item.path" :key="item.path">
        <template #title>
          <el-icon>
            <component :is="item.meta?.icon"></component>
          </el-icon>
          <span>{{ item.meta?.title }}</span>
        </template>
        <el-menu-item
          v-for="itemChild in item.children"
          :key="item.path + itemChild.path"
          :index="item.path+itemChild.path"
        >
          <el-icon>
            <component :is="itemChild.meta?.icon"></component>
          </el-icon>
          <span>{{ itemChild.meta?.title }}</span>
        </el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { useRouter, type RouteRecordName } from "vue-router";
import _ from "lodash";
import { useUsersStore } from "@/stores/users";
import { storeToRefs } from "pinia";

const router = useRouter();
// console.log(router);
// 使用cloneDeep深拷贝对路由表操作，避免互相引用的问题

const usersStore=useUsersStore()
const {userInfos}=storeToRefs(usersStore)
// 从store获取用户权限
const permission=userInfos.value.permission
// console.log(permission)

const menus = _.cloneDeep(router.options.routes).filter((v) => {
  v.children = v.children?.filter((v)=>v.meta?.menu && (permission as (RouteRecordName | undefined)[]).includes(v.name))
  return v.meta?.menu && (permission as (RouteRecordName | undefined)[]).includes(v.name);
});

</script>

<style scoped lang="scss">
.el-menu {
  height: calc(100vh - 60px);
  border: none;
  padding-top: 30px;
}

.el-sub-menu.is-active {
  background: #e6f7ff;
}
</style>
