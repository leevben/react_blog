"use strict";

const Controller = require("egg").Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = "api hi";
  }
  async getArticleList() {
    let sql =
      "SELECT " +
      "article.id as id," +
      "article.title as title," +
      "article.introduce as introduce," +
      "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s') as addTime, " +
      "article.viewCount as viewCount," +
      "type.typeName as typeName " +
      "FROM article LEFT JOIN type ON article.type_id=type.id";

    const results = await this.app.mysql.query(sql);
    this.ctx.body = { data: results };
  }
  async getArticleById() {
    const id=this.ctx.params.id
    let sql =
      "SELECT " +
      "article.id as id," +
      "article.title as title," +
      "article.introduce as introduce," +
      "article.articleContent as content," +
      "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s') as addTime, " +
      "article.viewCount as viewCount," +
      "type.typeName as typeName, " +
      "type.id as typeId " +
      "FROM article LEFT JOIN type ON article.type_id=type.id "+
      'WHERE article.id='+id 
    
      const results=await this.app.mysql.query(sql)
      this.ctx.body={data:results}
  }
  async getTypeInfo(){
    const result=await this.app.mysql.select('type')
    this.ctx.body={data:result}
  }

  async getListByType(){
    const id=this.ctx.params.id
    let sql =
      "SELECT " +
      "article.id as id," +
      "article.title as title," +
      "article.introduce as introduce," +
      "article.articleContent as content," +
      "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s') as addTime, " +
      "article.viewCount as viewCount," +
      "type.typeName as typeName, " +
      "type.id as typeId " +
      "FROM article LEFT JOIN type ON article.type_id=type.id "+
      'WHERE type_id='+id 
    let typeNameSQL='SELECT typeName from type WHERE id='+id
      const results=await this.app.mysql.query(sql)
      const typeName=await this.app.mysql.query(typeNameSQL)
      this.ctx.body={data:results,typeName:typeName[0].typeName}
  }
}

module.exports = HomeController;
