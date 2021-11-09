import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import HTMLReactParser from 'html-react-parser';
import { useGetCoinDetailsQuery } from '../services/cryptocurrencies';
import millify from 'millify';
import { Row, Col, Typography, Divider } from 'antd';
import { CheckOutlined, ExclamationOutlined } from '@ant-design/icons';
const  { Title, Text } = Typography;


const CryptoDetail = () => {
    const { coinId } = useParams();
    const { data, isFetching } = useGetCoinDetailsQuery(coinId);
    const coin = data?.data?.coin;

    return (
        <div className="details-page-container">
            <Title className="coin-title">{`${coin?.name}  (${coin?.symbol})`}</Title>
            <Row className="coin-stats-row">
                <Col>
                    <Text>Price <b>${millify(coin.price)}</b></Text>
                    <Text>Market Cap <b>${millify(coin.marketCap)}</b></Text>
                    <Text>Volume <b>${millify(coin.volume)}</b></Text>
                    <Text>Daily % Change <b>{coin.change}</b></Text>
                    <Text>All Time High <b>${millify(coin.allTimeHigh.price)}</b></Text>
                </Col>
                <Col>
                    <Text>Number of Markets <b>{millify(coin.numberOfMarkets)}</b></Text>
                    <Text>Number of Exchanges <b>{coin.numberOfExchanges}</b></Text>
                    <Text>Circulating Supply <b>{millify(coin.circulatingSupply)}</b></Text>
                    <Text>Total Supply <b>{millify(coin.totalSupply)}</b></Text>
                    <Text>Approved Supply { coin.approvedSupply ? <CheckOutlined /> : <ExclamationOutlined /> }</Text>
                </Col>
            </Row>
            <Divider />
            <Row className="coin-desc-link-row">
                <Col className="coin-desc-container">
                    <h1>What is {coin.name}?</h1>
                    {HTMLReactParser(`${coin.description}`)}
                </Col>
                <Col className="coin-links-col">
                    <ul>
                        { coin.links.map((lnk, i) => <li key={i}>{lnk.url}</li>)}
                    </ul>
                </Col>
            </Row>
        
        </div>
    );
}


export default CryptoDetail;