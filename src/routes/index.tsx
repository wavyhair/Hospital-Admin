/*
 * @Author: CHENJIE
 * @Date: 2022-10-20 15:41:55
 * @LastEditors: CHENJIE
 * @LastEditTime: 2022-12-08 14:47:09
 * @FilePath: \hrss-react-ts\src\routes\index.tsx
 * @Description: routes
 */
import { Navigate, useRoutes } from 'react-router-dom'
import { allAsyncRoutes, anyRoute, constantRoutes } from './router'
export const UseAppRoutes = () => {
    const routes = useRoutes([...constantRoutes, ...anyRoute])
    return routes
}