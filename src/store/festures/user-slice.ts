/*
 * @Author: CHENJIE
 * @Date: 2022-10-20 16:23:09
 * @LastEditors: CHENJIE
 * @LastEditTime: 2022-10-21 13:35:57
 * @FilePath: \hrss-react-ts\src\store\festures\user-slice.ts
 * @Description:
 */
import request from "@/utils/request";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginData, LoginRes } from "@/types/user";
import { getToken, setToken } from "@/utils/auth";
import { customHistory } from '@/utils/history'

enum API {
    login = '/sys/login',
    getUserInfo = '/sys/profile',
    getUserDetailById = '/sys/user/'
}


export const login = createAsyncThunk('user/login', async (data: LoginData) => {
    const res = await request<any, LoginRes>({ method: 'post', url: API.login, data })
    return res
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
            customHistory.push('/dashboard')
        })
    }
})
export default userSlice.reducer
