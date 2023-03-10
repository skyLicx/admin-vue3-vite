import { MockParams } from '@/types/mock'
import Mock from 'mockjs'
import setupMock, { successResponseWrap } from '@/utils/setup-mock'

const { Random } = Mock
const data = Mock.mock({
  'list|55': [
    {
      'id|8': /[A-Z][a-z][-][0-9]/,
      'number|2-3': /[0-9]/,
      'name|4-8': /[A-Z]/,
      'contentType|1': ['img', 'horizontalVideo', 'verticalVideo'],
      'count|2-3': /[0-9]/,
      'status|1': ['online', 'offline'],
      'filterType|1': ['artificial', 'rules'],
      'createdTime': Random.datetime()
    }
  ]
})

setupMock({
  setup() {
    // 登录
    Mock.mock(new RegExp('/mock/list/policy'), 'post', (params: MockParams) => {
      const { current = 1, pageSize = 10 } = JSON.parse(params.body)
      const p = current as number
      const ps = pageSize as number
      return successResponseWrap({
        list: data.list.slice((p - 1) * ps, p * ps),
        total: 55
      })
    })
  }
})
