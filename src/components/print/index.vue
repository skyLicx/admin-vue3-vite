<template>
  <div class="print-container">
    <div id="print-content" ref="printContent">
      <component
        :is="templateMap[templateChildName]"
        v-if="templateName"
        :print-data="printData"
      ></component>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, toRefs, computed, reactive, nextTick } from 'vue'
  import { usePrintStore } from '@/store'
  import printJS from 'print-js'
  import baseTemplate1 from './baseTemplate/baseTemplate1.vue'
  import baseTemplate2 from './baseTemplate/baseTemplate2.vue'
  import wechatTemplate1 from './wechatTemplate/wechatTemplate1.vue'
  import wechatTemplate2 from './wechatTemplate/wechatTemplate2.vue'

  const printStore = usePrintStore()

  const props = defineProps({
    printData: {
      type: Object,
      default: () => {
        return {}
      }
    }
  })

  const { printData } = toRefs(props)

  const templateName = ref('')
  const templateSelected = reactive(printStore.templateSelected)
  // 模板子名称
  const templateChildName = computed(() => {
    return templateSelected[templateName.value]
  })

  const templateMap = {
    baseTemplate1,
    baseTemplate2,
    wechatTemplate1,
    wechatTemplate2
  }

  const printContent = ref(null)
  // 打印按钮
  const onPrint = async (name) => {
    templateName.value = name
    console.log(templateName.value, 'templateName.value')
    if (!templateName.value) {
      console.log('未选择模板')
      return
    }
    await nextTick()
    // 获取元素
    const node = printContent.value
    printJS({
      printable: node,
      type: 'html',
      targetStyles: ['*'] // 添加样式
    })
  }

  defineExpose({
    onPrint
  })
</script>

<style lang="scss" scoped>
  .print-container {
    display: none;
  }
</style>
