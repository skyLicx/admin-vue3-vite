<template>
  <div class="navbar">
    <div class="collapsed">
      <el-icon v-if="collapsed" @click="onExpand"><Expand /></el-icon>
      <el-icon v-else @click="onFold"><Fold /></el-icon>
    </div>
    <ul class="tool">
      <li>
        <el-tooltip effect="dark" content="刷新" placement="bottom">
          <el-icon class="refresh" @click="onRefresh">
            <Refresh />
          </el-icon>
        </el-tooltip>
      </li>
      <li>
        <el-tooltip :content="$t('language')">
          <!-- <el-button circle @click="setDropDownVisible">
            {{ $t('language') }}
          </el-button> -->
          <img
            class="icon-language"
            src="@/assets/svg/icon-language.svg"
            alt=""
            @click="setDropDownVisible"
          />
        </el-tooltip>
        <el-dropdown trigger="click" @command="changeLocale">
          <div ref="triggerBtn" class="trigger-btn"></div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item
                v-for="item in locales"
                :key="item.value"
                :command="item.value"
              >
                {{ item.label }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </li>
      <li>
        <el-tooltip effect="dark" content="退出" placement="bottom">
          <img
            class="icon-logout"
            src="@/assets/images/logout.png"
            alt=""
            @click="logout"
          />
        </el-tooltip>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
  import router from '@/router'
  import { useAppStore, useUserStore } from '@/store'
  import { computed, nextTick, ref } from 'vue'
  import { LOCALE_OPTIONS } from '@/locale'
  import useLocale from '@/hooks/locale'

  const appStore = useAppStore()
  const userStore = useUserStore()
  const locales = [...LOCALE_OPTIONS]
  const { changeLocale } = useLocale()

  const collapsed = computed(() => appStore.getCollapsed)
  // 折叠侧边栏
  const onFold = () => {
    appStore.toggleCollapsed(true)
  }
  // 展开侧边栏
  const onExpand = () => {
    appStore.toggleCollapsed(false)
  }
  // 刷新当前页
  const onRefresh = () => {
    appStore.changeRouterAlive(false)
    nextTick(() => {
      appStore.changeRouterAlive(true)
    })
  }

  const triggerBtn = ref()
  const setDropDownVisible = () => {
    const event = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true
    })
    triggerBtn.value.dispatchEvent(event)
  }
  // 退出
  const logout = async () => {
    await userStore.logout()
    router.push({ name: 'login' })
  }
</script>

<style lang="scss" scoped>
  .navbar {
    height: 40px;
    display: flex;
    align-items: center;
    padding: 0 20px;
  }
  .el-icon {
    cursor: pointer;
  }
  .tool {
    display: flex;
    align-items: center;
    margin-left: auto;
    li {
      display: flex;
      align-items: center;
      padding: 0 10px;
    }
  }
  .icon-language {
    width: 16px;
  }
  .icon-logout {
    width: 16px;
  }
  .trigger-btn {
    margin-left: -10px;
  }

  @keyframes load {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
