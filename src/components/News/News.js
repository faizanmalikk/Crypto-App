import React, { useState } from "react";
import { Select, Typography, Col, Row, Avatar, Card } from "antd";
import moment from "moment";
import { useGetCryptosNewsQuery } from "../../Services/CryptoNewsApi";
import { useGetCryptosQuery } from "../../Services/CrptoApi";
import './style.css'
import Loader from "../Loader/Loader";
const News = ({ simplified }) => {
  const { Text, Title } = Typography;
  const { Option } = Select;
  const [newsCategory, setnewsCategory] = useState('Cryptocurrency')
  const { data } = useGetCryptosQuery(100);

  const { data: cryptoNews, isFetching } = useGetCryptosNewsQuery({
    newsCategory,
    count: simplified ? 6 : 12,
  });
  const demoImage =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJ0esyoZTqNQvK-rSj3IfWJEoUlUJVanSjEQ&usqp=CAU";
  if (isFetching && !cryptoNews) return <Loader/>;

  
  return (
    <Row gutter={[20, 24]}>
      {!simplified && (
        <Col span={24}>
          <Select showSearch 
          className="select-news" 
          placeholder='Select a crypto'
          onChange={(value) => setnewsCategory(value)}
          >
            <Option value='Cryptocurrency'> Cryptocurrency </Option>
                {data.data.coins.map((coin)=> <Option value={coin.name}> {coin.name} </Option> )}
          </Select>
        </Col>


      )}

      {cryptoNews.value.map((news, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className="news-card">
            <a href={news.url} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <Title level={4} className="news-title">
                  {news.name}
                </Title>
                <img
                  src={news.image ? news.image.thumbnail.contentUrl : demoImage}
                  style={{ width: "100px", height: "100px" }}
                />
              </div>
              <p>
                {news.description.length > 200
                  ? `${news.description.substring(0, 200)}...`
                  : news.description}
              </p>
              <div className="provider-container">
                <div>
                  {/* <Avatar
                    src={
                      news.provider[0]
                        ? news.provider[0].image.thumbnail.contentUrl
                        : demoImage
                    }
                  /> */}
                  <Text> {news.provider[0].name} </Text>
                </div>
                <Text>
                  {moment(news.datePublished)
                    .startOf("ss")
                    .fromNow()}
                </Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );

};

export default News;
