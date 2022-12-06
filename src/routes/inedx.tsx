/*
 * @Author: CHENJIE
 * @Date: 2022-10-20 15:41:55
 * @LastEditors: CHENJIE
 * @LastEditTime: 2022-12-06 20:23:49
 * @FilePath: \hrss-react-ts\src\routes\inedx.tsx
 * @Description: routes
 */
import cloneDeep from 'lodash/cloneDeep'
import { useRoutes } from 'react-router-dom'
import {allAsyncRoutes,anyRoute,constantRoutes} from './router'
export const useAppRoutes=()=>{
    return useRoutes([...constantRoutes,...anyRoute])
}