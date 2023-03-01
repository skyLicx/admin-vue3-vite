// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as axios from 'axios'

declare module 'axios' {
  // 请求参数
  export interface AxiosRequestConfig {
    // 设置Content-Type
    contentType?: string
  }
}
