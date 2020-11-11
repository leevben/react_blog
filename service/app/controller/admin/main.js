"use strict";

const Controller = require("egg").Controller;

class MainController extends Controller {
  async index() {
    this.ctx.body = "hi api";
  }
  async checkLogin() {
    let userName = this.ctx.request.body.userName;
    let password = this.ctx.request.body.password;
    const sql =
      "SELECT userName FROM admin_users WHERE userName='" +
      userName +
      "' AND password ='" +
      password +
      "' ";
      const res =await this.app.mysql.query(sql)
      if(res.length>0){
          let openId=new Date().getTime()
          this.ctx.session.openId={'openId':openId}
          this.ctx.body={'data':'登陆成功','openId':openId}
      }else{
          this.ctx.body={'data':'登录失败'}
      }
    }

    async getTypeInfo(){
      const resType=await this.app.mysql.select('type')
      this.ctx.body={data:resType}
    }

    async addArticle(){
      let tmpArticle=this.ctx.request.body
      const result= await this.app.mysql.insert('article',tmpArticle)
      const isSuccess=result.affectedRows===1
      const insertId=result.insertId

      this.ctx.body={
        isSuccess:isSuccess,
        insertId:insertId
      }
    }
    async updateArticle(){
      let tmpArticle=this.ctx.request.body
      const result=await this.app.mysql.update('article',tmpArticle)
      const isSuccess=result.affectedRows===1
      this.ctx.body={
        isSuccess:isSuccess
      }
    }
    async getArticleList(){
      let sql =
      "SELECT " +
      "article.id as id," +
      "article.title as title," +
      "article.introduce as introduce," +
      "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s') as addTime, " +
      "article.viewCount as viewCount," +
      "type.typeName as typeName " +
      "FROM article LEFT JOIN type ON article.type_id=type.id " +
      "ORDER BY article.id DESC"
      const result=await this.app.mysql.query(sql)
      this.ctx.body={data:result}
    }

    async deleteArticle(){
      let id=this.ctx.params.id
      const result=await this.app.mysql.delete('article',{id:id})
      const isSuccess=result.affectedRows===1
      this.ctx.body={
        isSuccess:isSuccess
      }
    }

    async getArticleById(){
      const id=this.ctx.params.id
      let sql =
      "SELECT " +
      "article.id as id," +
      "article.title as title," +
      "article.introduce as introduce," +
      "article.articleContent as content," +
      "FROM_UNIXTIME(article.addTime,'%Y-%m-%d') as addTime, " +
      "article.viewCount as viewCount," +
      "type.typeName as typeName, " +
      "type.id as typeId " +
      "FROM article LEFT JOIN type ON article.type_id=type.id "+
      'WHERE article.id='+id 

      const result=await this.app.mysql.query(sql)
      this.ctx.body={
        data:result
      }
    }
}

module.exports = MainController;
