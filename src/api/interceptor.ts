import axios, { InternalAxiosRequestConfig, AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'

export interface HttpResponse<T = unknown> {
  status: number
  msg: string
  code: number
  data: T
}

if (import.meta.env.VITE_API_BASE_URL) {
  axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL
}

axios.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 设置Content-Type
    if (config.contentType) {
      config.headers['Content-Type'] = config.contentType
    }
    config.headers.token = localStorage.getItem('token') || ''
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
axios.interceptors.response.use(
  (response: AxiosResponse<HttpResponse>) => {
    const res = response.data
    if (res.code !== 200) {
      ElMessage({
        message: res.msg || 'Error',
        type: 'error'
      })
      return Promise.reject(new Error(res.msg || 'Error'))
    }
    return res as any
  },
  (error) => {
    return Promise.reject(error)
  }
)
