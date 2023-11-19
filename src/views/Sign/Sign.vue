<template>
  <div class="sign-content">
    <!-- 打卡描述列表 -->
    <el-descriptions border direction="vertical" :column="9">
      <el-descriptions-item label="月份">{{ month }}月</el-descriptions-item>
      <el-descriptions-item v-for="(value, key) in DetailKey" :key="key" :label="value">{{
        detailValue[key]
      }}</el-descriptions-item>
      <el-descriptions-item label="操作">
        <el-button type="primary" plain size="small" @click="handleToException()"
          >查看详情</el-button
        >
      </el-descriptions-item>
      <el-descriptions-item label="考勤状态">
        <el-text class="mx-1" :type="detailState.type">{{ detailState.text }}</el-text>
      </el-descriptions-item>
    </el-descriptions>

    <!-- 日历模块 -->
    <el-calendar v-model="date">
      <template #header>
        <el-button type="primary" @click="handlePutTime">在线签到</el-button>
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
      <template #date-cell="{ data }">
        <div>{{ renderDate(data.day) }}</div>
        <div class="show-time">{{ renderTime(data) }}</div>
      </template>
    </el-calendar>
  </div>
</template>

<script setup lang="ts">
import { useSignsStore } from "@/stores/signs";
import { useUsersStore } from "@/stores/users";
import { toZero } from "@/utils/common";
import { ElMessage } from "element-plus";
import { computed, reactive, ref, watchEffect } from "vue";
import { useRouter } from "vue-router";

// 响应式打卡信息
enum DetailKey {
  normal = "正常出勤",
  absent = "旷工",
  miss = "漏打卡",
  late = "迟到",
  early = "早退",
  lateAndEarly = "迟到并早退",
}

const detailValue = reactive({
  normal: 1,
  absent: 0,
  miss: 3,
  late: 0,
  early: 0,
  lateAndEarly: 0,
});

const detailState = reactive({
  type: "success" as "success" | "danger",
  text: "正常" as "正常" | "异常",
});

interface dayObject {
  day: string;
}

// 获取用户打卡信息
const signsStore = useSignsStore();
const signsInfos = computed(() => signsStore.signsInfos);

// 获取用户信息
const usersStore = useUsersStore();
const usersInfos = computed(() => usersStore.userInfos);

// 获取年月份
const date = ref(new Date());
const year = date.value.getFullYear();
const month = ref(date.value.getMonth() + 1);

watchEffect((reset) => {
  // console.log(toZero(month.value));
  const detailMonth = (signsInfos.value.detail as { [index: string]: unknown })[
    toZero(month.value)
  ] as { [index: string]: unknown };
  //  console.log(detailMonth);

  for (let attr in detailMonth) {
    // console.log(detailMonth[attr]);
    switch (detailMonth[attr]) {
      case DetailKey.normal:
        detailValue.normal++;
        break;

      case DetailKey.absent:
        detailValue.absent++;
        break;

      case DetailKey.miss:
        detailValue.miss++;
        break;

      case DetailKey.late:
        detailValue.late++;
        break;

      case DetailKey.early:
        detailValue.early++;
        break;

      case DetailKey.lateAndEarly:
        detailValue.lateAndEarly++;
        break;
    }
  }

  for (let attr in detailValue) {
    if (attr !== "normal" && detailValue[attr as keyof typeof detailValue] !== 0) {
      detailState.type = "danger";
      detailState.text = "异常";
    }
  }

  // 对月份数值清除副作用
  reset(() => {
    detailState.type = "success";
    detailState.text = "正常";

    for (let attr in detailValue) {
      detailValue[attr as keyof typeof detailValue] = 0;
    }
  });
});

// 查看不同日期
const handleChange = () => {
  // console.log(month.value);
  date.value = new Date(`${year}.${month.value}`);
};

// 查看打卡详情
const router = useRouter();
const handleToException = () => {
  // router.push("/exception");
  router.push({
    path:'/exception',
    query:{month:month.value}
  })
};

// 签到日期渲染方法
const renderDate = (day: string) => {
  // 数组第三项是 日
  return day.split("-")[2];
};

// 签到时间渲染方法
const renderTime = ({ day }: dayObject) => {
  const [year, month, date] = day.split("-");

  const ret = ((signsInfos.value.time as { [index: string]: unknown })[month] as {
    [index: string]: unknown;
  })[date];

  if (Array.isArray(ret)) {
    return ret.join("-");
  }
};

// 打卡签到事件
const handlePutTime = () => {
  signsStore.putTime({ userid: usersInfos.value._id }).then((res) => {
    console.log("res", res);
    if (res.data.errcode === 0) {
      signsStore.updateInfos(res.data.infos);
      ElMessage.success("签到成功");
    }
  });
};
</script>

<style scoped lang="scss">
@import "./Sign.module.scss";
</style>
