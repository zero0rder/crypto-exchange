import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import HTMLReactParser from 'html-react-parser';
import { getCryptoInfo, getCryptoQuotes } from '../../api/crypto/index';
import { addPurchase } from '../../api/accounts/user';
import millify from 'millify';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import useLocalStorage from '../../hooks/useLocalStorage';
import { Row, Col, Divider, Spin, Avatar, Card, Button, Grid } from 'antd';
import { StarOutlined, PlusCircleOutlined, MinusCircleOutlined  } from '@ant-design/icons';
const { useBreakpoint } = Grid;

const CryptoDetail = () => {
    const { coinId } = useParams();
    const [infoState, setInfoState] = useState();
    const [quoteState, setQuoteState] = useState();
    const [purchaseData, setPurchaseData] = useState({shareCount: 0, cost: 0})
    const coinInfo = infoState?.data[coinId];
    const coinQuote = quoteState?.data[coinId];
    const [localUser, setLocalUser] = useLocalStorage('local_user');
    const screens = useBreakpoint();

    useEffect(() => {
        let init = true;
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

        if(init){
            setCoinInfo();
            setCoinQuote();
        }

        return () => init = false;
        
    }, [coinId]);

    const handleShareUpdates = (e) => {
        e.preventDefault();
        
        setPurchaseData((prev) => {
            const newShareCount = e.target.closest('span').id === 'add-share' ? prev.shareCount + 1 : (purchaseData.shareCount > 0 ? prev.shareCount - 1 : 0);
            const newTotalPrice = coinQuote.quote.USD?.price * newShareCount;
            return { shareCount: newShareCount, cost: newTotalPrice.toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 }) };
        });
    }

    const handlePurchase = async () => {
        const totalShareCost = parseFloat(purchaseData.cost?.replace(',', ''));
        const price = coinQuote.quote.USD?.price;
        const { name } = coinInfo;
        let { _id, balance } = localUser;
        
        purchaseData.cost = totalShareCost;
        balance = balance - totalShareCost;

        const checkoutObj = { _id, balance, name, price, ...purchaseData };
        const submitPurchase = addPurchase(checkoutObj);
        const res = await submitPurchase;
        setLocalUser(() => res);
    }
    
    if (coinInfo === undefined || coinQuote === undefined) return <Spin/>;
    
    const isTrending = coinQuote.quote.USD.percent_change_24h > 0;
    
    const chartOptions = {
        responsive: true,
        // plugins: {}
    }
    
    const dataPoints = [
        coinQuote.quote.USD.percent_change_1h,
        coinQuote.quote.USD.percent_change_24h,
        coinQuote.quote.USD.percent_change_7d,
        coinQuote.quote.USD.percent_change_30d,
        coinQuote.quote.USD.percent_change_60d,
        coinQuote.quote.USD.percent_change_90d
    ];

    const labels = ['1hr', '24h', '7d', '30d', '60d', '90d'];
    const chartData = {
        labels: labels,
        datasets: [{
            label: '% Change',
            data: dataPoints,
            borderColor: '#1890ff',
            backgroundColor: '#1890ff',
        }],
    };
    
    return (
        <div className='details-page-container'>
            <Row>
                <Col className='details-header' span={24} style={ screens.xs ? { flexDirection: 'column' } : {}}>
                    <div>
                        <Avatar src={`https://cryptoicons.org/api/color/${coinInfo.symbol.toLowerCase()}/200`} />
                        <h1 className='title_h1'>{`${coinInfo.name}`}</h1>
                        <h2 className='title_h2'>{`(${coinInfo.symbol})`}</h2>
                    </div>
                    <Button type='primary' size='large' icon={<StarOutlined />}>Watchlist</Button>
                </Col>
            </Row>
            <Row className='details-overview'>
                <Divider />
                <Col xs={{span: 24}} md={14} style={ screens.xs ? { order: '1' } : {}}>
                    <Card>
                        <span>${coinQuote.quote.USD.price.toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 })}</span>
                        <span className='volumeTicker' style={isTrending ? {color: 'green'} : {color: 'red'}}>{isTrending ? '+' : ''}{millify(coinQuote.quote.USD.percent_change_24h)}%</span>
                        <Line
                        datasetIdKey='volume'
                        options={chartOptions}
                        data={chartData}/>
                        <Divider />
                        <section className='details-market-stats'>
                            <h2 style={ screens.xs ? { textAlign: 'center' } : {}}>Market Stats</h2>
                            <div style={ screens.xs ? { flexWrap: 'wrap', justifyContent: 'center', gap: '0.5rem'} : {}}>
                                <div style={ screens.xs ? { width: '40%' } : {}}>
                                    <span>Market Cap</span>
                                    <span><b>${millify(coinQuote.quote.USD.market_cap)}</b></span>
                                </div>
                                <div style={ screens.xs ? { width: '40%' } : {}}>
                                    <span>Volume (24h)</span>
                                    <span><b>${millify(coinQuote.quote.USD.volume_24h)}</b></span>
                                </div>
                                <div style={ screens.xs ? { width: '40%' } : {}}>
                                    <span>Circulating Supply</span>
                                    <span><b>${millify(coinQuote.circulating_supply)}</b></span>
                                </div>
                                <div style={ screens.xs ? { width: '40%' } : {}}>
                                    <span>Maximum Supply</span>
                                    <span><b>{coinQuote.max_supply !== null ? `$${millify(coinQuote.max_supply)}` : 'N/A'}</b></span>
                                </div>
                            </div>
                        </section>
                    </Card>
                </Col>
                <Col xs={24} md={8} style={ screens.xs ? { marginBottom: '1rem' } : {}}>
                    <Card>
                        <section className='details-buy-box-container'>
                            <h3 style={ screens.xs ? { marginBottom: '0' } : {}}>Buy Shares</h3>
                            <div className='details-buy-box'>
                                <div className='details-buy-box-top' style={ screens.xs ? { marginBottom: '1rem' } : {}}>
                                    <span>{purchaseData?.shareCount}</span>
                                    <Divider style={ screens.xs ? { margin: '16px 0' } : {}}/>
                                    <MinusCircleOutlined id='remove-share' onClick={e => handleShareUpdates(e)}/>
                                    <span className='buy-box-qty'>QTY</span>
                                    <PlusCircleOutlined id='add-share' onClick={e => handleShareUpdates(e)}/>
                                </div>
                                <div className='details-buy-box-bottom'>
                                    <span>Total: ${purchaseData?.cost.toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 })}</span>
                                    <div>
                                        <Button type='primary' onClick={() => handlePurchase()} disabled={(typeof localUser !== 'object')}>Buy</Button>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </Card>
                </Col>
            </Row>
            <Row className='details-desc-links'>
                <Divider />
                <Col className='details-desc' xs={24} md={14}>
                    <h1>What is {coinInfo?.name}?</h1>
                    {HTMLReactParser(`${coinInfo?.description}`)}
                </Col>
                <Col className="details-links" xs={24} md={8} style={ screens.xs ? { marginTop: '1rem' } : {}}>
                    <h1 className="links-title">{coinInfo?.name} Links</h1>
                    <ul>
                        <li> 
                            <Row className="links-row">
                                <h3 className="link-type">website:</h3>
                                <span className="link-url">
                                    <a href={coinInfo?.urls?.website[0] ?? ''}>{coinInfo?.urls?.website[0]}</a>
                                </span>
                            </Row>
                        </li>
                        <li>
                            <Row className="coin-links-row">
                                <h3 className="link-type">reddit:</h3>
                                <span className="link-url">
                                    <a href={coinInfo?.urls?.reddit[0] ?? ''}>{coinInfo?.urls?.reddit[0]}</a>
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