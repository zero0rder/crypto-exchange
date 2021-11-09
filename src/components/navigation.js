import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { HomeOutlined, MoneyCollectOutlined, BulbOutlined, FundOutlined, MenuOutlined } from '@ant-design/icons';

const Navigation = () => {

    return (
        <div className="navbar">
            <Menu theme="dark" mode="horizontal">
                <Menu.Item icon={<HomeOutlined/>}>
                    <Link to="/">Home</Link>
                </Menu.Item>
                <Menu.Item icon={<FundOutlined/> }>
                    <Link to="/cryptocurrencies">Crypto</Link>
                </Menu.Item>
                <Menu.Item icon={<MoneyCollectOutlined/>}>
                    <Link to="/exchanges">Exchanges</Link>
                </Menu.Item>
            </Menu>
        </div>
    );
}


export default Navigation;