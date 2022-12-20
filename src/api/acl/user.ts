/*
 * @Author: CHENJIE
 * @Date: 2022-12-20 11:35:54
 * @LastEditors: CHENJIE
 * @LastEditTime: 2022-12-20 14:58:26
 * @FilePath: \hrss-react-ts\src\api\acl\user.ts
 * @Description: 
 */
import { ApiResponse } from "@/types";
import request from "@/utils/request";
import { GetUserListParams, GetUserListResponse } from "./types/user";
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