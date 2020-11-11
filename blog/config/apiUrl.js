let ipUrl = "http://127.0.0.1:7001/default/";

let servicePath = {
  getArticleList: ipUrl + "getArticleList", //文字列表接口
  getArticleById: ipUrl + "getArticleById/", //文章详情接口
  getTypeInfo:ipUrl+"getTypeInfo" , //文章类别接口
  getListByType:ipUrl+"getListByType/"  //文章类别接口
};

export default servicePath;
