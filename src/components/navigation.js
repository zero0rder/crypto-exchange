import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { HomeOutlined, MoneyCollectOutlined, FundOutlined, MenuOutlined } from '@ant-design/icons';

const Navigation = () => {

    return (
        <div className="navbar">
            <Menu theme="dark" mode="horizontal" overflowedIndicator={<MenuOutlined/>} triggerSubMenuAction="click">
                <Menu.Item key="1" icon={<HomeOutlined/>}>
                    <Link to="/">Home</Link>
                </Menu.Item>
                <Menu.Item key="2" icon={<FundOutlined/> }>
                    <Link to="/cryptocurrencies">Crypto</Link>
                </Menu.Item>
                <Menu.Item key="3" icon={<MoneyCollectOutlined/>}>
                    <Link to="/exchanges">Exchanges</Link>
                </Menu.Item>
            </Menu>
        </div>
    );
}


export default Navigation;