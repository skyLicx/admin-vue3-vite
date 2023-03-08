import type { Router } from 'vue-router'
import { usePermissionStore } from '@/store'
import { isLogin } from '@/utils/auth'
import { DEFAULT_LAYOUT } from '../routes/base'
// vite要使用这种写法拼接路径
const routeAllPathToCompMap = import.meta.glob('/src/views/**/*.vue')

export default function setupServerPermissionGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    // 获取后端权限路由
    const permissionStore = usePermissionStore()
    // 已经登录并且还没有获取动态路由数据则重新获取
    if (isLogin() && !permissionStore.getRouters.length) {
      // 从服务端获取路由
      await permissionStore.getServerMenuConfig()
      // 处理数据 组成路由
      const filterASyncRoutes = (data) => {
        const routes = data.map((item) => {
          if (item.component === 'Layout') {
            item.component = DEFAULT_LAYOUT
          } else {
            item.component =
              routeAllPathToCompMap[`/src/views${item.component}.vue`]
          }
          if (item.children) {
            item.children = filterASyncRoutes(item.children)
          }
          return {
            ...item
          }
        })
        return routes
      }
      const routes: any = filterASyncRoutes(permissionStore.getRouters)
      // 添加路由
      routes.forEach((item) => {
        router.addRoute(item)
      })
      next({ ...to, replace: true })
    } else {
      next()
    }
  })
}
