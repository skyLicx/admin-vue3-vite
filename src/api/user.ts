import axios from 'axios'

export interface LoginData {
  username: string
  password: string
}

export interface LoginRes {
  token: string
}

// export function login(data: LoginData) {
//   return axios.post<LoginRes>('/mock/user/login', data)
// }
// export function login(data: LoginData) {
//   return axios.post<LoginRes>('/mock/user/login', data)
// }

export function login() {
  return axios.get('/list/all')
}

export function logout() {
  return axios.post<LoginRes>('/mock/user/logout')
}
