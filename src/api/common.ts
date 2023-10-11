import axios from 'axios'

export interface UserInfoParams {
  results: number
}
// eslint-disable-next-line import/prefer-default-export
export function getUserInfo(
  params: UserInfoParams = {
    results: 10
  }
) {
  return axios.get('/', {
    params
  })
}
