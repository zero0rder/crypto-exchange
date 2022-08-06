import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Layout } from 'antd';
import { HomeOutlined, AccountBookOutlined, FundOutlined, MenuOutlined } from '@ant-design/icons';
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
    // {
    //     key: '/exchanges',
    //     icon: <MoneyCollectOutlined/>,
    //     label: 'Exchanges',
    //     className: 'money-collected'
    // },
]

const MainHeader = () => {
    const navigate = useNavigate();

    return (
        <Header className="navbar">
            <Menu theme="dark" 
                mode="horizontal"
                items={menuItems} 
                overflowedIndicator={<MenuOutlined/>}
                onClick={(e) => navigate(e.key)} />
        </Header>
    );
}

export default MainHeader;