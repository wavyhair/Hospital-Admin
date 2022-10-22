/*
 * @Author: CHENJIE
 * @Date: 2022-10-20 15:41:55
 * @LastEditors: CHENJIE
 * @LastEditTime: 2022-10-22 21:39:43
 * @FilePath: \hrss-react-ts\src\routes\inedx.tsx
 * @Description: routes
 */

import Login from '@/pages/Login'
import Layout from '@/pages/Layout'
import Dashboard from '@/pages/Dashboard'
import Setting from '@/pages/Setting'
import Employees from '@/pages/Employees'

import { useRoutes, Navigate } from "react-router-dom"
export const rootRouter = [
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/",
        element: <Navigate to="/home/dashboard" />,
    },
    {
        path: "/home",
        element: <Layout />,
        children: [
            {
                path: '/home/dashboard',
                element: <Dashboard />
            },
            {
                path: '/home/setting',
                element: <Setting />
            },
            {
                path: '/home/employees',
                element: <Employees />
            },
        ]
    },

];


const Router = () => {
    const routes = useRoutes(rootRouter)
    return routes
}
export default Router;
