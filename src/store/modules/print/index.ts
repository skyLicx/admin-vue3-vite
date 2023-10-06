import { defineStore } from 'pinia'
import { PrintState } from './types'

const usePrintStore = defineStore({
  id: 'print',
  state: (): PrintState => ({
    // 选中的模板名称
    templateSelected: JSON.parse(
      localStorage.getItem('templateSelected') || '{}'
    ),
    // 打印模板
    printTemplate: {
      baseTemplate: {
        label: '基础数据',
        temp: '',
        options: [
          {
            label: '默认样式1',
            value: 'baseTemplate1'
          },
          {
            label: '默认样式2',
            value: 'baseTemplate2'
          }
        ]
      },
      wechatTemplate: {
        label: '微信数据',
        temp: '',
        options: [
          {
            label: '默认样式1',
            value: 'wechatTemplate1'
          },
          {
            label: '默认样式2',
            value: 'wechatTemplate2'
          }
        ]
      }
    }
  }),
  getters: {},
  actions: {}
})

export default usePrintStore
