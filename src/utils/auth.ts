/*
 * @Author: chenjie
 * @Date: 2022-06-08 20:27:35
 * @LastEditors: CHENJIE
 * @LastEditTime: 2022-10-20 16:41:59
 * @FilePath: \hrss-react-ts\utils\auth.ts
 * @Description: auth
 * Copyright (c) 2022 by chenjie, All Rights Reserved.
 */

import Cookies from 'js-cookie'
const TokenKey = 'hr-saas-token'

const timeKey = 'hr-sass-time-key' // 用来作为时间戳存储的key

export function getToken() {
    return Cookies.get(TokenKey)
}

export function setToken(token:string) {
    return Cookies.set(TokenKey, token)
}

export function removeToken() {
    return Cookies.remove(TokenKey)
}

export function setTimeStamp() {
    // 设置当前最新的时间戳
    // Date.now()  new Date.getTime()
    Cookies.set(timeKey, Date.now()+'')
}

export function getTimeStamp() {
    return Cookies.get(timeKey)
}

