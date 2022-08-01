import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import millify from 'millify';
import { getCryptos } from '../api/index';
import { Spin, Card, Row, Col, Typography, Divider } from 'antd';
const { Meta } = Card;
const  { Title } = Typography;

const Cryptocurrencies = ({limit}) => {
    const [cryptos, setCryptos] = useState();
    const cryptoData = cryptos?.data;
    
    useEffect(() => {
        const fetchedCryptos = getCryptos(limit);
        const setCryptoData = async () => {
            const res = await fetchedCryptos;
            setCryptos(() => res);
        };

        setCryptoData();
        
    }, []);

    if (cryptoData === undefined)
        return <Spin/>;
    
    return (
        <>
            <Title className="crypto-page-title">Top Cryptocurrencies</Title>
            <Row className="crypto-container">
                { 
                    cryptoData?.map((c, i) => (
                        <Col xs={24} sm={12} lg={8} key={i} className="crypto-col">
                            <Link key={i} to={`/crypto/${c.id}`}>
                                <Card
                                className='crypto-card'
                                key={i} 
                                hoverable
                                cover={<img className='card-img' alt='crypto' src=''/>}>
                                    <Divider><Meta title={c.name} /></Divider>
                                    <p>Price: ${millify(c.quote.USD.price)}</p>
                                    <p>Market Cap: ${millify(c.quote.USD.market_cap)}</p>
                                    <p>Daily Change: {`${millify(c.quote.USD.percent_change_24h)}%`}</p>
                                </Card>
                            </Link>
                        </Col>
                    ))
                }
            </Row>
        </>
    );
}


export default Cryptocurrencies;