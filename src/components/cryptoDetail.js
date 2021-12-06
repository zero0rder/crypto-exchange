import React from 'react';
import { useParams } from 'react-router-dom';
import HTMLReactParser from 'html-react-parser';
import { useGetCoinDetailsQuery } from '../services/cryptocurrencies';
import millify from 'millify';
import { Row, Col, Typography, Divider, Spin } from 'antd';
import { CheckOutlined, ExclamationOutlined } from '@ant-design/icons';
const  { Title, Text } = Typography;


const CryptoDetail = () => {
    const { coinId } = useParams();
    const { data: dataData, isFetching } = useGetCoinDetailsQuery(coinId);
    const coin = dataData?.data?.coin;

    if (isFetching) return <Spin />;

    return (
        <div className="details-page-container">
            <Title className="coin-title">{`${coin.name}  (${coin.symbol})`}</Title>
            <Row className="coin-stats-row">
                <Col span={10}>
                    <Title className="coin-stats-title">Value Statistics</Title>
                    <Text>
                        <span>Price</span>
                        <span><b>${millify(coin.price)}</b></span>
                    </Text>
                    <Divider />
                    <Text>
                        <span>Market Cap</span>
                        <span><b>${millify(coin.marketCap)}</b></span>
                    </Text>
                    <Divider />
                    <Text>
                        <span>Volume</span>
                        <span><b>${millify(coin.volume)}</b></span>
                    </Text>
                    <Divider />
                    <Text>
                        <span>Daily % Change</span>
                        <span><b>{coin.change}</b></span>
                    </Text>
                    <Divider />
                    <Text>
                        <span>All Time High</span>
                        <span><b>${millify(coin.allTimeHigh.price)}</b></span>
                    </Text>
                    <Divider />
                </Col>
                <Col span={10}>
                    <Title className="coin-stats-title">Additional Stat Info</Title>
                    <Text>
                        <span>Number of Markets</span>
                        <span><b>{millify(coin.numberOfMarkets)}</b></span>
                    </Text>
                    <Divider />    
                    <Text>
                        <span>Number of Exchanges</span>
                        <span><b>{coin.numberOfExchanges}</b></span>
                    </Text>
                    <Divider />    
                    <Text>
                        <span>Circulating Supply</span>
                        <span><b>{millify(coin.circulatingSupply)}</b></span>
                    </Text>
                    <Divider />    
                    <Text>
                        <span>Total Supply</span>
                        <span><b>{millify(coin.totalSupply)}</b></span>
                    </Text>
                    <Divider />    
                    <Text>
                        <span>Approved Supply</span>
                        <span>{ coin.approvedSupply ? <CheckOutlined /> : <ExclamationOutlined /> }</span>
                    </Text>
                    <Divider />    
                </Col>
            </Row>
            <Row className="coin-desc-link-row">
                <Col className="coin-desc-container">
                    <h1>What is {coin.name}?</h1>
                    {HTMLReactParser(`${coin.description}`)}
                </Col>
                <Col className="coin-links-col">
                    <Title className="coin-links-title">{coin.name} Links</Title>
                    <ul>
                        { coin.links.map((lnk, i) => (
                            <li key={i}>
                                <Row className="coin-links-row">
                                    <Title level={5} className="link-type">{lnk.type}</Title>
                                    <span className="link-url">
                                        <a href={lnk.url}>
                                            {lnk.name}
                                        </a>
                                    </span>
                                </Row>
                            </li>
                        ))}
                    </ul>
                </Col>
            </Row>
        
        </div>
    );
}


export default CryptoDetail;