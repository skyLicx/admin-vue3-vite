<template>
  <div class="tab-bar">
    <el-scrollbar ref="scrollbarRef" @scroll="scroll">
      <div ref="tagsWrapRef" class="tags-wrap">
        <div
          v-for="(tag, index) in tagList"
          :key="tag.fullPath"
          class="tag"
          :class="{ 'is-activated': tag.fullPath === $route.fullPath }"
          @click="goto(tag)"
        >
          <span class="tag-link">
            {{ tag.title }}
          </span>
          <el-icon @click.stop="tagClose(tag, index)"><Close /></el-icon>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
  import { useTabBarStore } from '@/store'
  import { useRouter } from 'vue-router'
  import { computed, ref, watch, nextTick } from 'vue'
  import type { TagProps } from '@/store/modules/tab-bar/types'
  import { ElScrollbar } from 'element-plus'

  const scrollbarRef = ref<InstanceType<typeof ElScrollbar>>()
  const scrollX = ref(0)
  const scroll = ({ scrollLeft }) => {
    scrollX.value = scrollLeft
  }

  // 滚动定位
  const tagsWrapRef = ref<HTMLDivElement>()
  const scrollToActive = () => {
    nextTick(() => {
      const clientWidth = tagsWrapRef.value?.clientWidth
      const scrollWidth = tagsWrapRef.value?.scrollWidth
      if (clientWidth && scrollWidth) {
        const wrapRef = scrollbarRef.value?.wrapRef
        // 获取选中标签DOM
        const active = wrapRef?.querySelector('.is-activated')
        // 选中标签距离窗口左侧距离
        const activeLeft = active?.getBoundingClientRect().left
        // 标签容器距离窗口左侧距离
        const tagsWrapRefLeft = tagsWrapRef.value?.getBoundingClientRect().left
        const left = (activeLeft as any) - (tagsWrapRefLeft as any)
        // 滚动条距离容器左侧距离
        let scrollLeft = scrollX.value
        // 滚动条需要变换的长度
        let progress = Math.abs(scrollLeft - left)
        const step = Math.ceil(progress / 10)
        if (scrollLeft <= left) {
          progress -= 50
          const loop = () => {
            setTimeout(() => {
              if (progress > step) {
                progress -= step
                scrollLeft += step
                scrollbarRef.value?.setScrollLeft(scrollLeft)
                loop()
              } else {
                scrollLeft += progress
                scrollbarRef.value?.setScrollLeft(scrollLeft)
                progress = 0
              }
            }, step)
          }
          loop()
        } else {
          progress += 50
          const loop = () => {
            setTimeout(() => {
              if (progress > step) {
                progress -= step
                scrollLeft -= step
                scrollbarRef.value?.setScrollLeft(scrollLeft)
                loop()
              } else {
                scrollLeft -= progress
                scrollbarRef.value?.setScrollLeft(scrollLeft)
                progress = 0
              }
            }, step)
          }
          loop()
        }
      }
    })
  }

  const tabBarStore = useTabBarStore()
  const tagList = computed(() => {
    return tabBarStore.getTabList
  })
  const router = useRouter()
  // 当前路由的name
  const currentRouteName = ref('')
  watch(
    // 监听当前路由
    () => router.currentRoute.value,
    (route) => {
      currentRouteName.value = route.name as string
      // 过滤重复标签
      if (
        !route.meta?.noAffix &&
        !tagList.value.some((tag) => tag.fullPath === route.fullPath)
      ) {
        // 更新标签栏 插入新的标签
        tabBarStore.updateTabList(route)
        // scrollbarRef.value?.setScrollLeft(tagList.value.length * 80)
      }
      scrollToActive()
    },
    {
      immediate: true
    }
  )

  // 路由跳转
  const goto = (tag: TagProps) => {
    router.push({ ...tag })
  }

  // 关闭标签
  const tagClose = (tag: TagProps, idx: number) => {
    tabBarStore.deleteTag(idx, tag)
    // 判断删除的是否是当前选中项
    const active = tabBarStore.tagList.find(
      (e) => e.name === currentRouteName.value
    )
    // 如果找不到active则说明删除的是当前项 则路由跳转到最后一个标签
    if (!active) {
      const latest = tagList.value[tagList.value.length - 1]
      router.push({ name: latest.name })
    }
  }
</script>

<style lang="scss" scoped>
  .tab-bar {
    height: 60px;
  }
  .tags-wrap {
    display: flex;
    align-items: center;
    height: 60px;
  }
  .tag {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 5px;
    min-width: 80px;
    height: 32px;
    margin: 5px;
    text-align: center;
    border-radius: 4px;
    background: #fff;
    border: 1px solid #ccc;
    font-size: 13px;
  }

  .is-activated {
    color: #fff;
    background-color: #a1b3ea;
    border: 1px solid #a1b3ea;
  }
</style>
