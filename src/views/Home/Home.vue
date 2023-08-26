<template>
  <div>
    hello Home
    {{ token }}
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import {useUsersStore} from '@/stores/users';
import { storeToRefs } from 'pinia';
const store = useUsersStore()
//这样解构的属性将保持响应性
const {token} = storeToRefs(store)
console.log(token.value)
</script>

<style scoped lang="scss"> 

</style>