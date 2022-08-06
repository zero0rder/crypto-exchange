import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import millify from 'millify';
import { getCryptos, getCryptoQuotes } from '../../api/index';
import { Spin, Row, Button, Avatar, Table, Modal, Divider } from 'antd';
import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';

const Cryptocurrencies = ({limit}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [cryptos, setCryptos] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalData, setModalData] = useState(null);
    const [purchaseData, setPurchaseData] = useState({shareCount: 0, totalPrice: 0});
    const cryptoData = cryptos?.data;
    
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

            console.log('newState', state)

            setModalData(() => state);
            setModalVisible(true);
        }

        initModal();
    };

    const onOk = () => {
        const { name, price, symbol } = modalData;
        const checkoutObj = { name, price, symbol, ...purchaseData }
        console.log('buy cryto', checkoutObj);
        // setConfirmLoading(true) show confirmed payment btn and/or alert
    }

    const handleShareUpdates = (e) => {
        e.preventDefault();
        
        setPurchaseData((prev) => {
            const newShareCount = e.target.closest('span').id === 'add-share' ? prev.shareCount + 1 : (purchaseData.shareCount > 0 ? prev.shareCount - 1 : 0);
            const newTotalPrice = modalData?.price * newShareCount;
            return { shareCount: newShareCount, totalPrice: newTotalPrice.toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 }) };
        });
    }
    
    const handleCancel = () => {
        setModalVisible(false);
        setPurchaseData({shareCount: 0, totalPrice: 0});
    };

    if (isLoading) return <Spin/>;

    const columns = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Price', dataIndex: 'price', key: 'price' },
        { title: 'Change', dataIndex: 'change', key: 'change' },
        { title: 'Volume (24h)', dataIndex: 'volume', key: 'volume' },
        { title: 'Market Cap', dataIndex: 'marketCap', key: 'marketCap' },
        { title: 'Supply', dataIndex: 'supply', key: 'supply' },
        { title: 'Purchase', key: 'purchase', render: (_, rec) => (<Button onClick={() => showModal(rec?.key)} type='primary' shape='round'>Buy</Button>)}
    ];

    // src={`https://cryptoicons.org/api/color/${obj.symbol.toLowerCase()}/200`}
    const dataSource = () => {
        const data = cryptoData?.map(obj => {
            return {
                key: obj.id,
                name: <span><Avatar style={{backgroundColor: 'blue'}}/>{obj.name}</span>,
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
            { limit && (<div><Button shape='round'><Link to='/cryptos'>All Assets</Link></Button></div>) }
            <Table dataSource={dataSource()} columns={columns} pagination={{ pageSize: 25 }}/>
            <Modal
            title={`Purchase ${modalData?.symbol}`}
            visible={modalVisible}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            okText='Buy'
            onOk={onOk}>
                { modalData ? (
                    <div>
                        <section className='modal-buy-box-container'>
                            <div>
                                <h2>{modalData?.name}<span>{`(${modalData?.symbol})`}</span></h2>
                                <div className='modal-top-section'>
                                    <span>${modalData?.price.toLocaleString('en-US')}</span>
                                    <span style={modalData?.change > 0 ? {color: 'green'} : {color: 'red'}}>{millify(modalData?.change)}%</span>
                                </div>
                                <div className='modal-bottom-section'>
                                    <span><b>Rank:</b> # {modalData?.rank}</span>
                                    <span><b>Market Cap:</b> ${millify(modalData?.marketCap)}</span>
                                    <span><b>Volume:</b> ${millify(modalData?.volume)}</span>
                                    <span><b>Supply:</b> {millify(modalData?.supply)}</span>
                                </div>
                            </div>
                            <div>
                                <div className='modal-buy-box'>
                                    <div className='modal-buy-box-top'>
                                        <h2>Shares:</h2>
                                        <span>{purchaseData?.shareCount}</span>
                                        <Divider />
                                        <MinusCircleOutlined id='remove-share' onClick={e => handleShareUpdates(e)}/>
                                        <span className='buy-box-qty'>QTY</span>
                                        <PlusCircleOutlined id='add-share' onClick={e => handleShareUpdates(e)}/>
                                    </div>
                                    <div className='modal-buy-box-bottom'>
                                        <span>Total: ${purchaseData?.totalPrice}</span>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                ) : <Spin/> }
            </Modal>
        </Row>
    );
}


export default Cryptocurrencies;