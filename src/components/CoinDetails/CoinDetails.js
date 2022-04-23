import React, { useState } from 'react'
import millify from 'millify'
import { Typography, Col, Row, Select } from 'antd'
import { useParams } from 'react-router-dom'
import HTMLReactParser from 'html-react-parser'
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { useGetCoinDetailsQuery , useGetCoinHistoryQuery } from '../../Services/CrptoApi'
import LineChart from './LineChart'
import './style2.css'
import Loader from '../Loader/Loader'
const CoinDetails = () => {

  const { Title, Text } = Typography;
  const { Option } = Select;
  const { coinId } = useParams()
  const [timeperiod, settimePeriod] = useState('7d')
  const { data, isFetching } = useGetCoinDetailsQuery(coinId);
  const { data:coinHistory , isFetching:isProcessing} = useGetCoinHistoryQuery({coinId , timeperiod});
  if (isFetching ) return <Loader/>
  if(isProcessing) return <Loader/>

  const cryptoDetails = data.data.coin;
  const time = ['3h', '24h', '7d', '30d', '3m', '1y', '3y', '5y'];

  const stats = [
    { title: 'Price to USD', value: `$ ${millify(cryptoDetails.price)}`, icon: <DollarCircleOutlined /> },
    { title: 'Rank', value: cryptoDetails.rank, icon: <NumberOutlined /> },
    { title: 'Daily Change', value: `${cryptoDetails.change != null && cryptoDetails.change}%`, icon: <ThunderboltOutlined /> },
    { title: 'Market Cap', value: ` $ ${cryptoDetails.marketCap != null && millify(cryptoDetails.marketCap)}`, icon: <DollarCircleOutlined /> },
    { title: 'All-time-high(daily avg)', value: `$ ${cryptoDetails.allTimeHigh != null && millify(cryptoDetails.allTimeHigh.price)}`, icon: <TrophyOutlined /> },
  ]

  const genericStats = [
    { title: 'Number Of Market', value: cryptoDetails.numberOfMarkets, icon: <FundOutlined /> },
    { title: 'Number Of Exchanges', value: cryptoDetails.numberOfExchanges, icon: <MoneyCollectOutlined /> },
    { title: 'Approved Supply', value: cryptoDetails.supply.confirmed ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
    { title: 'Total Supply', value: `$ ${cryptoDetails.supply.total != undefined && millify(cryptoDetails.supply.total)}`, icon: <ExclamationCircleOutlined /> },
    { title: 'Circulating Supply', value: `$ ${cryptoDetails.supply.circulating != undefined && millify(cryptoDetails.supply.circulating)}`, icon: <FundOutlined /> },
  ]

  return (
    <Col className='coin-detail-container'>
      <Col className='coin-heading-container'>
        <Title level={2} className='coin-name'>
          {cryptoDetails.name} ({cryptoDetails.symbol}) Price
        </Title>
        <p className='coin-text'>
          {cryptoDetails.name} live price in US Dollars. View value statistics,market cap and supply.
        </p>
      </Col>

      <Select 
      value={timeperiod}
      className="select-timeperiod" 
      placeholder="Select Timeperiod" 
      onChange={(value) => settimePeriod(value)}
      >
        {time.map((date) => <Option key={date}>{date}</Option>)}
      </Select>

      <LineChart coinHistory={coinHistory} currentPrice={millify(cryptoDetails.price)} coinName={cryptoDetails.name}/>
      
      <Col className='stats-container'>
        <Col className='coin-value-statistics'>
          <Col className='coin-value-statistics-heading'>
            <Title level={3} className='coin-details-heading'>
              {cryptoDetails.name} Value Statistics
            </Title>
            <p>
              An overview showing the stats of {cryptoDetails.name}.
            </p>

          </Col>
          <Col>
            {stats.map(({ title, icon, value }) => (
              <Col className='coin-stats'>
                <Col className='coin-stats-name'>
                  <Text className='coin-text'>{icon}</Text>
                  <Text className='coin-text'>{title}</Text>
                </Col>
                <Text className='coin-text'>{value}</Text>
              </Col>

            ))}
          </Col>

        </Col>

        <Col className='other-stats-info'>
          <Col className='coin-value-statistics-heading'>
            <Title level={3} className='coin-details-heading'>
              Other Statistics
            </Title>
            <p>
              An overview showing the stats of all cryptocurriences.
            </p>

          </Col>
          <Col>
            {genericStats.map(({ title, icon, value }) => (
              <Col className='coin-stats'>
                <Col className='coin-stats-name'>
                  <Text className='coin-text'>{icon}</Text>
                  <Text className='coin-text'>{title}</Text>
                </Col>
                <Text className='coin-text'>{value}</Text>
              </Col>

            ))}
          </Col>

        </Col>

      </Col>
      <Col className='coin-desc-link'>
        <Row className='coin-desc'>
          <Title level={3}>  What is {cryptoDetails.name}? </Title>
          <Title level={3} className='coin-details-heading'>
            {HTMLReactParser(cryptoDetails.description)}
          </Title>

        </Row>
        <Col className='coin-link'>
          <Title className='coin-links-heading' level={3}>
            {cryptoDetails.name} links
          </Title>
          {cryptoDetails.links.map((links) => (
            <Row className='coin-links' >
              <Title className='link-name' level={5}>
                {links.type}
              </Title>
              <a href={links.url} target='_blank' rel='noreferrer'>
                {links.name}
              </a>
            </Row>
          ))}
        </Col>
      </Col>

    </Col>
  )
}

export default CoinDetails