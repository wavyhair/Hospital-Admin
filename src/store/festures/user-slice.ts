/*
 * @Author: CHENJIE
 * @Date: 2022-10-20 16:23:09
 * @LastEditors: CHENJIE
 * @LastEditTime: 2022-10-21 10:56:44
 * @FilePath: \hrss-react-ts\src\store\festures\user-slice.ts
 * @Description:
 */
import request from "@/utils/request";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginData, LoginRes } from "@/types/user";
import { getToken, setToken } from "@/utils/auth";


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
            console.log('p', payload);
            state.token = payload.data
            setToken(payload.data)
        })
    }
})
export default userSlice.reducer
