<template>
  <router-view />
</template>

<script setup lang="ts">
  import { getMenuList } from '@/api/serveMenu'

  const getMenu = async () => {
    try {
      const res = await getMenuList()
      console.log(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  getMenu()
</script>

<style scoped></style>
