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
const Effect = lazy(() => import('@/pages/Playground/components/effect-play'))
const Purecom = lazy(() => import('@/pages/Playground/components/purecom-play'))
const Memo = lazy(() => import('@/pages/Playground/components/memo-play'))
const UseMemo = lazy(() => import('@/pages/Playground/components/usememo-play'))

export const asyncRouter = [

]
const load = (Comp: FC | React.ElementType) => {
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
// 不需要权限的路由
export const constantRoutes = [
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
        element: <Playground />,
        children: [
            {
                path: 'effect',
                element: load(Effect)
            },
            {
                path: 'purecom',
                element: load(Purecom)
            },
            {
                path: 'Memocom',
                element: load(Memo)
            },
            {
                path: 'useMemo',
                element: load(UseMemo)
            }
        ]
    },
  
 

];

// 404路由
export const anyRoute = [
    {
        path: '*',
        element: load(NotFound)
    }
];

// 动态路由
export const allAsyncRoutes = [
    {
        path: "/home",
        element: <Layout />,
        children: [
            {
                path: 'dashboard',
                element: load(Dashboard)
            },
            {
                path: 'setting',
                name:'settings',
                element: load(Setting)
            },
            {
                path: 'employees',
                name: 'user12345',
                element: load(Employees)
            },

        ]
    },
]


