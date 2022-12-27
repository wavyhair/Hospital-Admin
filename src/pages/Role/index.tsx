/*
 * @Author: CHENJIE
 * @Date: 2022-12-08 16:30:45
 * @LastEditors: CHENJIE
 * @LastEditTime: 2022-12-27 14:40:18
 * @FilePath: \hrss-react-ts\src\pages\Role\index.tsx
 * @Description: 
 */

import { getRoleList } from "@/api/acl/role"
import type { RoleItemType, UserItem, UserList, UserType } from "@/api/acl/types/user"
import { DeleteOutlined, EditOutlined, UserOutlined } from "@ant-design/icons"
import { Button, Col, Form, Input, Modal, Row, Space, Table } from "antd"
import type { ColumnsType } from "antd/es/table"
import { useEffect, useState } from "react"

export default function Role() {
    const [searchForm] = Form.useForm()
    const [userForm] = Form.useForm()
    const [loading, setLoading] = useState(false)
    const [pageSize, setPageSize] = useState(5)
    const [current, setCurrent] = useState(1)
    const [total, setTotal] = useState(0)
    const [modalTitle, setModalTitle] = useState('添加用户')
    const [userList, setUserList] = useState<UserList>([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [user, setUser] = useState<UserItem>()

    useEffect(() => {
        initUserList()
    }, [])
    const initUserList = async (page = current, limit = pageSize) => {
        setPageSize(limit)
        setCurrent(page)
        const { roleName } = searchForm.getFieldsValue()
        const res = await getRoleList({ page, limit, roleName })
        setUserList(res.data.records)
        setTotal(res.data.total)
    }
    const handleOk = () => { }
    const handleCancel = () => { }
    const handleAuth = (row: RoleItemType) => { }
    const handleAddUser = (type: UserType, row?: UserItem) => { }
    const handleRemoveUser = (id: any) => { }
    /**
     * 清空
     */
    const onReset = () => { }
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
            title: '角色名称',
            dataIndex: 'roleName',
        },
        {
            title: '操作',
            render(row: UserItem) {
                return (
                    <>
                        <Button
                            type="primary"
                            icon={<UserOutlined />}
                            onClick={() => handleAuth(row)}
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
    return (
        <>
            {/* 搜索区域 */}
            <Form
                layout="inline"
                form={searchForm}
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

            {/* table */}

            <Table
                loading={loading}
                title={() =>
                    <Row>
                        <Col span={24}>
                            <Space>
                                <Button type="primary">添加</Button>
                            </Space>
                        </Col>
                    </Row>
                }
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
            {/* Modal */}
            <Modal
                forceRender
                destroyOnClose
                title={modalTitle}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}>
                {
                    (
                        <Form form={userForm} labelCol={{ span: 6 }}>
                            <Form.Item
                                label="用户名"
                                name="username"
                                rules={[{ required: true, message: '用户名必须输入' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item label="用户昵称" name="nickName">
                                <Input value={user?.username} />
                            </Form.Item>
                        </Form>
                    )
                }
            </Modal>
        </>
    )
}
