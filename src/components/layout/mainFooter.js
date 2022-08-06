import React from 'react';
import { CopyrightOutlined } from '@ant-design/icons';
import { Layout } from 'antd';
const { Footer } = Layout;

const MainFooter = () => {

    return (
        <Footer className="site-footer">
            <span>Crypto Desktop App</span>
            <span>All Rights Reserved <CopyrightOutlined /> {new Date().getFullYear()}</span>
            <span></span>
        </Footer>
    )
};

export default MainFooter;