/*
 * @Autor:jiea
 * Date: 2022-10-29 20:59
 * @LastEditors: CHENJIE
 * @LastEditTime: 2022-11-01 16:54:00
 * @FilePath: \hrss-react-ts\src\pages\Employees\components\employees-module.tsx
 * @Description: ...
 * IDE:WebStorm
*/
import EmployeeEnum from '@/constant/employees'
import { addEmployee, getDepts, selectDepts } from '@/store/festures/employees-slice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { transListToTreeData } from '@/utils';
import { Button, Form, Input, Select, DatePicker, Tree, Space, message } from 'antd'
import type { TreeProps } from 'antd/es/tree';
import React, { useCallback, useEffect, useState } from 'react'
const fieldNames = {
    title: 'name',
    key: 'id',
    children: 'children'
}
interface Props {
    close: () => void
}
const EmployeesModule: React.FC<Props> = function ({ close }) {
    const dispatch = useAppDispatch()
    const tempDepts = useAppSelector(selectDepts)
    const [depts, setDepts] = useState()
    const [showTree, setShowTree] = useState(false)
    const [loading, setLoading] = useState(false)
    const [form] = Form.useForm()
    // 提交
    const onFinish = async (form: any) => {
        setLoading(true)
        const values = {
            ...form,
            'timeOfEntry': form['timeOfEntry'].format('YYYY-MM-DD'),
            'correctionTime': form['correctionTime'].format('YYYY-MM-DD')
        }
        await dispatch(addEmployee(values))
        message.success('新增成功')
        close()
    }
    // 获取部门数据
    useEffect(() => {
        dispatch(getDepts())
    }, [dispatch])

    // 部门格式化
    useEffect(() => {
        if (tempDepts?.depts?.length) {
            const result = transListToTreeData(tempDepts.depts, '')
            setDepts(result)
        }
    }, [tempDepts])
    // 显示部门树
    const handleFocus = useCallback(() => {
        setShowTree(true)
    }, [])
    // 树结点点击
    const onSelect: TreeProps['onSelect'] = (selectedKeys, info: any) => {
        form.setFieldValue('departmentName', info.node.name)
        setShowTree(false)
    };
    return (<Form
        form={form}
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
            rules={[
                { required: true, message: 'Please input your mobile!' },
                {
                    pattern: /^1[3-9]\d{9}$/,
                    message: '手机号格式不正确',
                    type: 'string'
                }]}
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
                    return <Select.Option value={item.id} key={item.id}>{item.value}</Select.Option>
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

        <Form.Item label="部门" >
            <Form.Item name="departmentName" noStyle><Input onFocus={handleFocus} /></Form.Item>

            {
                showTree &&
                <Tree
                    onSelect={onSelect}
                    treeData={depts}
                    fieldNames={fieldNames}
                />
            }
        </Form.Item>
        <Form.Item
            label="转正时间"
            name="correctionTime"
            rules={[{ required: true, message: 'Please select your correctionTime!' }]}
        >
            <DatePicker />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Space>
                <Button onClick={close} loading={loading}>
                    Cancle
                </Button>
                <Button type="primary" htmlType="submit" loading={loading} >
                    Submit
                </Button>
            </Space>

        </Form.Item>
    </Form>
    )

}
export default EmployeesModule
