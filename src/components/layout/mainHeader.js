import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Menu, Layout, Popover, Button } from 'antd';
import { HomeOutlined, AccountBookOutlined, FundOutlined, MenuOutlined, SettingOutlined } from '@ant-design/icons';
import { AuthUserContext } from '../../utils/session/index';
import SignOut from '../account/signOut';
const { Header } = Layout;

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
        className: 'money-collected'
    },
];

const NotAuthSettings = () => (
    <div className='logged-out'>
        <Button size='small' type='primary'><Link to='/signin'>Sign In</Link></Button>
        <Button size='small' type='primary'><Link to='/signup'>Sign Up</Link></Button>
    </div>
);

const AuthSettings = () => <SignOut />;

const PopoverContent = () => {
    const { authUser } = useContext(AuthUserContext);
    return authUser === null ? <NotAuthSettings/> : <AuthSettings />;
};

const MainHeader = () => {
    const navigate = useNavigate();
    const [visible, setVisible] = useState(false);

    // const hide = () => setVisible(false);
    const handleVisibleChange = newVisible => setVisible(newVisible);

    return (
        <Header className="navbar">
            <Menu theme="dark" 
                mode="horizontal"
                items={menuItems} 
                overflowedIndicator={<MenuOutlined/>}
                onClick={(e) => navigate(e.key)} />
                <span className='settings-button'>
                    <Popover
                     content={<PopoverContent/>}
                     title="Settings"
                     trigger="click"
                     visible={visible}
                     onVisibleChange={handleVisibleChange}
                     placement='bottomRight'>
                        <SettingOutlined/>
                    </Popover>
                </span>
        </Header>
    );
}

export default MainHeader;