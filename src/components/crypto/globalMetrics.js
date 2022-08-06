import { useEffect, useState } from 'react';
import { getGlobalCryptoData } from '../../api/index';
import millify from 'millify';
import { Row, Typography, Divider, Spin, Col, Statistic } from 'antd';
const  { Title } = Typography;

const GlobalMetrics = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [globalState, setGlobalState] = useState();
    const globalData = globalState?.data;
    
    useEffect(() => {
        const fetchedGlobalData = getGlobalCryptoData();
        const setGlobalData = async () => {
            const res = await fetchedGlobalData;
            setGlobalState(() => res);
            setIsLoading(false);
        };
        
        setGlobalData();
        
    }, []);

    if (isLoading) return <Spin/>;

    return (
        <>
            <Title className="component-title">Global Metrics</Title>
            <Row className="global-metrics-container">
                <Col span={4}>
                    <Statistic title="Total Cryptocurrencies" value={millify(globalData.total_cryptocurrencies)} />
                </Col>
                <Col span={4}>
                    <Statistic title="Total Exhanges" value={millify(globalData.total_exchanges)} />
                </Col>
                <Col span={4}>
                    <Statistic title="Total Market Cap" value={`$${millify(globalData.quote.USD.total_market_cap)}`}/>
                </Col>
                <Col span={4}>
                    <Statistic title="24 Hour Volume" value={`$${millify(globalData.quote.USD.total_volume_24h)}`} />
                </Col>
                <Col span={4}>
                    <Statistic title="Total Markets" value={millify(globalData.active_market_pairs)}/>
                </Col>
            </Row>
            <Divider className="section-divider"></Divider>
        </>
    )
}


export default GlobalMetrics;