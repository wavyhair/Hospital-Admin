/*
 * @Author: CHENJIE
 * @Date: 2022-10-20 15:41:55
 * @LastEditors: CHENJIE
 * @LastEditTime: 2022-12-08 22:01:35
 * @FilePath: \hrss-react-ts\src\routes\index.tsx
 * @Description: routes
 */
import { selectUser } from '@/store/festures/user-slice'
import { useSelector } from 'react-redux'
import { useRoutes } from 'react-router-dom'
import { allAsyncRoutes, anyRoute, constantRoutes } from './router'
export const UseAppRoutes = () => {
    const routes1 = useSelector(selectUser)
    console.log('routes1', routes1)
    if(routes1.routes?.length){
        
    }
    const routes = useRoutes([...constantRoutes, ...anyRoute])
    return routes
}