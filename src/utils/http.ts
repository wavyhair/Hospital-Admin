/*
 * @Author: chenjie
 * @Date: 2022-06-17 22:01:05
 * @LastEditors: CHENJIE
 * @LastEditTime: 2022-10-20 16:54:23
 * @FilePath: \hrss-react-ts\src\utils\http.ts
 * @Description:
 * Copyright (c) 2022 by chenjie, All Rights Reserved.
 */
import axios from 'axios'
import store from '@/store'
import { customHistory } from '@/utils/history'
import { message } from 'antd'
const baseURL = process.env.REACT_APP_URL
const http = axios.create({
  baseURL,
  timeout: 5000,
})
// 请求拦截器
http.interceptors.request.use(
  (config) => {
    const { login: { token } } = store.getState()
    token && (config.headers!.Authorization = `Bearer ${token}`)
    return config
  },
  (e) => {
    Promise.reject(e)
  }
)
// 响应拦截器
http.interceptors.response.use(
  (res) => {
    return res
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
export default http 
