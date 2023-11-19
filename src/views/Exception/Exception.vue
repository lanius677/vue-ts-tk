<template>
  <div class="excption-title">
    <el-button type="primary" @click="handleToApple">异常处理</el-button>
    <el-space>
      <el-button plain>2023年</el-button>
      <el-select v-model="month">
        <el-option
          v-for="item in 12"
          :key="item"
          :value="item"
          :label="item + '月'"
        ></el-option>
      </el-select>
    </el-space>
  </div>

  <!-- 详情内容和时间线布局 -->
  <el-row :gutter="20">
    <!-- 时间线布局 -->
    <el-col :span="12">
      <el-empty v-if="false" description="暂无异常考勤" />
      <el-timeline v-else>
        <el-timeline-item v-for="item in detailMonth" :key="item[0]"  :timestamp="year+'/'+month+'/'+item[0]" placement="top">
          <el-card>
            <el-space>
              <h4>{{ item[1] }}</h4>
              <p>考勤详情：{{ renderTime(item[0]) }}</p>
            </el-space>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </el-col>
    <!-- 详情内容布局 -->
    <el-col :span="12">
      <el-empty v-if="false" description="暂无异常考勤" />
      <el-timeline v-else>
        <el-timeline-item timestamp="事假" placement="top">
          <el-card>
            <h4>旷工</h4>
            <p class="apply-info">Tom committed 2018/4/12 20:46</p>
            <p class="apply-info">Tom committed 2018/4/12 20:46</p>
          </el-card>
        </el-timeline-item>

        <el-timeline-item timestamp="事假" placement="top">
          <el-card>
            <h4>旷工</h4>
            <p class="apply-info">Tom committed 2018/4/12 20:46</p>
            <p class="apply-info">Tom committed 2018/4/12 20:46</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { useSignsStore } from "@/stores/signs";
import { storeToRefs } from "pinia";
import { computed, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { toZero } from "@/utils/common";

const route = useRoute();
const router = useRouter();

const signsStore = useSignsStore();
const { signsInfos } = storeToRefs(signsStore);


const date = new Date();
const year = date.getFullYear();
const month = ref(Number(route.query.month) || date.getMonth() + 1);


const ret = ((signsInfos.value.detail as { [index: string]: unknown })[toZero(month.value)] as { [index: string]: unknown });
// console.log("ret", Object.entries(ret));
const detailMonth=computed(()=>Object.entries(ret).filter((v)=>v[1]!== '正常出勤').sort())

// console.log('detailMonth',detailMonth.value);

const renderTime=(date:string)=>{
  // console.log('date',date);
  const ret = ((signsInfos.value.time as { [index: string]: unknown })[toZero(month.value)] as {[index: string]: unknown;})[date];
  console.log('ret',ret);

  if(Array.isArray(ret)){
    return ret.join('-')
  }else{
    return '暂无打卡记录'
  }
}


watch(month, () => {
  router.push({
    query: { month: month.value },
  });
});

const handleToApple = () => {
  router.push("/apply");
};
</script>

<style scoped lang="scss">
.excption-title {
  margin: 20px;
  display: flex;
  justify-content: space-between;
}

.el-select {
  width: 80px;
}

.el-timeline {
  margin: 10px;
}

p {
  padding: 10px;
}
</style>
