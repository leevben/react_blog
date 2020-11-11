let ipUrl = "http://localhost:7001/admin/";

let servicePath = {
  checkLogin: ipUrl + "checkLogin", //检查用户名密码
  getTypeInfo: ipUrl + "getTypeInfo", //获得文章类型
  addArticle: ipUrl + "addArticle", //添加文章
  updateArticle: ipUrl + "updateArticle", //修改文章
  getArticleList: ipUrl + "getArticleList", //获得文章列表
  deleteArticle: ipUrl + "deleteArticle/", //删除文章
  getArticleById: ipUrl + "getArticleById/", //根据id获得文章
};

export default servicePath;
