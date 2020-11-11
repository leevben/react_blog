import { Avatar, Divider, Tooltip } from "antd";
import "antd/dist/antd.css";
import styles from "../styles/components/author.module.css";
import {
  GithubOutlined,
  WechatOutlined,
  QqOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
const Author = () => {
  const sty = (...classNames) => classNames.join(" ");
  return (
    <div className={sty(styles.author_div, styles.comm_box)}>
      <Avatar size={100} src="/avatar.jpg" />
      <div className={styles.author_introduction}>
        广州大学大四在读学生，正学习WEB前端开发，现在正学习React及其生态。有一颗热爱编程的心，希望能从事相关工作。
        <Divider>社交账号</Divider>
        <a href='https://github.com/leevben' target='_blank'>
          <Avatar icon={<GithubOutlined />} className={styles.author_account} />
          </a>
        <Tooltip title="132xxxxxxxx" placement="top">
          <Avatar icon={<WechatOutlined />} className={styles.author_account} />
        </Tooltip>
        <Tooltip title="31xxxxx1" placement="top">
          <Avatar icon={<QqOutlined />} className={styles.author_account} />
        </Tooltip>
        <Tooltip title="132xxxxxxxx" placement="top">
          <Avatar icon={<PhoneOutlined />} className={styles.author_account} />
        </Tooltip>
      </div>
    </div>
  );
};
export default Author;
