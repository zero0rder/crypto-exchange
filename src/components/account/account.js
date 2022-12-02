import React, { useState, useEffect, useCallback } from 'react'
import { Avatar, Row, Col, Divider, Table, Statistic, Spin, Grid } from 'antd'
import useLocalStorage from '../../hooks/useLocalStorage'
const { useBreakpoint } = Grid

const Account = () => {
    const [localUser] = useLocalStorage('local_user')
    const [accountUser, setAccountUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setAccountUser(localUser)
        setIsLoading(false)
    }, [localUser])

    const columns = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Shares', dataIndex: 'shares', key: 'shares' },
        { title: 'Total Cost', dataIndex: 'totalCost', key: 'totalCost' },
        { title: 'Cost Per', dataIndex: 'price', key: 'price', responsive: ['lg'] },
    ]
    
    const dataSource = localUser.purchases.map((e, i) => {
       return {
            key: i,
            name: <span><Avatar src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${e.id}.png`}/>{e.name}</span>,
            price: `$${e.price.toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 })}`,
            shares: e.shares,
            totalCost: `$${e.cost.toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 })}`,
        }
    })

    if(isLoading) return <Spin/>

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

const AccountTotals = ({ stats }) => {
    const [userTotals, setUserTotals] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const screens = useBreakpoint()

    const getTotals = useCallback(() => {
        const totalsObj = {
            shares: 0,
            totalCost: 0
        }

        stats?.map(e => {
            totalsObj.totalCost += parseFloat(e.totalCost.replace('$', '').replace(',', ''))
            totalsObj.shares += parseInt(e.shares)
            return e
        })

        totalsObj.totalCost = totalsObj.totalCost.toLocaleString('en-US')
        return totalsObj
    }, [stats])

    useEffect(() => {
        setUserTotals(getTotals())
        setIsLoading(false)
    }, [getTotals])

    if(isLoading) return <Spin/>

    return (
        <div>
            <p style={ screens.xs ? { width: '57%' } : {}}>Totals:</p>
            <div>
                <span style={ screens.xs ? { width: '35%' } : {}}>{userTotals?.shares}</span>
                <span style={ screens.xs ? { width: '85%' } : {}}>$ {userTotals?.totalCost}</span>
            </div>
        </div>
    )
}

export default Account