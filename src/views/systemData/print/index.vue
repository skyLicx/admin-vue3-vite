<template>
  <div>
    <el-button @click="onPrint('baseTemplate')">打印基础数据</el-button>
    <el-button @click="onPrint('wechatTemplate')">打印微信数据</el-button>
    <div class="template-content">
      <div
        v-for="template of Object.values(printTemplate)"
        :key="template.label"
        class="template-item"
      >
        <p class="label">{{ template.label }}</p>
        <el-select v-model="template.temp" placeholder="Select" size="large">
          <el-option
            v-for="item in template.options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
    </div>
    <el-button @click="onSave">保存</el-button>
    <print ref="printRef" :print-data="printData" />
  </div>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue'
  import print from '@/components/print/index.vue'
  import { usePrintStore } from '@/store'

  const printStore = usePrintStore()

  // 选则的模板名称
  const templateSelected = reactive(printStore.templateSelected)
  // 打印模板
  const printTemplate = reactive(printStore.printTemplate)
  const resetPrint = () => {
    Object.keys(printTemplate).forEach((item) => {
      printTemplate[item].temp =
        templateSelected[item] || printTemplate[item].options[0].value
    })
  }
  resetPrint()
  // 打印
  const printRef = ref<any>()
  // 打印数据
  const printData = reactive({
    name: 'base'
  })
  const onPrint = (templateName) => {
    printRef.value.onPrint(templateName)
  }

  // 保存
  const onSave = () => {
    Object.keys(printTemplate).forEach((item) => {
      templateSelected[item] = printTemplate[item].temp
    })
    localStorage.setItem('templateSelected', JSON.stringify(templateSelected))
  }
</script>

<style lang="scss" scoped>
  .template-item {
    display: flex;
    align-items: center;
    padding: 10px;
    .label {
      margin-right: 10px;
    }
  }
</style>
