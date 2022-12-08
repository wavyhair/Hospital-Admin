/*
 * @Author: chenjie
 * @Date: 2022-06-17 22:01:05
 * @LastEditors: CHENJIE
 * @LastEditTime: 2022-12-08 17:23:18
 * @FilePath: \hrss-react-ts\src\utils\request.ts
 * @Description:
 */
import axios from 'axios'
import store from '@/store'
import { customHistory } from '@/utils/history'
import { message } from 'antd'
const baseURL = process.env.REACT_APP_API
const request = axios.create({
  baseURL,
  timeout: 5000,
})
// 请求拦截器
request.interceptors.request.use(
  (config) => {
    const { user: { token } } = store.getState()
    token && (config.headers!.token = token)
    return config
  },
  (e) => {
    return Promise.reject(e)
  }
)
// 响应拦截器
request.interceptors.response.use(
  (res) => {
    return res.data
  },
  (e) => {
    if (!e.response) {
      // 网络超时
      message.info('网络繁忙，请稍后再试')
    }
    if (e.response.status === 401) {
      message.info('登录失效')
      customHistory.push(
        '/login',
        { from: customHistory.location.pathname }
      )
    }
    return Promise.reject(e)
  }
)
export default request
