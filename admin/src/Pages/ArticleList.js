import React, { useEffect, useState } from "react";
import { List, Row, Col, Modal, message, Button } from "antd";
import axios from "axios";
import servicePath from "../config/apiUrl";
import '../static/css/ArticleList.css'
const { confirm } = Modal;

function ArticleList(props) {
  const [list, setList] = useState();
  //获得文章列表
  const getArticleList = () => {
    axios({
      method: "get",
      url: servicePath.getArticleList,
      withCredentials:true,
    }).then((res) => {
        setList(res.data.data)
    });
  };
  //删除文章
  const delArticle=(id)=>{
      confirm({
          title:'确定要删除这篇文章吗？',
          content:'如果你点击OK，文章将永远被删除，无法恢复',
          onOk(){
            axios({
                method:'get',
                url:servicePath.deleteArticle+id,
                withCredentials:true
            }).then(
                res=>{
                    if(res.data.isSuccess){
                        message.success('成功删除文章')
                        getArticleList()
                    }else{
                        message.error('文章删除失败')
                    }
                }
            )
          },
          onCancel(){
              message.info('文章没有任何变化')
          }
      })
  }
  //修改文章
    const updateArticle=(id)=>{
        props.history.push('/index/add/'+id)
    }
  useEffect(getArticleList,[])
  return (
    <div>
      <List
        header={
          <Row className="list-div">
            <Col span={8}>
              <b>标题</b>
            </Col>
            <Col span={4}>
              <b>类别</b>
            </Col>
            <Col span={4}>
              <b>发布时间</b>
            </Col>
            <Col span={4}>
              <b>浏览量</b>
            </Col>
            <Col span={4}>
              <b>操作</b>
            </Col>
          </Row>
        }
        bordered
        dataSource={list}
        renderItem={(item) => (
          <List.Item>
            <Row className="list-div">
              <Col span={8}>{item.title}</Col>
              <Col span={4}>{item.typeName}</Col>
              <Col span={4}>{item.addTime}</Col>
              <Col span={4}>{item.viewCount}</Col>
              <Col span={4}>
                <Button type="primary" onClick={()=>updateArticle(item.id)}>修改</Button>
                <Button onClick={()=>delArticle(item.id)}>删除</Button>
              </Col>
            </Row>
          </List.Item>
        )}
      />
    </div>
  );
}

export default ArticleList;
