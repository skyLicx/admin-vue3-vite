<template>
  <div v-loading="loading">
    <el-button type="primary" @click="fetchData">获取列表</el-button>
  </div>
</template>

<script lang="ts" setup>
  import useLoading from '@/hooks/loading'
  import { getPicList } from '@/api/systemData'

  const { loading, setLoading } = useLoading(false)
  const fetchData = async () => {
    setLoading(true)
    try {
      await getPicList()
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }
</script>
