/*
 * @Author: CHENJIE
 * @Date: 2022-10-20 16:23:09
 * @LastEditors: CHENJIE
 * @LastEditTime: 2022-12-08 15:53:24
 * @FilePath: \hrss-react-ts\src\store\festures\user-slice.ts
 * @Description:
 */
import request from "@/utils/request";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LoginData, LoginRes, ReqGetUserInfoResponse } from "@/types/user";
import { getToken, setToken } from "@/utils/auth";
import { customHistory } from '@/utils/history'

enum API {
    login = '/admin/acl/index/login',
    getUserInfo = '/admin/acl/index/info',
}


export const login = createAsyncThunk('user/login', async (data: LoginData) => {
    const res = await request<any, LoginRes>({ method: 'post', url: API.login, data })
    return res
})
export const getUserInfo = createAsyncThunk('user/getUserInfo', async () => {
    console.log(' 3')
    const result = await request<any, ReqGetUserInfoResponse>({ method: 'get', url: API.getUserInfo })
    console.log('result', result)
})

interface UsetState {
    token: string
}

const initialState: UsetState = {
    token: getToken() || ''
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
    }
})
export default userSlice.reducer
