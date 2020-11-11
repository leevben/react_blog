import React, { useEffect, useState } from "react";
import { Row, Col, Menu } from "antd";
import "antd/dist/antd.css";
import styles from "../styles/components/header.module.css";
import Router from "next/router";
import Link from "next/link";
import axios from "axios";
import servicePath from "../config/apiUrl";
import * as icons from "@ant-design/icons";

function Header() {
  const [navArray, setNavArray] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(servicePath.getTypeInfo).then((res) => {
        return res.data.data;
      });
      
      setNavArray(result);
    };
    fetchData();
  }, []);

  const handleClick = (e) => {
    if (e.key == 0) {
      Router.push("/");
    } else {
      Router.push("/artList?id=" + e.key);
    }
  };
  const iconPD=(name)=>{
    return React.createElement(icons[name])
  }
  return (
    <div className={styles.header}>
      <Row>
        <Col
          className={styles.header_left}
          flex={0}
          xs={20}
          sm={20}
          md={10}
          lg={10}
          xl={10}
        >
          <span className={styles.header_logo}>Ben-Blog</span>
          <span className={styles.header_txt}>基于React的Blog实战。</span>
        </Col>
        <Col
          className={styles.header_right}
          flex={1}
          xs={4}
          sm={4}
          md={14}
          lg={14}
          xl={14}
        >
          <Menu
            className={styles.ant_menu_reset}
            mode="horizontal"
            onClick={handleClick}
          >
            <Menu.Item
              className={styles.ant_menu_item_reset}
              key="0"
              icon={iconPD('HomeOutlined')}
            >
              首页
            </Menu.Item>
            {navArray.map((item) => (
              <Menu.Item
                className={styles.ant_menu_item_reset}
                key={item.id}
                icon={iconPD(item.icon)}
              >
                {item.typeName}
              </Menu.Item>
            ))}
           
          </Menu>
        </Col>
      </Row>
    </div>
  );
}

export default Header;
