import React, { useEffect, useState } from 'react';
import { useGetCryptosQuery } from '../services/cryptocurrencies';
import { Spin, Card, Row, Col, Typography, Divider } from 'antd';
import { Link } from 'react-router-dom';
import millify from 'millify';
const { Meta } = Card;
const  { Title } = Typography;

const Cryptocurrencies = ({limited}) => {
    const count = limited ? 10 : 100;
    const {data: cryptoData, isFetching } = useGetCryptosQuery(count);
    const [cryptos, setCryptos] = useState();
    
    useEffect(() => {
        setCryptos(cryptoData?.data?.coins);

    }, [cryptoData]);

    if (isFetching) return <Spin />;
    
    return (
        <>
            <Title className="crypto-page-title">Top Cryptocurrencies</Title>
            <Row gutter={[32,32]} className="crypto-container">
                { cryptos?.map((c, i) => (
                    <Col xs={24} sm={12} lg={8} key={i} className="crypto-col">
                        <Link key={i} to={`/crypto/${c.id}`}>
                            <Card
                            className='crypto-card'
                            key={i} 
                            hoverable
                            cover={<img className='card-img' alt={c.type} src={c.iconUrl}/>}>
                                <Divider><Meta title={c.name} /></Divider>
                                <p>Price: ${millify(c.price)}</p>
                                <p>Market Cap: ${millify(c.marketCap)}</p>
                                <p>Daily % Change: {c.change}</p>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
        </>
    );
}


export default Cryptocurrencies;