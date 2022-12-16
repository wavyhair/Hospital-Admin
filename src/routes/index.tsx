/*
 * @Author: CHENJIE
 * @Date: 2022-10-20 15:41:55
 * @LastEditors: CHENJIE
 * @LastEditTime: 2022-12-16 22:29:00
 * @FilePath: \hrss-react-ts\src\routes\index.tsx
 * @Description: routes
 */
import { selectUser } from '@/store/festures/user-slice'
import { useSelector } from 'react-redux'
import { useRoutes } from 'react-router-dom'
import { filterRouter, SRoutes } from './filterRouter'

import { allAsyncRoutes, anyRoute } from './router'
let sideBarRoutes:SRoutes = []
export const UseAppRoutes = () => {
    const userRoutes = useSelector(selectUser)
    let resultRouter = [] as SRoutes
    if (userRoutes.routes?.length) {
        resultRouter = filterRouter(allAsyncRoutes, userRoutes.routes)
        sideBarRoutes = resultRouter
    }
    const routes = useRoutes([...resultRouter, ...anyRoute])
    return routes
}
// 找到要渲染成左侧菜单的路由
export const findSideBarRoutes = () => {
    const currentIndex = sideBarRoutes.findIndex((route) => route.path === "/syt");
    return sideBarRoutes[currentIndex].children as SRoutes;
};
