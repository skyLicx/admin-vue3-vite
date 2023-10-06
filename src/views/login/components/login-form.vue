<template>
  <div class="login-form-wrapper">
    <el-form
      ref="formRef"
      class="login-form"
      :model="form"
      :rules="rules"
      label-width="80px"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="form.password"
          type="password"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="loading" @click="login(formRef)">
          login
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
  import { LoginData } from '@/api/user'
  import { useUserStore } from '@/store'
  import type { FormInstance, FormRules } from 'element-plus'
  import { reactive, ref } from 'vue'
  import { ElMessage } from 'element-plus'
  import { useRouter } from 'vue-router'
  import useLoading from '@/hooks/loading'

  const router = useRouter()
  const userStore = useUserStore()
  const { loading, setLoading } = useLoading()

  const formRef = ref<FormInstance>()
  const form = reactive({
    username: 'admin',
    password: 'admin'
  })

  const rules = reactive<FormRules>({
    username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
  })

  const login = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate(async (valid, fields) => {
      if (valid) {
        setLoading(true)
        try {
          await userStore.login(form as LoginData)
          router.push({
            path: '/systemData/baseData'
          })
        } catch (error) {
          setLoading(false)
          ElMessage.error((error as Error).message)
        }
      } else {
        console.log('error submit!', fields)
      }
    })
  }
</script>

<style lang="scss" scoped>
  .login-form-wrapper {
    width: 320px;
    padding: 20px;
    margin: 50px auto;
    border: 1px solid #c4dcff;
    border-radius: 15px;
  }
</style>
