/*
 * @Author: CHENJIE
 * @Date: 2022-10-20 20:34:56
 * @LastEditors: CHENJIE
 * @LastEditTime: 2022-12-08 16:58:28
 * @FilePath: \hrss-react-ts\src\pages\Layout\index.tsx
 * @Description: Layout
 */
import styles from './index.module.scss'
import {
    DashboardOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    SettingOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

const { Header, Sider, Content } = Layout;
export default function App() {
    const location = useLocation()
    // 设置默认高亮菜单
    const defaultSelectedKeys = location.pathname
    const items = [
        {
            key: '/home/dashboard',
            icon: <DashboardOutlined />,
            label: <Link to="/home/dashboard">首页</Link>,
        },
        {
            key: '/home/setting',
            icon: <SettingOutlined />,
            label: <Link to="/home/setting">设置</Link>,
        },
        {
            key: '/home/employees',
            icon: <UserOutlined />,
            label: <Link to="/home/employees">员工</Link>,
        },
    ]
    const [collapsed, setCollapsed] = useState(false);
    return (
        <div className={styles.root}>
            <Layout>
                <Sider theme='light' trigger={null} collapsible collapsed={collapsed}>
                    <div />
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={[defaultSelectedKeys]}
                        items={items}
                    />
                </Sider>
                <Layout>
                    <Header style={{ padding: 0, background: '#fff' }}>
                        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger',
                            onClick: () => setCollapsed(!collapsed),
                        })}
                    </Header>
                    <Content>
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
        </div>
    );
}
