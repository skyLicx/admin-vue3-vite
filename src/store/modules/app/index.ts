import { defineStore } from 'pinia'
import { AppState } from './types'

const useAppStore = defineStore('app', {
  state: (): AppState => ({
    // 侧边菜单栏展开状态
    collapsed: false,
    // 展示路由
    routerAlive: true
  }),
  getters: {
    // 获取侧边菜单栏展开状态
    getCollapsed: (state) => {
      return state.collapsed
    },
    getRouterAlive: (state) => {
      return state.routerAlive
    }
  },
  actions: {
    // 修改侧边栏展开状态
    toggleCollapsed(val: boolean) {
      this.collapsed = val
    },
    changeRouterAlive(val: boolean) {
      this.routerAlive = val
    }
  }
})

export default useAppStore
