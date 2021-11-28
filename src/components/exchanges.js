import React from 'react';
import { useGetExchangesQuery } from '../services/cryptocurrencies';
import millify from 'millify';
import HTMLReactParser from 'html-react-parser';
import { Collapse, Spin, Row, Col, Typography, Avatar } from 'antd';
const { Text } = Typography;
const { Panel } = Collapse;

const Exchanges = () => {
    const {data: exchangeData, isFetching } = useGetExchangesQuery();
    const exchanges = exchangeData?.data?.exchanges;

    if (isFetching) return <Spin />;

    return (
        <>
            <Row className="exhange-header">
                <Col span={6}>Exchanges</Col>
                <Col span={6}>24h Trade Volume</Col>
                <Col span={6}>Markets</Col>
                <Col span={6}>Change</Col>
            </Row>
            <Row className="exhange-content">
                {exchanges.map((exchange) => (
                    <Col span={24}>
                        <Collapse>
                            <Panel
                                key={exchange.id}
                                showArrow={false}
                                header={(
                                <Row key={exchange.id}>
                                    <Col span={6}>
                                    <Text><strong>{exchange.rank}.</strong></Text>
                                    <Avatar className="exchange-image" src={exchange.iconUrl} />
                                    <Text><strong>{exchange.name}</strong></Text>
                                    </Col>
                                    <Col span={6}>${millify(exchange.volume)}</Col>
                                    <Col span={6}>{millify(exchange.numberOfMarkets)}</Col>
                                    <Col span={6}>{millify(exchange.marketShare)}%</Col>
                                </Row>
                                )}>
                                {HTMLReactParser(exchange.description || '')}
                            </Panel>
                        </Collapse>
                    </Col>
                ))}
            </Row>
        </>
    )
    
}



export default Exchanges;