import { DEFAULT_LAYOUT } from '../base'
import { AppRouteRecordRaw } from '../types'

const APIPAGE: AppRouteRecordRaw = {
  path: '/apitest',
  name: 'apitest',
  redirect: '/apitest/index',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'apitest',
    icon: 'List',
    hideChildrenInMenu: true
  },
  children: [
    {
      path: 'index',
      name: 'index',
      component: () => import('@/views/apiTest/index.vue'),
      meta: {
        locale: 'api测试'
      }
    }
  ]
}

export default APIPAGE
