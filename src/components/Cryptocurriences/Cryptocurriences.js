import React, { useState, useEffect } from "react";
import millify from "millify";
import { Card, Row, Col, Input } from "antd";
import { useGetCryptosQuery } from "../../Services/CrptoApi";
import { Link } from "react-router-dom";
import "./style.css";
import Loader from "../Loader/Loader";
const Cryptocurriences = ({ simplified }) => {

  const count = simplified ? 10 : 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [searchTerm, setSearchTerm] = useState('');
 
  if(isFetching) return <Loader/>

  const cryptos = cryptosList.data.coins.filter((item) => item.name.toLowerCase().includes(searchTerm));


  return (
    <>
      {!simplified && (

        <div className="search-crypto">
          <Input placeholder="Search Cryptocurrency" onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
      )}
      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos.map((currency, i) => (
          <Col xs={24} md={12} lg={6} className="crypto-card" key={i}>
            <Link to={`/crypto/${currency.uuid}`}>
              <Card
                title={`${currency.rank}. ${currency.name}`}
                extra={<img className="crypto-image" src={currency.iconUrl} />}
                hoverable
              >
                <p> Price: {millify(currency.price)} </p>
                <p> Market Cap: {millify(currency.marketCap)} </p>
                <p> Daily Change: {millify(currency.change)} </p>
              </Card>
            </Link>
          </Col>
        ))} ;
      </Row>
    </>
  );
};

export default Cryptocurriences;
