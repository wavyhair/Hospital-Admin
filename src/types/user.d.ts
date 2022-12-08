/*
 * @Author: CHENJIE
 * @Date: 2022-10-20 20:34:56
 * @LastEditors: CHENJIE
 * @LastEditTime: 2022-12-08 15:48:58
 * @FilePath: \hrss-react-ts\src\types\user.d.ts
 * @Description: user
 */
import type { ApiResponse } from './index'

export interface LoginData {
    username: string;
    password: string
}
export type ReqGetUserInfoResponse = ApiResponse<{
    name: string;
    avatar: string;
    routes?: string[];
    buttons?: string[];
}>
export type LoginRes = ApiResponse<string>
