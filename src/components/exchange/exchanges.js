import React, { useState, useEffect } from 'react';
// import millify from 'millify';
// import HTMLReactParser from 'html-react-parser';
import { Collapse, Spin, Row, Col, Typography, Avatar } from 'antd';
import { getExchanges } from '../../api/index';
const { Text } = Typography;
const { Panel } = Collapse;

const Exchanges = () => {
    const [ exchangeState, setExchangeState ] = useState();
    const exchangeData = exchangeState?.data;

    useEffect(() => {
        const fetchedExchangeData = getExchanges();

        const setExchangesData = async () => {
            const res = await fetchedExchangeData;
            setExchangeState(() => res);
        }

        setExchangesData();

    }, []);

    if (exchangeData === undefined) return <Spin />;

    return (
        <>
            <Row className="exhange-header">
                <Col span={6}>Exchanges</Col>
                <Col span={6}>24h Trade Volume</Col>
                <Col span={6}>Markets</Col>
                <Col span={6}>Change</Col>
            </Row>
            <Row className="exhange-content">
                { exchangeData?.map((exchange, indx) => (
                    <Col span={24} key={indx}>
                        <Collapse>
                            <Panel
                                key={indx}
                                showArrow={false}
                                header={(
                                <Row key={indx}>
                                    <Col span={6}>
                                        {/* <Text><strong>{exchange.rank}.</strong></Text> */}
                                        {/* <Avatar className="exchange-image" src={exchange.iconUrl} /> */}
                                        <Text><strong>{exchange.name}</strong></Text>
                                    </Col>
                                    {/* <Col span={6}>${millify(exchange.volume)}</Col>
                                    <Col span={6}>{millify(exchange.numberOfMarkets)}</Col>
                                    <Col span={6}>{millify(exchange.marketShare)}%</Col> */}
                                </Row>
                                )}>
                                {/* {HTMLReactParser(exchange.description || '')} */}
                            </Panel>
                        </Collapse>
                    </Col>
                )) }
            </Row>
        </>
    )
    
}



export default Exchanges;