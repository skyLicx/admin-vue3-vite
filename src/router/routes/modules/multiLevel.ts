import { DEFAULT_LAYOUT } from '../base'
import { AppRouteRecordRaw } from '../types'

const MULTILEVEL: AppRouteRecordRaw = {
  path: '/level1',
  name: 'level1',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'level1',
    isAlwaysShow: true,
    icon: 'List'
  },
  children: [
    {
      path: 'level2',
      name: 'level2',
      component: () => import('@/views/multiLevel/index.vue'),
      meta: {
        locale: 'level2'
      },
      children: [
        {
          path: 'level3-1',
          name: 'level3-1',
          component: () => import('@/views/multiLevel/index2.vue'),
          meta: {
            locale: 'level3-1'
          }
        }
      ]
    }
  ]
}

export default MULTILEVEL
