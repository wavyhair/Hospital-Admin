/*
 * @Author: CHENJIE
 * @Date: 2022-10-21 10:14:32
 * @LastEditors: CHENJIE
 * @LastEditTime: 2022-10-21 10:25:03
 * @FilePath: \hrss-react-ts\src\types\index.d.ts
 * @Description: index.d.ts
 */
interface ApiResponse<T> {
    code: number
    data: T
    message: string
    success: boolean
}
