import React from 'react';
import { useGetExchangesQuery } from '../services/cryptocurrencies';
import millify from 'millify';
import { Spin, Table } from 'antd';

const Exchanges = () => {
    const {data: exchangeData, isFetching } = useGetExchangesQuery();
    const exchanges = exchangeData?.data?.exchanges;

    if (isFetching) return <Spin />;

    const exchangeColumns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Rank',
            dataIndex: 'rank',
            key: 'rank'
        },
        {
            title: '# of Markets',
            dataIndex: 'numOfMrkts',
            key: 'numOfMrkts'
        },
        {
            title: 'Volume (24h)',
            dataIndex: 'volume',
            key: 'volume'
        },
        {
            title: 'Market Share',
            dataIndex: 'mrktShare',
            key: 'mrktShare'
        },
        {
            title: 'Website',
            dataIndex: 'website',
            key: 'website'
        }
    ];
    
    const xchges = exchanges.map(x => {
        const xchng = {
            key: x.id,
            name: x.name,
            rank: x.rank,
            numOfMrkts: x.numberOfMarkets,
            volume: `$${millify(x.volume)}`,
            mrktShare: `${millify(x.marketShare)}%`,
            website: x.websiteUrl
        };
        
        return xchng;

    });

    return <Table columns={exchangeColumns} dataSource={xchges} pagination={false}/>;
}


export default Exchanges;