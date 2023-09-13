<template>
  <div class="sign-content">
    <!-- 打卡描述列表 -->
    <el-descriptions border direction="vertical" :column="9">
      <el-descriptions-item label="月份">{{ month }}月</el-descriptions-item>
      <el-descriptions-item v-for="(value,key) in DetailKey" :key="key" :label="value">{{ dateilValue[key] }}</el-descriptions-item>
      <el-descriptions-item label="操作">
        <el-button type="primary" plain size="small" @click="handleToException()">查看详情</el-button>
      </el-descriptions-item>
      <el-descriptions-item label="考勤状态">
        <el-text class="mx-1" :type="detailState.type">{{ detailState.text }}</el-text>
      </el-descriptions-item>
    </el-descriptions>

    <!-- 日历模块 -->
    <el-calendar v-model="date">
      <template #header>
        <el-button type="primary">在线签到</el-button>
        <el-space>
          <el-button plain>{{ year }}年</el-button>
          <el-select v-model="month" @change="handleChange">
            <el-option
              v-for="item in 12"
              :key="item"
              :value="item"
              :label="item + '月'"
            ></el-option>
          </el-select>
        </el-space>
      </template>
    </el-calendar>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import {useRouter} from 'vue-router';
// 获取年月份
const date = ref(new Date());
const year = date.value.getFullYear();
const month = ref(date.value.getMonth() + 1);

// 查看不同日期
const handleChange = () => {
  // console.log(month.value);
  date.value = new Date(`${year}.${month.value}`);
};

// 查看打卡详情
const router=useRouter()
const handleToException=()=>{
  router.push('/exception')
}

// 响应式打卡信息
enum DetailKey {
  normal = "正常出勤",
  absent = "旷工",
  miss = "漏打卡",
  late = "迟到",
  early = "早退",
  lateAndEarly = "迟到并早退",
}

const dateilValue = reactive({
  normal: 1,
  absent: 0,
  miss: 3,
  late: 0,
  early: 0,
  lateAndEarly: 0,
})

const detailState=reactive({
    type:'success' as 'success' | 'danger',
    text:'正常' as '正常' |  '异常'
  })

</script>

<style scoped lang="scss">
@import "./Sign.module.scss";
</style>
