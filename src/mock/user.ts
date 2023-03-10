import { MockParams } from '@/types/mock'
import Mock from 'mockjs'
import setupMock, {
  successResponseWrap,
  failResponseWrap
} from '@/utils/setup-mock'

setupMock({
  setup() {
    // 登录
    Mock.mock(new RegExp('/mock/user/login'), 'post', (params: MockParams) => {
      const { username, password } = JSON.parse(params.body)
      if (!username) {
        return failResponseWrap(null, '用户名不能为空', 500)
      }
      if (!password) {
        return failResponseWrap(null, '密码不能为空', 500)
      }
      if (username === 'admin' && password === 'admin') {
        return successResponseWrap({
          token: '12345'
        })
      }
      return failResponseWrap(null, '账号或者密码错误', 500)
    })

    // 登出
    Mock.mock(new RegExp('/mock/user/logout'), () => {
      return successResponseWrap(null)
    })

    // 动态路由
    Mock.mock(new RegExp('/mock/user/menu'), 'post', () => {
      const menuList = [
        {
          path: '/systemData',
          name: 'SystemData',
          component: 'Layout',
          meta: {
            locale: '系统数据',
            icon: 'House'
          },
          children: [
            {
              path: '/systemData/baseData',
              name: 'BaseData',
              component: '/systemData/baseData/index',
              meta: {
                locale: '基础数据'
              }
            },
            {
              path: '/systemData/template',
              name: 'Template',
              component: '/systemData/template/index',
              meta: {
                locale: '项目模板'
              }
            },
            {
              path: '/systemData/categorize',
              name: 'Categorize',
              component: '/systemData/categorize/index',
              meta: {
                locale: '模板分类',
                // 不缓存路由
                ignoreCache: true
              }
            }
          ]
        },
        {
          path: '/wechatApp',
          name: 'wechatApp',
          component: 'Layout',
          meta: {
            locale: '小程序',
            icon: 'House'
            // isAlwaysShow: true
          },
          children: [
            {
              path: '/wechatApp/publishPost',
              name: 'publishPost',
              component: '/wechatApp/publishPost/index',
              meta: {
                locale: '发布帖子'
              }
            }
          ]
        }
      ]
      return successResponseWrap({
        menuList
      })
    })
  }
})
