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
const result = [] as SRoutes
export const filterRouter = (asyncRoutes: SRoutes, haveRoutes: string[]) => {
    asyncRoutes.forEach(item => {
        if (item.children) {
            filterRouter(item.children, haveRoutes)
            if (haveRoutes.includes(item.name)) {
                result.push(item)
            }
        }

    })
    return result
}
