/*
 * @Author: CHENJIE
 * @Date: 2022-10-20 16:20:39
 * @LastEditors: CHENJIE
 * @LastEditTime: 2022-12-08 17:09:16
 * @FilePath: \hrss-react-ts\src\store\index.ts
 * @Description:
 */
import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import employeesSlice from "./festures/employees-slice";
import userSlice from "./festures/user-slice";
const store = configureStore({
    reducer: {
        user: userSlice,
        employees: employeesSlice
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
