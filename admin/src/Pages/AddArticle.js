import React, { useState, useEffect } from "react";
import marked from "marked";
import "../static/css/AddArticle.css";
import { Row, Col, Input, Select, Button, DatePicker, message } from "antd";
import axios from "axios";
import servicePath from "../config/apiUrl";
const { Option } = Select;
const { TextArea } = Input;

function AddArticle(props) {
  const [articleId, setArticleId] = useState(0); // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
  const [articleTitle, setArticleTitle] = useState(""); //文章标题
  const [articleContent, setArticleContent] = useState(""); //markdown的编辑内容
  const [markdownContent, setMarkdownContent] = useState("预览内容"); //html内容
  const [introducemd, setIntroducemd] = useState(); //简介的markdown内容
  const [introducehtml, setIntroducehtml] = useState("等待编辑"); //简介的html内容
  const [showDate, setShowDate] = useState(); //发布日期
  // const [updateDate, setUpdateDate] = useState(); //修改日志的日期
  const [typeInfo, setTypeInfo] = useState([]); // 文章类别信息
  const [selectedType, setSelectType] = useState(); //选择的文章类别

 

  marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: true,
    pedantic: false,
    smartLists: true,
    smartypants: true,
  });

  const changeContent = (e) => {
    setArticleContent(e.target.value);
    let html = marked(e.target.value);
    setMarkdownContent(html);
  };
  const changeIntroduce = (e) => {
    setIntroducemd(e.target.value);
    let html = marked(e.target.value);
    setIntroducehtml(html);
  };
  const getTypeInfo = () => {
    axios({
      method: "get",
      url: servicePath.getTypeInfo,
      withCredentials: true,
    }).then((res) => {
      if (res.data.data === "没有登录") {
        message.error("请先登录");
        localStorage.removeItem("openId");
        props.history.push("/");
      } else {
        setTypeInfo(res.data.data);
      }
    });
  };
  const changeSelectedType = (value) => {
    setSelectType(value);
  };
  const changeArticleTitle = (e) => {
    setArticleTitle(e.target.value);
  };
  const saveArticle = () => {
    if (!articleTitle) {
      message.error("文章标题不能为空");
      return false;
    } else if (!articleContent) {
      message.error("文章内容不得为空");
      return false;
    } else if (!selectedType) {
      message.error("必须选择文章类型");
      return false;
    } else if (!showDate) {
      message.error("请选择发布时间");
      return false;
    }

    let dataProps = {};
    dataProps.type_id = selectedType;
    dataProps.title = articleTitle;
    dataProps.articleContent = articleContent;
    dataProps.introduce = introducemd;
    let dateText=showDate.replace('-','/')
    dataProps.addTime=(new Date(dateText).getTime())/1000

    //根据有无Id确定是发布新文章还是修改已有文章

      //添加文章
    if(articleId===0){
      dataProps.viewCount=0
      axios({
        method:'post',
        url:servicePath.addArticle,
        data:dataProps,
        withCredentials:true,
      }).then(
        res=>{
          setArticleId(res.data.insertId)
          if(res.data.isSuccess){
            message.success('文章保存成功')
          }else{
            message.error('文章保存失败')
          }
        }
      )
    }
    //修改文章
    else{
      dataProps.id=articleId
      axios({
        method:'post',
        url:servicePath.updateArticle,
        withCredentials:true,
        data:dataProps
      }).then(
        res=>{
          if(res.data.isSuccess){
            message.success('文章修改成功')
          }else{
            message.error('文章修改失败')
          }
        }
      )
    }

  };
  const getArticleById=(id)=>{
    axios(servicePath.getArticleById+id,{withCredentials:true}).then(
      res=>{
        const articleInfo=res.data.data[0]
        setArticleTitle(articleInfo.title)
        setIntroducemd(articleInfo.introduce)
        setArticleContent(articleInfo.content)
        setSelectType(articleInfo.typeId)
        setShowDate(articleInfo.addTime)
        let html=marked(articleInfo.content)
        setMarkdownContent(html)
        let introduceHtml=marked(articleInfo.introduce)
        setIntroducehtml(introduceHtml)
      }
    )
  }
  useEffect(() => {
    getTypeInfo()

    //获得文章ID
    let tmpId=props.match.params.id
    if(tmpId){
      setArticleId(tmpId)
      getArticleById(tmpId)
    }
  }, []);
  return (
    <div>
      <Row gutter={5}>
        <Col span={18}>
          <Row gutter={10}>
            <Col span={20}>
              <Input
                placeholder="博客标题"
                size="large"
                value={articleTitle}
                onChange={changeArticleTitle}
              />
            </Col>
            <Col span={4}>
              &nbsp;
              <Select
                placeholder="请选择类别"
                value={selectedType}
                onChange={changeSelectedType}
                size="large"
              >
                {typeInfo.map((item) => {
                  return (
                    <Option key={item.id} value={item.id}>
                      {item.typeName}
                    </Option>
                  );
                })}
              </Select>
            </Col>
          </Row>
          <br />
          <Row gutter={10}>
            <Col span={12}>
              <TextArea
                className="markdown-content"
                rows={30}
                placeholder="文章内容"
                value={articleContent}
                onChange={changeContent}
              />
            </Col>
            <Col span={12}>
              <div
                className="show-html"
                dangerouslySetInnerHTML={{ __html: markdownContent }}
              ></div>
            </Col>
          </Row>
        </Col>
        <Col span={6}>
          <Row>
            <Col span={24}>
              {/* <Button size="large">暂存文章</Button> */}
              <Button type="primary" size="large" onClick={saveArticle}>
                发布文章
              </Button>
            </Col>
            <Col span="24">
              <br />
              <TextArea
                rows={4}
                placeholder="文章简介"
                value={introducemd}
                onChange={changeIntroduce}
              />
              <div
                className="introduce-html"
                dangerouslySetInnerHTML={{ __html: introducehtml }}
              ></div>
            </Col>
            <Col span={12}>
              <div className="date-select">
                <DatePicker
                  placeholder="发布日期"
                  size="large"
                  onChange={(date, dateString) => {
                    setShowDate(dateString);
                  }}
                  
                />
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}
export default AddArticle;