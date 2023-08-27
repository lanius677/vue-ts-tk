<template>
  <div class="login">
    <!-- 头部区域  -->
    <div class="header">
      <span class="header-logo">
        <i class="iconfont icon-vue"></i>
        <i class="iconfont icon-icon-test"></i>
        <i class="iconfont icon-typescript"></i>
      </span>
      <span class="">在线考勤系统</span>
    </div>
    <div class="desc">Vue3+TypeScript</div>

    <!-- 内容区域 -->
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="120px"
      class="main"
    >
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="ruleForm.email" type="text" aria-placeholder="请输入邮箱" />
      </el-form-item>

      <el-form-item label="密码" prop="pass">
        <el-input v-model="ruleForm.pass" type="password" aria-placeholder="请输入密码" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)">Submit</el-button>
      </el-form-item>
    </el-form>

    <!-- 测试账号区域  -->
    <div class="users">
      <el-row>
        <div class="test-user">
          <el-col v-for="item in testUser" :key="item.email">
            <h3>测试账号:</h3>
            <p>邮箱:{{ item.email }}</p>
            <p>密码:{{ item.pass }}</p>
            <el-button @click="autoLogin({email:item.email,pass:item.pass})">一键登录</el-button>
          </el-col>
        </div>
      </el-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FormRules, FormInstance } from "element-plus";
import { reactive, ref } from "vue";
import {ElMessage} from 'element-plus';
import {useUsersStore} from '@/stores/users';
import {useRouter} from 'vue-router';

interface User {
  email: string;
  pass: string;
}

const ruleFormRef = ref<FormInstance>();

const ruleForm = reactive<User>({
  email: "",
  pass: "",
});

const rules = reactive<FormRules<typeof ruleForm>>({
  email: [
    {
      required: true,
      message: "请输入邮箱",
      trigger: "blur",
    },
    {
      type: "email",
      message: "请输入正确的邮箱地址",
      trigger: ["blur", "change"],
    },
  ],

  pass: [
    {
      required: true,
      message: "请输入密码",
      trigger: "blur",
    },
  ],
});

const usersStore=useUsersStore()
const router=useRouter()

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      usersStore.loginAction(ruleForm).then((res)=>{
        if(res.data.errcode===0){
          usersStore.updateToToken(res.data.token)
          ElMessage.success('登录成功')
          router.push('/')
        }else{
          ElMessage.error('登录失败')
        }
      })

    } else {
      return false;
    }
  });
};

const testUser:User[]=[
  {
    email:'Test@vuetk.com',
    pass:'123456'
  },
  {
    email:'Adminer@vuetk.com',
    pass:'123456'
  }
]

// 自动登录操作
const autoLogin=(user:User)=>{
    ruleForm.email=user.email
    ruleForm.pass=user.pass
    submitForm(ruleFormRef.value)
}


</script>

<style scoped lang="scss">
@import "./Login.module.scss";
</style>
