import { Layout, Menu } from "antd";

import { AppstoreOutlined, YoutubeOutlined } from "@ant-design/icons";
import { Link, Route, Routes } from "react-router-dom";

import TopRankingMovies from "./pages/external/rankingMovies/TopRankingMovies";
import TopRankingSeries from "./pages/external/rankingSeries/TopRankingSeries";
import PopularMovies from "./pages/external/popularMovies/PopularMovies";
import PopularSeries from "./pages/external/popularSeries/PopularSeries";
import PersonalHomePage from "./pages/personal/home/Home";

import "antd/dist/antd.css";
import "./App.css";
import { useEffect } from "react";
import { FormatProvider } from "./context/FormatContext";
import SearchPage from "./pages/external/search/Search";

const { Header, Content, Footer } = Layout;

const App = () => {
  useEffect(() => {
    console.log("App:  Loading...");
  }, []);

  const onMenuClickHandler = (event: any) => {
    console.log("onMenuClickHandler: event=", event);
  };

  return (
    <FormatProvider>
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <Menu mode="horizontal" theme="dark" onClick={onMenuClickHandler}>
            <Menu.Item key="home">
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.SubMenu key="imdb" title="IMDB" icon={<YoutubeOutlined />}>
              <Menu.Item key="Search" icon={<AppstoreOutlined />}>
                <Link to="search">Search</Link>
              </Menu.Item>
              <Menu.Item key="rankingMovies" icon={<AppstoreOutlined />}>
                <Link to="rankingMovies">Top Ranking Movies</Link>
              </Menu.Item>
              <Menu.Item key="rankingSeries" icon={<AppstoreOutlined />}>
                <Link to="rankingSeries">Top Ranking Series</Link>
              </Menu.Item>
              <Menu.Item key="popularMovies" icon={<AppstoreOutlined />}>
                <Link to="popularMovies">Most Popular Movies</Link>
              </Menu.Item>
              <Menu.Item key="popularSeries" icon={<AppstoreOutlined />}>
                <Link to="popularSeries">Most Popularg Series</Link>
              </Menu.Item>
            </Menu.SubMenu>
          </Menu>
        </Header>
        <Content style={{ padding: "0 20px" }}>
          <Routes>
            <Route path="/" element={<PersonalHomePage />} />
            <Route path="search" element={<SearchPage />} />
            <Route path="rankingMovies" element={<TopRankingMovies />} />
            <Route path="rankingSeries" element={<TopRankingSeries />} />
            <Route path="popularMovies" element={<PopularMovies />} />
            <Route path="popularSeries" element={<PopularSeries />} />
          </Routes>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </FormatProvider>
  );
};

export default App;
