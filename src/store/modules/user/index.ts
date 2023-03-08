import { defineStore } from 'pinia'
import { login as userLogin, logout as userLogout, LoginData } from '@/api/user'
import { clearToken, setToken } from '@/utils/auth'
import usePermissionStore from '../permission'

const useUserStore = defineStore('user', {
  actions: {
    // 登录
    async login(loginForm: LoginData) {
      try {
        const res = await userLogin(loginForm)
        setToken(res.data.token)
      } catch (err) {
        clearToken()
        throw err
      }
    },
    logoutCallBack() {
      const permissionStore = usePermissionStore()
      clearToken()
      permissionStore.clearServerMenu()
    },
    // 退出登录
    async logout() {
      try {
        await userLogout()
      } finally {
        this.logoutCallBack()
      }
    }
  }
})

export default useUserStore
