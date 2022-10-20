/*
 * @Author: CHENJIE
 * @Date: 2022-10-20 16:20:39
 * @LastEditors: CHENJIE
 * @LastEditTime: 2022-10-20 16:34:13
 * @FilePath: \hrss-react-ts\src\store\index.ts
 * @Description:
 */
import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import loginSlice from "./festures/user-slice";
const store = configureStore({
    reducer: {
        login: loginSlice
    }
})
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
export default store
