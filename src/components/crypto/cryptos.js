import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import millify from 'millify';
import { getCryptos, getCryptoQuotes } from '../../api/index';
import CryptoModal from './cryptoModal';
import { Spin, Row, Button, Avatar, Table, Typography } from 'antd';
import useLocalStorage from '../../hooks/useLocalStorage';
const  { Title } = Typography;

const Cryptocurrencies = ({limit}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [cryptos, setCryptos] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalData, setModalData] = useState(null);
    const cryptoData = cryptos?.data;
    const [localUser] = useLocalStorage('localUser', '');
    
    useEffect(() => {
        const fetchedCryptos = getCryptos(limit ?? 100);
        const setCryptoData = async () => {
            const res = await fetchedCryptos;
            setCryptos(() => res);
            setIsLoading(false);
        };

        setCryptoData();
        
    }, []);

    const showModal = (id) => {
            const fetchedQuotes = getCryptoQuotes(id);
            const initModal = async () => {
            const res = await fetchedQuotes;
            const data = res?.data[id];
            const state = {
                name: data?.name,
                symbol: data?.symbol,
                rank: data?.cmc_rank,
                price: data?.quote?.USD?.price,
                change: data?.quote?.USD?.percent_change_24h,
                supply: data?.circulating_supply,
                totalSupply: data?.total_supply,
                marketCap: data?.quote?.USD?.market_cap,
                volume: data?.quote?.USD?.volume_24h
            };

            setModalData(() => state);
            setModalVisible(true);
        }

        initModal();
    };

    if (isLoading) return <Spin/>;

    const columns = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Price', dataIndex: 'price', key: 'price' },
        { title: 'Change', dataIndex: 'change', key: 'change' },
        { title: 'Volume (24h)', dataIndex: 'volume', key: 'volume' },
        { title: 'Market Cap', dataIndex: 'marketCap', key: 'marketCap' },
        { title: 'Supply', dataIndex: 'supply', key: 'supply' },
        { title: 'Purchase', key: 'purchase', render: (_, rec) => (<Button onClick={() => showModal(rec?.key)} type='primary' disabled={localUser === '' ? true : false} shape='round'>Buy</Button>)}
    ];

    // src={`https://cryptoicons.org/api/color/${obj.symbol.toLowerCase()}/200`}
    const dataSource = () => {
        const data = cryptoData?.map(obj => {
            return {
                key: obj.id,
                name: <span><Avatar style={{backgroundColor: 'blue'}}/><a href={`/crypto/${obj.id}`}>{obj.name}</a></span>,
                price: `$${millify(obj.quote.USD.price)}`,
                change: `% ${millify(obj.quote.USD.percent_change_24h)}`,
                volume: `$${millify(obj.quote.USD.volume_24h)}`,
                marketCap: `$${millify(obj.quote.USD.market_cap)}`,
                supply: millify(obj.circulating_supply)
            }
        });

        return data;
    }

    return (
        <Row className='crypto-container'>
            { limit ? (<div><Button shape='round'><Link to='/cryptos'>All Assets</Link></Button></div>) : (<Title className="component-title">Top Cryptocurrencies</Title>) }
            <Table dataSource={dataSource()} columns={columns} pagination={{ pageSize: 25 }}/>
            <CryptoModal modalData={modalData} setModalVisible={setModalVisible} modalVisible={modalVisible}/>
        </Row>
    );
}


export default Cryptocurrencies;