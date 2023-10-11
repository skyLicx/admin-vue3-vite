import axios from 'axios'

export interface PolicyRecord {
  id: string
  number: number
  name: string
  contentType: 'img' | 'horizontalVideo' | 'verticalVideo'
  filterType: 'artificial' | 'rules'
  count: number
  status: 'online' | 'offline'
  createdTime: string
}

export interface PolicyParams extends Partial<PolicyRecord> {
  current: number
  pageSize: number
}

export interface PolicyListRes {
  list: PolicyRecord[]
  total: number
}

export function queryPolicyList(data: PolicyParams) {
  return axios.post<PolicyListRes>('/mock/list/policy', data)
}

export function getPicList() {
  return axios.get('/breeds/list/all')
}
