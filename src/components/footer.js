import React from 'react';
import { CopyrightOutlined } from '@ant-design/icons';

const Footer = () => {

    return (
        <footer className="site-footer">
            <span>Crypto Desktop App</span>
            <span>All Rights Reserved <CopyrightOutlined /> {new Date().getFullYear()}</span>
            <span></span>
        </footer>
    )
};

export default Footer;