/*
 * @Author: CHENJIE
 * @Date: 2022-10-20 16:23:09
 * @LastEditors: CHENJIE
 * @LastEditTime: 2022-12-08 16:18:47
 * @FilePath: \hrss-react-ts\src\store\festures\user-slice.ts
 * @Description:
 */
import request from "@/utils/request";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LoginData, LoginRes, ReqGetUserInfoResponse } from "@/types/user";
import { getToken, setToken } from "@/utils/auth";
import { customHistory } from '@/utils/history'
import { RootState } from "..";

enum API {
    login = '/admin/acl/index/login',
    getUserInfo = '/admin/acl/index/info',
}


export const login = createAsyncThunk('user/login', async (data: LoginData) => {
    const res = await request<any, LoginRes>({ method: 'post', url: API.login, data })
    return res
})
export const getUserInfo = createAsyncThunk('user/getUserInfo', async () => {
    const result = await request<any, ReqGetUserInfoResponse>({ method: 'get', url: API.getUserInfo })
    return result.data
})

interface UsetState {
    token: string,
    avatar: string,
    name: string,
    roles?: string[],
    routes?: string[],
}

const initialState: UsetState = {
    token: getToken() || '',
    avatar: '',
    name: '',
    roles: [],
    routes: []

}


export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(login.fulfilled, (state, { payload }) => {
            state.token = payload.data
            setToken(payload.data)
        })
            .addCase(getUserInfo.fulfilled, (state, { payload }) => {
                state.avatar = payload.avatar
                state.name = payload.name
                state.routes = payload.routes
            })
    }
})
export default userSlice.reducer
// 暴露用于读取当前状态数据的select函数
export const selectUser = (state: RootState) => state.user
