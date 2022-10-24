/*
 * @Author: CHENJIE
 * @Date: 2022-10-20 15:41:55
 * @LastEditors: CHENJIE
 * @LastEditTime: 2022-10-20 15:56:29
 * @FilePath: \hrss-react-ts\src\routes\inedx.tsx
 * @Description: routes
 */

import Login from '@/pages/Login'
import Layout from '@/pages/Layout'
import { useRoutes, Navigate } from "react-router-dom"
export const asyncRouter = [
    
]
export const rootRouter = [
    {
        path: "/",
        element: <Navigate to="/login" />
    },
    {
        path: "/Dashboard",
        element: <Layout />,
    },
    {
        path: "/login",
        element: <Login />,
    }
];


const Router = () => {
    const routes = useRoutes(rootRouter)
    return routes
}
export default Router;
