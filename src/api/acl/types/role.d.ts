/*
 * @Author: CHENJIE
 * @Date: 2022-12-27 14:25:09
 * @LastEditors: CHENJIE
 * @LastEditTime: 2022-12-27 14:25:17
 * @FilePath: \hrss-react-ts\src\api\acl\types\role.d.ts
 * @Description: 
 */


export interface RoleItem {
    id: number;
    roleName: string;

}

export interface PageParams {
    page: number;
    limit: number;
}

export interface GetRoleListParams extends PageParams {
    roleName: string;
}


export type RoleList = RoleItem[];

export interface GetUserListResponse {
    records: RoleList;
    total: number;
}

/**
 * @description: Modal弹出类型
 * @params 1 添加
 * @params 2 修改
 * @params 3 分配角色
 */
export type UserType = 1 | 2 | 3

export interface RoleItemType {
    id?: string | number;
    roleName?: string;
}

export interface RoleTypes {
    allRolesList?: RoleItemType[];
    assignRoles?: RoleItemType[];
}

export interface OptionTypes extends RoleItemType {
    label: string;
    value: string | number;
    disabled?: boolean;
}

export interface AssignItemType {
    children: any;
    id: string;
    level: number;
    name: string;
    select: boolean;
}