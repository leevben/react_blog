import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Author from "../components/author";
import Adver from "../components/adver";
import Footer from "../components/footer";
import { Row, Col, List } from "antd";
import Header from "../components/header";
import styles from "../styles/pages/index.module.css";
import axios from "axios";
import {
  CalendarOutlined,
  YoutubeOutlined,
  FireOutlined,
} from "@ant-design/icons";
import servicePath from '../config/apiUrl'

function Home(props) {
  const [myList, setMyList] = useState(props.data);
  useEffect(()=>{
    axios({
      method:'get',
      url:servicePath.getArticleList
    }).then(res=>{
      setMyList(res.data.data)
    })
  },[])
  
  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>
      <Header />

      <Row className="comm_main" justify="center">
        <Col
          className="comm_left"
          flex={1}
          xs={24}
          sm={24}
          md={16}
          lg={18}
          xl={14}
        >
          <List
            header={<div>最新日志</div>}
            itemLayout="vertical"
            dataSource={myList}
            renderItem={(item) => (
              <List.Item>
                <div className={styles.list_title}>
                  <Link href={{ pathname: "detail", query: { id: item.id } }}>
                    <a>{item.title}</a>
                  </Link>
                </div>
                <div className={styles.list_icon}>
                  <span>
                    <CalendarOutlined />
                    {item.addTime}
                  </span>
                  <span>
                    <YoutubeOutlined />
                    {item.typeName}
                  </span>
                  <span>
                    <FireOutlined />
                    {item.viewCount}人
                  </span>
                </div>
                <div className={styles.list_context}>{item.introduce}</div>
              </List.Item>
            )}
          />
        </Col>
        <Col className="comm_box" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <Adver />
        </Col>
      </Row>
      <Footer />
    </div>
  );
}

export default Home;


