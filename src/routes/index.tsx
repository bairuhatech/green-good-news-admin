import React, { useState } from "react";
import { Layout, theme } from "antd";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

import Siders from "./sider";
import MobileDrawer from "./drawer";

import HomeScreen from "../screens/homescreen";
import PodcastScreen from "../screens/podcastscreen";
import ReelsScreen from "../screens/reelsscreen";
import SportScreen from "../screens/sportsscreen";
import LiveScreen from "../screens/livescreen";

import "./styles.css";

const { Content } = Layout;

function Routing() {
  //---------state---------
  const [collapsed, setCollapsed] = useState(false);
  const User = useSelector((state: any) => state.User);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout className="routingLayout">
      <Layout>
        <div className="isDesktop">
          <Siders />
        </div>
        <Layout>
          <div className="isMobile">
            <MobileDrawer />
          </div>

          <Content
            className="routingContent"
            style={{
              background: colorBgContainer,
              overflow:'scroll'
            }}
          >
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/home" element={<HomeScreen />} />
              <Route path="/reels" element={<ReelsScreen />} />
              <Route path="/podcast" element={<PodcastScreen />} />
              <Route path="/sports" element={<SportScreen />} />
              <Route path="/live" element={<LiveScreen />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default Routing;
