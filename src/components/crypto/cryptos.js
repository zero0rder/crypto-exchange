import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import millify from 'millify';
import { getCryptos, getCryptoQuotes } from '../../api/crypto/index';
import CryptoModal from './cryptoModal';
import { Spin, Row, Col, Button, Avatar, Table, Typography, Grid, Tooltip } from 'antd';
const  { Title } = Typography;
const { useBreakpoint } = Grid;

const Cryptocurrencies = ({ limit }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [cryptos, setCryptos] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalData, setModalData] = useState(null);
    const cryptoData = cryptos?.data;
    const screens = useBreakpoint();

    useEffect(() => {
        let init = true;
        const fetchedCryptos = getCryptos(limit ?? 100);
        const setCryptoData = async () => {
            const res = await fetchedCryptos;
            setCryptos(() => res);
            setIsLoading(false); 
        };

        if(init)
            setCryptoData();

        return () => init = false;
        
    }, [limit]);

    const showModal = (id) => {
        const fetchedQuotes = getCryptoQuotes(id);
        const initModal = async () => {
            const res = await fetchedQuotes;
            const data = res?.data[id];
            const state = {
                id: id,
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
        { title: 'Change', dataIndex: 'change', key: 'change', responsive: ['lg'] },
        { title: 'Volume (24h)', dataIndex: 'volume', key: 'volume', responsive: ['lg'] },
        { title: 'Market Cap', dataIndex: 'marketCap', key: 'marketCap', responsive: ['lg'] },
        { title: 'Supply', dataIndex: 'supply', key: 'supply', responsive: ['lg'] },
        { title: 'Purchase', key: 'purchase', render: (_, rec) => (<Button onClick={() => showModal(rec?.key)} type='primary' shape='round'>Buy</Button>)}
    ];

    const dataSource = () => {
        const data = cryptoData?.map(obj => {
            return {
                key: obj.id,
                name: <span><Avatar src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${obj.id}.png`}/><Tooltip placement='right' title='view details' overlayStyle={{ borderRadius: '5px'}}><a href={`/crypto/${obj.id}`}>{obj.name}</a></Tooltip></span>,
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
            <Col>
                { limit ? (<div className='all-assets-link'><Button shape='round'><Link to='/cryptos'>All Assets</Link></Button></div>) : (<Title style={ screens.xs ? { fontSize: '1.75rem' } : {}} className="component-title">Top Cryptocurrencies</Title>) }
                <Table dataSource={dataSource()} columns={columns} pagination={{ pageSize: 25 }}/>
                <CryptoModal modalData={modalData} setModalVisible={setModalVisible} modalVisible={modalVisible}/>
            </Col>
        </Row>
    );
}


export default Cryptocurrencies;