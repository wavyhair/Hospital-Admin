/*
 * @Author: CHENJIE
 * @Date: 2022-10-20 20:34:56
 * @LastEditors: CHENJIE
 * @LastEditTime: 2022-10-23 11:43:35
 * @FilePath: \hrss-react-ts\src\types\user.d.ts
 * @Description: user
 */
import type {ApiResponse} from './index'

export  interface LoginData {
    mobile:string;
    password:string
}
export type LoginRes = ApiResponse<string>
