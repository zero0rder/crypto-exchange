import React, { useContext, useState, useEffect } from 'react';
import { AuthUserContext } from '../../utils/session/index';
import { Avatar, Row, Col, Divider, Table, Statistic, Spin } from 'antd';
import useLocalStorage from '../../hooks/useLocalStorage';

const Account = () => {
    const {authUser} = useContext(AuthUserContext);
    const [localUser] = useLocalStorage('localUser', '');
    const [accountUser, setAccountUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let user = ((typeof authUser === 'string') || (authUser === null)) ? localUser : authUser;
        setAccountUser(user);
        setIsLoading(false);

    }, [])

    const columns = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Shares', dataIndex: 'shares', key: 'shares' },
        { title: 'Total Cost', dataIndex: 'totalCost', key: 'totalCost' },
        { title: 'Cost Per', dataIndex: 'price', key: 'price' },
    ];
    
    const dataSource = localUser.purchases.map((e, i) => {
       return {
            key: i,
            name: <span><Avatar style={{backgroundColor: 'blue'}}/>{e.name}</span>,
            price: `$${e.price.toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 })}`,
            shares: e.shares,
            totalCost: `$${e.cost.toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 })}`,
        };
    });

    if(isLoading) return <Spin/>;

    return (
        <Row className='page-container-row'>
            <Col span={24}>
                <section className='account-page'>
                    <div className='account-header'>
                        <div>
                            <Statistic title={`${accountUser?.first_name}'s Balance:`} value={localUser.balance} precision={2} prefix='$' />
                            <span>{accountUser?.email}</span>
                        </div>
                        <Divider />
                    </div>
                    <div className='account-content'>
                        <h2>Crypto Holdings:</h2>
                        <Table dataSource={ dataSource } columns={ columns } pagination={{ pageSize: 15 }} footer={(data) => <AccountTotals stats={data}/>}/>
                    </div>
                </section>
            </Col>
        </Row>
    )
}

const AccountTotals = ({stats}) => {
    const [userTotals, setUserTotals] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const getTotals = () => {
        const totalsObj = {
            shares: 0,
            totalCost: 0
        };

        stats?.map(e => {
            totalsObj.totalCost += parseFloat(e.totalCost.replace('$', '').replace(',', ''));
            totalsObj.shares += parseInt(e.shares);
        });

        totalsObj.totalCost = totalsObj.totalCost.toLocaleString('en-US');
        return totalsObj;
    }

    useEffect(() => {
        setUserTotals(getTotals());
        setIsLoading(false);

    }, []);

    if(isLoading) return <Spin/>;

    return (
        <div>
            <p>Totals:</p>
            <div>
                <span>{userTotals?.shares}</span>
                <span>$ {userTotals?.totalCost}</span>
            </div>
        </div>
    )
}

export default Account;