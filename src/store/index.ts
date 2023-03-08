import { createPinia } from 'pinia'
import useAppStore from './modules/app'
import usePermissionStore from './modules/permission'
import useTabBarStore from './modules/tab-bar'
import useUserStore from './modules/user'

const pinia = createPinia()
export { useAppStore, usePermissionStore, useTabBarStore, useUserStore }
export default pinia
