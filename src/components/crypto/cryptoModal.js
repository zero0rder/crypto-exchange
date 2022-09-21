import React, { useState } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import { getCryptoQuote } from '../../api/crypto/index'
import { addPurchase } from '../../api/accounts/user'
import useLocalStorage from '../../hooks/useLocalStorage'
import millify from 'millify'
import { Spin, Modal, Divider, Grid, Skeleton } from 'antd'
import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons'
const { useBreakpoint } = Grid

const CryptoModal = ({ id, setModalVisible, modalVisible }) => {
    const { data: quotes, isError, isLoading, error } = useQuery(['getCryptoQuote', id], () => getCryptoQuote(id))
    const [purchaseData, setPurchaseData] = useState({shareCount: 0, cost: 0})
    const [confirmLoading, setConfirmLoading] = useState(false)
    const [localUser, setLocalUser] = useLocalStorage('local_user')
    const modalData = quotes?.data[id]
    const screens = useBreakpoint()
    const modalInfo = {
        id: id,
        name: modalData?.name,
        symbol: modalData?.symbol,
        rank: modalData?.cmc_rank,
        price: modalData?.quote?.USD?.price,
        change: modalData?.quote?.USD?.percent_change_24h,
        supply: modalData?.circulating_supply,
        totalSupply: modalData?.total_supply,
        marketCap: modalData?.quote?.USD?.market_cap,
        volume: modalData?.quote?.USD?.volume_24h
    }

    const mutation = useMutation(purchase => addPurchase(purchase), {
        onSuccess: (data) => {
            setLocalUser(() => data)
            setConfirmLoading(true)
            setTimeout(() => {
                setConfirmLoading(false)
                setModalVisible(prev => !prev)
            }, 3500)
        },
        onError: (error) => {
            console.error(error)
        }
    }) 

    const onOk = async () => {
        const totalShareCost = parseFloat(purchaseData.cost.replace(',', ''))
        const purchaseObj = {
            _id: localUser._id,
            balance: (localUser.balance - totalShareCost),
            name: modalInfo.name,
            price: modalInfo.price,
            id: modalInfo.id,
            cost: totalShareCost,
            shareCount: purchaseData.shareCount
        }

        mutation.mutate(purchaseObj)
    }

    const handleShareUpdates = (e) => {
        e.preventDefault()
        setPurchaseData((prev) => {
            const newShareCount = e.target.closest('span').id === 'add-share' ? prev.shareCount + 1 : (purchaseData.shareCount > 0 ? prev.shareCount - 1 : 0);
            const newTotalPrice = modalInfo.price * newShareCount;
            return { shareCount: newShareCount, cost: newTotalPrice.toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 }) };
        })
    }

    const handleCancel = () => {
        setModalVisible(false)
        setPurchaseData({shareCount: 0, cost: 0})
    }

    if (isLoading) return <Skeleton active />
    if (isError) return console.error('error opening modal...', error)

    const isTrending = modalInfo.change > 0;

    return (
        <Modal
        title={`Purchase ${modalInfo.symbol}`}
        visible={modalVisible}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        okText='Buy'
        onOk={onOk}>
            { modalData ? (
                <div>
                    <section className='modal-buy-box-container'>
                        <div>
                            <h2>{modalInfo.name}<span style={ screens.xs ? { fontSize: '0.75rem', verticalAlign: 'super' } : {}}>{`(${modalInfo.symbol})`}</span></h2>
                            <div className='modal-top-section'>
                                <span style={ screens.xs ? { fontSize: '1.15rem' } : {}}>${modalInfo.price.toLocaleString('en-US')}</span>
                                <span style={isTrending ? {color: 'green'} : {color: 'red'}}>{isTrending ? '+' : ''}{millify(modalInfo.change)}%</span>
                            </div>
                            <div className='modal-bottom-section'>
                                <span><b>Rank:</b> # {modalInfo.rank}</span>
                                <span><b>Market Cap:</b> ${millify(modalInfo.marketCap)}</span>
                                <span><b>Volume:</b> ${millify(modalInfo.volume)}</span>
                                <span><b>Supply:</b> {millify(modalInfo.supply)}</span>
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
                                    <span style={ screens.xs ? { fontSize: '1.1rem' } : {}}>Total: ${purchaseData?.cost}</span>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            ) : <Spin/>}
        </Modal>
    )
}

export default CryptoModal