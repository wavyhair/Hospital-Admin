/*
 * @Author: CHENJIE
 * @Date: 2022-10-23 11:31:48
 * @LastEditors: CHENJIE
 * @LastEditTime: 2022-10-23 17:40:14
 * @FilePath: \hrss-react-ts\src\store\festures\employees-slice.ts
 * @Description: employees-slice.ts
 */
import type { EmployeesList, EmployeesListRes } from "@/types/employees";
import request from "@/utils/request";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
enum API {
    getEmployeeList = '/sys/user'
}
interface initState {
    employeesList: EmployeesList
}
const initialState: initState = {
    employeesList: {} as EmployeesList
}

interface GetEmployeeListParams {
    total: number
    page: number
    size: number
}

export const getEmployeeList = createAsyncThunk('employees/getEmployeeList', async (params: GetEmployeeListParams) => {
    const res = await request<any, EmployeesListRes>({ url: API.getEmployeeList, params })
    return res.data
})
export const employeesSlice = createSlice({
    name: 'employees',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getEmployeeList.fulfilled,(state,{payload})=>{
            state.employeesList = payload
        })
    },
})
export default employeesSlice.reducer
export const selectEmployeeList = (state:RootState)=>state.employees.employeesList