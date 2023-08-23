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
        <el-input v-model="ruleForm.pass" type="text" aria-placeholder="请输入密码" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)">Submit</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import type { FormRules, FormInstance } from "element-plus";
import { reactive, ref } from "vue";

interface User {
  email: string;
  pass: string;
}

const ruleFormRef = ref<FormInstance>();

const ruleForm = reactive<User>({
  email: "",
  pass: "",
});

const rules = reactive<FormRules<typeof ruleForm>>({});

  const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!')
      return false
    }
  })
}
</script>

<style scoped lang="scss">
@import "./Login.module.scss";
</style>
