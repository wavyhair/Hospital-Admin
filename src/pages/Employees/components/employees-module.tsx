/*
 * @Autor:jiea
 * Date: 2022-10-29 20:59
 * @LastEditors: Huhuuuu
 * @LastEditTime: 2022-10-29 20:59
 * @FilePath: src/pages/Employees/components
 * @Description: ...
 * IDE:WebStorm
*/
import {Button,  Form, Input, Select,DatePicker} from 'antd'
import React from 'react'

const EmployeesModule: React.FC = function () {
    const onFinish = (form:any) => {
        const values = {...form,
            'timeOfEntry':form['timeOfEntry'].format('YYYY-MM-DD'),
            'correctionTime':form['correctionTime'].format('YYYY-MM-DD')
        }
        console.log(values);
    }
    return (<Form
            name="basic"
            labelCol={{span: 8}}
            wrapperCol={{span: 16}}
            initialValues={{remember: true}}
            onFinish={onFinish}
            autoComplete="off"
        >
            <Form.Item
                label="姓名"
                name="username"
                rules={[{required: true, message: 'Please input your username!'}]}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                label="手机号"
                name="mobile"
                rules={[{required: true, message: 'Please input your password!'}]}
            >
                <Input/>
            </Form.Item>
            <Form.Item
                label="入职时间"
                name="timeOfEntry"
                rules={[{required: true, message: 'Please input your password!'}]}
            >
                <DatePicker/>
            </Form.Item>
            <Form.Item label="聘用形式" name="formOfEmployment">
                <Select>
                    <Select.Option value="demo">Demo</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item
                label="工号"
                name="workNumber"
                rules={[{required: true, message: 'Please input your username!'}]}
            >
                <Input/>
            </Form.Item>

            <Form.Item label="部门" name="departmentName">
                <Select>
                    <Select.Option value="demo">Demo</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item
                label="转正时间"
                name="correctionTime"
                rules={[{required: true, message: 'Please input your password!'}]}
            >
                <DatePicker/>
            </Form.Item>

            <Form.Item wrapperCol={{offset: 8, span: 16}}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )

}
export default EmployeesModule
