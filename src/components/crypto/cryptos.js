import { useEffect, useState } from 'react';
import millify from 'millify';
import { getCryptos } from '../../api/index';
import { Spin, Row, Button, Avatar, Table } from 'antd';

const Cryptocurrencies = ({limit}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [cryptos, setCryptos] = useState();
    const cryptoData = cryptos?.data;
    
    useEffect(() => {
        const fetchedCryptos = getCryptos(limit ?? 25);
        const setCryptoData = async () => {
            const res = await fetchedCryptos;
            setCryptos(() => res);
            setIsLoading(false);
        };

        setCryptoData();
        
    }, []);
    
    if (isLoading) return <Spin/>;

    const columns = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Price', dataIndex: 'price', key: 'price' },
        { title: 'Change', dataIndex: 'change', key: 'change' },
        { title: 'Volume (24h)', dataIndex: 'volume', key: 'volume' },
        { title: 'Market Cap', dataIndex: 'marketCap', key: 'marketCap' },
        { title: 'Supply', dataIndex: 'supply', key: 'supply' }
    ];
    
    const dataSource = () => {
        const data = cryptoData?.map(obj => {
            return {
                key: obj.id,
                name: obj.name,
                price: `$${millify(obj.quote.USD.price)}`,
                change: `%${millify(obj.quote.USD.percent_change_24h)}`,
                volume: `$${millify(obj.quote.USD.volume_24h)}`,
                marketCap: `$${millify(obj.quote.USD.market_cap)}`,
                supply: millify(obj.circulating_supply)
            }
        });

        return data;
    }

    return (
    
        <Row className="crypto-container">
            <div>
                <Button shape='round'>All Assets</Button>
            </div>
            <Table dataSource={dataSource()} columns={columns}/>

            {/* <Avatar src={`https://cryptoicons.org/api/color/${item?.symbol?.toLowerCase()}/200`}/> */}
        </Row>
    );
}


export default Cryptocurrencies;