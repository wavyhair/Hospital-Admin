/*
 * @Author: CHENJIE
 * @Date: 2022-10-20 20:34:56
 * @LastEditors: CHENJIE
 * @LastEditTime: 2022-12-16 22:08:23
 * @FilePath: \hrss-react-ts\src\pages\Layout\index.tsx
 * @Description: Layout
 */

import styles from './index.module.scss'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Avatar, Dropdown, Layout, Menu, MenuProps } from 'antd'
import React, { useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { findSideBarRoutes } from '@/routes'
import { SRoutes } from '@/routes/filterRouter'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { selectUser, logOut } from '@/store/festures/user-slice'

const { Header, Sider, Content } = Layout
type MenuItem = Required<MenuProps>['items'][number]

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type
  } as MenuItem
}
const LogOut = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleClick = () => {
    dispatch(logOut())
    navigate('/login')
  }
  return <span onClick={handleClick}>
    退出登录
  </span>
}
const menu = (
  <Menu
    items={[
      {
        key: 'LogOutBtn',
        label: (
          <LogOut />
        ),
      },
    ]}
  />
);
export default function App() {
  const location = useLocation()
  const navigate = useNavigate()
  const { avatar } = useAppSelector(selectUser)
  // 设置默认高亮菜单
  const defaultSelectedKeys = location.pathname
  const routes = findSideBarRoutes() as SRoutes
  const items: MenuItem[] = routes.map((route) => {
    return getItem(
      route.meta?.title,
      route.path as string,
      route.meta?.icon,
      route.children?.map((item) => {
        if (item.hidden) return null
        return getItem(item?.meta?.title, item.path as string, item.meta?.icon)
      })
    )
  })
  const [collapsed, setCollapsed] = useState(false)
  const handleClick: MenuProps['onClick'] = (e) => {
    navigate(e.key)
  }
  return (
    <div className={styles.root}>
      <Layout>
        <Sider theme="light" trigger={null} collapsible collapsed={collapsed}>
          <Menu
            onClick={handleClick}
            mode="inline"
            defaultSelectedKeys={[defaultSelectedKeys]}
            items={items}
          />
        </Sider>
        <Layout>
          <Header>
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: 'trigger',
                onClick: () => setCollapsed(!collapsed)
              }
            )}
            <Dropdown overlay={menu} arrow={{ pointAtCenter: true }}>

              <Avatar src={avatar || 'https://joeschmoe.io/api/v1/random'} shape="square" size={50} icon={<UserOutlined />} />

            </Dropdown>
          </Header>
          <Content>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </div>
  )
}
