<script lang="tsx">
  import { defineComponent, ref, h, compile, watch, computed } from 'vue'
  import { useRouter, RouteRecordRaw } from 'vue-router'
  import { openWindow, regexUrl } from '@/utils'
  import useAppStore from '@/store/modules/app'
  import useMenuTree from './useMenuTree'

  export default defineComponent({
    emit: ['collapse'],
    setup() {
      const appStore = useAppStore()
      const router = useRouter()
      // 选中项
      const selectedKey = ref<string>('')
      // 路由菜单
      const { menuTree } = useMenuTree()

      // 路由跳转
      const goto = (item: RouteRecordRaw) => {
        // Open external link
        if (regexUrl.test(item.path)) {
          openWindow(item.path)
          selectedKey.value = item.name as string
          return
        }
        router.push({
          name: item.name
        })
      }
      // 侧边菜单栏折叠状态
      const collapsed = computed(() => appStore.getCollapsed)

      watch(
        () => router.currentRoute.value,
        (route) => {
          selectedKey.value = route.name as string
        },
        {
          immediate: true
        }
      )

      // 侧边栏render
      const renderSubMenu = () => {
        function travel(_route: RouteRecordRaw[], nodes = []) {
          if (_route) {
            _route.forEach((element) => {
              // 菜单图标
              const icon = element?.meta?.icon
                ? `<el-icon><${element?.meta?.icon} /></el-icon>`
                : ''
              const title = () =>
                h(
                  compile(
                    `
                        ${icon}
                        <span>${element?.meta?.locale || ''}</span>
                      `
                  )
                )
              // 有children渲染一级菜单 没有就渲染子菜单
              const node =
                element?.children && element?.children.length !== 0 ? (
                  <el-sub-menu
                    index={element?.name}
                    v-slots={{
                      title
                    }}
                  >
                    {travel(element?.children)}
                  </el-sub-menu>
                ) : (
                  <el-menu-item
                    index={element?.name}
                    v-slots={{
                      title: () => h(compile(element?.meta?.locale || ''))
                    }}
                    onClick={() => goto(element)}
                  >
                    {element?.meta?.icon ? (
                      <el-icon>
                        <setting />
                      </el-icon>
                    ) : (
                      ''
                    )}
                  </el-menu-item>
                )
              nodes.push(node as never)
            })
          }
          return nodes
        }
        return travel(menuTree.value)
      }
      return () => (
        <el-menu
          style="--el-menu-bg-color: #33363D;--el-menu-text-color: #C8C8C8;--el-menu-active-color: #fff;--el-menu-hover-bg-color: #3F4247;"
          default-active={selectedKey.value}
          collapse={collapsed.value}
        >
          {renderSubMenu()}
        </el-menu>
      )
    }
  })
</script>

<style lang="scss" scoped>
  .el-menu:not(.el-menu--collapse) {
    width: 200px;
  }
  .el-menu--vertical {
    .el-menu-item.is-active {
      background-color: #3f4247;
    }
  }
</style>
