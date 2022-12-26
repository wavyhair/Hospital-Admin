/*
 * @Author: CHENJIE
 * @Date: 2022-12-20 11:35:54
 * @LastEditors: CHENJIE
 * @LastEditTime: 2022-12-26 14:00:13
 * @FilePath: \hrss-react-ts\src\api\acl\user.ts
 * @Description: 
 */
import { ApiResponse } from "@/types";
import request from "@/utils/request";
import { GetUserListParams, GetUserListResponse, RoleTypes, UserTypes } from "./types/user";
const api_name = '/admin/acl/user'
/**
 * @description: 获取后台用户分页列表(带搜索)
 * @param {GetUserListParams} param
 * @returns {*}
 */
export const getUserList = ({ page, limit, username }: GetUserListParams) => {
    return request.get<any, ApiResponse<GetUserListResponse>>(`${api_name}/${page}/${limit}`, {
        params: {
            username
        }
    });
}
/**
 * @description: 获取所有角色
 * @param {number} userId
 * @returns {*}
 */
export const getRoles = (userId: number | undefined) => {
    return request.get<any, ApiResponse<RoleTypes>>(`${api_name}/toAssign/${userId}`);
}
/**
 * @description: 添加用户
 * @param {UserTypes} user
 * @returns {*}
 */
export const adduser = (user: UserTypes) => {
    return request.post<any, null>(`${api_name}/save`, { ...user })
}

/**
 * @description: 修改用户
 * @param {UserTypes} user
 * @returns {*}
 */
export const updateUser = (user: UserTypes) => {
    return request.put<any, null>(`${api_name}/update`, { ...user })
}
/**
 * @description: 给用户分配角色
 * @returns {*}
 */
export const assignRoles = (adminId: number, roleId: string) => {
    return request.post<any, null>(`${api_name}/doAssign?adminId=${adminId}&roleId=${roleId}`)
}
/**
 * @description: 删除用户
 * @param {UserTypes} user
 * @returns {*}
 */
export const delUser = (id: number) => {
    return request.delete<any, null>(`${api_name}/remove/${id}`,)
}