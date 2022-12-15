/*
 * @Author: CHENJIE
 * @Date: 2022-10-20 16:23:09
 * @LastEditors: CHENJIE
 * @LastEditTime: 2022-12-15 13:24:12
 * @FilePath: \hrss-react-ts\src\store\festures\user-slice.ts
 * @Description:
 */
import request from "@/utils/request";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LoginData, LoginRes, ReqGetUserInfoResponse } from "@/types/user";
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
    token: localStorage.getItem('hrss_react_key') || '',
    avatar: '',
    name: '',
    roles: [],
    routes: []

}


export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setToken: (state, action) => {
            const token = action.payload;
            state.token = token
            localStorage.setItem('hrss_react_key', token)
        },
        logOut: (state) => {
            state.token = ''
            state.avatar = ''
            state.avatar = ''
            state.name = ''
            state.roles = []
            state.routes = []
            localStorage.removeItem('hrss_react_key')
        }
    },
    extraReducers(builder) {
        builder.addCase(login.fulfilled, (state, { payload }) => {
            state.token = payload.data
            localStorage.setItem('hrss_react_key', payload.data)
        })
            .addCase(getUserInfo.fulfilled, (state, { payload }) => {
                state.avatar = payload?.avatar
                state.name = payload?.name
                state.routes = payload?.routes
            })
    }
})
export default userSlice.reducer
export const { setToken, logOut } = userSlice.actions


// 暴露用于读取当前状态数据的select函数
export const selectUser = (state: RootState) => state.user
