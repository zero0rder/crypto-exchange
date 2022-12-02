import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import millify from 'millify'
import { getCryptos } from '../../api/crypto/index'
import CryptoModal from './cryptoModal'
import { Spin, Row, Col, Button, Avatar, Table, Typography, Grid, message } from 'antd'
const  { Title } = Typography
const { useBreakpoint } = Grid

const Cryptocurrencies = ({ limit }) => {
    const [modalId, setModalId] = useState(null)
    const [modalVisible, setModalVisible] = useState(false)
    const param = (limit ?? 100)
    const { data: cryptos, isError, isLoading, error } = useQuery(['getCrypto', param], () => getCryptos(param))
    const [messageApi, contextHolder] = message.useMessage()
    const screens = useBreakpoint()
    const showModal = (id) => {
        setModalId(() => id)
        setModalVisible(true)
    }

    const purchaseOk = () => {
        messageApi.open({
            type: 'success',
            content: 'Successfully purchased item!',
            duration: 2.5
        })
    }

    if (isLoading) return <Spin/>
    if (isError) return console.error('error fetching crypto...', error)

    const columns = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Price', dataIndex: 'price', key: 'price', responsive: ['lg'] },
        { title: 'Change', dataIndex: 'change', key: 'change', responsive: ['lg'] },
        { title: 'Volume (24h)', dataIndex: 'volume', key: 'volume', responsive: ['lg'] },
        { title: 'Market Cap', dataIndex: 'marketCap', key: 'marketCap', responsive: ['lg'] },
        { title: 'Supply', dataIndex: 'supply', key: 'supply', responsive: ['lg'] },
        { title: 'Purchase', key: 'purchase', render: (_, rec) => (<Button onClick={() => showModal(rec?.key)} type='primary' shape='round'>Buy</Button>)}
    ]

    const dataSource = () => {
        const data = cryptos.data.map(obj => {
            return {
                key: obj.id,
                name: <span><Avatar src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${obj.id}.png`}/>
                <span>{obj.name}</span>
                <a href={`/crypto/${obj.id}`}>details</a></span>,
                price: `$${millify(obj.quote.USD.price)}`,
                change: `% ${millify(obj.quote.USD.percent_change_24h)}`,
                volume: `$${millify(obj.quote.USD.volume_24h)}`,
                marketCap: `$${millify(obj.quote.USD.market_cap)}`,
                supply: millify(obj.circulating_supply)
            }
        })

        return data
    }

    return (
        <Row className='crypto-container'>
            {contextHolder}
            <Col>
                { limit ? (<div className='all-assets-link'><Button shape='round'><Link to='/cryptos'>All Assets</Link></Button></div>) : (<Title style={{ fontSize: screens.xs ? '1.75rem' : '' }} className="component-title">Top Cryptocurrencies</Title>) }
                <Table dataSource={dataSource()} columns={columns} pagination={{ pageSize: 25 }}/>
                { modalVisible && <CryptoModal id={ modalId } setModalVisible={ setModalVisible } modalVisible={ modalVisible } purchaseOk={purchaseOk}/> }
            </Col>
        </Row>
    )
}


export default Cryptocurrencies