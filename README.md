### React-blog
一个基于react生态的全栈个人博客项目,仿照技术胖个人博客(jspang.com)进行编写。

## 技术栈
* React-hooks
* Next.js
* Egg.js
* MySQL
* Webpack
* Ant-design
* … …

## 使用方法

#### 下载项目，分别进入三个项目下载依赖，以blog为例。
  <br/>
  
  #### 导入数据，配置数据库
  
 <br/>

 将项目下的database文件夹下的表导入到数据库
 打开/service/config/config.default.js
 找到<code>config.mysql</code>对象
 根据你数据库的设置改写配置
     
##### blog

```
// 下载依赖
cd blog
npm install
```

##### 等待下载完毕后，即可运行

```
//service
cd service 
npm run dev
//blog
cd blog
npm start
//admin
cd admin
npm start
```

## 前端部分
- [x] 文章列表
- [x] 文章分类
- [x] 文章详情（markdown）
## 中台部分
- [x] 数据接口

## 后端部分
- [x] MySQL
- [x] 路由守卫
- [x] 身份验证
- [x] 增删改查
