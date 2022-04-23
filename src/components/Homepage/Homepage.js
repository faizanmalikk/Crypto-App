import React from 'react';
import { Typography , Row , Col , Statistic } from 'antd';
import millify from 'millify';
import {Link} from 'react-router-dom';
import { useGetCryptosQuery } from '../../Services/CrptoApi';
import { Cryptocurriences, News } from '../Index';
import './style.css'
import Loader from '../Loader/Loader';
const Homepage = () => {
  const {Title} = Typography
  const { data, isFetching  } = useGetCryptosQuery(10)

  
  if(isFetching) return <Loader/>
  const globalStats = data.data.stats;

  return (
    <>
    <Title level={2} className='heading'> Global Crypto Stats  </Title>
    <Row>
      <Col span={12}> <Statistic title='Total Cryptocurriences' value={globalStats.total} /></Col>
      <Col span={12}> <Statistic title='Total Exchanges' value={millify(globalStats.totalExchanges)} /></Col>
      <Col span={12}> <Statistic title='Total Market Cap' value={millify(globalStats.totalMarketCap)} /></Col>
      <Col span={12}> <Statistic title='Total 24th Volume' value={millify(globalStats.total24hVolume)} /></Col>
      <Col span={12}> <Statistic title='Total Markets' value={millify(globalStats.totalMarkets)} /></Col>
    </Row>
    <div className="home-heading-container">
      <Title  className='home-title'>
       Top 10 Crypto Curriences:
      </Title>
      <Title level={3} className='show-more'>
      <Link to={'/cryptocurriences'}> Show More</Link>
      </Title>
    </div>
    <Cryptocurriences simplified/>
    <div className="home-heading-container">
      <Title level={2} className='home-title'>
       Latest Crypto News:
      </Title>
      <Title level={3} className='show-more'>
      <Link to={'/news'}> Show More</Link>
      </Title>
    </div>
    <News simplified/>
    </>
  )
}

export default Homepage