<template>
  <div>basedata-index1-print</div>
  <div>{{ printData.name }}</div>
</template>

<script lang="ts" setup>
  import { toRefs } from 'vue'

  const props = defineProps({
    printData: {
      type: Object,
      default: () => {
        return {}
      }
    }
  })
  const { printData } = toRefs(props)
</script>
