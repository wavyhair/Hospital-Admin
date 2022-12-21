/*
 * @Author: CHENJIE
 * @Date: 2022-12-08 16:31:20
 * @LastEditors: CHENJIE
 * @LastEditTime: 2022-12-21 15:08:01
 * @FilePath: \hrss-react-ts\src\pages\User\index.tsx
 * @Description: 
 */

import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Input, Row, Space, Table } from 'antd';

import type { ColumnsType } from 'antd/es/table';

import { getUserList } from '@/api/acl/user';
import { UserItem, UserList } from '@/api/acl/types/user';
import { DeleteOutlined, EditOutlined, UserOutlined } from '@ant-design/icons';





export default function User() {
    const [form] = Form.useForm()
    const [pageSize, setPageSize] = useState(5)
    const [current, setCurrent] = useState(1)
    const [userList, setUserList] = useState<UserList>()
    const [total, setTotal] = useState(0)
    const [loading, setLoading] = useState(true)

    const initUserList = async (page = current, limit = pageSize) => {
        setLoading(true)
        const username = form.getFieldValue('username')
        const res = await getUserList({ page, limit, username })
        setLoading(false)
        setUserList(res.data.records)
        setTotal(res.data.total)
    }

    const onReset = () => {
        form.resetFields()
        initUserList()
    }
    const columns: ColumnsType<UserItem> = [
        {
            title: '序号',
            dataIndex: 'hoscode',
            render(value, row, index) {
                return index + 1
            },
            width: 100,
            align: 'center',
        },
        {
            title: '用户名',
            dataIndex: 'username',
        },
        {
            title: '用户昵称',
            dataIndex: 'nickName',
        },
        {
            title: '角色列表',
            dataIndex: 'roleName',
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
        },
        {
            title: '更新时间',
            dataIndex: 'updateTime',
        },
        {
            title: '操作',
            render(row: UserItem) {
                return (
                    <>
                        <Button
                            type="primary"
                            icon={<UserOutlined />}
                            onClick={() => handleAddUser(3, row)}
                        ></Button>
                        <Button
                            type="primary"
                            icon={<EditOutlined />}
                            className="ml"
                            onClick={() => handleAddUser(2, row)}
                        ></Button>
                        <Button
                            type="primary"
                            icon={<DeleteOutlined />}
                            className="ml"
                            onClick={() => handleRemoveUser(row.id)}
                            danger
                        ></Button>
                    </>
                )
            },
            width: 200,
            fixed: 'right',
        },
    ]
    useEffect(() => {
        initUserList()
    }, [])
    const handleAddUser = (t: number, tt: UserItem) => { }
    const handleRemoveUser = (id: number) => { }
    return (
        <>
            {/* 搜索区域 */}
            <Form
                layout="inline"
                form={form}
                onFinish={() => { initUserList() }}
            >
                <Form.Item name="username" label="用户名">
                    <Input placeholder="请输入用户名" />
                </Form.Item>
                <Form.Item>
                    <Space>
                        <Button type="primary" htmlType="submit">查询</Button>
                        <Button onClick={onReset}>清空</Button>
                    </Space>

                </Form.Item>
            </Form>
            {/* 操作按钮 */}
            <Row style={{ margin: '8px 0 10px 0' }}>
                <Col span={24}>
                    <Space>
                        <Button type="primary">添加</Button>
                        <Button >批量删除</Button>
                    </Space>
                </Col>
            </Row>
            {/* table */}

            <Table
                loading={loading}
                pagination={{
                    pageSize,
                    current,
                    total,
                    showSizeChanger: true,
                    showQuickJumper: true,
                    pageSizeOptions: [5, 10, 15, 20],
                    showTotal: (total) => `总共${total}条`,
                    onChange: initUserList
                }}
                rowKey='id'
                columns={columns}
                dataSource={userList}
            />
        </>

    )
}
