/*
 * @Author: CHENJIE
 * @Date: 2022-10-20 13:15:01
 * @LastEditors: CHENJIE
 * @LastEditTime: 2022-12-08 16:03:07
 * @FilePath: \hrss-react-ts\src\pages\Login\index.tsx
 * @Description: login
 */
import styles from './index.module.scss'
import { Button, Checkbox, Form, Input } from 'antd';
import { useAppDispatch } from "@/store/hooks";
import { getUserInfo, login } from "@/store/festures/user-slice";
import { LoginData } from "@/types/user";
export default function Login() {
    const dispatch = useAppDispatch()
    const onFinish = (values: LoginData) => {
        dispatch(login(values))
        dispatch(getUserInfo())
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div className={styles.root}>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true, username: 'admin', password: '111111' }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>

    )
}
