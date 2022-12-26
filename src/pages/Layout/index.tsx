/*
 * @Author: CHENJIE
 * @Date: 2022-10-20 20:34:56
 * @LastEditors: CHENJIE
 * @LastEditTime: 2022-12-22 15:30:52
 * @FilePath: \hrss-react-ts\src\pages\Layout\index.tsx
 * @Description: Layout
 */

import styles from './index.module.scss'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined
} from '@ant-design/icons'
import { Avatar, Card, Dropdown, Layout, Menu, MenuProps } from 'antd'
import React, { useEffect, useState } from 'react'
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
  return <span onClick={handleClick}>退出登录</span>
}
const items: MenuProps['items'] = [
  {
    key: 'LogOutBtn',
    label: <LogOut />
  }
]
export default function AppLayout() {
  const location = useLocation()
  const navigate = useNavigate()

  const { avatar } = useAppSelector(selectUser)

  const [openKeys, setOpenKeys] = useState('')
  const [selectedKeys, setSelectedKeys] = useState('')
  const setHeightLight = () => {
    setOpenKeys(location.pathname.split('/').splice(0, 3).join('/'))
    setSelectedKeys(location.pathname)
  }

  useEffect(() => {
    setHeightLight()
  }, [location.pathname])

  const onOpenChange = (openKeys: string[]) => {
    setOpenKeys(openKeys[1]?.split('/').splice(0, 3).join('/'))
    setSelectedKeys(openKeys[1])
  }
  // 设置默认高亮菜单
  const routes = findSideBarRoutes() as SRoutes
  const menuItems: MenuItem[] = routes.map((route) => {
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
  const collapsedChange = () => {
    setCollapsed(!collapsed)
  }
  useEffect(() => {
    setHeightLight()
  }, [collapsed])
  return (
    <div className={styles.root}>
      <Layout>
        <Sider theme="light" trigger={null} collapsible collapsed={collapsed}>
          <Menu
            onClick={handleClick}
            mode="inline"
            openKeys={[openKeys]}
            selectedKeys={[selectedKeys]}
            items={menuItems}
            onOpenChange={onOpenChange}
          />
        </Sider>
        <Layout>
          <Header>
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: 'trigger',
                onClick: collapsedChange
              }
            )}
            <Dropdown menu={{ items }} arrow={{ pointAtCenter: true }}>
              <Avatar
                src={avatar || 'https://joeschmoe.io/api/v1/random'}
                shape="square"
                size={50}
                icon={<UserOutlined />}
              />
            </Dropdown>
          </Header>
          <Card>
            <Content>
              <Outlet />
            </Content>
          </Card>

        </Layout>
      </Layout>
    </div >
  )
}
