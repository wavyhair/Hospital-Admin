/*
 * @Autor:jiea
 * Date: 2022-10-29 20:59
 * @LastEditors: CHENJIE
 * @LastEditTime: 2022-10-31 22:10:14
 * @FilePath: \hrss-react-ts\src\pages\Employees\components\employees-module.tsx
 * @Description: ...
 * IDE:WebStorm
*/
import EmployeeEnum from '@/constant/employees'
import { getDepts, selectDepts } from '@/store/festures/employees-slice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { transListToTreeData } from '@/utils';
import { Button, Form, Input, Select, DatePicker, Tree } from 'antd'
import type { DataNode, TreeProps } from 'antd/es/tree';
import React, { useEffect, useState } from 'react'
const fieldNames = {
    title: 'companyName',
    key: 'id'
}
const treeData: DataNode[] = [
    {
        title: 'parent 1',
        key: '0-0',
        children: [
            {
                title: 'parent 1-0',
                key: '0-0-0',
                disabled: true,
                children: [
                    {
                        title: 'leaf',
                        key: '0-0-0-0',
                        disableCheckbox: true,
                    },
                    {
                        title: 'leaf',
                        key: '0-0-0-1',
                    },
                ],
            },
            {
                title: 'parent 1-1',
                key: '0-0-1',
                children: [{ title: <span style={{ color: '#1890ff' }}>sss</span>, key: '0-0-1-0' }],
            },
        ],
    },
];
const EmployeesModule: React.FC = function () {
    const dispatch = useAppDispatch()

    // 提交
    const onFinish = (form: any) => {
        const values = {
            ...form,
            'timeOfEntry': form['timeOfEntry'].format('YYYY-MM-DD'),
            'correctionTime': form['correctionTime'].format('YYYY-MM-DD')
        }
        console.log(values);
    }
    // 获取部门数据
    useEffect(() => {
        dispatch(getDepts())
    }, [dispatch])
    const tempDepts = useAppSelector(selectDepts)
    const [depts, setDepts] = useState()
    // 部门格式化
    useEffect(() => {
        if(tempDepts?.depts?.length){
            const result = transListToTreeData(tempDepts.depts, '')
            setDepts(result)
        }
    }, [tempDepts])
    const onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
        console.log('selected', selectedKeys, info);
    };

    return (<Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
    >
        <Form.Item
            label="姓名"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
        >
            <Input />
        </Form.Item>

        <Form.Item
            label="手机号"
            name="mobile"
            rules={[{ required: true, message: 'Please input your mobile!' }]}
        >
            <Input />
        </Form.Item>
        <Form.Item
            label="入职时间"
            name="timeOfEntry"
            rules={[{ required: true, message: 'Please select your password!' }]}
        >
            <DatePicker />
        </Form.Item>
        <Form.Item label="聘用形式" name="formOfEmployment">
            <Select>
                {EmployeeEnum.hireType.map(item => {
                    return <Select.Option value={item.id}>{item.value}</Select.Option>
                })}
            </Select>
        </Form.Item>
        <Form.Item
            label="工号"
            name="workNumber"
            rules={[{ required: true, message: 'Please input your workNumber!' }]}
        >
            <Input />
        </Form.Item>

        <Form.Item label="部门" name="departmentName">
            <Tree
                onSelect={onSelect}
                treeData={treeData}
            />
        </Form.Item>
        <Form.Item
            label="转正时间"
            name="correctionTime"
            rules={[{ required: true, message: 'Please select your correctionTime!' }]}
        >
            <DatePicker />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
                Submit
            </Button>
        </Form.Item>
    </Form>
    )

}
export default EmployeesModule
