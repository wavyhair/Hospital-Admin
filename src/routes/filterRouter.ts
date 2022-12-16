/*
 * @Author: CHENJIE
 * @Date: 2022-12-14 20:51:33
 * @LastEditors: CHENJIE
 * @LastEditTime: 2022-12-16 21:59:02
 * @FilePath: \hrss-react-ts\src\routes\filterRouter.ts
 * @Description: 
 */
import { ReactElement } from "react";

export interface SMeta {
    icon?: ReactElement;
    title?: string | ReactElement;
}
export type SRoutes = SRoute[];

type SRoute = {
    children?: SRoutes;
    path: string;
    element?: JSX.Element;
    meta?: SMeta;
    hidden?: boolean;
    name: string;
}
export const filterRouter = (asyncRoutes: SRoutes, haveRoutes: string[]) => {
    const routers= [asyncRoutes[0]]
    const children  = asyncRoutes[0].children
    if(children)  routers[0].children= recursiveRouter(children,haveRoutes)
    return routers
}

const recursiveRouter =(asyncRoutes: SRoutes, haveRoutes: string[])=>{
    asyncRoutes.forEach((item,index) => {
        if(item.children) {
            recursiveRouter(item.children,haveRoutes)
        }
        if (!haveRoutes.includes(item.name)) {
           delete asyncRoutes[index]
        }
    })
    return asyncRoutes
}
