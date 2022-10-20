/*
 * @Author: CHENJIE
 * @Date: 2022-10-20 16:23:09
 * @LastEditors: CHENJIE
 * @LastEditTime: 2022-10-20 16:32:27
 * @FilePath: \hrss-react-ts\src\store\festures\login-slice.ts
 * @Description: 
 */
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
const initialState = {
    token: ''
}
export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {}
})
export default loginSlice.reducer