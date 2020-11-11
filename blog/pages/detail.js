import Head from "next/head";
import { Row, Col, Breadcrumb,Affix } from "antd";
import Header from "../components/header";
import styles from "../styles/pages/detail.module.css";
import Author from "../components/author";
import Adver from "../components/adver";
import Footer from "../components/footer";
import marked from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/monokai-sublime.css";
import axios from "axios";
import Tocify from '../components/tocify.tsx'
import {
  CalendarOutlined,
  YoutubeOutlined,
  FireOutlined,
} from "@ant-design/icons";
import servicePath from '../config/apiUrl'

function Detail(props) {
  const sty = (...classNames) => classNames.join(" ");
  const renderer = new marked.Renderer();
  const tocify = new Tocify();
  renderer.heading = function (text, level, raw) {
    const anchor = tocify.add(text, level);
    return `<a id=${anchor} href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
  };

  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: true,
    smartLists: true,
    highlight: function (code) {
      return hljs.highlightAuto(code).value;
    },
  });
  let html = marked(props.content);
  
  return (
    <div>
      <Head>
        <title>Detail</title>
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
          <div className={styles.bread_div}>
            <Breadcrumb>
              <Breadcrumb.Item>
                <a href="/">首页</a>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <a href={'/artList?id='+props.typeId}>{props.typeName}</a>
              </Breadcrumb.Item>
              <Breadcrumb.Item>{props.title}</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div>
            <div className={styles.detail_title}>{props.title}</div>
            <div className={sty(styles.list_icon, styles.center)}>
              <span>
                <CalendarOutlined />
                {props.addTime}
              </span>
              <span>
                <YoutubeOutlined />
                {props.typeName}
              </span>
              <span>
                <FireOutlined />
                {props.viewCount}人
              </span>
            </div>
            <div
              className={styles.detail_content}
              dangerouslySetInnerHTML={{ __html: html }}
            ></div>
          </div>
        </Col>
        <Col className="comm_box" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <Adver />
          <Affix offsetTop={5}>
            <div className="detailed-nav comm-box">
              <div className="nav-title">文章目录</div>
              <div className="toc-list">
                {tocify && tocify.render()}
              </div>

            </div>
          </Affix>
        </Col>
      </Row>
      <Footer />
    </div>
  );
}
Detail.getInitialProps = async (context) => {
  let id = context.query.id;
  const promise = new Promise((resolve) => {
    axios(servicePath.getArticleById+ id).then((res) => {
      resolve(res.data.data[0]);
    });
  });
  return await promise;
};
export default Detail;
