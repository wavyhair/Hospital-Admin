/*
 * @Author: CHENJIE
 * @Date: 2022-12-08 16:31:20
 * @LastEditors: CHENJIE
 * @LastEditTime: 2022-12-27 09:49:22
 * @FilePath: \hrss-react-ts\src\pages\User\index.tsx
 * @Description: 
 */

import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Col, Form, Input, message, Modal, Row, Space, Table } from 'antd';

import type { ColumnsType } from 'antd/es/table';

import { adduser, assignRoles, delUser, getRoles, getUserList, updateUser } from '@/api/acl/user';
import { OptionTypes, UserItem, UserList, UserType } from '@/api/acl/types/user';
import { DeleteOutlined, EditOutlined, ExclamationCircleFilled, UserOutlined } from '@ant-design/icons';
import { CheckboxChangeEvent } from 'antd/es/checkbox';





export default function User() {
    const [form] = Form.useForm()
    const [userForm] = Form.useForm()
    const [roleForm] = Form.useForm()
    const [pageSize] = useState(5)
    const [current] = useState(1)
    const [userList, setUserList] = useState<UserList>()
    const [total, setTotal] = useState(0)
    const [loading, setLoading] = useState(true)
    const [modalTitle, setModalTitle] = useState<string>('添加用户')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalType, setModalType] = useState<UserType>(1)
    const [user, setUser] = useState<UserItem>()
    const [roleList, setRoleList] = useState<OptionTypes[]>([])
    const [userRolesIds, setUserRolesIds] = useState<number[]>([])
    const [checkAll, setCheckAll] = useState<boolean>(false)

    const { confirm } = Modal

    const initUserList = async (page = current, limit = pageSize) => {
        setLoading(true)
        const username = form.getFieldValue('username')
        const res = await getUserList({ page, limit, username })
        setLoading(false)
        setUserList(res.data.records)
        setTotal(res.data.total)
    }

    /**
     * 重置
     */
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
    // 新增/修改/分配角色
    const handleAddUser = (type: UserType, row?: UserItem) => {
        changeModalTitlte(type)
        setModalType(type)
        if (type === 1) {
            userForm.resetFields()
        } else if (type === 2) {
            userForm.resetFields()
            userForm.setFieldsValue(row)
        } else {
            setUser(row)
            getRoleList(row?.id)
        }
        setIsModalOpen(true)
    }
    // interface RoleItem {
    //     id: number,
    //     createTime: string,
    //     updateTime: string,
    //     isDeleted: number,
    //     param: any,
    //     roleName: string,
    //     remark: null
    // }
    const getRoleList = async (id: any) => {
        const res = await getRoles(id)
        // 所有角色
        const r = res.data.allRolesList?.map((item: any) => {
            return {
                label: item.roleName,
                value: item.id
            }
        })
        setRoleList(r || [])
        // 已经拥有的角色
        const l: number[] | undefined = res.data.assignRoles?.map((i: any) => i.id)
        setUserRolesIds(l || [])
        setCheckAll(res.data.allRolesList?.length === res.data.assignRoles?.length)
    }
    /**
     * 修改 Modal 标题
     * @param type UserType
     */
    const changeModalTitlte = (type: UserType) => {
        switch (type) {
            case 1:
                setModalTitle('添加用户')
                break
            case 2:
                setModalTitle('修改用户')
                break
            case 3:
                setModalTitle('设置角色')
                break
            default:
                setModalTitle('添加用户')

        }
    }
    /**
     * 全选切换事件
     * @param e CheckboxChangeEvent
     */
    const handleCheckAll = (e: CheckboxChangeEvent
    ) => {
        const checked = e.target.checked
        const l: any = checked ? roleList.map(item => item.value) : []
        setCheckAll(checked)
        setUserRolesIds(l)
    }
    /**
     * 角色选中事件
     * @param values 当前选中的角色
     */
    const handleCheckBoxChange = (values: any) => {
        setUserRolesIds(values)
        setCheckAll(values.length === roleList.length)
    }

    const handleRemoveUser = (id: number) => {
        confirm({
            title: '确定要删除该角色吗？',
            icon: <ExclamationCircleFilled />,
            async onOk() {
                await delUser(id)
                message.success('删除成功')
                initUserList(1, 5)
            },
        })
    }



    const handleOk = () => {
        if (modalType === 3) return submitAssign()
        userForm.validateFields().then(async (values) => {
            modalType === 1 ? await adduser(values) : await updateUser(values)
            modalType === 1 ? initUserList(1, 5) : initUserList()
            message.success(modalType === 1 ? '新增成功' : '修改成功')
        })
        setIsModalOpen(false);
    };

    /**
     * 分配角色
     */
    const submitAssign = async () => {
        const roleId = userRolesIds.join(',')
        const adminId = user?.id!
        await assignRoles(adminId, roleId)
        initUserList()
        message.success('分配角色成功')
        setIsModalOpen(false)
    }
    /**
     * 关闭 Modal
     */
    const handleCancel = () => {
        setIsModalOpen(false)
    }
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

            {/* table */}

            <Table
                loading={loading}
                title={() =>
                    <Row >
                        <Col span={24}>
                            <Space>
                                <Button type="primary" onClick={() => handleAddUser(1)}>添加</Button>
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
                    modalType !== 3 ? (
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
                            {modalType === 1 && (
                                <Form.Item
                                    label="用户密码"
                                    name="password"
                                    rules={[{ required: true, message: '用户密码必须输入' }]}
                                >
                                    <Input />
                                </Form.Item>
                            )}
                        </Form>
                    ) : (<Form form={roleForm} labelCol={{ span: 4 }}>
                        <Form.Item label="用户名">
                            <Input disabled value={user?.username} />
                        </Form.Item>
                        <Form.Item label="全选">
                            <Checkbox
                                className="mtp-6"
                                checked={checkAll}
                                onChange={handleCheckAll}
                            />
                            <div className="mbp-15"></div>
                            <Checkbox.Group
                                onChange={handleCheckBoxChange}
                                value={userRolesIds}
                                options={roleList}
                            />
                        </Form.Item>
                    </Form>)
                }
            </Modal>
        </>

    )
}
