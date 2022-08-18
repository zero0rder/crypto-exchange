import React, { useContext, useState, useEffect } from 'react';
import { AuthUserContext } from '../../utils/session/index';
import { Avatar, Row, Col, Divider, Table, Statistic, Spin } from 'antd';
import useLocalStorage from '../../hooks/useLocalStorage';

const Account = () => {
    const { authUser } = useContext(AuthUserContext);
    const [localUser /*,setLocalUser*/] = useLocalStorage('localUser', '');
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
        { title: 'Cost', dataIndex: 'cost', key: 'cost' },
        { title: 'Market Value', dataIndex: 'marketVal', key: 'marketVal' },
    ];
    
    const dataSource = () => {
        const name = ['Bitcoin', 'Ether', 'Tether', 'USDA', 'Dogecoin'];
    
        const data = name.map((e, i) => {
           return {
                key: i,
                name: <span><Avatar style={{backgroundColor: 'blue'}}/>{e}</span>,
                cost: `$ 24,112.13`,
                shares: `2${i * 3}`,
                marketVal: `$ 22,112.13`,
            };
        });

        return data;
    }

    if(isLoading) return <Spin/>;

    return (
        <Row className='page-container-row'>
            <Col span={24}>
                <section className='account-page'>
                    <div className='account-header'>
                        <div>
                            <Statistic title={`${accountUser?.first_name}'s Balance:`} value={100000} precision={2} prefix='$' />
                            <span>{accountUser?.email}</span>
                        </div>
                        <Divider />
                    </div>
                    <div className='account-content'>
                        <h2>Crypto Holdings:</h2>
                        <Table dataSource={ dataSource() } columns={ columns } pagination={{ pageSize: 15 }} footer={(data) => <AccountTotals stats={data}/>}/>
                    </div>
                </section>
            </Col>
        </Row>
    )
}

const AccountTotals = (props) => {
    const [userTotals, setUserTotals] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const getTotals = () => {
        const totalsObj = {
            cost: 0,
            shares: 0,
            mrktVal: 0
        };

        props.stats?.map(e => {
            totalsObj.cost += parseFloat(e.cost.replace('$ ', '').replace(',', ''));
            totalsObj.mrktVal += parseFloat(e.marketVal.replace('$ ', '').replace(',', ''));
            totalsObj.shares += parseInt(e.shares);
        });

        totalsObj.cost = totalsObj.cost.toLocaleString('en-US');
        totalsObj.mrktVal = totalsObj.mrktVal.toLocaleString('en-US');

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
                <span>$ {userTotals?.cost}</span>
                <span>$ {userTotals?.mrktVal}</span>
            </div>
        </div>
    )
}


export default Account;