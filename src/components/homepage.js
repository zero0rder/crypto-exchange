import React, { useEffect, useState } from 'react';
import Cryptocurrencies from './cryptocurrencies';
import { useGetCryptosQuery } from '../services/cryptocurrencies';
import millify from 'millify';
import { Row, Col, Statistic, Typography, Spin, Divider } from 'antd';
const  { Title } = Typography;

const Homepage = () => {
    const { data: statsData, isFetching } = useGetCryptosQuery(10);
    const stats = statsData?.data?.stats;

    if (isFetching) return <Spin />;
    
    return (
        <div className="homepage">
            <Title className="home-page-title">Global Crypto Data</Title>
            <Row className="homepage-stats-container" gutter={[32,32]}>
                <Col span={12}>
                    <Statistic title="Total Cryptocurrencies" value={millify(stats.total)} />
                </Col>
                <Col span={12}>
                    <Statistic title="Total Exhanges" value={millify(stats.totalExchanges)} />
                </Col>
                <Col span={12}>
                    <Statistic title="Total Market Cap" value={`$${millify(stats.totalMarketCap)}`}/>
                </Col>
                <Col span={12}>
                    <Statistic title="24 Hour Volume" value={`$${millify(stats.total24hVolume)}`} />
                </Col>
                <Col span={12}>
                    <Statistic title="Total Markets" value={millify(stats.totalMarkets)}/>
                </Col>
            </Row>
            <Divider className="section-divider"></Divider>
            <Cryptocurrencies limited />
        </div>
    );
}


export default Homepage;