import { DEFAULT_LAYOUT } from '../base'
import { AppRouteRecordRaw } from '../types'

const TESTPAGE: AppRouteRecordRaw = {
  path: '/example',
  name: 'Example',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: '功能例子',
    icon: 'List'
  },
  children: [
    {
      path: 'directives',
      name: 'Directives',
      component: () => import('@/views/example/directives/index.vue'),
      meta: {
        locale: '自定义指令'
      }
    }
  ]
}

export default TESTPAGE
