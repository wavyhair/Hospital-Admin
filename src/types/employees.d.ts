/*
 * @Author: CHENJIE
 * @Date: 2022-10-23 11:40:35
 * @LastEditors: CHENJIE
 * @LastEditTime: 2022-10-23 17:42:55
 * @FilePath: \hrss-react-ts\src\types\employees.d.ts
 * @Description: employees
 */
import type { ApiResponse } from './index'
interface Employee {
    id: string
    mobile: string
    username: string
    password: string
    enableState: number
    createTime: string
    companyId: string
    companyName: string
    departmentId: string
    timeOfEntry: string
    formOfEmployment: number
    workNumber: string
    formOfManagement: any
    workingCity: any
    correctionTime: string
    inServiceStatus: number
    departmentName: string
    level: string
    staffPhoto: string
}
interface EmployeesList {
    total:number
    rows:Employee[]
}
export type EmployeesListRes = ApiResponse<EmployeesList>