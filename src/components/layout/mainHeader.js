import React, { useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Menu, Layout, Popover, Button, Grid, Drawer } from 'antd'
import { HomeOutlined, AccountBookOutlined, FundOutlined, MenuOutlined, SettingOutlined } from '@ant-design/icons'
import { AuthUserContext } from '../../utils/session/index'
import SignOut from '../account/signOut'
const { Header } = Layout
const { useBreakpoint } = Grid

const menuItems = [
    {
        key: '/',
        icon: <HomeOutlined/>,
        label: 'Dashboard'
    },
    {
        key: '/cryptos',
        icon: <FundOutlined/>,
        label: 'Buy/Sell'
    },
    {
        key: '/account',
        icon: <AccountBookOutlined />,
        label: 'Account',
        className: 'account'
    },
]

const NotAuthSettings = () => (
    <div className='logged-out'>
        <Button size='medium' shape='round' type='primary'><Link to='/signin'>Sign In</Link></Button>
        <Button size='medium' shape='round' type='primary'><Link to='/signup'>Sign Up</Link></Button>
    </div>
)

const AuthSettings = () => <SignOut />
const PopoverContent = ({ user }) => user === null ? <NotAuthSettings/> : <AuthSettings />

const MainHeader = () => {
    const navigate = useNavigate()
    const { authUser } = useContext(AuthUserContext)
    const [popoverVisible, setPopoverVisible] = useState(false)
    const [drawerVisible, setDrawerVisible] = useState(false)
    const handleVisibleChange = newVisible => setPopoverVisible(newVisible)
    const toggleDrawer = () => setDrawerVisible(prev => !prev)
    const onClose = () => setDrawerVisible(false)
    const screens = useBreakpoint()
    const closeDrawerOnNavigate = (url) => {
        navigate(url)
        toggleDrawer()
    }

    return (
        <Header className="navbar" style={{ padding: screens.xs ? '0 32px' : '' }}>
            { screens.xs ? (
                <>
                    <MenuOutlined onClick={() => toggleDrawer()}/>
                    <Drawer 
                        title="Crypto Exchange" 
                        placement="left" 
                        onClose={onClose} 
                        visible={drawerVisible} 
                        width='50%'>
                            {
                                menuItems?.map((m, i) => (
                                    <div key={i}>
                                        <span onClick={() => closeDrawerOnNavigate(m.key)}>
                                            <span>{ m.icon }</span>
                                            <span>{ m.label }</span>
                                        </span>
                                    </div>
                                ))
                            }
                    </Drawer>
                </>
            ) : (
                <Menu theme="dark" 
                    mode='horizontal'
                    items={menuItems}
                    onClick={(e) => navigate(e.key)} /> 
                )
            }
            <span className='settings-button'>
                <Popover
                    content={<PopoverContent user={authUser}/>}
                    title="Settings"
                    trigger="click"
                    visible={popoverVisible}
                    onVisibleChange={handleVisibleChange}
                    placement='bottomRight'>
                    <SettingOutlined/>
                </Popover>
            </span>
        </Header>
    )
}

export default MainHeader