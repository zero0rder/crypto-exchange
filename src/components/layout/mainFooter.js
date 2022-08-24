import React from 'react';
import { CopyrightOutlined } from '@ant-design/icons';
import { Layout } from 'antd';
const { Footer } = Layout;

const MainFooter = () => {

    return (
        <Footer className="site-footer">
            <span>Crypto Exchange App</span>
            <span>All Rights Reserved <CopyrightOutlined /> {new Date().getFullYear()}</span>
        </Footer>
    )
};

export default MainFooter;