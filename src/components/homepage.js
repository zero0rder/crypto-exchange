import { useEffect, useState } from 'react';
import Cryptocurrencies from './cryptocurrencies';
import { getGlobalCryptoData } from '../api/index';
import millify from 'millify';
import { Row, Typography, Divider, Spin, Col, Statistic } from 'antd';
const  { Title } = Typography;

const Homepage = () => {
    const [globalState, setGlobalState] = useState();
    const globalData = globalState?.data;
    
    useEffect(() => {
        const fetchedGlobalData = getGlobalCryptoData();
        const setCryptoData = async () => {
            const res = await fetchedGlobalData;
            setGlobalState(() => res);
        };
        
        setCryptoData();
        
    }, []);

    if (globalData === undefined)
        return <Spin/>;

    return (
        <div className="homepage">
            <Title className="home-page-title">Global Crypto Data</Title>
            <Row className="homepage-stats-container" gutter={[32,32]}>
                <Col span={12}>
                    <Statistic title="Total Cryptocurrencies" value={millify(globalData.total_cryptocurrencies)} />
                </Col>
                <Col span={12}>
                    <Statistic title="Total Exhanges" value={millify(globalData.total_exchanges)} />
                </Col>
                <Col span={12}>
                    <Statistic title="Total Market Cap" value={`$${millify(globalData.quote.USD.total_market_cap)}`}/>
                </Col>
                <Col span={12}>
                    <Statistic title="24 Hour Volume" value={`$${millify(globalData.quote.USD.total_volume_24h)}`} />
                </Col>
                <Col span={12}>
                    <Statistic title="Total Markets" value={millify(globalData.active_market_pairs)}/>
                </Col>
            </Row>
            <Divider className="section-divider"></Divider>
            <Cryptocurrencies limit={10} />
        </div>
    );
}


export default Homepage;