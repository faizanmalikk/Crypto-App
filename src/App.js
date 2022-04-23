import React from "react";
import {
  Navbar,
  Homepage,

  Cryptocurriences,
  CoinDetails,
  News,
} from "./components/Index";
import "./App.css";
import { Link, Routes, Route } from "react-router-dom";
import { Layout, Space, Typography } from "antd";
const App = () => {
  return (
    <>
    <div className="app">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="main">
        <Layout>
          <div className="routes">
            <Routes>
              <Route exact path="/" element={<Homepage />} />
              <Route
                exact
                path="/cryptocurriences"
                element={<Cryptocurriences />}
              />
              <Route exact path="/crypto/:coinId" element={<CoinDetails />} />
              <Route exact path="/news" element={<News />} />
            </Routes>
          </div>
        </Layout>
        <div className="footer">
          <Typography.Title
            level={5}
            style={{ color: "white", textAlign: "center" }}
          >
            Cryptoverse <br />
            All rights reserved
          </Typography.Title>
          <Space>
            <Link to={"/"}>Home</Link>
          
            <Link to={"/news"}>News</Link>
          </Space>
        </div>
      </div>

    </div>
        </>
  );
};

export default App;
