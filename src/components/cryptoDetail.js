import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import HTMLReactParser from 'html-react-parser';
import { getCryptoInfo, getCryptoQuotes } from '../api/index';
import millify from 'millify';
import { Row, Col, Typography, Divider, Spin } from 'antd';
// import { CheckOutlined, ExclamationOutlined } from '@ant-design/icons';
const  { Title, Text } = Typography;

const CryptoDetail = () => {
    const { coinId } = useParams();
    const [infoState, setInfoState] = useState();
    const [quoteState, setQuoteState] = useState();
    const coinInfo = infoState?.data[coinId];
    const coinQuote = quoteState?.data[coinId];
    
    useEffect(() => {
        const fetchedInfo = getCryptoInfo(coinId);
        const fetchedQuotes = getCryptoQuotes(coinId);
        
        const setCoinInfo = async () => {
            const res = await fetchedInfo;
            setInfoState(() => res);
        };
       
        const setCoinQuote = async () => {
            const res = await fetchedQuotes;
            setQuoteState(() => res);
        };

        setCoinInfo();
        setCoinQuote();
        
    }, []);

    if (coinInfo === undefined || coinQuote === undefined)
        return <Spin/>;

    return (
        <div className="details-page-container">
            <Title className="coin-title">{`${coinInfo.name}  (${coinInfo.symbol})`}</Title>
            <Row className="coin-stats-row">
                <Col span={10}>
                    <Title className="coin-stats-title">Value Statistics</Title>
                    <Text>
                        <span>Price</span>
                        <span><b>${millify(coinQuote.quote.USD.price)}</b></span>
                    </Text>
                    <Divider />
                    <Text>
                        <span>Market Cap</span>
                        <span><b>${millify(coinQuote.quote.USD.market_cap)}</b></span>
                    </Text>
                    <Divider />
                    <Text>
                        <span>Volume 24h</span>
                        <span><b>${millify(coinQuote.quote.USD.volume_24h)}</b></span>
                    </Text>
                    <Divider />
                    <Text>
                        <span>Daily % Change</span>
                        <span><b>{coinQuote.quote.USD.percent_change_24h}</b></span>
                    </Text>
                    <Divider />
                </Col>
                <Col span={10}>
                    <Title className="coin-stats-title">Additional Stat Info</Title>
                    <Text>
                        <span>Number of Markets</span>
                        <span><b>{millify(coinQuote.num_market_pairs)}</b></span>
                    </Text>
                    <Divider />
                    <Text>
                        <span>Circulating Supply</span>
                        <span><b>{millify(coinQuote.circulating_supply)}</b></span>
                    </Text>
                    <Divider />    
                    <Text>
                        <span>Total Supply</span>
                        <span><b>{millify(coinQuote.total_supply)}</b></span>
                    </Text>
                    <Divider />    
                    <Text>
                        <span>Max Supply</span>
                        <span><b>{ millify(coinQuote.max_supply)}</b></span>
                        {/* ? <CheckOutlined /> : <ExclamationOutlined /> */}
                    </Text>
                    <Divider />    
                </Col>
            </Row>
            <Row className="coin-desc-link-row">
                <Col className="coin-desc-container">
                    <h1>What is {coinInfo.name}?</h1>
                    {HTMLReactParser(`${coinInfo.description}`)}
                </Col>
                <Col className="coin-links-col">
                    <Title className="coin-links-title">{coinInfo.name} Links</Title>
                    <ul>
                        <li> 
                            <Row className="coin-links-row">
                                <Title level={5} className="link-type">website</Title>
                                <span className="link-url">
                                    <a href={coinInfo.urls.website[0] ?? ''}>website</a>
                                </span>
                            </Row>
                        </li>
                        <li>
                            <Row className="coin-links-row">
                                <Title level={5} className="link-type">reddit</Title>
                                <span className="link-url">
                                    <a href={coinInfo.urls.reddit[0] ?? ''}>reddit</a>
                                </span>
                            </Row>
                        </li>
                    </ul>
                </Col>
            </Row>
        </div>
    );
}


export default CryptoDetail;