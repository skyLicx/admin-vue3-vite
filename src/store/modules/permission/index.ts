import { getMenuList } from '@/api/serveMenu'
import { defineStore } from 'pinia'
import { PermissionState } from './types'

const usePermissionStore = defineStore({
  id: 'permission',
  state: (): PermissionState => ({
    // 后端返回的权限菜单
    serverMenu: []
  }),
  getters: {
    getRouters(): any[] {
      return this.serverMenu
    }
  },
  actions: {
    // 获取后端返回的权限菜单
    async getServerMenuConfig() {
      try {
        const { data } = await getMenuList()
        this.serverMenu = data.menuList
        return Promise.resolve(data)
      } catch (error) {
        return Promise.reject(error)
      }
    },
    clearServerMenu() {
      this.serverMenu = []
    }
  }
})

export default usePermissionStore
