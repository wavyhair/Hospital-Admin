/*
 * @Author: CHENJIE
 * @Date: 2022-12-27 14:23:48
 * @LastEditors: CHENJIE
 * @LastEditTime: 2022-12-27 14:32:53
 * @FilePath: \hrss-react-ts\src\api\acl\role.ts
 * @Description: 
 */
import { ApiResponse } from "@/types";
import request from "@/utils/request";
import type { GetRoleListParams, GetUserListResponse } from "./types/role";
const api_name = '/admin/acl/role'


/**
 * @description: 获取后台用户分页列表(带搜索)
 * @param {GetUserListParams} param
 * @returns {*}
 */
export const getRoleList = ({ page, limit, roleName }: GetRoleListParams) => {
    return request.get<any, ApiResponse<GetUserListResponse>>(`${api_name}/${page}/${limit}`, {
        params: {
            roleName
        }
    });
}