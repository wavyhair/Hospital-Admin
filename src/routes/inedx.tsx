/*
 * @Author: CHENJIE
 * @Date: 2022-10-20 15:41:55
 * @LastEditors: CHENJIE
 * @LastEditTime: 2022-10-25 17:01:29
 * @FilePath: \hrss-react-ts\src\routes\inedx.tsx
 * @Description: routes
 */
import Login from '@/pages/Login'
import Layout from '@/pages/Layout'
import { useRoutes, Navigate } from "react-router-dom"
import { FC, lazy, Suspense } from "react";
import Loading from '@/components/Loading';
const Dashboard = lazy(() => import('@/pages/Dashboard'))
const Setting = lazy(() => import('@/pages/Setting'))
const Employees = lazy(() => import('@/pages/Employees'))
const Playground = lazy(() => import('@/pages/Playground'))
const NotFound = lazy(() => import('@/pages/404'))

export const asyncRouter = [

]
const load = (Comp: FC) => {
    return (
        // 因为路由懒加载，组件需要一段网络请求时间才能加载并渲染
        // 在组件还未渲染时，fallback就生效，来渲染一个加载进度条效果
        // 当组件渲染完成时，fallback就失效了
        <Suspense fallback={<Loading />}>
            {/* 所有lazy的组件必须包裹Suspense组件，才能实现功能 */}
            <Comp />
        </Suspense>
    );
};
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
        path: "/playground",
        element: load(Playground),
    },
    {
        path: "/home",
        element: <Layout />,
        children: [
            {
                path: '/home/dashboard',
                element: load(Dashboard)
            },
            {
                path: '/home/setting',
                element: load(Setting)
            },
            {
                path: '/home/employees',
                element: load(Employees)
            },

        ]
    },
    {
        path: '*',
        element: load(NotFound)
    }

];


const Router = () => {
    const routes = useRoutes(rootRouter)
    return routes
}
export default Router;
