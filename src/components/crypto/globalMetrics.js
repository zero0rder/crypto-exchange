import { useQuery } from '@tanstack/react-query'
import { getGlobalStats } from '../../api/crypto/index'
import millify from 'millify'
import { Row, Typography, Divider, Spin, Col, Statistic } from 'antd'
const  { Title } = Typography

const GlobalMetrics = () => {
    const { data: stats, isError, isLoading, error } = useQuery(['getGlobalStats'], getGlobalStats)
    if (isLoading) return <Spin/>
    if (isError) console.error('error fetching metrics...', error)

    return (
        <>
            <Title className="component-title">Global Metrics</Title>
            <Row className="global-metrics-container">
                <Col xs={12} md={8} lg={4}>
                    <Statistic title="Cryptocurrencies" value={millify(stats.data.total_cryptocurrencies)} />
                </Col>
                <Col xs={12} md={8} lg={4}>
                    <Statistic title="Exhanges" value={millify(stats.data.total_exchanges)} />
                </Col>
                <Col xs={12} md={8} lg={4}>
                    <Statistic title="Market Cap" value={`$${millify(stats.data.quote.USD.total_market_cap)}`}/>
                </Col>
                <Col xs={12} md={8} lg={4}>
                    <Statistic title="24 Hour Volume" value={`$${millify(stats.data.quote.USD.total_volume_24h)}`} />
                </Col>
                <Col xs={12} md={8} lg={4}>
                    <Statistic title="Markets" value={millify(stats.data.active_market_pairs)}/>
                </Col>
                <Col xs={12} md={8} lg={4}>
                    <Statistic title="Daily % Change" value={millify(stats.data.quote.USD.total_volume_24h_yesterday_percentage_change)}/>
                </Col>
            </Row>
            <Divider className="section-divider"></Divider>
        </>
    )
}

export default GlobalMetrics