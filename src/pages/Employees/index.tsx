/*
 * @Author: CHENJIE
 * @Date: 2022-10-22 21:37:39
 * @LastEditors: CHENJIE
 * @LastEditTime: 2022-11-01 16:42:50
 * @FilePath: \hrss-react-ts\src\pages\Employees\index.tsx
 * @Description: Employees
 */
import dayjs from 'dayjs';
import EmployeesModule from './components/employees-module'
import EmployeesEnum from "@/constant/employees";
import type { Employee } from '@/types/employees'
import styles from './index.module.scss'
import { Button, Card, Col, Row, Switch, Table, Tag, Modal } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import React, { useEffect, useRef, useCallback, useState } from 'react';
import { getEmployeeList, selectEmployeeList } from '@/store/festures/employees-slice';

const Employees = React.memo(() => {
    const dispatch = useAppDispatch()
    const employees = useAppSelector(selectEmployeeList)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalTitle, setModalTitle] = useState('')
    const data: Employee[] = employees.rows
    const params = useRef({
        page: 1,
        size: 10,
        total: 0
    })

    useEffect(() => {
        dispatch(getEmployeeList(params.current))
    }, [dispatch])
    /**
     * 分页
     */
    const onPageChange = (page: number, pageSize: number) => {
        params.current.page = page
        params.current.size = pageSize
        dispatch(getEmployeeList(params.current))
    }
    /**
     * 新增员工
     */
    const handleAdd = useCallback(() => {
        setModalTitle('新增')
        setIsModalOpen(true)
    }, [])
    // 關閉
    const close = useCallback(() => {
        setModalTitle('')
        setIsModalOpen(false)
        dispatch(getEmployeeList(params.current))
    }, [dispatch])
    const columns: ColumnsType<Employee> = [
        {
            title: '序号',
            dataIndex: 'index',
            key: 'index',
            render: (text, record, index) => index + 1
        },
        {
            title: '姓名',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: '手机号',
            dataIndex: 'mobile',
            key: 'mobile',
        },
        {
            title: '工号',
            dataIndex: 'workNumber',
            key: 'workNumber',
        },
        {
            title: '聘用形式',
            dataIndex: 'formOfEmployment',
            key: 'formOfEmployment',
            render: value => EmployeesEnum.hireType.find(item => item.id === value)?.value ?? '未知'
        },
        {
            title: '部门',
            dataIndex: 'departmentName',
            key: 'departmentName',
        },
        {
            title: '入职时间',
            dataIndex: 'timeOfEntry',
            key: 'timeOfEntry',
            render: value => dayjs(value).format('YYYY-MM-DD HH:mm:ss')
        },
        {
            title: '状态',
            dataIndex: 'enableState',
            key: 'enableState',
            render: value => <Switch defaultChecked={value === 1} disabled />
        },
    ];

    return (
        <div className={styles.root}>
            {/* 操作框 s */}
            <Card>
                <Row justify="start">
                    <Col span={12}>
                        <Tag color="processing">共{employees.total}条记录</Tag>
                    </Col>
                    <Col className='addbtn' span={12}>
                        <Button type="primary" onClick={handleAdd}>新增员工</Button>
                    </Col>
                </Row>
            </Card>
            {/* 操作框 e */}

            {/* table s */}

            <Card>
                <Table
                    rowKey={(record) => record.id}
                    columns={columns}
                    dataSource={data}
                    pagination={{
                        current: params.current.page,
                        pageSize: params.current.size,
                        total: employees.total,
                        onChange: onPageChange
                    }} />
            </Card>
            {/* table e */}

            {/*  子组件 s  */}
            <Modal destroyOnClose title={modalTitle} open={isModalOpen} onCancel={close} footer={null} bodyStyle={{ width: '70%' }}>
                <EmployeesModule close={close} />
            </Modal>
            {/*  子组件 e  */}
        </div>
    )

})
export default Employees
