import React, { useState } from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  UserOutlined,
} from "@ant-design/icons";
import "../static/css/AdminIndex.css";
import {Route} from 'react-router-dom'
import AddArticle from './AddArticle'
import ArticleList from './ArticleList'
const {  Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function AdminIndex(props ) {
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };
  const articleManagerHandler=(e)=>{
    switch(e.key){
      case 'addArticle':
        props.history.push('/index/add')
        break
      case 'ArticleList':
        props.history.push('/index/list')
        break
      default:
        break
    }
  }
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            工作台
          </Menu.Item>
          <Menu.Item key="2" icon={<DesktopOutlined />}>
            添加文章
          </Menu.Item>
          <SubMenu key="sub1" icon={<UserOutlined />} title="文章管理" onClick={articleManagerHandler}>
            <Menu.Item key="addArticle">添加文章</Menu.Item>
            <Menu.Item key="ArticleList">文章列表</Menu.Item>
          </SubMenu>
          <Menu.Item key="9" icon={<FileOutlined />}>
            留言管理
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>后台管理系统</Breadcrumb.Item>
            <Breadcrumb.Item>工作台</Breadcrumb.Item>
          </Breadcrumb>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
              <div>
                  <Route path='/index/' exact component={AddArticle}/>
                  <Route path='/index/add/' exact component={AddArticle}/>
                  <Route path='/index/list/' exact component={ArticleList}/>
                  <Route path='/index/add/:id' exact component={AddArticle}/>
              </div>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          leevben.com
        </Footer>
      </Layout>
    </Layout>
  );
}
export default AdminIndex;
