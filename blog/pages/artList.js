import React, { useState ,useEffect} from "react";
import Head from "next/head";
import Link from 'next/link'
import Author from "../components/author";
import Adver from "../components/adver";
import Footer from "../components/footer";
import { Row, Col, List, Breadcrumb } from "antd";
import Header from "../components/header";
import styles from "../styles/pages/artList.module.css";
import axios from "axios";
import servicePath from "../config/apiUrl";
import {
  CalendarOutlined,
  YoutubeOutlined,
  FireOutlined,
} from "@ant-design/icons";
function ArtList(props) {
  const [myList, setMyList] = useState(props.data);
  const [typeName,setTypeName]=useState(props.typeName)
  useEffect(()=>{
    setMyList(props.data)

  })
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
            header={
              <Breadcrumb>
                <Breadcrumb.Item>
                  <a href="/">首页</a>
                </Breadcrumb.Item>
            <Breadcrumb.Item>{typeName}</Breadcrumb.Item>
              </Breadcrumb>
            }
            itemLayout="vertical"
            dataSource={myList}
            renderItem={(item) => (
              <List.Item>
                <Link href={{ pathname: "detail", query: { id: item.id } }}>
                  <a>{item.title}</a>
                </Link>
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
                    {item.viewCount}
                  </span>
                </div>
                <div className={styles.list_context}>{item.context}</div>
              </List.Item>
            )}
          />
        </Col>
        <Col className="comm_box" xs={0} sm={0} md={7} lg={6} xl={4}>
          <Author />
          <Adver />
        </Col>
      </Row>
      <Footer />
    </div>
  );
}

ArtList.getInitialProps = async (context) => {
  console.log(context);
  let id = context.query.id;
  const promise = new Promise((resolve) => {
    axios(servicePath.getListByType + id).then((res) => {
      resolve(res.data);
    });
  });
  return await promise;
};
export default ArtList;
