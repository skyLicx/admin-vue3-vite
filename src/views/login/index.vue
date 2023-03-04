<template>
  <el-button type="primary" @click="login">login</el-button>
</template>

<script lang="ts" setup>
  import { useRouter } from 'vue-router'

  const router = useRouter()
  const login = async () => {
    // 获取权限路由
    try {
      localStorage.setItem('token', '1')
      router.push({
        path: '/systemData/baseData'
      })
    } catch (error) {
      console.log(error)
    }
  }
</script>
