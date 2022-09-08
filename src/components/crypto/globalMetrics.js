import { useEffect, useState } from 'react';
import { getGlobalCryptoData } from '../../api/crypto/index';
import millify from 'millify';
import { Row, Typography, Divider, Spin, Col, Statistic } from 'antd';
const  { Title } = Typography;

const GlobalMetrics = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [globalState, setGlobalState] = useState();
    const globalData = globalState?.data;
    
    useEffect(() => {
        let init = true;
        const fetchedGlobalData = getGlobalCryptoData();
        const setGlobalData = async () => {
            const res = await fetchedGlobalData;
            setGlobalState(() => res);
            setIsLoading(false);
        };
        
        if(init)
            setGlobalData();
            
        return () => init = false;

    }, []);

    if (isLoading) return <Spin/>;

    return (
        <>
            <Title className="component-title">Global Metrics</Title>
            <Row className="global-metrics-container">
                <Col xs={12} md={4}>
                    <Statistic title="Cryptocurrencies" value={millify(globalData.total_cryptocurrencies)} />
                </Col>
                <Col xs={12} md={4}>
                    <Statistic title="Exhanges" value={millify(globalData.total_exchanges)} />
                </Col>
                <Col xs={12} md={4}>
                    <Statistic title="Market Cap" value={`$${millify(globalData.quote.USD.total_market_cap)}`}/>
                </Col>
                <Col xs={12} md={4}>
                    <Statistic title="24 Hour Volume" value={`$${millify(globalData.quote.USD.total_volume_24h)}`} />
                </Col>
                <Col xs={12} md={4}>
                    <Statistic title="Markets" value={millify(globalData.active_market_pairs)}/>
                </Col>
            </Row>
            <Divider className="section-divider"></Divider>
        </>
    )
}


export default GlobalMetrics;