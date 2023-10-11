<template>
  <div>
    <div v-loading="loading">loading...</div>
    <el-button type="primary" @click="fetchList">获取列表</el-button>
    <el-button type="primary" @click="fetchUserInfo">获取用户信息</el-button>
  </div>
</template>

<script lang="ts" setup>
  import useLoading from '@/hooks/loading'
  import { getPicList } from '@/api/systemData'
  import { getUserInfo } from '@/api/common'

  const { loading, setLoading } = useLoading(false)
  const fetchList = async () => {
    setLoading(true)
    try {
      await getPicList()
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }
  const fetchUserInfo = async () => {
    setLoading(true)
    try {
      await getUserInfo()
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }
</script>
