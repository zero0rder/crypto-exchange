import React, { useState } from 'react';
import millify from 'millify';
import { addPurchase } from '../../api/accounts/user';
import useLocalStorage from '../../hooks/useLocalStorage';
import { Spin, Modal, Divider } from 'antd';
import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';

const CryptoModal = ({ modalData, setModalVisible, modalVisible }) => {
    const [purchaseData, setPurchaseData] = useState({shareCount: 0, cost: 0});
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [localUser, setLocalUser] = useLocalStorage('localUser', '');

    const onOk = async () => {
        const { name, price } = modalData;
        let { _id, balance } = localUser;
        const totalShareCost = parseFloat(purchaseData.cost.replace(',', ''));
        
        purchaseData.cost = totalShareCost;
        balance = balance - totalShareCost;

        const checkoutObj = { _id, balance, name, price, ...purchaseData };
        const submitPurchase = addPurchase(checkoutObj);
        const res = await submitPurchase;
        setLocalUser(() => res);
        setConfirmLoading(true) //show confirmed payment btn and/or alert and close modal
    }

    const handleShareUpdates = (e) => {
        e.preventDefault();
        
        setPurchaseData((prev) => {
            const newShareCount = e.target.closest('span').id === 'add-share' ? prev.shareCount + 1 : (purchaseData.shareCount > 0 ? prev.shareCount - 1 : 0);
            const newTotalPrice = modalData?.price * newShareCount;
            return { shareCount: newShareCount, cost: newTotalPrice.toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 }) };
        });
    }

    const handleCancel = () => {
        setModalVisible(false);
        setPurchaseData({shareCount: 0, cost: 0});
    };

    const isTrending = modalData?.change > 0;

    return (
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
                                <span style={isTrending ? {color: 'green'} : {color: 'red'}}>{isTrending ? '+' : ''}{millify(modalData?.change)}%</span>
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
                                    <span>Total: ${purchaseData?.cost}</span>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            ) : <Spin/> }
        </Modal>
    )
}

export default CryptoModal;