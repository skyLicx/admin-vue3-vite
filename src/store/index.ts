import { createPinia } from 'pinia'
import useAppStore from './modules/app'
import usePermissionStore from './modules/permission'
import useTabBarStore from './modules/tab-bar'
import useUserStore from './modules/user'
import usePrintStore from './modules/print'

const pinia = createPinia()
export {
  useAppStore,
  usePermissionStore,
  useTabBarStore,
  useUserStore,
  usePrintStore
}
export default pinia
