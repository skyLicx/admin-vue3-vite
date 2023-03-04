<script lang="tsx">
  import { defineComponent, ref, h, compile, watch } from 'vue'
  import { useRouter, RouteRecordRaw } from 'vue-router'
  import { openWindow, regexUrl } from '@/utils'
  import useMenuTree from './useMenuTree'

  export default defineComponent({
    emit: ['collapse'],
    setup() {
      const router = useRouter()
      // const collapsed = ref(true)
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
                    v-slots={{ title }}
                    onClick={() => goto(element)}
                  ></el-menu-item>
                )
              nodes.push(node as never)
            })
          }
          return nodes
        }
        return travel(menuTree.value)
      }
      return () => (
        <el-menu style="height: 100%" default-active={selectedKey.value}>
          {renderSubMenu()}
        </el-menu>
      )
    }
  })
</script>
