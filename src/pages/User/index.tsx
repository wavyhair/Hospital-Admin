/*
 * @Author: CHENJIE
 * @Date: 2022-12-08 16:31:20
 * @LastEditors: CHENJIE
 * @LastEditTime: 2022-12-20 10:41:38
 * @FilePath: \hrss-react-ts\src\pages\User\index.tsx
 * @Description: 
 */

import React, { useState } from 'react';
import { Button, Col, Form, Input, Row, Space, Table, Tag } from 'antd';

import type { ColumnsType } from 'antd/es/table';
interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    tags: string[];
}

const columns: ColumnsType<DataType> = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: 'Tags',
        key: 'tags',
        dataIndex: 'tags',
        render: (_, { tags }) => (
            <>
                {tags.map((tag) => {
                    let color = tag.length > 5 ? 'geekblue' : 'green';
                    if (tag === 'loser') {
                        color = 'volcano';
                    }
                    return (
                        <Tag color={color} key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    );
                })}
            </>
        ),
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <a>Invite {record.name}</a>
                <a>Delete</a>
            </Space>
        ),
    },
];

const data: DataType[] = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser'],
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
];


export default function User() {
    const [form] = Form.useForm();

    return (
        <>
            <Form
                layout="inline"
                form={form}
            >
                <Form.Item label="用户名">
                    <Input placeholder="请输入用户名" />
                </Form.Item>
                <Form.Item>
                    <Space>
                        <Button type="primary">查询</Button>
                        <Button >清空</Button>
                    </Space>

                </Form.Item>
            </Form>
            <Row style={{ margin: '8px 0 8px 0' }}>
                <Col span={24}>
                    <Space>
                        <Button type="primary">添加</Button>
                        <Button >批量删除</Button>
                    </Space>
                </Col>
            </Row>
            <Table columns={columns} dataSource={data} />
        </>

    )
}
