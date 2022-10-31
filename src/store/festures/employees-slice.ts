/*
 * @Author: CHENJIE
 * @Date: 2022-10-23 11:31:48
 * @LastEditors: CHENJIE
 * @LastEditTime: 2022-10-31 21:49:49
 * @FilePath: \hrss-react-ts\src\store\festures\employees-slice.ts
 * @Description: employees-slice.ts
 */
import type { Department, DepartmentRes, EmployeesList, EmployeesListRes } from "@/types/employees";
import request from "@/utils/request";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

enum API {
    getEmployeeList = '/sys/user',
    addEmployee = 'addEmployee',
    getDepts = '/company/department'
}

interface initState {
    employeesList: EmployeesList
    depts: Department
}

const initialState: initState = {
    employeesList: {} as EmployeesList,
    depts: {} as Department
}

interface GetEmployeeListParams {
    total: number
    page: number
    size: number
}

/**
 * 获取员工列表
 */
export const getEmployeeList = createAsyncThunk('employees/getEmployeeList', async (params: GetEmployeeListParams) => {
    const res = await request<any, EmployeesListRes>({ url: API.getEmployeeList, params })
    return res.data
})

/**
 * 新增员工
 */
export const addEmployee = createAsyncThunk('employees/addEmployee', async (data) => {
    await request<any>({ method: 'post', url: API.addEmployee, data })
})

// 获取部门数据
export const getDepts = createAsyncThunk('employees/getDepts',async()=>{
    const res = await request<any,DepartmentRes>({url:API.getDepts})
    return res.data
})

export const employeesSlice = createSlice({
    name: 'employees',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getEmployeeList.fulfilled, (state, { payload }) => {
            state.employeesList = payload
        })
        .addCase(getDepts.fulfilled,(state,{payload})=>{
            state.depts = payload
        })
    },
})
export default employeesSlice.reducer
export const selectEmployeeList = (state: RootState) => state.employees.employeesList
export const selectDepts = (state: RootState) => state.employees.depts
